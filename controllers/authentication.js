var securityService = require('../services/security');
var userService = require('../services/user');

function * identify () {
    var id = this.state.userId;
    var response = this;
    yield userService.getUserById(id).then(function (user) {
        response.status = 200;
        response.body = user;
    }).catch(function (err) {
        response.status = 404;
        response.body = err;
    });
}

function * authenticate () {
    this.status = this.state.userId ? 200 : 401;
}

function * login () {
    var body = this.request.body;
    var user = yield userService.getUserByEmail(body.email);
    if (user && securityService.isPasswordValid(body.password, user.password)) {
        this.status = 200;
        this.body = securityService.getNewToken(user.id);
    } else {
        this.status = 500;
        this.body = 'user login failed';
    }
}

// http://www.slideshare.net/derekperkins/authentication-cookies-vs-jwts-and-why-youre-doing-it-wrong

function * validateRegister (next) {
    var body = this.request.body;
    var isAvailable = yield userService.isEmailAvailable(body.email);
    if (isAvailable) {
        yield next;
    } else {
        this.status = 409;
        this.body = 'email already registered';
    }
}

function * register () {
    var body = this.request.body;
    var hash = securityService.getPasswordHash(body.password);
    var newUser = yield userService.addNewUser(body.name, body.email, hash);
    if (newUser) {
        this.body = securityService.getNewToken(newUser.id);
        this.status = 200;
    } else {
        this.status = 500;
        this.body = 'registration failed';
    }
}

var auth = {
    login : login,
    validateRegister : validateRegister,
    register : register,
    authenticate : authenticate,
    identify : identify
};


module.exports = auth;
