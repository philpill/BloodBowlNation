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

module.exports = {
    getById : getById
};
