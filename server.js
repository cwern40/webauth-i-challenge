const express = require('express')
const  server = express();
const helmet = require('helmet');
const usersRouter = require('./users/users-router')
const connectSessionKnex = require('connect-session-knex')

server.use(helmet());
server.use(express.json());
server.use('/api', usersRouter);

module.exports = server;