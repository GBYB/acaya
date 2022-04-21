import React, { useEffect, useState } from "react";
import "./profile.css";
import { get_username } from "../../Firebase";
import { Link, useHistory } from "react-router-dom";
import { User_Context } from "../../useContext";
function Profile() {
  const history = useHistory();
  const [username, setusername] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  var email = "";
  const { userEmail } = User_Context();
  email = userEmail;
  useEffect(() => {
    const getUser = async () => {
      await get_username(userEmail)
        .then((element) => {
          setusername(element.data.username);
          setAddress(element.data.address);
          setPhone(element.data.phone);
          console.log(element.data.username);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, [setusername, userEmail]);
  const edit = (event) => {
    event.preventDefault();
    history.push("/editProfile");
  };

  const render = () => {
    return (
      <div className="app">
        {/* <Header /> */}
        <div className="profile">
          <Link to="home">
            <img
              src={process.env.PUBLIC_URL + "/logo.svg"}
              alt="shop logo"
              height="250"
              width="250"
            />
          </Link>
          <h3>Profile</h3>
          <div className="profile_text">
            <button className="edit" onClick={edit}>
              Edit
            </button>
            <form>
              <h5>Username</h5>
              {username ? username : "loading..."}
              <h5>Email</h5>
              {email ? email : "loading..."}
              <h5>Address</h5>
              <p>{address ? address : "n/a"}</p>
              <h5>Phone</h5>
              <p>{phone ? phone : "n/a"}</p>
            </form>
          </div>
        </div>
      </div>
    );
  };
  return render();
}

export default Profile;
