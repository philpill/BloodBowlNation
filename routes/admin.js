var mongoose = require('mongoose');
var User = require('../schema/user');
var Team = require('../schema/team');
var Player = require('../schema/player');
var Race = require('../schema/race');
var Position = require('../schema/position');
var passport = require('passport');
var _ = require('underscore');

exports.index = function(req, res){
	var user = req.user;
	if (user && user.username === 'admin') {
		res.render('admin', { title: 'BloodBowlNation: Admin', user: user });
	} else {

		res.redirect('/login');
	}
};

exports.races = function(req, res){
	var user = req.user;
	if (user && user.username === 'admin') {
		var races = [];
		Race.find(function(err, races){
			res.render('admin/races', { title: 'BloodBowlNation: Admin', user: user, races: races });
		});
	} else {

		res.redirect('/login');
	}
};
