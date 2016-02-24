var data = require('../data/data');
var config = require('../config/config');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

function getToken (user) {

    console.log('getToken()');

    var token = jwt.sign(user, config.secret, {
        expiresIn: 86400 // expires in 24 hours
    });

    console.log('token', token);

    return token;
}

function * authenticate () {

    var body = this.request.body;

    this.type = 'application/json';

    try {

        jwt.verify(body.token, config.secret);
        this.status = 200;

    } catch (e) {

        this.status = 401;
    }
}

function * login () {

    var body = this.request.body;

    this.type = 'application/json';

    var users = yield data.users.find({ email : body.email });

    // check there's only 1 user

    console.log(users[0]);

    var token;

    console .log('body.password ', body.password);
    console .log('users.password ', users[0].password);

    token = bcrypt.compareSync(body.password, users[0].password) ? getToken(users[0]) : null;

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
