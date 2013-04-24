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
			res.json(games);
		}
	});
};


exports.get = function(req, res) {
	var user = req.user;
	var gameId = req.params.id;
	if (!user) res.json(401);
	if (!gameId) res.json(204);
	Game.findOne()
	.or({'host': user._id}, {'client': user._id})
	.or({'clientTeam': gameId}, {'hostTeam': gameId})
	.populate('hostTeam clientTeam host client')
	.exec(function(err, game){ 
		if (err){
			res.json(500, { error: err });
		} else {
			res.json(game);
		}
	});
};
