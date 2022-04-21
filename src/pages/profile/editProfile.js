import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import {
  changeAddress,
  changePhone,
  changeUsername,
  get_username,
} from "../../Firebase";
import { User_Context } from "../../useContext";
import "./editProfile.css";
function EditProfile() {
  const [username, setusername] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [Umessage, setUmessage] = useState(<p></p>);
  const [Amessage, setAmessage] = useState(<p></p>);
  const [Pmessage, setPmessage] = useState(<p></p>);
  const { userEmail } = User_Context();
  const [ref, setRef] = useState("");
  useEffect(() => {
    const getUser = async () => {
      await get_username(userEmail)
        .then((element) => {
          setusername(element.data.username);
          setAddress(element.data.address);
          setPhone(element.data.phone);
          setRef(element.id);
          console.log(element.data.username);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, [setusername, userEmail]);

  var updateUsername = async (event) => {
    event.preventDefault();
    if (username !== "" || username !== undefined) {
      await changeUsername(userEmail, username)
        .then(() => {
          console.log("user emailed");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setUmessage(<p>Invalid username</p>);
    }
  };

  var updateAddress = async (event) => {
    event.preventDefault();
    if (address !== "" || address !== undefined) {
      await changeAddress(userEmail, address)
        .then(() => {
          console.log("user emailed");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setAmessage(<p>Invalid Address</p>);
    }
  };

  var updatePhone = async (event) => {
    event.preventDefault();
    if (phone !== "" || phone !== undefined) {
      await changePhone(userEmail, phone)
        .then(() => {
          console.log("user emailed");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setPmessage(<p>Invalid Phone</p>);
    }
  };
  return (
    <div className="editProfile">
      <div className="container-profile">
        <h5>Username</h5>
        <form>
          <input
            placeholder="username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
          <button className="submit-btn" onClick={updateUsername}>
            update Username
          </button>
          {Umessage}
        </form>{" "}
        <h5>Address</h5>
        <form>
          <input
            placeholder="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button className="submit-btn" onClick={updateAddress}>
            update Address
          </button>
          {Amessage}
        </form>
        <h5>Phone</h5>
        <div className="phone">
          <form>
            <PhoneInput
              onChange={setPhone}
              value={phone}
              placeholder="Phone number"
              limitMaxLength={true}
            />
            <button className="submit-btn" onClick={updatePhone}>
              update Phone
            </button>
            {Pmessage}
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
