var mongoose = require('mongoose');
var Position = require('../schema/position');
var Race = require('../schema/race');
var Skills = require('../skills');
var passport = require('passport');
var _ = require('underscore');


exports.createGet = function(req, res) {
	var user = req.user;
	if (!user) res.redirect('/login');
	if (user.username!=='admin') res.send(403);
	Position.find()
	.populate('race')
	.exec(function(err, positions){
		if (err) res.send(500, { error: err });
		Race.find()
		.exec(function(err, races){	
			if (err) res.send(500, { error: err });
			res.render('admin/newPosition', {
				title: 'BloodBowlNation: Admin: Create New Position', 
				user: user, 
				races: races, 
				positions: positions, 
				skills: Skills 
			});
		});
	});
};

exports.createPost = function(req, res) {
	var user = req.user;
	if (!user) res.redirect('/login');
	if (user.username!=='admin') res.send(403);
	var newDetails = {
		'name' : req.body.name,
		'race' : req.body.race,
		'movement' : req.body.movement,
		'strength' : req.body.strength,
		'agility' : req.body.agility,
		'armour' : req.body.armour,
		'cost' : req.body.cost,
		'quantity' : req.body.quantity,
		'skillsCategories' : {
			'general' : req.body.generalSkills,
			'agility' : req.body.agilitySkills,
			'strength' : req.body.strengthSkills,
			'passing' : req.body.passingSkills,
			'mutation' : req.body.mutationSkills
		},
		'skills' : req.body.skills,
		'editDate' : new Date().getTime(),
		'editBy': user.id,
		'createDate' : new Date().getTime(),
		'createBy': user.id
	};
	Position.create(newDetails, function (err) {
		if (err) res.send(500, { error: err });
		res.redirect('/admin/position');
	});
};

exports.get = function(req, res) {
	var user = req.user;
	if (!user) res.redirect('/login');
	if (user.username!=='admin') res.send(403);
	var positionId = req.params.id;
	Position.findOne({'_id': positionId})
	.exec(function(err, position){
		if (err) res.send(500, { error: err });
		Race.find()
		.exec(function (err, races) {
			if (err) res.send(500, { error: err });
			res.render('admin/editPosition', { 
				title: 'BloodBowlNation: Admin: Edit Position', 
				user: user, 
				position: position, 
				races: races, 
				skills: Skills 
			});
		});
	});
};

exports.update = function(req, res) {
	var user = req.user;
	if (!user) res.redirect('/login');
	if (user.username!=='admin') res.send(403);
	var positionId = req.params.id;
	var skills = req.body.skills || [];
	var newDetails = {
		'name' : req.body.name,
		'race' : req.body.race,
		'movement' : req.body.movement,
		'strength' : req.body.strength,
		'agility' : req.body.agility,
		'armour' : req.body.armour,
		'cost' : req.body.cost,
		'quantity' : req.body.quantity,
		'skillsCategories' : {
			'general' : req.body.generalSkills,
			'agility' : req.body.agilitySkills,
			'strength' : req.body.strengthSkills,
			'passing' : req.body.passingSkills,
			'mutation' : req.body.mutationSkills
		},
		'skills' : skills,
		'editDate' : new Date().getTime(),
		'editBy': user.id
	};
	Position.findByIdAndUpdate(positionId, newDetails)
	.exec(function (err, position) {
		if (err) res.send(500, { error: err });
		res.redirect('/admin/position');
	});
};

exports.get = function(req, res) {
	var user = req.user;
	var positionId = req.params.id;
	if (!user) res.redirect('/login');
	if (user.username!=='admin') res.send(403);
	Position.findOne({'_id':positionId})
	.exec(function(err, position){
		if (err) res.send(500, { error: err });
		Race.find()
		.exec(function (err, races) {
			if (err) res.send(500, { error: err });
			res.render('admin/editPosition', { 
				title: 'BloodBowlNation: Admin', 
				user: user, 
				position: position, 
				races: races, 
				skills: Skills 
			});
		});
	});
};

exports.getAll = function(req, res){
	var user = req.user;
	if (!user) res.redirect('/login');
	if (user.username!=='admin') res.send(403);
	Position.find()
	.populate('race')
	.exec(function(err, positions){
		if (err) res.send(500, { error: err });
		positions = _.sortBy(positions, 'race.name'); // .... ?
		res.render('admin/positions', { 
			title: 'BloodBowlNation: Admin: Positions', 
			user: user, 
			positions: positions 
		});
	});
};
