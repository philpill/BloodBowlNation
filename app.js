
(function(req) {

	var routes = {

		page : req('./routes/page.js'),
		admin : req('./routes/admin.js'),
		player : req('./routes/player.js'),
		race : req('./routes/race.js'),
		user : req('./routes/user.js'),
		team : req('./routes/team.js'),
		position: req('./routes/position.js'),
        game: req('./routes/game.js')
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
	var config = req('./config');

	var app = express();

	var server = req('http').createServer(app);

	var port = config.app.port;
	
	server.listen(port);

	app.configure(function(){
		app.set('views', __dirname + '/views');
		app.set('view engine', 'jade');
		app.set('view options', { layout: false });
		app.use(express.logger());
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(express.cookieParser());

		app.use(express.session({ secret: config.app.secret }));
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
	app.get('/about', routes.page.about);
	app.get('/test', routes.page.test);

	app.get('/game', routes.game.getAll);
	app.get('/game/new', passport.ensureAuthenticated, routes.game.createGet);
	app.post('/game/new', passport.ensureAuthenticated, routes.game.createPost);
	app.get('/game/:id', routes.game.get);
	app.post('/game/:id/join', passport.ensureAuthenticated, routes.game.join);

	app.get('/team', routes.team.getAll);
	app.get('/team/new', routes.team.createGet);
	app.get('/team/:id', routes.team.get);
	app.post('/team/new', passport.ensureAuthenticated, routes.team.createPost);

	app.get('/team/:id/player/new', routes.player.createGet);
	app.post('/team/:id/player/new', passport.ensureAuthenticated, routes.player.createPost);

	app.get('/player/:id', routes.player.get);

	app.get('/login', routes.user.loginGet);
	app.get('/logout', routes.user.logout);
	app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), routes.user.loginPost);

	app.post('/race/new', passport.ensureAuthenticated, routes.race.create);

	app.get('/admin/position', passport.ensureAuthenticated, routes.position.getAll); //get all positions
	app.get('/admin/position/new', passport.ensureAuthenticated, routes.position.createGet); //get new position form
	app.post('/admin/position/new', passport.ensureAuthenticated, routes.position.createPost); //post new position
	app.get('/admin/position/:id', passport.ensureAuthenticated, routes.position.get); //get one position
	app.post('/admin/position/:id', passport.ensureAuthenticated, routes.position.update); //post with id to edit position

	app.get('/admin', passport.ensureAuthenticated, routes.admin.index);

	//should be in race.js?
	app.get('/admin/race', passport.ensureAuthenticated, routes.admin.races);
    
	app.get('/admin/user', passport.ensureAuthenticated, routes.user.getAll);
	app.post('/admin/user/new', passport.ensureAuthenticated, routes.user.createPost);

	app.get('/api/game', passport.ensureAuthenticated, api.game.getAll);
	app.get('/api/player/:id', passport.ensureAuthenticated, api.player.get);
	app.get('/api/team', passport.ensureAuthenticated, api.team.index);
	app.get('/api/race', passport.ensureAuthenticated, api.race.index);
	app.get('/api/user', passport.ensureAuthenticated, api.user.index);
	app.get('/api/user/:id', passport.ensureAuthenticated, api.user.get);
	app.get('/api/user/:id/team', passport.ensureAuthenticated, api.user.team);

})(require);
