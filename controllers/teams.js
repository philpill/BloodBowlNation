var data = require('../data/data');
var teamService = require('../services/team');

function * create () {
    this.type = 'application/json';

    if (!this.state.userId) {
        this.status = 401;
        this.body = 'need to log in';
    }

    var body = this.request.body;

    if (teamService.isDataValid(body)) {
        var team = yield teamService.createNewTeam(body);
        this.status = 200;
        this.body = team;
    } else {
        this.status = 400;
        this.body = 'data invalid';
    }
}

module.exports = {
    create : create
};
