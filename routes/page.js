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
