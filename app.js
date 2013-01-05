
(function(req) {

	var routes = req('./routes');

	var game = req('./api/game.js');
	var player = req('./api/player.js');
	var team = req('./api/team.js');
	var race = req('./api/race.js');
	var user = req('./api/user.js');

	var express = req('express');

	var mongoose = req('mongoose');

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

	app.get('/test', routes.test);

	app.get('/game', game.index);
	app.get('/player', player.index);
	app.get('/team', team.index);
	app.get('/race', race.index);

	app.post('/user', user.newUser);

	var sockets = req('./sockets').connect(io.sockets);

})(require);