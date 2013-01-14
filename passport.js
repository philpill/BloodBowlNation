
(function(req) {

	var passport = req('passport');

	var LocalStrategy = require('passport-local').Strategy;

	var users = [
		{ id: 1, username: 'admin', password: 'password', email: 'bob@example.com' }
	];

	function findById(id, fn) {

		console.log('findById()');

		var idx = id - 1;
		if (users[idx]) {
			fn(null, users[idx]);
		} else {
			fn(new Error('User ' + id + ' does not exist'));
		}
	}

	function findByUsername(username, fn) {

		console.log('findByUsername()');

		for (var i = 0, len = users.length; i < len; i++) {
			var user = users[i];
			if (user.username === username) {
				return fn(null, user);
			}
		}
		return fn(null, null);
	}

	passport.serializeUser(function(user, done) {

		console.log('passport.serializeUser()');

		console.log(user);

		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {

		console.log('passport.deserializeUser()');

		console.log(id);

		findById(id, function (err, user) {
			done(err, user);
		});
	});

	passport.use(new LocalStrategy(
		function(username, password, done) {
			findByUsername(username, function(err, user) {
				if (err) { return done(err); }
				if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
				if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
				return done(null, user);
			});
		}
	));

	passport.ensureAuthenticated = function(req, res, next){

		console.log('ensureAuthenticated()');

		if (req.isAuthenticated()) { return next(); }
		res.redirect('/login');
	};

	module.exports = passport;

})(require);