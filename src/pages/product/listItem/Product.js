import React from "react";
import "./Product.css";
function Product({ name, price, image }) {
  return (
    <div className="product">
      <div className="product_item">
        <div className="product__info">
          <p>{name}</p>
          <p className="product__price">
            <small>$</small>
            <strong>{price}</strong>
          </p>
        </div>
        <img src={image} alt="" />
      </div>
    </div>
  );
}

export default Product;
