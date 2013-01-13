
(function(req) {

	var routes = req('./routes');

	var game = req('./api/game.js');
	var player = req('./api/player.js');
	var team = req('./api/team.js');
	var race = req('./api/race.js');
	var user = req('./api/user.js');

	var express = req('express');

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


	// Passport session setup.
	//   To support persistent login sessions, Passport needs to be able to
	//   serialize users into and deserialize users out of the session.  Typically,
	//   this will be as simple as storing the user ID when serializing, and finding
	//   the user by ID when deserializing.
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


				// Find the user by username.  If there is no user with the given
				// username, or the password is not correct, set the user to `false` to
				// indicate failure and set a flash message.  Otherwise, return the
				// authenticated `user`.
				findByUsername(username, function(err, user) {
					if (err) { return done(err); }
					if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
					if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
					return done(null, user);
				});

		}
	));

	function ensureAuthenticated(req, res, next) {

		console.log('ensureAuthenticated()');

		if (req.isAuthenticated()) { return next(); }
		res.redirect('/login');
	}

	var database = req('./database');

	var app = express();

	var server = req('http').createServer(app);

	var io = req('socket.io').listen(server);

	server.listen(3000);

	app.configure(function(){
		app.set('views', __dirname + '/views');
		app.set('view engine', 'jade');
		app.set('view options', { layout: false });
		app.use(express.logger());
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(express.cookieParser());

		app.use(express.session({ secret: '4d84rWuEMaWXSPVnAF4t' }));
		app.use(passport.initialize());
		app.use(passport.session());

		app.use(app.router);
		app.use(express.static(__dirname + '/public'));
	});

	app.configure('development', function(){
		app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	});

	app.configure('production', function(){
		app.use(express.errorHandler());
	});

	app.get('/', routes.index);
	app.get('/game', ensureAuthenticated, routes.game);
	app.get('/about', routes.about);
	app.get('/login', routes.login);
	app.get('/logout', routes.logout);
	app.get('/test', routes.test);

	app.get('api/game', game.getAll);
	app.get('api/player', player.index);
	app.get('api/team', team.index);
	app.get('api/race', race.index);

	app.post('api/game', game.create);
	app.post('api/user', user.create);

	app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), routes.userLogin);

	var sockets = req('./sockets').connect(io.sockets);

})(require);