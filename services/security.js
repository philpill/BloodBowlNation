var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var config = require('../config/config');

/**
 * Get decoded header token
 * @param {string} authHeader Header auth token as supplied when user logged in
 * @returns {object} decoded token, containing user id and expiry
 */
function getDecodedToken (authHeader) {
    var decodedToken;
    var token = authHeader.replace('Bearer ', '');
    try {
        decodedToken = jwt.verify(token, config.secret);
    } catch (e) {
        console.log(e);
        decodedToken = null;
    }
    return decodedToken;
}

/**
 * Get new JSON Web Token
 * @param {string} userId User Id
 * @returns {object} JSON Web Token
 */
function getNewToken (userId) {
    return jwt.sign({ id : userId }, config.secret, {
        expiresIn : '1d'
    });
}

/**
 * Validate password against hash
 * @param {string} password Unencoded plain text password
 * @param {string} hash Hashed password to test against
 * @returns {boolean} password was not the source of given hash
 */
function isPasswordValid (password, hash) {
    return bcrypt.compareSync(password, hash);
}

/**
 * Get hash for password
 * @param {string} password String to hash
 * @returns {string} hashed password
 */
function getPasswordHash (password) {
    return bcrypt.hashSync(password, 8);
}

module.exports = {
    getDecodedToken : getDecodedToken,
    getNewToken : getNewToken,
    isPasswordValid : isPasswordValid,
    getPasswordHash : getPasswordHash
};
