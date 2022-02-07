import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./checkout.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { User_Context } from "../useContext";
import {
  addPurchase,
  get_basket,
  get_username,
  setBudget,
  updateUser,
} from "../Firebase";
function Checkout() {
  const history = useHistory();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState("");
  const [username, setusername] = useState("");
  const [product, setProduct] = useState([{}]);
  const { userEmail } = User_Context();
  const [budget, setbudget] = useState(0);
  const [ref, setref] = useState();
  const [Amessage, setAmessage] = useState(<p></p>);

  let total = 0;
  product.forEach((element) => {
    total += element.quantity * element.price;
  });
  useEffect(() => {
    const getUser = async () => {
      await get_username(userEmail)
        .then((element) => {
          setusername(element.data.username);
          console.log(element.data.username);
          if (element.data.address !== "") setAddress(element.data.address);
          if (element.data.phone !== "") setPhone(element.data.phone);
          setbudget(element.data.budget);
          setref(element);
        })
        .catch((err) => {
          console.log(err);
        });
      if (username !== undefined || username !== "") {
        const getItems = async () => {
          await get_basket(username)
            .then((item) => {
              var data = item.data;
              if (data !== undefined) {
                setProduct(data);
                console.log("Added to product");
                //console.log("data is here", product);
              }
              console.log(data);
            })
            .catch((err) => {
              console.log(err, "an error occured");
            });
        };
        getItems();
      }
    };

    getUser();
  }, [userEmail, username, setProduct]);

  const purchase_confirm = (event) => {
    event.preventDefault();
    const purchase = async () => {
      console.log(
        "is address",
        address,
        "is phone ",
        phone,
        "is username",
        username
      );
      if (product.length !== 0)
        if (
          address !== undefined &&
          address !== "" &&
          phone !== undefined &&
          phone !== ""
        ) {
          if (username !== "" || username !== undefined) {
            await updateUser(username, address, phone)
              .then(console.log("update complete"))
              .catch((err) => {
                console.log(err);
              });
            await addPurchase(username)
              .then(() => {
                console.log("purchase complete");
              })
              .catch((err) => {
                console.log(err);
              });
            if (budget !== 0) {
              //     const updateBudget = async () => {
              await setBudget(budget - total, ref);
              //  };
              /// updateBudget();
            }
          }
          history.push("/purchase");
        } else {
          setAmessage(<p>Invalid phone or address</p>);
        }
      else {
        setAmessage(<p>No item found please go back to the home page</p>);
      }
    };
    purchase();
  };
  return (
    <div className="app">
      {/* <Header /> */}
      <div className="checkout">
        <Link to="home">
          <img src="logo.svg" alt="shop logo" height="250" width="250" />
        </Link>
        <h2>Checkout</h2>
        <div className="list">
          <h4>Purchase list:</h4>
          {product.map((data) => (
            <li key={data}>
              <i>
                {data.name} x {data.quantity}
              </i>
            </li>
          ))}
          <br />
          <h5>Total: {total} $</h5>
        </div>
        <div className="user-credential-handler">
          <div className="user-credential">
            <h4>Location of delivery</h4>
            <h5>Address</h5>
            {/* <input type="number" name="quantity" min="1" max="5" />
          <h5>Zip code</h5> */}
            <input
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <h5>Phone number</h5>
            <div className="phone">
              <PhoneInput
                onChange={setPhone}
                value={phone}
                placeholder="Phone number"
                limitMaxLength={true}
              />
              {Amessage}
            </div>
            <div className="checkout-handler">
              <button className="checkout-btn" onClick={purchase_confirm}>
                Purchase cash-on delivery
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
