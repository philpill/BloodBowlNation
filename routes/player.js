var db = require('../database');

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

	if (user) {

		console.log('create player');

		Team.findOne({ '_id': teamId }, function (err, team) {

			console.log('team');

			if (err) {
				res.render('team', { title: 'BloodBowlNation: Team: not found', team: null, user: user });
			} else {



				Player.find({ '_id': { $in: team.players }}, function(err, players){
					console.log(players);
					var numbers = _.pluck(players, 'number');
					console.log(numbers);
					var sortedNumbers = _.uniq(_.compact(_.sortBy(numbers)));
					console.log(sortedNumbers);

					var numbersLength = sortedNumbers.length;

					var number = numbersLength + 1;

					for (var i = 0; i < numbersLength;i++) {
						console.log('i:' + i);
						if (sortedNumbers[i]!== i+1) {
							number = i+1;
							break;
						}
					}

					console.log(number);

					Position.findOne({ '_id': positionId, 'race': team.race }, function (err, position) {

						console.log('position');

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

	} else {

		res.redirect('/login');
	}
};

exports.createGet = function(req, res) {

	console.log('createGet()');

	var user = req.user;

	var teamId = req.params.id;

	if (user) {

		Team.findOne({'_id' : teamId}, function(err, team){
			if (err) console.log(err);

			Race.find(function(err, races){
				Position.find({'race': team.race}, function(err, positions){
					_.each(positions, function(position){
						race = _.find(races, function(race){
							return position.race == race.id;
						});
						position.raceName = race.name;
					});
					res.render('newPlayer', { title: 'BloodBowlNation: New Player', team: team, positions: positions, user: user });
				});
			});
		});

	} else {

		res.redirect('/login');
	}

};

exports.get = function(req, res) {
	console.log('getPlayer()');
	console.log(req.params.id);

	var playerId = req.params.id;
	var user = req.user;

	if (user) {

		Player.findOne({'_id': playerId}, function(err, player) {
			if (err) console.log(err);
			Race.findOne({'_id': player.race}, function(err, race){
				if (err) console.log(err);
				player.raceName = race.name;
				Position.findOne({'_id': player.position}, function(err, position){
					if (err) console.log(err);
					player.positionName = position.name;
					res.render('player', { title: 'BloodBowlNation: Player: ' + player.name, player: player, user: user });
				});
			});
		});

	} else {

		res.redirect('/login');
	}

};
