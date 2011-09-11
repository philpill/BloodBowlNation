BBN.createEntityObjects = function() {

	this.Team = function() {

		this.name = "Unnamed Team";
		this.players = [];
		this.colours = ["rgba(255,0,0,1)"];
	}

	this.Team = function(teamName) {

		this.name = teamName;
		this.players = [];
		this.colours = ["rgba(255,0,0,1)"];
		this.score = 0;
		this.scoreZone = 0;
		this.reRolls = 0;
		this.gridHomeSection = 0;
	}

	Object.defineProperties(BBN.Team.prototype, {
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
	});

	BBN.Player = BBN.Player || function(playerName, playerTeam, playerNumber, playerRace, playerMovement, playerStrength, playerAgility, playerArmourValue) {

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


	Object.defineProperties(BBN.Player.prototype, {
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
	});

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

	BBN.Grid = BBN.Grid || function(width, length, pitchUnitSize) {

		var i, j;
		this.width = width;
		this.length = length;
		this.unit = pitchUnitSize;
		this.space = new Array(this.width);		
		for (i = 0; i < this.width; i++) {
			this.space[i] = new Array(this.length);
			for (j = 0; j < this.space[i].length; j++) {
				this.space[i][j] = [];
			}
		}
	}	

	BBN.Grid.prototype.initialise = function() {
	
		//predicates
		// 0 ~ halfway == home
		// halfway ~ end == away
	
		//allocate areas of grid to teams to define home/away
		
			//count number of teams		
			//divide pitch length by number of teams		
			//define endzones
			
		//define widezone: 4 squares in from each side
		
		//define halfway line ... ?
	}
	
	BBN.Grid.prototype.insertEntity = function(gridX, gridY, object) {	
		try {	
			if (!object instanceof BBN.Player && !object instanceof BBN.Ball) {			
				throw("BBN.Grid.prototype.insertObject() error: object not griddable");
			}		
			if (gridX > this.width) {					
				throw("BBN.Grid.prototype.insertObject() error: outside boundary");
			}		
			if (gridY > this.length) {					
				throw("BBN.Grid.prototype.insertObject() error: outside boundary");
			}
			if (object instanceof BBN.Player) {
				this.space[gridX][gridY].unshift(object);		
			} else if (object instanceof BBN.Ball) {
				this.space[gridX][gridY].push(object);
			}
		} catch(error) {	
			console.log(error);
		}
	}

	BBN.Grid.prototype.getEntityLocation = function(object) {
		var i, x, y;
		for (x = 0; x < this.width; x++) {		
			for (y = 0; y < this.length; y++) {
				for (i = 0; i < this.space[x][y].length; i++) {
					if (this.space[x][y][i] === object) {
						return [x, y, i]
					}
				}
			}
		}
		return null;
	}

	BBN.Grid.prototype.removeEntity = function(object) {	
		var i, x, y, location;
		try {		
			location = this.getEntityLocation(object);	
			if (location === null) {
				throw("BBN.Grid.prototype.removeEntity() error: object not found");
			}		
			x = location[0];
			y = location[1];
			i = location[2];		
			this.space[x][y].splice(i, 1);
		} catch(error) {	
			console.log(error);
		}
	}	
		
	BBN.Grid.prototype.moveEntity = function(destinationGridX, destinationGridY, object) {
		var player, ball;
		if (!object instanceof BBN.Player && !object instanceof BBN.Ball) {		
			throw("BBN.Grid.prototype.insertObject() error: object not griddable");
		}
		if (object instanceof BBN.Player) {
			player = object;	
			ball = BBN.game.match.ball;
			//check ball is in possession of player and move
			if (ball.inPossessionOf === player) {
				this.removeEntity(ball);	
				this.insertEntity(destinationGridX, destinationGridY, ball);		
				//check win condition
			}
		}
		this.removeEntity(object);	
		this.insertEntity(destinationGridX, destinationGridY, object);
	}	
		
	BBN.Grid.prototype.getGridX = function(x) {
		if (x < 1) { x = 1; }
		return Math.floor(x/this.unit);
	}
	BBN.Grid.prototype.getGridY = function(y) {
		if (y < 1) { y = 1; }
		return Math.floor(y/this.unit); 
	}
	BBN.Grid.prototype.getX = function(gridX) {
		if (gridX < 0) { gridX = 0; }
		return gridX*this.unit;
	}
	BBN.Grid.prototype.getY = function(gridY) {
		if (gridY < 0) { gridY = 0; }  
		return gridY*this.unit;
	}
		
	BBN.Ball = BBN.Ball || function() {
		this.colour = "rgba(255,255,0,1)";
		this.inPossessionOf = null;
	}

}




















