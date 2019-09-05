const db = require('../data/db-config')

module.exports ={
    find,
    login,
    register
}

function find() {
    return db('users')
}

function login(filter) {
    return db('users').where(filter)
}