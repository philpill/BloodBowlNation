var mongoose = require('mongoose');
var Race = require('../schema/race');
var passport = require('passport');

exports.create = function(req, res) {
	var user = req.user;
	var race = req.body.race;
	console.log(race);
	var races;
	if (user && user.username === 'admin') {

		console.log('create');

		Race.create({ 'name' : race, 'createBy': user.id, 'createDate': new Date().getTime()}, function (err, race) {
			if (err) {
				console.log(err);
			}

			res.redirect('/admin');
		});

	} else {

		res.redirect('/login');
	}
};
