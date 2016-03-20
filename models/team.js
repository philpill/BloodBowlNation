var positions = require('../config/positions');
var Entity = require('./entity.js');

var Team = function (manager, name, race) {

    // validate

    this.name = name;
    this.race = race;
    this.manager = manager;
}

module.exports = Team;