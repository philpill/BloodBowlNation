var userService = require('../services/user');

function * create () {

    console.log('users', data.users);

    var body = this.request.body;

    userService.addNewUser(body.email, body.password)
    .then((newUser) => {
        this.type = 'application/json';
        this.body = newUser;
    });
};

module.exports = {
    create : create
};
