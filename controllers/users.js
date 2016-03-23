var userService = require('../services/user');

function * getAll () {
    this.body = yield userService.getAll();
}

module.exports = {
    getAll : getAll
};
