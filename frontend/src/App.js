import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/views/Main';
import Basket from './components/views/Basket';
import Profile from './components/views/Profile';
import ModalBox from './components/ModalBox';
import Login from './components/Login';
import Registration from './components/Registration';

function App() {
  const [page, setPage] = useState('Main');
  const [modalBox, setModalBox] = useState('none');
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState(null);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const pages = {
    Main: <Main cart={cart} setCart={addToCart} />,
    Basket: (
      <Basket
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        clearCart={clearCart}
        total={calculateTotal()}
      />
    ),
    Profile: <Profile token={token} />,
  };

  const modalBoxes = {
    none: null,
    Login: <ModalBox setModalBox={setModalBox}><Login setToken={setToken} /></ModalBox>,
    Registration: <ModalBox setModalBox={setModalBox}><Registration /></ModalBox>,
  };

  return (
    <div className="App">
      <Header setPage={setPage} setModalBox={setModalBox} />
      <div className="Content">
        {pages[page]}
        {modalBoxes[modalBox]}
      </div>
      <Footer />
    </div>
  );
}

export default App;