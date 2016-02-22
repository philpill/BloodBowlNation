var positions = require('../config/positions');
var Entity = require('./entity.js');

var Team = function (name, race, opts) {

    // validate

    this.name = name;
    this.race = race;
    this.manager = opts.manager;
}

return Team;