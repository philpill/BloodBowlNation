
(function(req) {

	var routes = req('./routes');

	var game = req('./api/game.js');
	var player = req('./api/player.js');
	var team = req('./api/team.js');
	var race = req('./api/race.js');
	var user = req('./api/user.js');

	var express = req('express');

	var database = req('./database');

	var app = express();

	var server = req('http').createServer(app);

	var io = req('socket.io').listen(server);

	server.listen(3000);

	app.configure(function(){
		app.set('views', __dirname + '/views');
		app.set('view engine', 'jade');
		app.set('view options', { layout: false });
		app.use(express.bodyParser());
		app.use(express.methodOverride());
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
	app.get('/test', routes.test);

	app.get('api/game', game.getAll);
	app.get('api/player', player.index);
	app.get('api/team', team.index);
	app.get('api/race', race.index);

	app.post('api/game', game.create);
	app.post('api/user', user.create);

	var sockets = req('./sockets').connect(io.sockets);

})(require);