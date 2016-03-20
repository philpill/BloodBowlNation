var userService = require('../services/user');

function * create () {
    var body = this.request.body;
    var response = this;
    yield userService.getUserByEmail(body.email).then(function (user) {
        if (user) {
            response.status = 409;
        } else {
            userService.addNewUser(body.email, body.password).then(function (newUser) {
                response.type = 'application/json';
                if (newUser) {
                    response.body = newUser;
                } else {
                    response.body = 'User creation failed'
                    response.status = 500;
                }
            });
        }
    });
};

module.exports = {
    create : create
};
