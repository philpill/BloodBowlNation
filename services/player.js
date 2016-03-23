var Player = require('../models/player');
var data = require('../data/players');

/**
 * Create a new player
 * @param {object} data New player data
 * @param {string} data.name Player name
 * @param {string} data.position Player position
 * @param {string} data.race Player race
 * @param {string} data.teamId Team Id
 * @returns {Promise}
 */
function createNewPlayer (userId, data) {
    return data.createNewPlayer(userId, data.name, data.race, data.position, data.teamId).then(function(data) {
        return getNewPlayer(data);
    });
}

function getPlayerById (playerId) {
    return data.getPlayerById(playerId).then(function(data) {
        return getNewPlayer(data);
    });
}

function getNewPlayer (data) {
    return new Player(data.id, data.name, data.race, data.position, data.teamId);
}

module.exports = {
    createNewPlayer : createNewPlayer,
    getPlayerById : getPlayerById
}