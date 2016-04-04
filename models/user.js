var Base = require('./base.js');

var User = class extends Base {

    constructor (data) {
        this.id = data.id;
        this.email = data.email;
        this.password = data.password;
    }

};

module.exports = User;