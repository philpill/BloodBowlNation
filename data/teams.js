var db = require('./data').teams;

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
        console.log('getTeamById()');
        console.log(teamId);
        console.log(results);
        return results.rows;
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
        console.log('createNewTeam()');
        console.log(results);
        return results.rows;
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
        return results.rows;
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
 * Add player to team
 * @param {string} teamId
 * @param {string} playerId
 * @returns {Promise}
 */
function addPlayerToTeam (teamId, playerId) {
    return db.updateAsync({ _id: teamId }, { $push: { players: playerId } }, { returnUpdatedDocs : true });
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