
(function(req) {

	var routes = {

		page : req('./routes/page.js'),
		player : req('./routes/player.js'),
		race : req('./routes/race.js'),
		user : req('./routes/user.js'),
		team : req('./routes/team.js'),
		position: req('./routes/position.js')
	};

	var api = {

		game: req('./api/game.js'),
		player: req('./api/player.js'),
		team: req('./api/team.js'),
		race: req('./api/race.js'),
		user: req('./api/user.js')
	};

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

	app.get('/', routes.page.index);
	app.get('/game', routes.page.game);
	app.get('/about', routes.page.about);
	app.get('/test', routes.page.test);
	app.get('/admin', passport.ensureAuthenticated, routes.page.admin);

	app.get('/team', routes.team.getAll);
	app.get('/team/new', routes.team.createGet);
	app.get('/team/:id', routes.team.get);
	app.post('/team/new', passport.ensureAuthenticated, routes.team.createPost);

	app.get('/team/:id/player/new', routes.player.createGet);

	app.get('/player/:id', routes.player.get);

	app.get('/login', routes.user.loginGet);
	app.get('/logout', routes.user.logout);
	app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), routes.user.loginPost);

	app.post('/race/new', passport.ensureAuthenticated, routes.race.create);

	app.post('/position/new', passport.ensureAuthenticated, routes.position.create);

	app.get('/api/game', passport.ensureAuthenticated, api.game.getAll);
	app.get('/api/player', passport.ensureAuthenticated, api.player.index);
	app.get('/api/team', passport.ensureAuthenticated, api.team.index);
	app.get('/api/race', passport.ensureAuthenticated, api.race.index);
	app.get('/api/user', passport.ensureAuthenticated, api.user.index);
	app.get('/api/user/:id', passport.ensureAuthenticated, api.user.get);
	app.get('/api/user/:id/team', passport.ensureAuthenticated, api.user.team);

	app.post('/api/game', passport.ensureAuthenticated, api.game.create);
	app.post('/api/user', passport.ensureAuthenticated, api.user.create);

	var sockets = req('./sockets').connect(io.sockets);

})(require);