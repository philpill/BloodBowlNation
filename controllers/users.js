var data = require('../data/data');

function * create () {

    console.log('users', data.users);

    var body = this.request.body;

    data.users.insertAsync({

        name : body.name,
        password : body.password,
        email : body.email

    }).then((newUser) => {

        this.type = 'application/json';
        this.body = newUser;
    });
};

module.exports = {
    create : create
};
