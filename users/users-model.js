const db = require('../data/db-config')

module.exports ={
    find,
    findBy,
    register
}

function find() {
    return db('users')
}

function findBy(filter) {
    return db('users').where(filter)
}

function register(user) {
    return db('users').insert(user)
}