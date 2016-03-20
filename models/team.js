var positions = require('../config/positions');
var Entity = require('./entity.js');

var Team = function (id, manager, name, race) {

    this.id = id;
    this.name = name;
    this.race = race;
    this.manager = manager;
}

module.exports = Team;