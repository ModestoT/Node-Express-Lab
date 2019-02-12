const express = require('express');
const postRouter = require('./posts/posts-router.js');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());

server.use('/api/posts', postRouter);

module.exports = server;