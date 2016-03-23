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
 * @param {string} userId User id
 * @param {string} name Player name
 * @param {string} race Player race
 * @param {string} position Player position
 * @param {string} teamId Team id
 * @returns {Promise}
 */
function createNewPlayer (userId, name, race, position, teamId) {
    return db.insertAsync({
        name : name,
        position : position,
        race : race,
        team : teamId,
        created : Date.now(),
        createdBy : userId
    });
}

module.exports = {
    getPlayerById : getPlayerById,
    createNewPlayer : createNewPlayer
};