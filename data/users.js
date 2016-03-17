var db = require('./data').users;

/**
 * Create a new user in the db
 * @param {string} email Email address of new user
 * @param {string} hash Password hash of new user
 * @returns {Promise}
 */
function addNewUser (email, hash) {
    return db.insertAsync({
        email : email,
        password : hash,
        created : Date.now()
    });
}

/**
 * Get user by email address
 * @param {string} email Email address to search for user
 * @returns {Promise}
 */
function getUserByEmail (email) {
    return db.findOneAsync({ email : email });
}

/**
 * Get user by user id
 * @param {Number} id User id
 * @returns {Promise}
 */
function getUserById (id) {
    return db.findOneAsync({ _id : id });
}

module.exports = {
    getUserById : getUserById,
    getUserByEmail : getUserByEmail,
    addNewUser : addNewUser
};