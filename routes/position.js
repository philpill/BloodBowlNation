var mongoose = require('mongoose');
var Position = require('../schema/position');
var passport = require('passport');

exports.create = function(req, res) {
	var user = req.user;
	var position = req.body.position;
	var race = req.body.race;
	console.log(position);
	console.log(race);
	var positions;
	if (user && user.username === 'admin') {

		console.log('create');

		Position.create({ 'name' : position, 'race' : race, 'createBy': user.id, 'createDate': new Date().getTime()}, function (err, position) {
			if (err) {
				console.log(err);
			}

			res.redirect('/admin');
		});

	} else {

		res.redirect('/login');
	}
};
