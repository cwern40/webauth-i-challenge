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

server.post('/api/login', restricted, (req, res) => {
    const { username } = req.headers;

    Users.login({ username })
        .then(user => {
            res.status(200).json({
                message: "Logged in"
            })
        })
        .catch(err => {
            res.status(500).json({
                message: "unexpected error"
            })
        })
})

server.get('/api/users', restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({
                message: "unexpected error occured"
            })
        })
})

function restricted(req, res, next) {
    const { username, password } = req.headers;

    if (username && password) {
        Users.login({ username })
            .first()
            .then(user => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    next();
                } else {
                    res.status(401).json({
                        message: "invalid credentials"
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: "unexpected error"
                })
            })
    } else {
        res.status(400).json({
            message: "please provide username and password"
        })
    }
}

module.exports = server;