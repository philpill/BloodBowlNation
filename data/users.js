var db = require('./data').users;
var User = require('../models/user');

/**
 * Create a new user in the db
 * @param {string} email Email address of new user
 * @param {string} hash Password hash of new user
 * @returns {Promise}
 */
function addNewUser (email, hash) {
    return getUserByEmail(email).then(function (user) {
        return user ? null : db.insertAsync({
            email : email,
            password : hash,
            created : Date.now()
        }).then(function (data) {
            return new User(data._id, data.email, data.password);
        });
    });
}

/**
 * Get user by email address
 * @param {string} email Email address to search for user
 * @returns {Promise}
 */
function getUserByEmail (email) {
    return db.findOneAsync({ email : email }).then(function (data) {
        return data ? new User(data._id, data.email, data.password) : null;
    });
}

/**
 * Get user by user id
 * @param {Number} id User id
 * @returns {Promise}
 */
function getUserById (id) {
    return db.findOneAsync({ _id : id }).then(function (data) {
        return data ? new User(data._id, data.email, data.password) : null;
    });
}

module.exports = {
    getUserById : getUserById,
    getUserByEmail : getUserByEmail,
    addNewUser : addNewUser
};