var requires = [
	'EaselJS',
	'BlockEngine',
	'Game',
	'Grid',
	'Helpers',
	'Pitch',
	'Player',
	'Team',
	'UserEvents',
	'Variables',
	'lib/EaselJS/lib/easeljs-0.4.2.min',
	'lib/AStar',
	'lib/jquery.min',
	'lib/modernizr',
	'lib/underscore-min'
];

require.config({
	baseUrl: "js/"
});

requirejs(requires, function(BBN) {

	var socket = io.connect('http://localhost');

	socket.on('init', function (data) {
		console.log(data);
		//socket.emit('my other event', { my: 'data' });
	});

	BBN.init();
});