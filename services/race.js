var data = require('../data/races');

/**
 * Get race by id
 * @param {number} Race id to get race
 * @returns {Promise}
 */
function getRaceById (raceId) {
    return data.getRaceById(raceId).then(function(data) {
        return data;
    });
}

/**
 * Get race by name
 * @param {number} Race id to get race
 * @returns {Promise}
 */
function getRaceByName (raceName) {
    return data.getRaceByName(raceName).then(function(data) {
        return data;
    });
}

/**
 * Get all races
 * @returns {Promise}
 */
function getAllRaces () {
    return data.getAllRaces().then(function(data) {
        return data;
    });
}


module.exports = {
    getRaceById : getRaceById,
    getRaceByName : getRaceByName,
    getAllRaces : getAllRaces
}