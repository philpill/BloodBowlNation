var mongoose = require('mongoose');
var User = require('../schema/user');
var Team = require('../schema/team');
var Player = require('../schema/player');
var Race = require('../schema/race');
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

exports.admin = function(req, res) {
	var user = req.user;
	var races;
	Race.find(function(err, races){

		if (err) {
			console.log(races);
			races = [];
		}

		res.render('admin', { title: 'BloodBowlNation: Admin', user: user, races: races, positions: [], skills: [], events: []});
	});

};

exports.createRace = function(req, res) {
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

		res.redirect('/admin');
	}
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

exports.newPlayer = function(req, res) {

};

exports.getPlayer = function(req, res) {
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

	var races;

	if (user) {

		Race.find(function(err, races){

			if (err) {
				console.log(races);
				races = [];
			}

			res.render('newTeam', { title: 'BloodBowlNation: New Team', user: user, races: races });
		});

	} else {

		res.redirect('/login');
	}
};

exports.createTeam = function(req, res) {

	var user = req.user;

	var raceId = req.body.race;

	var teamName = req.body.teamName;

	if (user) {

		var team = new Team();

		var players = [];

		for (i = 0; i < 11; i++) {

			var player = new Player();

			player.name = 'player' + i;

			player.movement = 8;

			player.strength = 3;

			player.agility = 3;

			player.armour = 7;

			player.skills = [];

			player.createDate = Date.now();

			player.createBy = user.id;

			players.push(player.id);

			player.save(function(err, player){

				if (err) { console.log(err); }

				console.log(player);
			});
		}

		team.name = teamName;

		team.players = players;

		team.createDate = Date.now();

		console.log(user.id);

		team.createBy = user.id;

		console.log(team);

		team.save(function(err, team){

			console.log(team);

			if (err) {

				console.log(err);
			}

			console.log('user');

			console.log(user);

			user.teams = [].concat(user.teams, [team.id]);

			user.save(function(err, user){

				console.log(user);

				if (err) {

					console.log(err);
				}
			});

			res.redirect('/team');
		});

	} else {

		res.redirect('/login');
	}

};