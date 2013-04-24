var mongoose = require('mongoose');
var User = require('../schema/user');
var passport = require('passport');
var Game = require('../schema/game');

exports.getAll = function(req, res) {

	var users = User.find();

	res.send(users);
};

exports.get = function(req, res) {
	console.log('get user');
	var user = req.user;
	if (!user) res.send(401);
	User.findById(user._id, function(error, data){
		if (error) res.json(500, {error: error});
		console.log(data);
		res.json(data);
	});
};

exports.getGames = function(req, res) {
	var user = req.user;
	var userId = req.params.id;
	if (!user) res.json(401);
	if (!userId) userId = user._id;
	Game.find()
	.or({'host': userId}, {'client': userId})
	.populate('hostTeam clientTeam')
	.exec(function(err, games){
		if (err) {
			res.json(500, {error: err});
		} else {
			res.json(games);
		}
	});
};

exports.create = function(req, res){

	var name = req.body.name;

	var password = req.body.password;

	var userData = {

		name : name,
		password : password //todo: bcrypt http://dailyjs.com/2011/02/07/node-tutorial-12/
	};

	var user = new User(userData);

	user.save();

	res.send(user);
};

exports.index = function(req, res){

	console.log('getUser');

	var username = req.user.username;

	console.log(username);

	User.find({ username: username }, function(error, data){

		if(error){

			res.json(error);

		} else {

			res.json(data);
		}
	});
};

exports.team = function(req, res){

	console.log('getTeams');

	var user = req.user;

	console.log(user);

	res.json(user.teams);
};
