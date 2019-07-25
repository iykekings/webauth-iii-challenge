const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { add, get } = require('./user.model');

router.get('/', async (req, res) => {
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
    const newUser = await get(req.body.username);
    const password = req.body.password;

    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json('Could not retrieve the users');
  }
});

module.exports = router;
