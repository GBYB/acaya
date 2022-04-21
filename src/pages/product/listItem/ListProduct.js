import React, { useEffect, useState } from "react";
import Product from "./Product";
import "./ListProduct.css";
import { useHistory } from "react-router";
import { get_itemID } from "../../../Firebase";

function ListProduct(prop) {
  const [stateItem, setstateItem] = useState({});

  useEffect(() => {
    const getItem = async () => {
      var item;
      await get_itemID(prop.id)
        .then((element) => {
          item = element.data;
          setstateItem(item);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getItem();
  }, [prop.id]);

  const history = useHistory();

  const check_item = (event) => {
    event.preventDefault();
    var id = prop.id;
    history.push("/item", {
      name: stateItem.name,
      description: stateItem.description,
      price: stateItem.price,
      image: stateItem.image,
    });
  };
  const render = () => {
    return (
      <div className="list_product" onClick={check_item}>
        <Product
          name={stateItem.name}
          price={stateItem.price}
          image={stateItem.image}
        />
      </div>
    );
  };

  return render();
}

export default ListProduct;
