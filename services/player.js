var db = require('../data/data').players;
var positions = require('../config/positions');
var Player = require('../models/player');
var playerData = require('../data/players');
var Promise = require('bluebird');


/**
 * Create a new player
 * @param {object} data New player data
 * @param {string} data.name Player name
 * @param {string} data.position Player position
 * @param {string} data.race Player race
 * @returns {Promise}
 */
function createNewPlayer (data) {

    return playerData.createNewPlayer(data).then(function(newPlayer) {

        return new Player(newPlayer.id, newPlayer.name, newPlayer.race, newPlayer.position);
    });

}

module.exports = {
    createNewPlayer : createNewPlayer
}