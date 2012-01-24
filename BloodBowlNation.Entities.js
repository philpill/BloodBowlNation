
if (typeof BBN == "undefined" || !BBN)
{
   var BBN = {};
}

(function() {

	BBN.Team = function(teamName) {

		this.name = teamName;
		this.players = [];
		this.colours = ["rgba(255,0,0,1)"];
		this.score = 0;
		this.scoreZone = 0;
		this.reRolls = 0;
		this.gridHomeSection = 0;
	}

	BBN.Team.prototype = {
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
		}
	}
})();

(function() {

	BBN.Player = function(playerName, playerTeam, playerNumber, playerRace, playerMovement, playerStrength, playerAgility, playerArmourValue) {

		this.name = playerName;	
		this.colours = playerTeam.colours;
		this.number = playerNumber;
		this.team = playerTeam.name;
		this.race = playerRace;
		
		
		//these values should come from a player type class (e.g. Human Blocker)
		this.movementAllowance = playerMovement;
		this.strength = playerStrength;
		this.agility = playerAgility;
		this.armourValue = playerArmourValue;
		
		this.isProne = false;
		this.isStunned = false;
		this.isKnockedOut = false;
	}


	BBN.Player.prototype = {
		name: {
			get: function() { return this._name; },
			set: function(value) { 
				if (typeof value === "string") {
					this._name = value;
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
		number: {
			get: function() { return this._number; },
			set: function(value) { 
				if (typeof value === "number") {
					this._number = value; 
				}
			}
		},
		team: {
			get: function() { return this._team; },
			set: function(value) { 
				if (value instanceof BBN.Team) {
					this._team = value; 
				}
			}
		},
		race: {
			get: function() { return this._race; },
			set: function(value) {
				if (typeof value === "string") {
					this._race = value; 
				}
			}
		},
		movementAllowance: {
			get: function() { return this._movementAllowance; },
			set: function(value) { 
				if (typeof value === "number") {
					this._movementAllowance = value; 
				}
			}
		},
		strength: {
			get: function() { return this._strength; },
			set: function(value) { 
				if (typeof value === "number") {
					this._strength = value; 
				}
			}	
		},
		agility: {
			get: function() { return this._agility; },
			set: function(value) { 
				if (typeof value === "number") {
					this._agility = value; 
				}
			}
		},
		armourValue: {
			get: function() { return this._armourValue; },
			set: function(value) { 
				if (typeof value === "number") {
					this._armourValue = value; 
				}
			}
		},
		isProne: {
			get: function() { return this._isProne; },
			set: function(value) { 
				if (value instanceof Boolean) {
					this._isProne = value; 
				}
			}
		},
		isStunned: {
			get: function() { return this._isStunned; },
			set: function(value) { 
				if (value instanceof Boolean) {
					this._isStunned = value; 
				}
			}
		},
		isKnockedOut: {
			get: function() { return this._isKnockedOut; },
			set: function(value) { 
				if (value instanceof Boolean) {
					this._isKnockedOut = value; 
				}
			}
		}
	}

	BBN.Player.prototype.pickUpBall = function(ball) {
		
		//attempt to pickup
		ball.inPossessionOf = this;
		console.log("ball picked up");
	}

	BBN.Player.prototype.getTeam = function(teams) {
		var player, team;	
		for (team in teams) {
			for (player in teams[team].players) {		
				if (teams[team].players[player] === this) {
					return team;
				}
			}
		}
		return null;
	}
})();

(function() {

	BBN.Ball = function() {
		this.colour = "rgba(255,255,0,1)";
		this.inPossessionOf = null;
	}
})();





















