var userService = require('../services/user');

function * create () {
    var body = this.request.body;
    var response = this;
    yield userService.addNewUser(body.email, body.password).then(function (newUser) {
        response.type = 'application/json';
        response.status = 200;
        response.body = newUser;
    });
};

module.exports = {
    create : create
};
