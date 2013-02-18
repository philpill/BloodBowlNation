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

exports.positions = function(req, res){
	var user = req.user;
	if (user && user.username === 'admin') {
		var races = [];
		var positions = [];
		Race.find(function(err, races){
			Position.find(function(err, positions){
				_.each(positions, function(position){
					Race.findOne({'_id' : position.race}, function(err, race){
						console.log(position);
						console.log(race);
						position.raceName = race.name;
						res.render('admin/positions', { title: 'BloodBowlNation: Admin', user: user, races: races, positions: positions });
					});
				});
			});
		});
	} else {

		res.redirect('/login');
	}
};

exports.skills = function(req, res){
	var user = req.user;
	if (user && user.username === 'admin') {
		var races = [];
		var skills = [];
		Race.find(function(err, races){
			Skill.find(function(err, skills){
				res.render('admin/skills', {	title: 'BloodBowlNation: Admin', user: user, races: races, skills: skills });
			});
		});
	} else {

		res.redirect('/login');
	}
};

exports.events = function(req, res){
	var user = req.user;
	if (user && user.username === 'admin') {
		var events = [];
		Event.find(function(err, events){
			res.render('admin/events', { title: 'BloodBowlNation: Admin', user: user, events: events });
		});
	} else {

		res.redirect('/login');
	}
};