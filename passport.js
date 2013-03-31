
(function(req) {

	var db = req('./database');

	var passport = req('passport');
	var User = require('./schema/user');
	
	var LocalStrategy = require('passport-local').Strategy;

	function userById(id, done) {

		var query = "SELECT * FROM users WHERE id = '" + id + "' LIMIT 1;";

		db.execute(query, function(err, user){
			
			if (user) {

				return done(null, user);

			} else {

				return done(new Error('User ' + id + ' does not exist'), null);
			}
		});
	}

	function userByUsername(username, password, done) {

		var query = "SELECT * FROM users WHERE username = '" + username + "' LIMIT 1;";

		db.execute(query, function(err, user){	

			if (err) { return done(err); }

			if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
		
			if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
			
			return done(null, user);
		});
	}

	function onSerializeUser(user, done) {

		done(null, user.id);
	}

	function ensureAuthenticated(req, res, next) {

		if (req.isAuthenticated()) { return next(); }
		res.redirect('/login');
	}

	passport.serializeUser(onSerializeUser);

	passport.deserializeUser(userById);

	passport.use(new LocalStrategy(userByUsername));

	passport.ensureAuthenticated = ensureAuthenticated;

	module.exports = passport;

})(require);
