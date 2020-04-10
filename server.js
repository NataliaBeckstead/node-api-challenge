const express = require('express');

const server = express();

server.use(express.json());
server.use(logger);


server.get('/', (req, res) => {
  const message = process.env.MESSAGE || "hello from sprint challenge project";
  res.json({api: 'running.....', message});
});

module.exports = server;

function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} Request to ${req.originalUrl}`);
    next();
}