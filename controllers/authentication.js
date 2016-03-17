var securityService = require('../services/security');
var userService = require('../services/user');

function * identify () {
    this.type = 'application/json';
    var id = this.state.userId;
    userService.getUserById(id).then(function (user) {
        this.status = 200;
        this.body = user;
    }).catch(function (err) {
        this.status = 404;
        this.bdy = err;
    });
}

function * authenticate () {
    this.type = 'application/json';
    this.status = this.state.userId ? 200 : 401;
}

function * login () {
    this.type = 'application/json';
    var body = this.request.body;
    var token = null;
    var response = this;
    yield userService.getUserByEmail(body.email).then(function (user) {
        if (user && securityService.isPasswordValid(body.password, user.password)) {
            token = securityService.getNewToken(user.id);
            response.status = 200;
            response.body = token;
        }
    });
    this.status = 401;
}

// http://www.slideshare.net/derekperkins/authentication-cookies-vs-jwts-and-why-youre-doing-it-wrong

function * register () {
    this.type='application/json';
    var body = this.request.body;
    var response = this;
    yield userService.isEmailAvailable(body.email).then(function (isAvailable) {
        if (isAvailable) {
            var hash = securityService.getPasswordHash(body.password);
            return userService.addNewUser(body.email, hash).then((user) => {
                response.body = securityService.getNewToken(user._id);
                response.status = 200;
            });
        } else {
            response.status = 409;
            response.body = 'email already registered';
        }
    })
}

var auth = {
    login : login,
    register : register,
    authenticate : authenticate,
    identify : identify
};


module.exports = auth;
