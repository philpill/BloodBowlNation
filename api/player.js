var mongoose = require('mongoose');
var PlayerSchema = require('../schema/player');

exports.index = function(req, res){

	var player = {

		name : 'player'
	};

	res.send(player);
};