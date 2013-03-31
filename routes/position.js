var db = require('../database');

var Position = require('../schema/position');
var Race = require('../schema/race');
var Skills = require('../skills');

var passport = require('passport');
var _ = require('underscore');


exports.createGet = function(req, res) {
	var user = req.user;
	var positions;
	var race;
	if (user && user.username === 'admin') {
		Race.find(function(err, races){
			Position.find(function(err, positions){
				_.each(positions, function(position){
					race = _.find(races, function(race){
						return position.race == race.id;
					});
					position.raceName = race.name;
				});
				console.log(Skills);
				res.render('admin/newPosition', { title: 'BloodBowlNation: Admin', user: user, races: races, positions: positions, skills: Skills });
			});
		});

	} else {

		res.redirect('/login');
	}
};

exports.createPost = function(req, res) {
	var user = req.user;

	if (user && user.username === 'admin') {

		var positionId = req.params.id;

		var name = req.body.name;
		var race = req.body.race;
		var movement = req.body.movement;
		var strength = req.body.strength;
		var agility = req.body.agility;
		var armour = req.body.armour;
		var cost = req.body.cost;
		var quantity = req.body.quantity;
		var generalSkills = req.body.generalSkills;
		var agilitySkills = req.body.agilitySkills;
		var strengthSkills = req.body.strengthSkills;
		var passingSkills = req.body.passingSkills;
		var mutationSkills = req.body.mutationSkills;
		var skills = req.body.skills;

		console.log('create position');
		console.log(skills);

		var newDetails = {

			'name' : name,
			'race' : race,
			'movement' : movement,
			'strength' : strength,
			'agility' : agility,
			'armour' : armour,
			'cost' : cost,
			'quantity' : quantity,
			'skillsCategories' : {
				'general' : generalSkills,
				'agility' : agilitySkills,
				'strength' : strengthSkills,
				'passing' : passingSkills,
				'mutation' : mutationSkills
			},
			'skills' : skills,
			'editDate' : new Date().getTime(),
			'editBy': user.id,
			'createDate' : new Date().getTime(),
			'createBy': user.id
		};

		Position.create(newDetails, function (err, position) {
			if (err) {
				console.log(err);
			}

			res.redirect('/admin/position');
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
			Position.findOne({ '_id': positionId }, function (err, position) {
				res.render('admin/editPosition', { title: 'BloodBowlNation: Admin', user: user, position: position, races: races, skills: Skills });

			});
		});
	} else {

		res.redirect('/login');
	}
};

exports.update = function(req, res) {
	var user = req.user;

	var positionId = req.params.id;

	var name = req.body.name;
	var race = req.body.race;
	var movement = req.body.movement;
	var strength = req.body.strength;
	var agility = req.body.agility;
	var armour = req.body.armour;
	var cost = req.body.cost;
	var quantity = req.body.quantity;
	var generalSkills = req.body.generalSkills;
	var agilitySkills = req.body.agilitySkills;
	var strengthSkills = req.body.strengthSkills;
	var passingSkills = req.body.passingSkills;
	var mutationSkills = req.body.mutationSkills;
	var skills = req.body.skills || [];

	var newDetails = {

		'name' : name,
		'race' : race,
		'movement' : movement,
		'strength' : strength,
		'agility' : agility,
		'armour' : armour,
		'cost' : cost,
		'quantity' : quantity,
		'skillsCategories' : {
			'general' : generalSkills,
			'agility' : agilitySkills,
			'strength' : strengthSkills,
			'passing' : passingSkills,
			'mutation' : mutationSkills
		},
		'skills' : skills,
		'editDate' : new Date().getTime(),
		'editBy': user.id
	};

	if (user && user.username === 'admin') {

		Position.findByIdAndUpdate(positionId, newDetails, function (err, position) {
			if (err) {
				console.log(err);
			}

			res.redirect('/admin/position');
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
			Position.findOne({ '_id': positionId }, function (err, position) {
				console.log(position);
				res.render('admin/editPosition', { title: 'BloodBowlNation: Admin', user: user, position: position, races: races, skills: Skills });

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
					race = _.find(races, function(race){
						return position.race == race.id;
					});
					position.raceName = race.name;
				});
				positions = _.sortBy(positions, 'raceName');
				res.render('admin/positions', { title: 'BloodBowlNation: Admin', user: user, positions: positions });
			});
		});
	} else {

		res.redirect('/login');
	}
};
