const express = require('express');
const server = express();
const userRoute = require('./user/user.router');

server.use(express.json());
server.use('/api/users', userRoute);

server.get('/', (req, res) => {
  res.status(200).json('Server live at /api/users');
});

server.listen(4000, () => {
  console.log('Server running at port 4000');
});
