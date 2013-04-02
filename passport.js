
(function(req) {

	var passport = req('passport');
	var LocalStrategy = req('passport-local').Strategy;
	var db = req('./database');

	function userById(id, done) {

		db.user.get(id, function(err, results){

			var user = results[0];

			if (user) {

				return done(null, user);

			} else {

				return done(new Error('User ' + id + ' does not exist'), null);
			}
		});
	}

	function userByUsername(username, password, done) {

		db.user.getByUsername(username, function (err, results) {

			var user = results[0];

			if (err) {
				console.log('\nerr: ' + err + '\n');
				return done(err);
		   	}

			if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }

			if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }

			return done(null, user);
		});
	}

	function onSerializeUser(user, done) {

		done(null, user.id);
	}

	function ensureAuthenticated(req, res, next) {

		if (req.isAuthenticated()) { return next();	}
		res.redirect('/login');
	}

	passport.serializeUser(onSerializeUser);

	passport.deserializeUser(userById);

	passport.use(new LocalStrategy(userByUsername));

	passport.ensureAuthenticated = ensureAuthenticated;

	module.exports = passport;

})(require);
