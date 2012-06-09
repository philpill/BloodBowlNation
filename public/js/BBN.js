var requires = [
	'BBN.EaselJS',
	'BBN.BlockEngine',
	'BBN.Game',
	'BBN.Grid',
	'BBN.Helpers',
	'BBN.Pitch',
	'BBN.Player',
	'BBN.RenderEngine',
	'BBN.Team',
	'BBN.UserEvents',
	'BBN.Variables',
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