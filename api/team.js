var mongoose = require('mongoose');
var TeamSchema = require('../schema/team');


exports.index = function(req, res){

	var team = {

		name : 'team'
	};

	res.send(team);
};