var data = require('../data/data');
var config = require('../config/config');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

function getToken (user) {
    return jwt.sign(user, config.secret, {
        expiresIn: 86400
    });
}

function isTokenValid (token, secret) {
    var isValid;
    try {
        jwt.verify(token, secret);
        isValid = true;
    } catch (e) {
        isValid = false;
    }
    return isValid;
}

function isPasswordValid (password, hash) {
    return bcrypt.compareSync(password, hash);
}

function * authenticate () {
    this.type = 'application/json';
    this.status = isTokenValid(this.request.body.token, config.secret) ? 200 : 401;
}

function * login () {
    this.type = 'application/json';
    var body = this.request.body;
    var user = yield data.users.findOne({ email : body.email });
    var token = isPasswordValid(body.password, user.password) ? getToken(user) : null;
    this.status = token ? 200 : 401;
    this.body = token;
}

function * register () {
    this.type='application/json';
    var body = this.request.body;
    var user = yield data.users.findOne({ email : body.email });
    if (user) {
        this.status = 409;
        this.body = 'email already registered';
    } else {
        var hash = bcrypt.hashSync(body.password, 8);
        var user = yield data.users.insert({
            email : body.email,
            password : hash
        });
        this.status = 200;
        this.body = getToken(user);
    }
}

var auth = {
    login : login,
    register : register,
    authenticate : authenticate,
};


module.exports = auth;
