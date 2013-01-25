
(function(req) {

	var passport = req('passport');
	var mongoose = req('mongoose');
	var User = require('./schema/user');
	var LocalStrategy = require('passport-local').Strategy;

	function findById(id, done) {

		console.log('findById()');

		var user = User.findById(id, function(err, user){

			if (user) {

				return done(null, user);

			} else {

				return done(new Error('User ' + id + ' does not exist'), null);
			}
		});
	}

	function findByUsername(username, password, done) {

		console.log('findByUsername()');

		User.findOne({ username : username }, function (err, user) {

			if (err) { return done(err); }

			if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }

			if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }

			return done(null, user);
		});
	}

	passport.serializeUser(function(user, done) {

		console.log('passport.serializeUser()');

		console.log(user);

		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {

		console.log('passport.deserializeUser()');

		console.log(id);

		findById(id, done);
	});

	passport.use(new LocalStrategy(findByUsername));

	passport.ensureAuthenticated = function(req, res, next){

		console.log('ensureAuthenticated()');

		if (req.isAuthenticated()) { return next(); }
		res.redirect('/login');
	};

	module.exports = passport;

})(require);