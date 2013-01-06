var mongoose = require('mongoose');
var RaceSchema = require('../schema/race');

exports.index = function(req, res){

	var race = {

		name : 'race'
	};

	res.send(race);
};