var db = require('./data').teams;

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
        return results.rows;
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
        return results.rows;
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