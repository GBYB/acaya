import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get_purchases, get_username } from "../Firebase";
import { User_Context } from "../useContext";
import "./purchase.css";
import "../cart/cart.css";
function Purchase() {
  const [username, setusername] = useState("");
  const [load, setload] = useState(true);
  const { userEmail } = User_Context();
  const [product, setProduct] = useState([]);
  var total = 0;
  var avg = 0;
  var showTitle = (
    <div className="items">
      <p>No items Found !</p>
      <hr />
    </div>
  );
  useEffect(() => {
    if (userEmail !== undefined) {
      const getUser = async () => {
        await get_username(userEmail)
          .then((element) => {
            setusername(element.data.username);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      getUser();
    }

    if (username !== undefined || username !== "") {
      var data;
      const getItems = async () => {
        await get_purchases(username)
          .then((item) => {
            data = item.data;
          })
          .catch((err) => {
            console.log(err, "an error occured");
          });
        setProduct(data);
      };
      getItems();
      setload(false);
    }
  }, [userEmail, username]);
  var showProduct;

  if (
    (username !== undefined || username !== "") &&
    !load &&
    product.length > 0
  ) {
    product.sort(function (a, b) {
      return a.orderNum - b.orderNum;
    });

    var arr = [];
    var last = 0;
    var bigArr = [];
    var avgArr = [];
    var totArr = [];
    console.log(product);
    product.map((data, index) => {
      if (index === 0) last = data.orderNum;
      if (last === data.orderNum) {
        total += Math.round(data.quantity * data.price);
        arr.push(data);
      } else {
        totArr.push(total);
        avg = Math.round(total / arr.length);
        avgArr.push(avg);
        bigArr.push(arr);
        total = 0;
        avg = 0;
        arr = [data];
        total += Math.round(data.quantity * data.price);
      }
      if (index === product.length - 1) {
        avg = Math.round(total / arr.length);
        totArr.push(total);
        avgArr.push(avg);
        bigArr.push(arr);
      }
      console.log(arr);
      last = data.orderNum;

      return (showProduct = bigArr.map((big, i) => (
        <div className="purchased-item">
          <div className="total-avg">
            <h6>Total:{totArr[i]}</h6>
            <h6>Average:{avgArr[i]}</h6>
          </div>
          <div className="item-purchased">
            {
              (showTitle = big.map((element, i) => (
                <div key={i}>
                  <li>
                    <i key={i}>
                      {element.name} x {element.quantity} {element.orderNum}{" "}
                    </i>
                  </li>
                  <br />
                </div>
              )))
            }
          </div>
          <div className="date-purchased">
            Time purchased:
            {big[0].purchaseTime}
          </div>
        </div>
      )));
    });
    console.log(bigArr);
  } else {
    showTitle = (
      <div className="items">
        <p>No items Found !</p>
        <hr />
      </div>
    );
  }
  return (
    <div className="app">
      {/* <Header /> */}
      <div className="purchase">
        <div className="top">
          <Link to="home">
            <img src="logo.svg" alt="shop logo" height="250" width="250" />
          </Link>
          <h3>Your Purchase History</h3>
          <hr />
        </div>
        <div className="purchase-list">
          {showProduct ? showProduct : showTitle}
        </div>
      </div>
    </div>
  );
}

export default Purchase;
