var db = require('../data/data').teams;
var positions = require('../config/positions');

/**
 * Check race exists in config
 * @param {string} race Value to check against config
 * @returns {boolean} If race exists in config
 */
function isRaceValid (race) {
    var isRaceValid;
    isRaceValid = positions[race] && positions[race].length > 0;
    return isRaceValid;
}

/**
 * Validate name is not empty
 * @param {string} name Value to check
 * @returns {boolean} Is name valid
 */
function isNameValid (name) {
    var isNameValid;
    isNameValid = name !== '';
    return isNameValid;
}

/**
 * Validate data to create new team
 * @param {object} data Data to validate
 * @param {string} data.name Team name to validate
 * @param {string} data.race Race to validate
 * @returns {boolean} IsDataValid
 */
function isDataValid (data) {

    var isValid = true;

    isValid = isValid && isRaceValid(data.race);
    isValid = isValid && isNameValid(data.name);

    return isValid;
}

/**
 * Create team from valid data
 * @param {object} validData data to create team
 * @param {string} validData.name New team name
 * @param {string} validData.race New team race
 * @returns {object} New team
 */
function createNewTeam (team) {
    return db.insert({
        manager : this.state.userId,
        name : team.name,
        race : team.race
    });
}

module.exports = {
    createNewTeam : createNewTeam,
    isDataValid : isDataValid
};