const express = require('express')
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session')
const connectSessionKnex = require('connect-session-knex');

const usersRouter = require('./users/users-router');
const db = require('./data/db-config')
const server = express();

const KnexSessionStore = connectSessionKnex(session);

const sessionConfig = {
    name: 'authorize challenge',
    secret: 'this is super secret',
    cookie: {
        maxAge: 1000 * 60,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({
        knex: db,
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60
    })
}

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(session(sessionConfig));
server.use('/api', usersRouter);

server.get('/', (req, res) => {
    res.json({
        message: "It's working"
    })
})

module.exports = server;