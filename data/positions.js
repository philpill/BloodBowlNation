var query = require('./data').query;

/**
 * Get all positions for a particular race
 * @param {number} raceId Race id
 * @returns {Promise}
 */
function getPositionsByRace (raceId) {
    let ps = {
        name : 'getPositionsByRace',
        text : 'SELECT * FROM position WHERE race = $1',
        values : [raceId]
    };
    return query(ps).then((results) => {
        if (!results) {
            throw new Error('get positions by race failed');
        }
        return results.rows;
    });
}

function getAllPositions () {
    let ps = {
        name : 'getAllPositions',
        text : 'SELECT * FROM position'
    };
    return query(ps).then((results) => {
        if (!results) {
            throw new Error('get all positions failed');
        }
        return results.rows;
    });
}

module.exports = {
    getPositionsByRace : getPositionsByRace,
    getAllPositions : getAllPositions
};