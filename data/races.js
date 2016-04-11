var query = require('./data').query;

/**
 * Get a race by race id
 * @param {number} raceId Id of race to return
 * @returns {Promise}
 */
function getRaceById (raceId) {
    let ps = {
        name : 'getRaceById',
        text : 'SELECT * FROM race WHERE id = $1',
        values : [raceId]
    };
    return query(ps).then((results) => {
        if (!results || results.rows.length > 1) {
            throw new Error('get race by id failed');
        }
        return results.rows[0];
    });
}
/**
 * Find a race by name
 * @param {string} raceName
 * @returns {Promise}
 */
function getRaceByName (raceName) {
    let ps = {
        name : 'getRaceByName',
        text : 'SELECT * FROM race WHERE name = $1',
        values : [raceName]
    };
    return query(ps).then((results) => {
        if (!results || results.rows.length > 1) {
            throw new Error('get race by name failed');
        }
        return results.rows[0];
    });
}

/**
 * Get all teams
 * @returns {Promise}
 */
function getAllRaces () {
    let ps = {
        name : 'getAllRaces',
        text : 'SELECT * FROM race'
    };
    return query(ps).then((results) => {
        return results.rows;
    });
}

module.exports = {
    getRaceById : getRaceById,
    getRaceByName : getRaceByName,
    getAllRaces : getAllRaces
};