const router = require('express').Router();
const { add, get } = require('./user.model');

router.get('/', async (req, res) => {
  try {
    const users = await get();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json('Could not retrieve the users');
  }
});

module.exports = router;
