var sequelize = require('sequelize');
var Team = require('./schema/team.js');

var User = sequelize.define('User', {
	username: { type: sequelize.STRING, allowNull: false },
	password: sequelize.TEXT,
	email: sequelize.TEXT
});

User.hasMany(Team, {as: 'Teams'});

module.exports = User;
