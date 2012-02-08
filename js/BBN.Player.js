if (typeof BBN == "undefined" || !BBN) {
   var BBN = {};
}

(function() {

	BBN.Player = function(stage, playerName, playerTeam, playerNumber, playerRace, playerMovement, playerStrength, playerAgility, playerArmourValue) {

		this.stage = stage;

		this.name = playerName;	
		this.colours = playerTeam.colours;
		this.number = playerNumber;
		this.team = playerTeam.name;
		this.race = playerRace;
		
		this.renderedPlayerCache = [];
		
		//these values should come from a player type class (e.g. Human Blocker)
		this.movementAllowance = playerMovement;
		this.strength = playerStrength;
		this.agility = playerAgility;
		this.armourValue = playerArmourValue;
		
		this.isProne = false;
		this.isStunned = false;
		this.isKnockedOut = false;
		
		this.hasMoved = false;
		this.hasActioned = false;
	}


	BBN.Player.prototype = {
		stage: {
			get: function() { return this._stage; },
			set: function(value) { 
				if (typeof value === "string") {
					this._stage = value;
				}
			}
		},
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
		location: {
			get: function() { return this._location; },
			set: function(value) { 
				if (value instanceof Array) {
					this._location = value; 
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
		}, 
		hasMoved: {
			get: function() { return this._hasMoved; },
			set: function(value) { 
				if (value instanceof Boolean) {
					this._hasMoved = value; 
				}
			}
		}, 
		hasActioned: {
			get: function() { return this._hasActioned; },
			set: function(value) { 
				if (value instanceof Boolean) {
					this._hasActioned = value; 
				}
			}
		}, 
		renderedPlayerCache: {
			get: function() { return this._renderedPlayerCache; },
			set: function(value) { 
				if (value instanceof Array) {
					this._renderedPlayerCache = value; 
				}
			}
		},
		refreshRender: function() {
			this.renderedPlayerCache = [];
		},
		pickUpBall: function(ball) {	
			//attempt to pickup
			ball.inPossessionOf = this;
			console.log("ball picked up");
		},
		render: function() {
			
			var teamColours, gridUnit = Variables.gridUnit, x, y, circle, graphics = new Graphics(), playerNumber, i;

			x = (this.location[0]*gridUnit)+gridUnit/2;
			y = (this.location[1]*gridUnit)+gridUnit/2;

			teamColours = this.colours;
			
			if (teamColours.length > 1) {
				graphics.beginLinearGradientFill([teamColours[0],teamColours[1]], [0, 0.5], x, y, x+3, y);
			} else {
				graphics.beginFill(teamColours[0]);
			}

			graphics.setStrokeStyle(1).beginStroke("#fff");
			graphics.drawCircle(x,y,7);

			graphics.setStrokeStyle(1).beginStroke("#000");
			graphics.drawCircle(x,y,6);

			graphics.endStroke();

			circle = new Shape(graphics);
			
			playerNumber = new Text();
			playerNumber.text = this.number;
			playerNumber.color = '#000';
			playerNumber.font = 'bold 7px Arial';
			playerNumber.textAlign = 'center';
			playerNumber.textBaseline  = 'middle';
			playerNumber.x = x;
			playerNumber.y = y;	
			
			if (this.isProne) {
				playerNumber.rotation = 90;
			} else if (this.isStunned) {
				playerNumber.rotation = 180;	
			}

			circle.name = 'playerCircle';
			playerNumber.name = 'playerNumber';
		
			this.renderedPlayerCache.push(circle);
			this.renderedPlayerCache.push(playerNumber);

			for (i = 0, renderedPlayerCacheLength = this.renderedPlayerCache.length; i < renderedPlayerCacheLength;i++) {
				this.stage.addChild(this.renderedPlayerCache[i]);
			}
			
		},
		tick: function() {
			
			if (this.renderedPlayerCache.length === 0) {

				this.render();
			}
		}
	}
})();