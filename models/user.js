var Base = require('./base.js');

var User = function (id, email, password) {

    Base.call(this);

    this.id = id;
    this.email = email;
    this.password = password;
};

User.prototype = Object.create(Base.prototype);
User.prototype.constructor = User;

module.exports = User;