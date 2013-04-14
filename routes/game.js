var mongoose = require('mongoose');
var User = require('../schema/user');
var Game = require('../schema/game');
var Team = require('../schema/team');
var passport = require('passport');
var _ = require('underscore');

exports.getAll = function(req, res) {
	var user = req.user;
	Game.find()
	.populate('hostTeam clientTeam host client')
	.exec(function(err, games){ 
	if (err) res.send(500, { error: err });
			console.log(games);
			res.render('games', {
					title:'BloodBowlNation: Games',
					user: user,
					games: games
			});
	});
};

exports.createGet = function(req, res) {
	var user = req.user;
	if (!user) {
				res.redirect('/login');
		} else {
				User.findById(user._id)
				.populate('teams')
				.exec(function(err, user){
						if (err) res.send(500, {error: err});
						//filter teams not in game
						res.render('newGame', {
								title: 'BloodBowlNation: New Game',
								user: user,
								teams: user.teams		
						});
				});
		}
};

exports.createPost = function(req, res) {
		var user = req.user;
		var name = req.body.gameName;
		var teamId = req.body.team;
		console.log('new game');
		console.log(req.body);
		if (!user) res.redirect('/login');
		//check user against team
		//check team is viable for new game
		var game = new Game();
		game.name = name;
		game.host = user._id;
		game.gameTurn = 0;
		game.hostTeam = teamId;
		game.createBy = user._id;
		game.save(function(err){
				if (err) res.send(500, {error: err});
				res.redirect('/game');
		});
}

exports.get = function(req, res){
	var user = req.user;
	var gameId = req.params.id;
	Game.findById(gameId)
	.populate('clientTeam hostTeam host client')
	.exec(function(err, game){
		if (err) res.send(500, {error: err});
		User.findById(user.id)
		.populate('teams')
		.exec(function(err, user){
			console.log(game);
			console.log(user);
			res.render('game', {
				user: user,
				title: 'BloodBowlNation: Game',
				game: game
			});
		});
	});
}

exports.join = function(req, res) {
	var gameId = req.params.id;
	var user = req.user;
	var team = req.body.team;
	Game.findById(gameId)
	.exec(function(err, game){
		if (err) res.send(500, {error: err});
		User.findById(user._id)
		.exec(function(err, user) {
			if (err) res.send(500, {error: err});
			Team.findById(team)
			.where('_id').in(user.teams)
			.exec(function(err, team){
				if (err) res.send(500, {error: err});
				game.client = user.id;
				game.clientTeam = team.id;
				game.editBy = user.id;
				game.editDate =  new Date();
				game.save(function(err){
					if (err) res.send(500, {error:err}); 
					res.redirect('/game');
				}); 
			});
		});
	});
}




