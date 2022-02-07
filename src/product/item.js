import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { add_basket, auth, get_username } from "../Firebase";
import { User_Context } from "../useContext";
import "./item.css";
function Item() {
  const location = useLocation();
  const name = location.state.name;
  const description = location.state.description;
  const image = location.state.image;
  const price = location.state.price;
  const [quantity, setQuantity] = useState(1);
  const [purchased, setPurchased] = useState(<p></p>);
  const { userEmail } = User_Context();
  const [username, setusername] = useState("");
  useEffect(() => {
    const getUser = async () => {
      await get_username(userEmail)
        .then((element) => {
          setusername(element.data.username);
        })
        .catch((err) => {
          console.log(err, "an error occured");
        });
    };
    getUser();
    console.log("hel");
  }, [userEmail]);

  var Add_to_cart;

  if (username !== undefined || username !== "") {
    Add_to_cart = (event) => {
      event.preventDefault();
      const pushBasket = async () => {
        await add_basket(name, price, image, quantity, username)
          .then(() => {
            setPurchased(<p>Purchase completed</p>);
          })
          .catch((err) => {
            console.log(err);
            setPurchased(<p>{err}</p>);
          });
      };
      pushBasket();
    };
  }

  return (
    <div className="app">
      {/* <Header /> */}
      <div className="item">
        <div className="item-form">
          <img src={image} alt="product" />
          <br />
          <h3>{name}</h3>
        </div>
        <div className="add-basket">
          {purchased}
          <button onClick={Add_to_cart}>Add to cart</button>
        </div>
        <div className="quantity">
          <h6>Quantity</h6>
          <input
            onChange={(e) =>
              setQuantity(
                isNaN(Math.abs(e.target.value)) ? 0 : Math.abs(e.target.value)
              )
            }
            value={quantity}
          ></input>
        </div>
        <div className="item-info">
          <h3>Details</h3>
          <div className="item-details">
            <h5>Price : {price}$</h5>
            <h5>Description:</h5>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
