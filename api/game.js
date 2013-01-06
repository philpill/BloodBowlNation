var mongoose = require('mongoose');
var GameSchema = require('../schema/game');

exports.getAll = function(req, res){

	//MyModel.find({ name: /john/i }, 'name friends', function () { })

	var Game = mongoose.model('Game', GameSchema);

	var games = Game.find();

	res.send(games);
};

exports.create = function(req, res){

	var Game = mongoose.model('Game', GameSchema);

	var name = req.body.name;

	var host = req.body.host;

	var created = new Date();

	var data = {

		name : name,
		host : host,
		created : created,
		turn : 0
	};

	var game = new Game(data);

	res.send(game);
};