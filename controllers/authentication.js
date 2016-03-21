var securityService = require('../services/security');
var userService = require('../services/user');

function * identify () {
    this.type = 'application/json';
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
    this.type = 'application/json';
    this.status = this.state.userId ? 200 : 401;
}

function * login () {
    this.type = 'application/json';
    var body = this.request.body;
    var response = this;
    yield userService.getUserByEmail(body.email).then(function (user) {
        console.log(user);
        if (user && securityService.isPasswordValid(body.password, user.password)) {
            response.status = 200;
            response.body = securityService.getNewToken(user.id);
        } else {
            response.status = 401;
        }
    }).catch(function (err) {
        response.status = 500;
        response.body = err;
    });
}

// http://www.slideshare.net/derekperkins/authentication-cookies-vs-jwts-and-why-youre-doing-it-wrong

function * validateRegister (next) {
    this.type='application/json';
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
    this.type='application/json';
    var body = this.request.body;
    var response = this;
    var hash = securityService.getPasswordHash(body.password);
    yield userService.addNewUser(body.email, hash).then((user) => {
        response.body = securityService.getNewToken(user.id);
        response.status = 200;
    });
}

var auth = {
    login : login,
    validateRegister : validateRegister,
    register : register,
    authenticate : authenticate,
    identify : identify
};


module.exports = auth;
