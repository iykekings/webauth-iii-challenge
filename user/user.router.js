const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('./user.middleware');
const secret = require('../auth/secret');
const { add, get } = require('./user.model');

router.get('/', authenticate, async (req, res) => {
  try {
    const users = await get();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json('Could not retrieve the users');
  }
});

router.post('/register', async (req, res) => {
  try {
    const user = req.body;
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(req.body.password, salt);
    const newUser = await add(user);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json('Could not retrieve the users');
  }
});

router.post('/login', async (req, res) => {
  try {
    const { password, username } = req.body;
    const user = await get({ username });
    const isUser = bcrypt.compareSync(password, user.password);
    if (isUser) {
      const token = generateToken(user);
      res.status(200).json({ message: `Welcome ${user.username}`, token });
    } else {
      res.status(401).json({ message: 'You shall not pass today' });
    }
  } catch (error) {
    res.status(500).json('Could not retrieve the users');
  }
});

function generateToken(user) {
  const payload = {
    sub: user.id,
    username: user.username,
    roles: ['Student']
  };

  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;
