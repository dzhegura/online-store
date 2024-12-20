import React, { useState, useEffect } from 'react';
import './Main.css';
import Product from '../Product';

function Main({ setCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const api = 'http://localhost:9001/products';

    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.data);
      })
      .catch((error) => console.error('Ошибка загрузки товара', error));
  }, []);

  return (
    <div className="Main">
      {products.length > 0 ? (
        products.map((item) => (
          <Product
            key={item._id}
            header={item.header}
            image={item.image}
            price={item.price}
            onAddToCart={() => setCart(item)}
          />
        ))
      ) : (
        <p>Загрузка товаров...</p>
      )}
    </div>
  );
}

export default Main;