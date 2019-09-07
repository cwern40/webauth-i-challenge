const bcrypt = require('bcryptjs');

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

module.exports = restricted;