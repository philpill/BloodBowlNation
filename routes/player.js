var mongoose = require('mongoose');
var Player = require('../schema/player');
var Race = require('../schema/race');
var passport = require('passport');

exports.createPost = function(req, res) {

};

exports.createGet = function(req, res) {

};

exports.get = function(req, res) {
	console.log('getPlayer()');
	console.log(req.params.id);

	var playerId = req.params.id;
	var user = req.user;

	if (user) {

		Player.findOne({'_id': playerId}, function(err, player) {

			if (err) {
				console.log(err);
			}

			res.render('player', { title: 'BloodBowlNation: Player: ' + player.name, player: player, user: user });
		});

	} else {

		res.redirect('/login');
	}

};