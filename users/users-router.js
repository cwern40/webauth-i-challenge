const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('./users-model')
const restricted = require('./restricted')

// endpoint to register a new user. /api/register
router.post('/register', (req, res) => {
    let user = req.body;

    user.password = bcrypt.hashSync(user.password, 10);

    Users.register(user)
        .then(user => {
            req.session.user = user
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({
                message: "unable to create user"
            })
        })
})

// endpoint to login. /api/login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = user;
                res.status(200).json({
                    message: "Logged in"
                })
            } else {
                res.status(401).json({
                    message: "You shall not pass!"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "unexpected error"
            })
        })
})

// endpoint to get a list of users. Requires a user to be logged in. /api/users
router.get('/users', restricted, (req, res) => {
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