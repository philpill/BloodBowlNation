var db = require('../data/teams');
var positions = require('../config/positions');
var Team = require('../models/team');

/**
 * Check race exists in config
 * @param {string} race Value to check against config
 * @returns {boolean} If race exists in config
 */
function isRaceValid (race) {
    return positions[race] && positions[race].length > 0;
}

/**
 * Validate name is not empty
 * @param {string} name Value to check
 * @returns {boolean} Is name valid
 */
function isNameValid (name) {
    return name !== '';
}

/**
 * Validate data to create new team
 * @param {object} data Data to validate
 * @param {string} data.name Team name to validate
 * @param {string} data.race Race to validate
 * @returns {boolean} IsDataValid
 */
function isDataValid (data) {
    return isRaceValid(data.race) && isNameValid(data.name);
}

/**
 * Create team from valid data
 * @param {object} userId owner of team
 * @param {object} validData data to create team
 * @param {string} validData.name New team name
 * @param {string} validData.race New team race
 * @returns {object.<Team>} New team
 */
function createNewTeam (userId, newTeam) {
    return db.createNewTeam(userId, newTeam.name, newTeam.race).then(function (newTeam) {
        return newTeam ? new Team(userId, newTeam.name, newTeam.race) : null;
    });
}

/**
 * Get team by team id
 * @param {number} id Team id to search for team
 * @returns {object.<Team>} Team data
 */
function getTeamById (id) {
    return db.getTeamById(id);
}

/**
 * Get all teams
 * @returns {Array.<Team>}
 */
function getAllTeams () {
    return db.find({});
}

/**
 * Create a new player and add new player to team
 * @param {number} teamId
 * @param {object.<Player>} player New player data
 * @param {string} player.name New player name
 * @param {string} player.race New player race
 * @param {string} player.position New player position
 * @returns {object.<Team>} Updated team
 */
function addNewPlayerToTeam (teamId, player) {
    // create new player
    // get new player id
    // update team with new player id
    // return team
}

module.exports = {
    createNewTeam : createNewTeam,
    isDataValid : isDataValid,
    getTeamById : getTeamById,
    getAllTeams : getAllTeams,
    addNewPlayerToTeam : addNewPlayerToTeam
};