const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('./users-model')
const restricted = require('./restricted')

router.post('/api/register', (req, res) => {
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

router.post('/api/login', restricted, (req, res) => {
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

router.get('/api/users', restricted, (req, res) => {
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

module.exports = router;