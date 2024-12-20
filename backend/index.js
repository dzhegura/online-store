const PORT = 9001;
const URLDB = 'mongodb://127.0.0.1:27017';

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { secret } = require('./models/config');
const User = require('./models/User');
const Product = require('./models/Product');
const profileRoutes = require('./routes/profileRoutes');

const app = express();

app.use(cors());
app.use(express.json());

const generateAccessToken = (id) => {
    const payload = { id };
    return jwt.sign(payload, secret, { expiresIn: '24h' });
};

app.post('/registration', async (req, res) => {
  const { login, password, email } = req.body;
  const user = new User({ login, password, email });
  await user.save();
  res.json({ message: 'Вы успешно зарегистрировались!' });
});

app.post('/login', async (req, res) => {
  const { login, password } = req.body;
  const user = await User.findOne({ login });
  if (!user || user.password !== password) {
    return res.status(400).json({ message: 'Неверный логин или пароль!' });
  }
  const token = generateAccessToken(user._id);
  res.json({ message: 'Успешная авторизация!', token });
});

app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json({ data: products });
});

app.use('/profile', profileRoutes);

const start = async () => {
  try {
    await mongoose.connect(URLDB);
    app.listen(PORT, () => console.log(`Сервер запущен на порте ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();