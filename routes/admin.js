var sequelize = require("sequelize")
var User = require('../schema/user');
var Team = require('../schema/team');
var Player = require('../schema/player');
var Race = require('../schema/race');
var Position = require('../schema/position');
var User = require('../schema/user');
var passport = require('passport');

exports.index = function(req, res){
	var user = req.user;
	var user = req.user;
	if (!user) res.redirect('/login');
    if (user.username!=='admin') res.send(401);
	res.render('admin', { 
        title: 'BloodBowlNation: Admin', 
        user: user 
    });
};

exports.races = function(req, res){
	var user = req.user;
	if (!user) res.redirect('/login');
    if (user.username!=='admin') res.send(401);
    Race.find()
    .exec(function(err, races){
        if (err) res.send(500, {error: err});
        res.render('admin/races', {
            title: 'BloodBowlNation: Admin: races', 
            user: user, 
            races: races 
        });
    });
};

