var mongoose = require('mongoose');
var User = require('../schema/user');
var Team = require('../schema/team');
var Player = require('../schema/player');
var passport = require('passport');

exports.index = function(req, res){
	console.log(req.user);
	var user = req.user;
	res.render('index', { title: 'BloodBowlNation', user: user });
};

exports.test = function(req, res){
	res.render('test', { title: 'BloodBowlNation Unit Tests' });
};

exports.about = function(req, res) {
	var user = req.user;
	res.render('about', { title: 'BloodBowlNation: About', user: user });
};

exports.game = function(req, res) {
	var user = req.user;
	res.render('game', { title: 'BloodBowlNation: Game', user: user });
};

exports.login = function(req, res) {
	var user = req.user;
	res.render('login', { title: 'BloodBowlNation: Login', user: user });
};

exports.logout = function(req, res) {
	req.logout();
	res.redirect('/');
};

exports.userLogin = function(req, res) {
	console.log('login');
	res.redirect('/');
};

exports.team = function(req, res) {
	var user = req.user;
	var teams = [];
	if (user) {
		var teamIds = user.teams;
		Team.find({ _id: { $in: teamIds } }, function (err, teams) {
			res.render('teams', { title: 'BloodBowlNation: Team', teams: teams, user: user });
		});
	} else {
		res.render('teams', { title: 'BloodBowlNation: Team', teams: teams });
	}
};

exports.getTeam = function(req, res) {
	console.log('getTeam()');
	console.log(req.params.id);
	var user = req.user;
	var teamId = req.params.id;
	var players = [];

	Team.findOne({ '_id': teamId }, function (err, team) {
		if (err) {
			res.render('team', { title: 'BloodBowlNation: Team: not found', team: null, user: user });
		} else {
			console.log(team);
			Player.find({  _id: { $in: team.players } }, function (err, players){

				res.render('team', { title: 'BloodBowlNation: Team: ' + team.name, team: team, user: user, players: players });
			});

		}
	});
};

exports.newTeam = function(req, res) {

	var user = req.user;

	if (user) {

		res.render('newTeam', { title: 'BloodBowlNation: New Team', user: user });

	} else {

		res.redirect('/login');
	}
};

exports.createTeam = function(req, res) {

	var user = req.user;

	var raceId = req.params.race;

	var teamName = req.params.teamName;

	if (user) {

		var team = new Team();

		var players = [];

		for (i = 0; i < 11; i++) {

			var player = new Player();

			player.name = 'player' + i;

			player.created = Date.now();

			players.push(player.id);

			player.save();
		}

		team.name = teamName;

		team.players = players;

		team.created = Date.now();

		team.save();

		user.teams.push(team.id);

		user.save();

		res.redirect('/team');

	} else {

		res.redirect('/login');
	}

};