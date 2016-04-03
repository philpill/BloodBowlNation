// var db = require('./data').users;
var User = require('../models/user');

var query = require('./data').query;

/**
 * Create a new user in the db
 * @param {string} email Email address of new user
 * @param {string} hash Password hash of new user
 * @returns {Promise}
 */
function addNewUser (email, hash) {
    return query("INSERT INTO users (email, password) VALUES ('" + email + "', '" + hash + "');").then(function (results) {
        console.log(results);
        return results;
    });
}

/**
 * Get user by email address
 * @param {string} email Email address to search for user
 * @returns {Promise}
 */
function getUserByEmail (email) {
    return query("SELECT * FROM users WHERE email = '" + email + "';").then(function (results) {
        console.log('getUserByEmail()');
        console.log(results.rows[0]);
        return results.rows.length > 0 ? results.rows[0] : null;
    });
}

function getAllUsers () {
    return query('SELECT * FROM users;').then(function (results) {
        console.log(results);
    });
}

/**
 * Get user by user id
 * @param {Number} id User id
 * @returns {Promise}
 */
function getUserById (id) {
    return query("SELECT * FROM users WHERE id = " + id + ";").then(function (results) {
        console.log('getUserByEmail()');
        console.log(results.rows);
        return results.rows.length > 0 ? results.rows[0] : null;
    });
}

module.exports = {
    getUserById : getUserById,
    getAllUsers : getAllUsers,
    getUserByEmail : getUserByEmail,
    addNewUser : addNewUser
};