var raceService = require('../services/race');

function * getById () {
    var id = this.params.raceId;
    var race = yield raceService.getRaceById(id);
    if (race) {
        this.body = race;
    } else {
        this.status = 404;
    }
}

function * getByName () {
    var name = this.params.raceName;
    var race = yield raceService.getRaceByName(name);
    if (race) {
        this.body = race;
    } else {
        this.status = 404;
    }
}

function * getAll () {
    var races = yield raceService.getAllRaces();
    if (races && races.length) {
        this.body = races;
    } else {
        this.status = 404;
    }
}

module.exports = {
    getById : getById,
    getByName : getByName,
    getAll : getAll
};
