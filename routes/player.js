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
	var positionId = req.body.position;

    console.log('create')
    console.log(req.body);
    console.log(req.params);

	if (!user) res.redirect('/login');

    function getNextAvailableNumber(takenNumbers) {
        var sortedNumbers = _.uniq(_.compact(_.sortBy(takenNumbers)));
        var numbersLength = sortedNumbers.length;
        var newNumber = numbersLength + 1;
        for (var i = 0; i < numbersLength;i++) {
            if (sortedNumbers[i]!== i+1) {
                newNumber = i+1;
                break;
            }
        }
        return newNumber;
    }

	Team.findOne({ '_id': teamId })
    .populate('players')
    .exec(function (err, team) {
        if (err) res.send(500, { error: err });
        var players = team.players;
        var takenNumbers = _.pluck(players, 'number');
        var newNumber = getNextAvailableNumber(takenNumbers);

        var date = new Date().getTime();
        var userId =  user._id;
        console.log('positionId: ' + positionId);
        Position.findById(positionId)
        .exec(function (err, position) {
            console.log('Position: ');
            console.log(position);
            if (err) res.send(500, { error: err });
            var newDetails = {
                'name' : playerName,
                'number' : newNumber,
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
                'editDate' : date,
                'editBy': userId,
                'createDate' : date,
                'createBy': userId
            };

            Player.create(newDetails, function (err, player) {
                if (err) res.send(500, { error: err });
                team.players = [].concat(team.players, [player]);
                team.editDate = date;
                team.editUser = userId;
                team.save(function(err, team){
                    if (err) res.send(500, { error: err });
                    res.redirect('/team/' + team.id);
                });
            });
        });
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
	var playerId = req.params.id;
	var user = req.user;
	if (!user) res.redirect('/login');
	Player.findOne({'_id': playerId})
	.populate('position race')
	.exec(function(err, player) {
		if (err) res.send(500, { error: err });
        var title =  'BloodBowlNation: Player: ' + player.name;
		res.render('player', {
            title : title,
            player : player,
            user : user,
        });
	});
};
