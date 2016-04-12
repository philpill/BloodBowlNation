var query = require('./data').query;

/**
 * Get a player by id
 * @param {Number} id Player id
 * @returns {Promise}
 */
function getPlayerById(id) {

}

/**
 * Create a new player
 * @param {string} userId User id
 * @param {string} name Player name
 * @param {string} race Player race id
 * @param {string} position Player position id
 * @param {string} teamId Team id
 * @returns {Promise}
 */
function addNewPlayer (userId, playerName, raceId, positionId, teamId) {
    let ps = {
        name : 'addNewPlayer',
        text : 'INSERT INTO player (name, race, position, team, createdBy, createdDate) VALUES ($1, $2, $3, $4, $5, now()) RETURNING *',
        values : [playerName, raceId, positionId, teamId, userId]
    };
    return query(ps).then((results) => {
        if (!results || results.rows.length !== 1) {
            throw new Error('add new player failed');
        }
        return results.rows[0];
    });
}

module.exports = {
    getPlayerById : getPlayerById,
    addNewPlayer : addNewPlayer
};