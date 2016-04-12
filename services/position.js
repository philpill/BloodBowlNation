var db = require('../data/positions');

/**
 * Get positions by race id
 * @param {number} raceId Race id to search for positions
 * @returns {Promise}
 */
function getPositionsByRace (raceId) {
    return db.getPositionsByRace(raceId);
}

function getAllPositions () {
    return db.getAllPositions();
}

module.exports = {
    getPositionsByRace : getPositionsByRace,
    getAllPositions : getAllPositions
};