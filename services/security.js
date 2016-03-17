var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var config = require('../config/config');

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

function getNewToken (id) {
    return jwt.sign({ id : id }, config.secret, {
        expiresIn : '1d'
    });
}

function isPasswordValid (password, hash) {
    return bcrypt.compareSync(password, hash);
}

function getPasswordHash (password) {
    console.log('getPasswordHash()');
    var hash = bcrypt.hashSync(password, 8);
    console.log(hash);
    return hash;
}

module.exports = {
    getDecodedToken : getDecodedToken,
    getNewToken : getNewToken,
    isPasswordValid : isPasswordValid,
    getPasswordHash : getPasswordHash
};
