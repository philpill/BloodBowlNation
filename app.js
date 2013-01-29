
(function(req) {

	var routes = req('./routes');

	var game = req('./api/game.js');
	var player = req('./api/player.js');
	var team = req('./api/team.js');
	var race = req('./api/race.js');
	var user = req('./api/user.js');
	var express = req('express');
	var passport = req('./passport');
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
	app.get('/game', routes.game);
	app.get('/about', routes.about);
	app.get('/login', routes.login);
	app.get('/logout', routes.logout);
	app.get('/test', routes.test);
	app.get('/team', routes.team);
	app.get('/team/create', routes.createTeam);

	app.get('/api/game', passport.ensureAuthenticated, game.getAll);
	app.get('/api/player', passport.ensureAuthenticated, player.index);
	app.get('/api/team', passport.ensureAuthenticated, team.index);
	app.get('/api/race', passport.ensureAuthenticated, race.index);
	app.get('/api/user', passport.ensureAuthenticated, user.index);
	app.get('/api/user/:id', passport.ensureAuthenticated, user.get);
	app.get('/api/user/:id/team', passport.ensureAuthenticated, user.team);

	app.post('/api/game', passport.ensureAuthenticated, game.create);
	app.post('/api/user', passport.ensureAuthenticated, user.create);

	app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), routes.userLogin);

	var sockets = req('./sockets').connect(io.sockets);

})(require);