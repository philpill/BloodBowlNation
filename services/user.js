var db = require('../data/users');
var User = require('../models/user');

/**
 * Create new user
 * @param {string} email Email address of new user
 * @param {string} hash Password hash of new user
 * @returns {Promise}
 */
function addNewUser (email, hash) {
    return isDataValid(email) ? db.addNewUser(email, hash) : null;
}

/**
 * Check data to create new user is valid
 * @param {string} email Email address to validate
 * returns {boolean}
 */
function isDataValid (email) {
    return true;
}

/**
 * Find user by email
 * @param {string}} email Email address to search for user
 * @returns {Promise}
 */
function getUserByEmail (email) {
    console.log('getUserByEmail()');
    return db.getUserByEmail(email);
}

/**
 * Find user by user id
 * @param {Number} id User id to search for user
 * @returns {Promise}
 */
function getUserById (id) {
    return db.getUserById(id);
}

/**
 * Check db to see if a email address is available or currently taken by another user.
 * May not be required if not using NeDB
 * @param {string} email Email address to check for existing user
 * returns {Promise}
 */
function isEmailAvailable (email) {
    return db.getUserByEmail(email).then((user) => {
        return user ? false : true; // does this need to be resolved as a promise?
    });
}

module.exports = {
    addNewUser : addNewUser,
    getUserByEmail : getUserByEmail,
    getUserById : getUserById,
    isEmailAvailable : isEmailAvailable
};