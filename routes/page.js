var mongoose = require('mongoose');
var User = require('../schema/user');
var Team = require('../schema/team');
var Player = require('../schema/player');
var Race = require('../schema/race');
var Position = require('../schema/position');
var Skill = require('../schema/skill');
var Event = require('../schema/event');
var passport = require('passport');
var _ = require('underscore');

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
	var races = [];
	var positions = [];
	var skills = [];
	var events = [];
	Race.find(function(err, races){
		Position.find(function(err, positions){
			Skill.find(function(err, skills){
				Event.find(function(err, events){
					res.render('admin', {
						title: 'BloodBowlNation: Admin',
						user: user,
						races: races,
						positions: positions,
						skills: skills,
						events: events
					});
				});
			});
		});
	});

};
