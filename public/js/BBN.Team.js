define(['BBN.Player'], function(Player) {

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
		name: {
			get: function() { return this._name; },
			set: function(value) { 
				if (typeof value === "string") {
					this._name = value;
				}
			}
		},
		players: {
			get: function() { return this._players; },
			set: function(value) { 
				if (value instanceof Array) {
					this._players = value; 
				}
			}
		},
		colours: {
			get: function() { return this._colours; },
			set: function(value) { 
				if (value instanceof Array) {
					this._colours = value; 
				}		
			}
		},
		score: {
			get: function() { return this._score; },
			set: function(value) { 
				if (typeof value === "number") {
					this._score = value; 
				}
			}
		},
		scoreZone: {
			get: function() { return this._scoreZone; },
			set: function(value) {
				if (typeof value === "number") {
					this._scoreZone = value;
				}
			}
		},
		reRolls: {
			get: function() { return this._reRolls; },
			set: function(value) { 
				if (typeof value === "number") {
					this._reRolls = value;
				}
			}
		},
		gridHomeSection: {
			get: function() { return this._gridHomeSection; },
			set: function(value) { 
				if (typeof value === "number") {
					this._gridHomeSection = value;
				}
			}		
		},
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