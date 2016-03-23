var positions = require('../config/positions');
var Base = require('./base.js');

var Team = function (id, manager, name, race, players) {

    Base.call(this);

    this.id = id;
    this.name = name;
    this.race = race;
    this.manager = manager;
    this.players = players
}

Team.prototype = Object.create(Base.prototype);
Team.prototype.constructor = Team;

module.exports = Team;