
/**
 * Module dependencies.
 */

var routes = require('./routes');

var express = require('express');

var app = express();

var server = require('http').createServer(app);

var io = require('socket.io').listen(server);

server.listen(3000);

// Configuration

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

// Routes

// app.get('/', routes.index);
// app.get('/test', routes.test);

// var port = process.env.PORT || 3000;

// app.listen(port, function(){
//   console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
// });

app.get('/', routes.index);

app.get('/test', routes.test);


io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
