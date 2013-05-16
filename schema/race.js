var sequelize = require('sequelize');
var Position = require('./schema/position.js');

var Race = sequelize.define('Race', {
	name: { type: sequelize.STRING. allowNull: false }
});

Race.hasMany(Position, {as: 'Positions'});

module.exports = Race;
