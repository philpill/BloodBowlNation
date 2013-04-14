var mongoose = require('mongoose');
var User = require('../schema/user');
var Game = require('../schema/game');
var Team = require('../schema/team');
var passport = require('passport');

exports.getAll = function(req, res) {
	var user = req.user;
	Game.find()
	.populate('hostTeam clientTeam host client')
	.exec(function(err, games){ 
		if (err){
			res.json(500, { error: err });
		} else {
			res.json({
				games: games
			});
		}
	});
};
