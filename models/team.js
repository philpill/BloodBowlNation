
var Base = require('./base.js');

var Team = class extends Base {

    constructor(id, manager, name, race, players) {
        this.id = id;
        this.name = name;
        this.race = race;
        this.manager = manager;
        this.players = players;
    }
};

module.exports = Team;