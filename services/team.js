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
 * Check if team name is already taken
 * @param {string} teamName Name to check
 * @returns {boolean} Is name currently in use
 */
function isNameUnique (teamName) {
    return db.getTeamByName(teamName).then(function (team) {
        return !team;
    });
}

/**
 * Validate data to create new team
 * @param {object} data Data to validate
 * @param {string} data.name Team name to validate
 * @param {string} data.race Race to validate
 * @returns {boolean} IsDataValid
 */
function isDataValid (data) {
    return isValid && isRaceValid(data.race) && isNameValid(data.name);
}

/**
 * Create team from valid data
 * @param {string} userId owner of team
 * @param {object} validData data to create team
 * @param {string} validData.name New team name
 * @param {string} validData.race New team race
 * @returns {Promise} New team
 */
function createNewTeam (userId, newTeam) {
    return isDataValid(newTeam) ? db.createNewTeam(userId, newTeam.name, newTeam.race).then(function (newTeam) {
        return newTeam ? new Team(newTeam._id, userId, newTeam.name, newTeam.race, newTeam.players) : null;
    }) : null;
}

/**
 * Get team by team id
 * @param {number} id Team id to search for team
 * @returns {object.<Team>} Team data
 */
function getTeamById (id) {
    return db.getTeamById(id).then(function (team) {
        return team ? new Team(team._id, team.manager, team.name, team.race, team.players) : null;
    });
}

/**
 * Get all teams
 * @returns {Array.<Team>}
 */
function getAllTeams () {
    return db.getAllTeams().then(function (teams) {
        return teams.map(function (team) {
            return new Team(team._id, team.manager, team.name, team.race, team.players);
        });
    });
}

/**
 * Add player to team
 * @param {number} teamId
 * @param {number} playerId
 * @returns {object.<Team>} Updated team
 */
function addPlayerToTeam (teamId, playerId) {
    return db.addPlayerToTeam(teamId, playerId).then(function (team) {
        return new Team(team._id, team.manager, team.name, team.race, team.players);
    });
}

module.exports = {
    createNewTeam : createNewTeam,
    getTeamById : getTeamById,
    isNameUnique : isNameUnique,
    getAllTeams : getAllTeams,
    addPlayerToTeam : addPlayerToTeam
};