var mongoose = require('mongoose');
var User = require('../schema/user');
var Team = require('../schema/team');
var Player = require('../schema/player');
var Race = require('../schema/race');
var passport = require('passport');

exports.getAll = function(req, res) {
	var user = req.user;
	if (user) {
		User.findById(user.id)
		.populate('teams')
		.exec(function(err, user){
			var renderObject = { title: '', user: null };
			renderObject.title = 'BloodBowlNation: Teams';
			renderObject.user = user;
			res.render('teams', renderObject);
		});
	} else {
		res.redirect('/login');
	}
};

exports.get = function(req, res) {
	console.log('getTeam()');
	console.log(req.params.id);
	var user = req.user;
	var teamId = req.params.id;
	Team.findOne({ '_id': teamId })
	.populate('players')
	.exec(function (err, team) {
		var renderObject = { title: '', team: null, user: null };
		if (err) {
			res.send(500, { error: err });
		}
		renderObject.title = 'BloodBowlNation: Team: ' + team.name;
		renderObject.team = team;
		renderObject.user = user;
		res.render('team', renderObject);
	});
};

exports.createGet = function(req, res) {
	var user = req.user;
	var races;
	if (user) {
		Race.find()
		.exec(function(err, races){
			var renderObject = {title:'', user: null, races: []};
			if (err) {
				res.send(500, { error: err });
			}
			renderObject.title = 'BloodBowlNation: New Team';
			renderObject.user = user;
			renderObject.races = races;
			res.render('newTeam', renderObject);
		});
	} else {
		res.redirect('/login');
	}
};

exports.createPost = function(req, res) {

	var user = req.user;
	var raceId = req.body.race;
	var teamName = req.body.teamName;

	if (user) {
		User.findById(user._id)
		.exec(function(err, user){
			console.log(user);
			var team = new Team();
			team.name = teamName;
			team.race = raceId;
			team.players = [];
			team.createDate = Date.now();
			team.createBy = user.id;
			team.save(function(err){
				if (err) res.send(500, { error: err });
				user.teams = [].concat(user.teams, [team.id]);
				user.editBy = user.id;
				user.editDate = Date.now();
				user.save(function(err){
					if (err) res.send(500, { error: err });
				});
				res.redirect('/team');
			});
		});

	} else {

		res.redirect('/login');
	}

};
