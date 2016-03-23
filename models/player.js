var positions = require('../config/positions');
var races = require('../config/races');
var Base = require('./base.js');

/**
 * Check race exists in config
 * @param {string} race Value to check against config
 * @returns {boolean} If race exists in config
 */
function isRaceValid (race) {
    var isRaceValid;
    isRaceValid = races.indexof(race) > -1 && positions[race] && positions[race].length > 0;
    return isRaceValid;
}

/**
 * Check position exists and valid for given race
 * @param {string} race Player race to check position against
 * @param {string} position Position to validate
 * @returns {boolean} If race is valid and position is valid for race
 */
function isPositionValid (race, position) {
    return isRaceValid(race) && positions[race].indexOf(position) > -1;
}

function isNameValid (name) {
    return name !== '';
}

function isValid (name, race, position) {
    return isNameValid(name) && isRaceValid(race) && isPositionValid(position);
}

var Player = function (playerId, name, race, position, teamId) {

    Base.call(this);

    this.isValid = isValid(name, race, position);

    this.id = playerId;
    this.name = name;
    this.race = race;
    this.postion = position;
    this.team = teamId;
};

Player.prototype = Object.create(Base.prototype);
Player.prototype.constructor = Player;

module.exports = Player;
