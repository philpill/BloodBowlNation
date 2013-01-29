var mongoose = require('mongoose');
var User = require('../schema/user');
var Team = require('../schema/team');
var Player = require('../schema/player');
var passport = require('passport');

exports.index = function(req, res){
	console.log(req.user);
	res.render('index', { title: 'BloodBowlNation', user: req.user });
};

exports.test = function(req, res){
	res.render('test', { title: 'BloodBowlNation Unit Tests' });
};

exports.about = function(req, res) {
  res.render('about', { title: 'BloodBowlNation: About' });
};

exports.game = function(req, res) {
  res.render('game', { title: 'BloodBowlNation: Game' });
};

exports.login = function(req, res) {
  res.render('login', { title: 'BloodBowlNation: Login' });
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

	var teamIds = user.teams;

	console.log(teamIds);

	var teams = [];

	Team.find({ _id: { $in: teamIds } }, function (err, teams) {
		res.render('team', { title: 'BloodBowlNation: Team', teams: teams });
	});
};

exports.createTeam = function(req, res) {

	var team = new Team();

	team.name = 'test';

	var players = [];

	for (i = 0; i < 11; i++) {

		var player = new Player();

		player.name = 'player' + i;

		player.created = Date.now();

		players.push(player.id);

		player.save();
	}

	team.players = players;

	team.created = Date.now();

	team.save();

	var user = req.user;

	user.teams.push(team.id);

	user.save();

	res.redirect('/team');
};