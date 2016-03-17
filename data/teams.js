var db = require('./data').teams;

/**
 * Get a team by team id
 * @param {Number} teamId Id of team to return
 * @returns {Promise}
 */
function getTeamById(teamId) {
    return db.findOneAsync({ _id : teamId });
}

/**
 * Create team from valid data
 * @param {object} validData data to create team
 * @param {string} validData.name New team name
 * @param {string} validData.race New team race
 * @returns {Promise}
 */
function createNewTeam (team) {
    return db.insertAsync({
        manager : this.state.userId,
        name : team.name,
        race : team.race,
        created : Date.now(),
        createdBy : this.state.userId
    });
}

module.exports = {
    getTeamById : getTeamById,
    createNewTeam : createNewTeam
};