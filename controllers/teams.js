var data = require('../data/data');
var teamService = require('../services/team');

function * create () {
    this.type = 'application/json';
    var body = this.request.body;
    var newTeam = yield teamService.createNewTeam(this.state.userId, body);
    this.status = newTeam ? 200 : 400;
    this.body = newTeam ? newTeam : 'data invalid';
}

function * getAll () {
    this.type = 'application/json';
    var teams = yield teamService.getAllTeams();
    this.body = teams ? teams : 'no data';
    this.status = teams && teams.length ? 200 : 204;
}

function * getById () {
    this.type = 'application/json';
    var id = this.params.teamId;
    var body = this.request.body;
    var team = yield teamService.getTeamById(id);
    if (team) {
        this.body = team;
    } else {
        this.status = 404;
    }
}

module.exports = {
    create : create,
    getAll : getAll,
    getById : getById
};