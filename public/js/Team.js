define(['Player'], function(Player) {

	var Team = function (teamName) {

		this.name = teamName;
		this.players = [];
		this.colours = ["rgba(255,0,0,1)"];
		this.score = 0;
		this.scoreZone = 0;
		this.reRolls = 0;
		this.gridHomeSection = 0;
	}

	Team.prototype = {
		name : '',
		players : [],
		colours : [],
		score : 0,
		scoreZone : 0,
		reRolls : 0,
		gridHomeSection : 0,

		tick: function () {

			_.invoke(this.players, 'tick');

			this.render();
		},

		render: function () {

			_.invoke(this.players, 'render');
		}
	}

	return Team;
});