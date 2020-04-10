const express = require('express');

const projectRouter = require('./data/projectRouter');

const server = express();

server.use(express.json());
server.use(logger);

server.use('/api/projects', projectRouter);


server.get('/', (req, res) => {
  const message = process.env.MESSAGE || "hello from sprint challenge project";
  res.json({api: 'running.....', message});
});

module.exports = server;

function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} Request to ${req.originalUrl}`);
    next();
}