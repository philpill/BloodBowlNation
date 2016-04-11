var query = require('./data').query;

/**
 * Get a team by team id
 * @param {Number} teamId Id of team to return
 * @returns {Promise}
 */
function getTeamById (teamId) {
    let ps = {
        name : 'getTeamById',
        text : 'SELECT * FROM team WHERE id = $1',
        values : [teamId]
    };
    return query(ps).then((results) => {
        if (!results || results.rows.length > 1) {
            throw new Error('get team by id failed');
        }
        return results.rows[0];
    });
}

/**
 * Create new team
 * @param {number} userId User Id for manager
 * @param {string} teamName New team name
 * @param {teamRaceId} teamRaceId New team race id
 * @returns {Promise}
 */
function createNewTeam (userId, teamName, teamRaceId) {
    let ps = {
        name : 'createNewTeam',
        text : 'INSERT INTO team (name, race, manager, treasury) VALUES ($1, $2, $3, $4) RETURNING *',
        values : [teamName, teamRaceId, userId, 1000000]
    };
    return query(ps).then((results) => {
        if (!results || results.rows.length !== 1) {
            throw new Error('create new team failed');
        }
        return results.rows[0];
    });
}

/**
 * Find a team by name
 * @param {string} teamName
 * @returns {Promise}
 */
function getTeamByName (teamName) {
    let ps = {
        name : 'getTeamByName',
        text : 'SELECT * FROM team WHERE name = $1',
        values : [teamName]
    };
    return query(ps).then((results) => {
        if (!results || results.rows.length > 1) {
            throw new Error('get team by name failed');
        }
        return results.rows[0];
    });
}

/**
 * Get all teams
 * @returns {Promise}
 */
function getAllTeams () {
    let ps = {
        name : 'getAllTeams',
        text : 'SELECT * FROM team'
    };
    return query(ps).then((results) => {
        return results.rows;
    });
}

/**
 * Get team managed by user
 * @param {string} teamId
 * @param {string} userId
 * @returns {Promise}
 */
function isManager (teamId, userId) {
    return db.findOneAsync({ _id : teamId, manager : userId });
}

module.exports = {
    createNewTeam : createNewTeam,
    getTeamById : getTeamById,
    getAllTeams : getAllTeams,
    getTeamByName : getTeamByName,
    isManager : isManager
};