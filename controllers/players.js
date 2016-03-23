var data = require('../data/data');

var positions = require('../config/positions');

var Player = require('../models/player');

/**
 * Create player from given data
 * @param {object} data Player data
 * @param {string} data.name Player name
 * @param {string} data.race Player race
 * @param {string} data.position Player position
 * @param {string} data.team Team to add player to
 * @returns {Promise.<object>} Promise of a player object
 */
function createPlayer (data) {

    var player = new Player(data.name, data.race, data.position, {
        team : data.team
    });

    return player.isValid ? Promise.resolve(player) : Promise.reject('player invalid');
}

function * create () {

    createPlayer(this.request.body)
    .then(data.players.insertAsync)
    .then((player) => {
        this.status = 200;
        this.body = player;
    })
    .catch((error) => {
        this.status = 500;
        this.body = error;
    });
}

module.exports = {
    create : create
};
