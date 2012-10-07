
(function(req) {

	var Player = req('./Player');

	var Team = function (name) {

		this.name = name;
		this.colours = ["rgba(255,0,0,1)"];
	};

	Team.prototype = {
		name : '',
		players : [],
		colours : [],
		score : 0,
		scoreZone : 0,
		reRolls : 0,
		gridHomeSection : 0,

		test : function() {

			console.log('test');
		}
	};

	module.exports = Team;

})(require);