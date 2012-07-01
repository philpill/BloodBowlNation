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
	BBN.init();	
});