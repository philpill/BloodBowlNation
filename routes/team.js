var mongoose = require('mongoose');
var User = require('../schema/user');
var Team = require('../schema/team');
var Player = require('../schema/player');
var Race = require('../schema/race');
var Position = require('../schema/position');
var passport = require('passport');

var Pusher = require('pusher');

exports.getAll = function(req, res) {
	var user = req.user;
	if (!user) {
        res.redirect('/login');
    } else {
	
		var pusher = new Pusher({
			appId: '42184',
			key: 'e67e6af24a68875be966',
			secret: '8d7cc7ac8a731fec56bb'
		});

		pusher.trigger( 'test_channel', 'test_event', { message: "hello world" } );

        User.findById(user.id)
        .populate('teams')
        .exec(function(err, user){ 
            if (err) res.send(500, { error: err });
            res.render('teams', {
                title:'BloodBowlNation: Teams',
                user: user
            });
        });
    }
};

exports.get = function(req, res) {
	var user = req.user;
	var teamId = req.params.id;
	Team.findById(teamId)
	.populate('players')
    //.populate('players.position')
	.exec(function (err, team) {
		if (err) res.send(500, { error: err });
        //horrible hack to populate() grandchildren
        //https://github.com/LearnBoost/mongoose/issues/1377#issuecomment-15911192
        Position.populate(
            team.players, 
            { path: 'position' }, 
            function(err, players) {
		        if (err) res.send(500, { error: err });
                var title = 'BloodBowlNation: Team: ' + team.name;
                res.render('team', {
                    title: title,
                    team: team,
                    user: user
                });
        });
	});
};

exports.createGet = function(req, res) {
	var user = req.user;
	if (!user) res.redirect('/login');
    Race.find()
    .exec(function(err, races){
        if (err) res.send(500, { error: err });
        res.render('newTeam',{
            title:'BloodBowlNation: New Team',
            user: user,
            races: races
        });
    });
};

exports.createPost = function(req, res) {

	var user = req.user;
	var raceId = req.body.race;
	var teamName = req.body.teamName;
	if (!user) res.redirect('/login');
    User.findById(user.id)
    .exec(function(err, user){
        var team = new Team();
        team.name = teamName;
        team.race = raceId;
        team.players = [];
        team.createDate = Date.now();
        team.createBy = user.id;
        team.save(function(err){
            if (err) res.send(500, { error: err });
            user.teams = [].concat(user.teams, [team.id]);
            user.editBy = user.id;
            user.editDate = Date.now();
            user.save(function(err){
                if (err) res.send(500, { error: err });
            });
            res.redirect('/team');
        });
    });
};
