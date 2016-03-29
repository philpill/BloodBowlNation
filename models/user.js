var Base = require('./base.js');

var User = class extends Base {

    constructor (id, email, password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

};

module.exports = User;