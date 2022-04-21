import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./cart.css";
import {
  setBudget,
  delete_basket_item,
  get_basket,
  get_username,
} from "../../Firebase";
import { User_Context } from "../../useContext";
import "./basketItem.css";

function Cart() {
  const { userEmail } = User_Context();
  const [username, setusername] = useState();
  const [product, setProduct] = useState([]);
  const [budget, setbudget] = useState(0);
  // const [ref, setref] = useState();

  var total = 0;
  console.log(userEmail);
  useEffect(() => {
    const getUser = async () => {
      await get_username(userEmail)
        .then((element) => {
          setusername(element.data.username);
          setbudget(element.data.budget);
          //setref(element);
          console.log(element.data.username);
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

  const history = useHistory();
  const purchase_confirm = (event) => {
    event.preventDefault();
    if (product.length > 0 && (budget >= total || budget === 0))
      history.push("/checkout");
  };
  var showProduct = <div></div>;
  var showTitle = <div></div>;
  var rendered = false;

  if (product.length !== 0 && username !== undefined) {
    product.forEach((data) => {
      if (data !== undefined) {
        console.log(data);
        rendered = true;
        total += data.quantity * data.price;
      }
    });
  }
  if (rendered) {
    console.log(product.length);
    showTitle = (
      <div className="items">
        <h4>item list</h4>
        <hr />
      </div>
    );
  } else {
    showTitle = (
      <div className="items">
        <p>No items Found !</p>
        <hr />
      </div>
    );
  }
  const delete_Item = async (event) => {
    event.preventDefault();

    if (username !== undefined || username !== "") {
      // setProduct(
      await delete_basket_item(event.target.dataset.mssg, username)
        .then()
        .catch(
          (err) => {
            console.log(err);
          } //)
        );
      const getItems = async () => {
        await get_basket(username)
          .then((item) => {
            var data = item.data;
            if (data !== undefined) {
              setProduct(data);
              console.log("Added to product");
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
  if (username !== undefined || username !== "") {
    showProduct = product.map((data) => (
      <div className="item-list" key={data}>
        <div className="basketItem">
          <img className="basketItem__image" src={data.image} alt="" />
          <div className="basketItem__info">
            <p className="basketItem__title">{data.name}</p>
            <strong className="basketItem__price">$ {data.price}</strong>
            <br />
          </div>
          <div className="quantity_info">
            <h5>x {data.quantity}</h5>
            <div className="remove_item">
              <button
                data-mssg={data.name}
                onClick={delete_Item}
                className="basketItem__removeBtn"
              >
                Remove item
              </button>
            </div>
          </div>
        </div>
        <br />
      </div>
    ));
  }
  return (
    <div className="app">
      {/* <Header /> */}
      <div className="cart">
        <Link to="home">
          <img
            src={process.env.PUBLIC_URL + "/logo.svg"}
            alt="shop logo"
            height="250"
            width="250"
          />
        </Link>
        <div className="user-info">
          <h4>hello {username ? username : "loading..."}, here's your cart</h4>
        </div>
        <div className="cart-info">
          {/* <div className="purchase-info"> */}
          <div className="purchase-info-style">
            <h5>Your cart expenses</h5>
            <h5>Price : {total ? total : 0} $</h5>
            <h5>Budget: {budget} $</h5>
            {budget === 0 ? (
              <div>
                <h6>You can purchase with no budget constraints</h6>
                <h6> you can set the budget in the tracker page</h6>
              </div>
            ) : (
              budget < total && (
                <h6>You cannot purchase these items due to your budget</h6>
              )
            )}
            <br />
            <div className="confirm_purchase">
              <button className="purchase_btn" onClick={purchase_confirm}>
                purchase
              </button>
            </div>
            {/* </div> */}
          </div>
        </div>
        {showTitle}
        {showProduct}

        <br />
      </div>
    </div>
  );
}

export default Cart;
