var passport = require('passport');

exports.index = function(req, res){
	console.log(req.user);
	var user = req.user;
	res.render('index', { title: 'BloodBowlNation', user: user });
};

exports.test = function(req, res){
	res.render('test', { title: 'BloodBowlNation Unit Tests' });
};

exports.about = function(req, res) {
	var user = req.user;
	res.render('about', { title: 'BloodBowlNation: About', user: user });
};

exports.game = function(req, res) {
	var user = req.user;
	res.render('game', { title: 'BloodBowlNation: Game', user: user });
};
