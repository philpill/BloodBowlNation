var mongoose = require('mongoose');
var passport = require('passport');
var Player = require('../schema/player');

exports.get = function(req, res){
	var playerId = req.params.id;
	var user = req.user;
	if (!user) res.redirect('/login');
	Player.findById(playerId)
	.populate('position race skill')
	.exec(function(err, player) {
		if (err){
			res.json(500, { error: err });
		} else {
			res.json({ player : player });
		}
	});
};
