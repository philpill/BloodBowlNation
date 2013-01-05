var mongoose = require('mongoose');
var UserSchema = require('../schema/user');

exports.newUser = function(req, res){

	var User = db.model('User', UserSchema);

	var name = req.body.name;

	var password = req.body.password;

	var userData = {

		name : name
	};

	var user = new User(userData);

	//save user

	res.send(user);
};