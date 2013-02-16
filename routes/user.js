var mongoose = require('mongoose');
var User = require('../schema/user');
var passport = require('passport');

exports.loginPost = function(req, res) {
	console.log('login');
	res.redirect('/');
};

exports.loginGet = function(req, res) {
	var user = req.user;
	res.render('login', { title: 'BloodBowlNation: Login', user: user });
};

exports.logout = function(req, res) {
	req.logout();
	res.redirect('/');
};