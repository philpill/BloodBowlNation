var positionService = require('../services/position');

function * getPositionsByRace () {
    var id = this.params.raceId;
    var positions = yield positionService.getPositionsByRace(id);
    if (positions) {
        this.body = positions;
    } else {
        this.status = 500;
    }
}

function * getAllPositions () {
    var positions = yield positionService.getAllPositions();
    if (positions) {
        this.body = positions;
    } else {
        this.status = 500;
    }
}

module.exports = {
    getPositionsByRace : getPositionsByRace,
    getAllPositions : getAllPositions
};
