var db = require('./data').teams;

/**
 * Get a team by team id
 * @param {Number} teamId Id of team to return
 * @returns {Promise}
 */
function getTeamById (teamId) {
    return db.findOneAsync({ _id : teamId });
}

/**
 * Create new team
 * @param {string} userId User Id for manager
 * @param {string} teamName New team name
 * @param {string} teamRace New team race
 * @returns {Promise}
 */
function createNewTeam (userId, teamName, teamRace) {
    return db.insertAsync({
        manager : userId,
        name : teamName,
        race : teamRace,
        created : Date.now(),
        createdBy : userId
    });
}

/**
 * Get all teams
 * @returns {Promise}
 */
function getAllTeams () {
    return db.findAsync({ });
}

module.exports = {
    getTeamById : getTeamById,
    createNewTeam : createNewTeam,
    getAllTeams : getAllTeams
};