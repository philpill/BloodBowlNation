var requires = ['js/BloodBowlNation.EaselJS',
	'js/BloodBowlNation.Entities',
	'js/BloodBowlNation.Game',
	'js/BloodBowlNation.Grid',
	'js/BloodBowlNation.Helpers',
	'js/BloodBowlNation.Pitch',
	'js/BloodBowlNation.RenderEngine',
	'js/BloodBowlNation.Variables',
	'js/lib/EaselJS/lib/easel',
	'js/lib/AStar',
	'js/lib/jquery-1.7.1.min',
	'js/lib/modernizr'];

require(requires, function() {
	$(BBN.init());	
});