var db = require('./data').players;

/**
 * Get a player by id
 * @param {Number} id Player id
 * @returns {Promise}
 */
function getPlayerById(id) {
    return db.findAsync({ _id : id });
}

/**
 * Create a new player
 * @param {object} data New player data
 * @param {string} data.name Player name
 * @param {string} data.position Player position
 * @param {string} data.race Player race
 * @returns {Promise}
 */
function createNewPlayer (data) {
    return db.insertAsync({
        name : data.name,
        position : data.position,
        race : data.race,
        created : Date.now(),
        createdBy : this.state.userId
    });
}

module.exports = {
    getPlayerById : getPlayerById,
    createNewPlayer : createNewPlayer
};