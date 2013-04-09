var mongoose = require('mongoose');
var Player = require('../schema/player');
var Race = require('../schema/race');
var Position = require('../schema/position');
var Team = require('../schema/team');
var passport = require('passport');
var _ = require('underscore');

exports.createPost = function(req, res) {
	var user = req.user;
	var teamId = req.params.id;
	var playerName = req.body.playerName;
	var positionId = req.body.positionId;

	if (!user) res.redirect('/login');

	console.log('create player');

	Team.findOne({ '_id': teamId }, function (err, team) {

		if (err) {
			res.render('team', { title: 'BloodBowlNation: Team: not found', team: null, user: user });
		} else {

			Player.find({ '_id': { $in: team.players }}, function(err, players){
				var numbers = _.pluck(players, 'number');
				var sortedNumbers = _.uniq(_.compact(_.sortBy(numbers)));

				var numbersLength = sortedNumbers.length;

				var number = numbersLength + 1;

				for (var i = 0; i < numbersLength;i++) {
					if (sortedNumbers[i]!== i+1) {
						number = i+1;
						break;
					}
				}

				Position.findOne({ '_id': positionId, 'race': team.race }, function (err, position) {

					var newDetails = {

						'name' : playerName,
						'number' : number,
						'position' : position.id,
						'movement' : position.movement,
						'strength' : position.strength,
						'agility' : position.agility,
						'armour' : position.armour,
						'cost' : position.cost,
						//'quantity' : quantity,
						//check quantity
						'skills' : position.skills,
						'race' : team.race,
						'editDate' : new Date().getTime(),
						'editBy': user.id,
						'createDate' : new Date().getTime(),
						'createBy': user.id
					};

					Player.create(newDetails, function (err, player) {
						if (err) {
							console.log(err);
						}

						team.players.push(player.id);
						team.save(function(err, team){

							res.redirect('/team/' + team.id);
						});
					});
				});
			});
		}
	});
};

exports.createGet = function(req, res) {

	console.log('createGet()');

	var user = req.user;
	var teamId = req.params.id;

	if (!user) res.redirect('/login');

	Team.findOne({'_id' : teamId})
	.exec(function(err, team){
		if (err) res.send(500, { error: err });
		console.log(team);
		Position.find()
		.where('race').equals(team.race)
		.populate('race')
		.exec(function(err, positions){	
			if (err) res.send(500, { error: err });
			var renderObject = { 
				title: '', 
				team: null, 
				positions: null, 
				user: null 
			}
			renderObject.title = 'BloodBowlNation: New Player';
			renderObject.team = team;
			renderObject.positions = positions;
			renderObject.user = user;
			res.render('newPlayer', renderObject);
		});
	});
};

exports.get = function(req, res) {

	console.log('getPlayer()');
	console.log(req.params.id);

	var playerId = req.params.id;
	var user = req.user;

	if (!user) res.redirect('/login');

	Player.findOne({'_id': playerId})
	.populate('position race')
	.exec(function(err, player) {
		if (err) res.send(500, { error: err });
		var renderObject = { title: '', player: null, user: null };
		renderObject.title = 'BloodBowlNation: Player: ' + player.name;
		renderObject.player = player;
		renderObject.user = user;
		res.render('player', renderObject);
	});
};
