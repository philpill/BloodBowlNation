var data = require('../data/data');
var config = require('../config/config');
var jwt = require('jsonwebtoken');

function validateEmail (users) {

    if (users.length !== 1) {

    }

    return users[0];
}

function authenticateUser (user) {

    var isAuthed = false;

    if (user.password === data.password) { // should be some hashing going on here

        isAuthed = true;
        // issue web token
    }

    return isAuthed;
}

function getToken (user) {
    var token = jwt.sign(user, config.secret, {
        expiresInMinutes: 1440 // expires in 24 hours
    });
    return token;
}

function authenticateGetToken (user) {
    var token = '';
    if (validateEmail(user)) {
        if (authenticateUser(user)) {
            token = getToken(user);
        }
    }
    return token;
}

function * login () {

    var data = this.request.body;

    this.type = 'application/json';

    var token = yield data.users.findAsync({ email : data.email })
    .then(authenticateGetToken)
    .catch(function(e) {
        // do stuff
    });

    this.status = token ? 200 : 401;

    this.body = token;
}

function * signup () {

    var data = this.request.body;
    this.type="application/json";

    var user = {
      email : email,
      password : password
    };

    var token = yield data.users.insertAsync(user)
    .then(authenticateGetToken)
    .catch(function(e) {

    });

    this.status = token ? 200 : 401;

    this.body = token;
}

var auth = {
    login : login,
    signup : signup
};


module.exports = auth;
