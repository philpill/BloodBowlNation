var Player = require('../models/player');
var db = require('../data/players');

/**
 * Create a new player
 * @param {object} data New player data
 * @param {string} data.name Player name
 * @param {string} data.positionId Player position
 * @param {string} data.raceId Player race Id
 * @param {string} data.teamId Team id
 * @returns {Promise}
 */
function addNewPlayer (userId, data) {
    return db.addNewPlayer(userId, data.name, data.raceId, data.positionId, data.teamId);
}

/**
 * Get player by playerId
 * @param {string} Player id to get player
 * @returns {Promise}
 */
function getPlayerById (playerId) {
    return db.getPlayerById(playerId);
}

module.exports = {
    addNewPlayer : addNewPlayer,
    getPlayerById : getPlayerById
}