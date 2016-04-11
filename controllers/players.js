var playerService = require('../services/player');

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
    var teamId = body.teamId;
    var newPlayer = yield playerService.addNewPlayer(id, body);
    if (newPlayer) {
        this.body = newPlayer;
    } else {
        this.status = 400;
    }
}

module.exports = {
    getById : getById,
    addNewPlayer : addNewPlayer
};
