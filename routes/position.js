var mongoose = require('mongoose');
var Position = require('../schema/position');
var passport = require('passport');

exports.create = function(req, res) {
	var user = req.user;
	var position = req.body.position;
	console.log(position);
	var positions;
	if (user && user.username === 'admin') {

		console.log('create');

		Position.create({ 'name' : position, 'createBy': user.id, 'createDate': new Date().getTime()}, function (err, position) {
			if (err) {
				console.log(err);
			}

			res.redirect('/admin');
		});

	} else {

		res.redirect('/admin');
	}
};
