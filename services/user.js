var db = require('../data/users');
var User = require('../models/user');

/**
 * Create new user
 * @param {string} email Email address of new user
 * @param {string} hash Password hash of new user
 * @returns {Promise}
 */
function addNewUser (email, hash) {
    return db.addNewUser(email, hash).then((newUser) => {
        return new User(newUser._id, newUser.email, newUser.password);
    });
}

/**
 * Find user by email
 * @param {string}} email Email address to search for user
 * @returns {Promise}
 */
function getUserByEmail (email) {
    console.log('getUserByEmail()');
    console.log(email);
    return db.getUserByEmail(email).then((user) => {
        return user ? new User(user._id, user.email, user.password) : null;
    });
}

/**
 * Find user by user id
 * @param {Number}} id User id to search for user
 * @returns {Promise}
 */
function getUserById (id) {
    return db.getUserById(id).then((user) => {
        return new User(user._id, user.email, user.password);
    });
}

/**
 * Check db to see if a email address is available or currently taken by another user.
 * May not be required if not using NeDB
 * @param {string} email Email address to check for existing user
 * returns {boolean} Is user available
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