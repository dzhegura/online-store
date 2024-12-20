const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { secret } = require('../models/config');

const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log('Токен с клиента:', token);
  if (!token) return res.status(401).json({ message: 'Токен не предоставлен!' });

  try {
    const decoded = jwt.verify(token, secret);
    console.log('Декодированный токен:', decoded);
    req.userId = decoded.id;
    next();
  } catch (e) {
    console.error('Ошибка токена:', e.message);
    return res.status(401).json({ message: 'Неверный токен!' });
  }
};

router.get('/', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'Пользователь не найден!' });

    res.json({ login: user.login, email: user.email });
  } catch (e) {
    res.status(500).json({ message: 'Ошибка сервера!' });
  }
});

router.put('/', authenticate, async (req, res) => {
  const { newEmail, newPassword } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'Пользователь не найден!' });

    if (newEmail) user.email = newEmail;
    if (newPassword) user.password = newPassword;

    await user.save();
    res.json({ message: 'Данные успешно обновлены!' });
  } catch (e) {
    res.status(500).json({ message: 'Ошибка сервера!' });
  }
});

module.exports = router;