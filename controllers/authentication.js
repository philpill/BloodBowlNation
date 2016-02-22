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

    console.log('getToken()');

    var token = jwt.sign(user, config.secret, {
        expiresIn: 86400 // expires in 24 hours
    });

    console.log('token', token);

    return token;
}

function authenticateGetToken (user) {

    console.log('authenticateGetToken()');
    console.log(user);

    var token = '';
    // if (validateEmail(user)) {
    //     if (authenticateUser(user)) {
            token = getToken(user);
        // }
    // }
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

function * register () {

    console.log('register()');

    var body = this.request.body;
    this.type='application/json';

    var user = yield data.users.findOne({ email : body.email });

    if (user) {
        this.status = 409;
        this.body = 'email already registered';
    } else {
        var user = yield data.users.insert({
            email : body.email,
            password : body.password
        });

        this.status = 200;
        this.body = authenticateGetToken(user);
    }
}

var auth = {
    login : login,
    register : register
};


module.exports = auth;
