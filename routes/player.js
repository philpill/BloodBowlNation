var mongoose = require('mongoose');
var Player = require('../schema/player');
var Race = require('../schema/race');
var Position = require('../schema/position');
var Team = require('../schema/team');
var passport = require('passport');

exports.createPost = function(req, res) {

};

exports.createGet = function(req, res) {

	console.log('createGet()');

	var user = req.user;

	var teamId = req.params.id;

	if (user) {

		Team.findOne({'_id' : teamId}, function(err, team){
			if (err) console.log(err);
			Position.find({}, function(err, positions){
				res.render('newPlayer', { title: 'BloodBowlNation: New Player', team: team, positions: positions, user: user });
			});
		});

	} else {

		res.redirect('/login');
	}

};

exports.get = function(req, res) {
	console.log('getPlayer()');
	console.log(req.params.id);

	var playerId = req.params.id;
	var user = req.user;

	if (user) {

		Player.findOne({'_id': playerId}, function(err, player) {
			if (err) console.log(err);
			Race.findOne({'_id': player.race}, function(err, race){
				if (err) console.log(err);
				player.raceName = race;
				Position.findOne({'_id': player.position}, function(err, position){
					if (err) console.log(err);
					player.positionName = position;
					res.render('player', { title: 'BloodBowlNation: Player: ' + player.name, player: player, user: user });
				});
			});
		});

	} else {

		res.redirect('/login');
	}

};