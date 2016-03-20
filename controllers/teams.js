var data = require('../data/data');
var teamService = require('../services/team');

function * create () {
    this.type = 'application/json';
    var body = this.request.body;
    var response = this;
    if (teamService.isDataValid(body)) {
        yield teamService.createNewTeam(this.state.userId, body).then(function (newTeam) {
            response.body = newTeam;
        });
    } else {
        response.status = 400;
        response.body = 'data invalid';
    }
}

function * getAll () {
    this.type = 'application/json';
    var body = this.request.body;
    var response = this;
    yield teamService.getAllTeams().then(function (teams) {
        response.body = teams;
    });
}

function * getById () {
    this.type = 'application/json';
    var id = this.params.teamId;
    var body = this.request.body;
    var response = this;
    yield teamService.getTeamById(id).then(function (team) {
        if (team) {
            response.body = team;
        } else {
            response.status = 404;
        }
    });
}

module.exports = {
    create : create,
    getAll : getAll,
    getById : getById
};