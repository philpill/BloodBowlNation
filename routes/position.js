var mongoose = require('mongoose');
var Position = require('../schema/position');
var Race = require('../schema/race');
var passport = require('passport');
var _ = require('underscore');


exports.edit = function(req, res) {
	var user = req.user;

	var positions;
	var race;

	if (user && user.username === 'admin') {

		Race.find(function(err, races){
			Position.find(function(err, positions){
				_.each(positions, function(position){
					race = _.find(races, function(race){
						return position.race === race.id;
					});
					position.raceName = race.name;
				});
				res.render('admin/positions', { title: 'BloodBowlNation: Admin', user: user, races: races, positions: positions });
			});
		});

	} else {

		res.redirect('/login');
	}
};

exports.update = function(req, res) {
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

exports.get = function(req, res) {
	var user = req.user;
	var positionId = req.params.id;
	if (user && user.username === 'admin') {
		var races = [];
		var positions = [];
		var race;
		var position;
		Race.find(function(err, races){
			Position.find(function(err, positions){
				_.each(positions, function(position){
					race = _.find(races, function(race){
						return position.race === race.id;
					});
					position.raceName = race.name;
				});
				position = _.find(positions, function(position){

					return position.id === positionId;
				});
				res.render('admin/positions', { title: 'BloodBowlNation: Admin', user: user, position: position, races: races, positions: positions });

			});
		});
	} else {

		res.redirect('/login');
	}
};

exports.getAll = function(req, res){
	var user = req.user;
	if (user && user.username === 'admin') {
		var races = [];
		var positions = [];
		Race.find(function(err, races){
			Position.find(function(err, positions){
				_.each(positions, function(position){
					Race.findOne({'_id' : position.race}, function(err, race){
						console.log(position);
						console.log(race);
						position.raceName = race.name;
						res.render('admin/positions', { title: 'BloodBowlNation: Admin', user: user, races: races, positions: positions });
					});
				});
			});
		});
	} else {

		res.redirect('/login');
	}
};