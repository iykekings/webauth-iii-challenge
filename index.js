const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json('Server live at /api/users');
});

server.listen(4000, () => {
  console.log('Server running at port 4000');
});
