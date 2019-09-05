const express = require('express')
const  server = express();
const helmet = require('helmet');
const bcrypt = require('bcryptjs');

const Users = require('./users/users-model')

server.use(helmet());
server.use(express.json());

server.post('/api/register', (req, res) => {
    let user = req.body;

    user.password = bcrypt.hashSync(user.password, 10);

    Users.register(user)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({
                message: "unable to create user"
            })
        })
})

module.exports = server;