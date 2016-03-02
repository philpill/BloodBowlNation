var securityService = require('../services/security');
var userService = require('../services/user');

function * identify () {
    this.type = 'application/json';
    var id = this.state.userId;
    var user = yield userService.getUserById(id);
    this.status = user ? 200 : 404;
    this.body = user;
}

function * authenticate () {
    console.log('authenticate()');
    this.type = 'application/json';
    console.log(this.state.userId);
    this.status = this.state.userId ? 200 : 401;
}

function * login () {
    this.type = 'application/json';
    var body = this.request.body;
    var user = body.email ? yield userService.getUserByEmail(body.email) : null;
    var token = securityService.isPasswordValid(body.password, user.password) ? securityService.getNewToken(user._id) : null;

    // http://www.slideshare.net/derekperkins/authentication-cookies-vs-jwts-and-why-youre-doing-it-wrong

    this.status = token ? 200 : 401;
    this.body = token;
}

function * register () {
    this.type='application/json';
    var body = this.request.body;
    var user = yield userService.getUserByEmail(body.email);
    if (user) {
        this.status = 409;
        this.body = 'email already registered';
    } else {
        var hash = securityService.getPasswordHash(body.password);
        var user = yield userService.addNewUser(body.email, hash);
        this.status = 200;
        this.body = securityService.getNewToken(user._id);
    }
}

var auth = {
    login : login,
    register : register,
    authenticate : authenticate,
    identify : identify
};


module.exports = auth;
