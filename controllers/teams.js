var data = require('../data/data');
var teamService = require('../services/team');

function * create () {
    this.type = 'application/json';
    var body = this.request.body;
    var response = this;
    if (teamService.isDataValid(body)) {
        yield teamService.createNewTeam(this.state.userId, body).then(function (newTeam) {
            response.status = 200;
            response.body = newTeam;
        });
    } else {
        response.status = 400;
        response.body = 'data invalid';
    }
}

module.exports = {
    create : create
};