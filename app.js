
(function(req) {

	var routes = req('./routes');

	var express = req('express');

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

	var sockets = req('./sockets').bindEvents(io.sockets);

})(require);