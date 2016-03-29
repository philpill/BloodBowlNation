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
        players : [],
        created : Date.now(),
        createdBy : userId
    });
}

/**
 * Find a team by name
 * @param {string} teamName
 * @returns {Promise}
 */
function getTeamByName (teamName) {
    return db.findOneAsync({ name : teamName });
}

/**
 * Get all teams
 * @returns {Promise}
 */
function getAllTeams () {
    return db.findAsync({ });
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