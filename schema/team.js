var sequelize = require('sequelize');
var Player = require('./schema/player.js');
var Race = require('./schema/race.js');

var Team = sequelize.define('Team', {
	name: { type: sequelize.STRING, allowNull: false },
	fanFactor: sequelize.INTEGER,
	treasury: sequelize.INTEGER,
	played: sequelize.INTEGER,
	won: sequelize.INTEGER,
	lost: sequelize.INTEGER,
	drawn: sequelize.INTEGER,
	rerolls: sequelize.INTEGER
});

Team.hasMany(Player, {as: 'Players'});

// doublecheck
// seems technically right, but semantically incorrect
// Team.hasOne(Race);
Race.belongsTo(Team);

module.exports = Team;
