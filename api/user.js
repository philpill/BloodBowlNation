var mongoose = require('mongoose');
var User = require('../schema/user');
var passport = require('passport');

exports.getAll = function(req, res) {

	var User = mongoose.model('Game', GameSchema);

	var users = User.find();

	res.send(users);
};

exports.create = function(req, res){

	var User = mongoose.model('User', UserSchema);

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