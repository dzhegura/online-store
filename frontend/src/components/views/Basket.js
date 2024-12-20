import React, { useState } from 'react';
import './Basket.css';
import PaymentModal from '../PaymentModal';

function Basket({ cart, removeFromCart, updateQuantity, clearCart, total }) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  return (
    <div className="Basket">
      <h2>Корзина</h2>
      {cart.length === 0 ? (
        <p>Ваша корзина пуста</p>
      ) : (
        <div>
          <div className="basket-items">
            {cart.map((item) => (
              <div key={item._id} className="basket-item">
                <img
                  src={process.env.PUBLIC_URL + '/images/' + item.image}
                  alt={item.header}
                  className="basket-item-image"
                />
                <div className="basket-item-info">
                  <h3>{item.header}</h3>
                  <p>{item.price} руб за кг</p>
                  <div className="quantity-controls">
                    <button
                      className="quantity-button"
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span>{item.quantity} кг</span>
                    <button
                      className="quantity-button"
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <p>Итого: {item.price * item.quantity} руб</p>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="remove-button"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="basket-total">
            <h3>Общая стоимость: {total} руб</h3>
          </div>
          <button
            onClick={() => setIsPaymentModalOpen(true)}
            className="checkout-button"
          >
            Оформить заказ
          </button>
        </div>
      )}

      {isPaymentModalOpen && (
        <PaymentModal onClose={() => setIsPaymentModalOpen(false)} clearCart={clearCart} />
      )}
    </div>
  );
}

export default Basket;