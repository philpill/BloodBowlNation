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


	BBN.Player.prototype = (function(){

		return {
			stage: null,
			name: null,
			colours: null,
			location: null,
			number: null,
			team: null,
			race: null,
			movementAllowance: null,
			strength: null,
			agility: null,
			armourValue: null,
			isProne: null,
			isStunned: null,
			isKnockedOut: null,
			hasMoved: null,
			hasActioned: null,
			renderedPlayerCache: null,
			refreshRender: function() {
				this.renderedPlayerCache = [];
			},
			pickUpBall: function(ball) {	
				//attempt to pickup
				ball.inPossessionOf = this;
				console.log("ball picked up");
			},
			move: function (grids) {
				
				//in dev

				var game = this.game;
				if (game.selectedPlayer.hasMoved === true) {
					console.log('player has already moved');
				} else {
					game.grid.moveEntity(grids[0], grids[1], game.selectedPlayer);
					game.forceRenderRefresh = true;
					game.selectedPlayer.hasMoved = true;
				}
			},
			block: function (defender) {

				//in dev

				if (Helpers.isAdjacent(this, defender)) {

					console.log('a: ' + this.name + ' - d: ' + defender.name);

					//call mediator
				}
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
})();