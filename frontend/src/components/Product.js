import React from 'react';
import './Product.css';

function Product({ header, image, price, onAddToCart }) {
  return (
    <div className="Product">
      <img
        src={process.env.PUBLIC_URL + '/images/' + image}
        alt={header}
        className="product-image"
      />
      <h1>{header}</h1>
      <p>{`${price} руб`}</p>
      <button onClick={onAddToCart}>В корзину</button>
    </div>
  );
}

export default Product;