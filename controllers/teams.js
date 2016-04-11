var teamService = require('../services/team');
var playerService = require('../services/player');

var config = require('../config/players');

function * create () {
    var body = this.request.body;
    var newTeam = yield teamService.createNewTeam(this.state.userId, body);
    if (newTeam) {
        this.body = newTeam;
    } else {
        this.status = 400;
    }
}

function * validateCreate (next) {
    var body = this.request.body;
    var teamName = body.name;
    var isNameUnique = yield teamService.isNameUnique(teamName);
    if (isNameUnique) {
        yield next;
    } else {
        this.status = 409;
        this.body = 'team name already registered';
    }
}

function * getAll () {
    var teams = yield teamService.getAllTeams();
    if (teams && teams.length) {
        this.body = teams;
    } else {
        this.status = 204;
    }
}

function * getById () {
    var id = this.params.teamId;
    var body = this.request.body;
    var team = yield teamService.getTeamById(id);
    if (team) {
        this.body = team;
    } else {
        this.status = 404;
    }
}

function * validateAddNewPlayer (next) {
    var teamId = this.params.teamId;
    var body = this.request.body;
    var isManager = yield teamService.isManager(teamId, this.state.userId);
    if (isManager && config[body.race] && config[body.race][body.position]) {
        yield next();
    } else {
        this.status = 400;
        this.body = 'data invalid';
    }
}

module.exports = {
    create : create,
    validateCreate : validateCreate,
    getAll : getAll,
    getById : getById,
    validateAddNewPlayer : validateAddNewPlayer
};