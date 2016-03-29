var config = require('../config/players');

var Base = require('./base.js');

var Player = class extends Base {

    constructor(playerId, name, race, position, teamId) {
        this.id = playerId;
        this.name = name;
        this.race = race;
        this.postion = position;
        this.team = teamId;
    }

    /**
     * Check race exists in config
     * @param {string} race Value to check against config
     * @returns {boolean} If race exists in config
     */
    _isRaceValid (race) {
        return !!config[race];
    }

    /**
     * Check position exists and valid for given race
     * @param {string} race Player race to check position against
     * @param {string} position Position to validate
     * @returns {boolean} If race is valid and position is valid for race
     */
    _isPositionValid (race, position) {
        return _isRaceValid(race) && !!config[race][position];
    }

    /**
     * Check name is valid
     * @param {string} name Player name to validate
     * @returns {boolean} If name is valid
     */
    _isNameValid (name) {
        return name.length > 4 && name !== '';
    }

    isValid () {
        return _isNameValid(this.name) && _isRaceValid(this.race) && _isPositionValid(this.race, this.position);
    }
};

module.exports = Player;
