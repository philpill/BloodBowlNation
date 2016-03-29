var Player = require('../models/player');
var data = require('../data/players');

/**
 * Create a new player
 * @param {object} data New player data
 * @param {string} data.name Player name
 * @param {string} data.position Player position
 * @param {string} data.race Player race
 * @param {string} data.teamId Team id
 * @returns {Promise}
 */
function createNewPlayer (userId, data) {
    return data.createNewPlayer(userId, data.name, data.race, data.position, data.teamId).then(function(data) {
        return getNewPlayer(data);
    });
}

/**
 * Get player by playerId
 * @param {string} Player id to get player
 * @returns {Promise}
 */
function getPlayerById (playerId) {
    return data.getPlayerById(playerId).then(function(data) {
        return getNewPlayer(data);
    });
}

/**
 * Get new player model
 * @param {object} data New player data
 * @param {string} data.id Player id
 * @param {string} data.name Player name
 * @param {string} data.race Player race
 * @param {string} data.position Player position
 * @param {string} data.teamId Team id
 * @returns {Player}
 */
function getNewPlayer (data) {
    return new Player(data.id, data.name, data.race, data.position, data.teamId);
}

module.exports = {
    createNewPlayer : createNewPlayer,
    getPlayerById : getPlayerById
}