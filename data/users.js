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

    var ps = { name : 'addNewUser', text : "INSERT INTO users (email, password) VALUES ($1, $2)", values : [email, hash] };

    return query(ps).then(function (results) {
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

    var ps = { name : 'getUserbyEmail', text : "SELECT * FROM users WHERE email = $1", values : [email] };

    return query(ps).then(function (results) {
        console.log('getUserByEmail()');
        console.log(results.rows[0]);
        return results.rows.length > 0 ? results.rows[0] : null;
    });
}

function getAllUsers () {

    var ps = { name: 'getAllUsers', text: 'SELECT * FROM users' };

    return query(ps).then(function (results) {
        console.log(results);
    });
}

/**
 * Get user by user id
 * @param {Number} id User id
 * @returns {Promise}
 */
function getUserById (id) {

    var ps = { name : 'getUserById', text : "SELECT * FROM users WHERE id = $1", values : [id] };

    return query(ps).then(function (results) {
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