var playerService = require('../services/player');
var teamService = require('../services/team');

function * getById () {
    var id = this.params.playerId;
    var player = yield playerService.getPlayerById(id);
    if (player) {
        this.body = player;
    } else {
        this.status = 404;
    }
}

function * addNewPlayer () {
    var id = this.state.userId;
    var body = this.request.body;
    var newPlayer = yield playerService.addNewPlayer(id, body);
    if (newPlayer) {
        this.body = newPlayer;
    } else {
        this.status = 400;
    }
}

function * validateAddNewPlayer (next) {
    var teamId = this.params.teamId;
    var body = this.request.body;
    console.log(body);
    var isManager = yield teamService.isManager(teamId, this.state.userId);
    if (isManager) {
        yield next;
    } else {
        this.status = 400;
        this.body = 'data invalid';
    }
}

function * getPlayersByTeamId () {
    var id = this.params.teamId;
    var players = yield playerService.getPlayersByTeamId(id);
    if (players) {
        this.body = players;
    } else {
        this.status = 204;
    }
}

module.exports = {
    getById : getById,
    addNewPlayer : addNewPlayer,
    validateAddNewPlayer : validateAddNewPlayer,
    getPlayersByTeamId : getPlayersByTeamId
};
