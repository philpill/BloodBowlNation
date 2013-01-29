var mongoose = require('mongoose');
var User = require('../schema/user');
var Team = require('../schema/team');
var passport = require('passport');

exports.getAll = function(req, res) {

	var users = User.find();

	res.send(users);
};

exports.get = function(req, res) {

	console.log('get()');

	var id = req.params.id;

	console.log(id);

	User.findById(id, function(error, data){

		if(error){

			res.json(error);

		} else {

			res.json(data);
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