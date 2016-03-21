var userService = require('../services/user');

function * create () {
    response.type = 'application/json';
    var user = yield userService.addNewUser(body.email, body.password);
    if (user) {
        this.body = user;
    } else {
        this.body = 'User creation failed'
        this.status = 500;
    }
}

module.exports = {
    create : create
};
