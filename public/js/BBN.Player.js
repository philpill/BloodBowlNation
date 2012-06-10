define([

	'BBN.Variables'

	], function(variables) {

	var Player = function (playerName, playerTeam, playerNumber, playerRace, playerMovement, playerStrength, playerAgility, playerArmourValue) {

		var container = new Container();

		_.extend(container, {

			name: playerName,
			colours: playerTeam.colours,
			location: null,
			number: playerNumber,
			team: playerTeam.name,
			race: playerRace,
			movementAllowance: playerMovement,
			strength: playerStrength,
			agility: playerAgility,
			armourValue: playerArmourValue,
			isDown: false,
			isStunned: false,
			isKnockedOut: false,
			hasMoved: false,
			hasActioned: false,
			renderCache: null,
			onClick : function(e) {

				var stage = e.target.parent;

				stage.onPlayerSelect(this);
			},
			clearRenderCache: function() {			
				this.renderCache = null;
			},
			pickUpBall: function(ball) {	
				//attempt to pickup
				ball.inPossessionOf = this;
				console.log("ball picked up");
			},
			move: function (grids) {
				this.renderCache = [];
				this.location = grids;
				this.hasMoved = true;
			},
			block: function (defender) {

				//in dev

				this.hasActioned = true;
			},
			stun: function () {
				
				this.isDown = true;
				this.isStunned = true;
			},
			knockout: function () {
				
				this.isKnockedOut = true;
			},
			knockdown: function() {
				
				this.isDown = true;
			},
			tick: function() {

			},
			renderShape : function() {

				var graphics = new Graphics();

				var teamColours = this.colours;

				if (teamColours.length > 1) {

					graphics.beginLinearGradientFill(teamColours, [0, 0.5], 0, 20, 3, 20);

				} else {

					graphics.beginFill(teamColours[0]);
				}

				graphics.setStrokeStyle(1).beginStroke("#fff");

				graphics.drawCircle(0, 0, 7);

				graphics.setStrokeStyle(1).beginStroke("#000");
				
				graphics.drawCircle(0, 0, 6);

				graphics.endStroke();

				var shape = new Shape(graphics);

				return shape;
			},
			renderNumber : function() {

				var number = new Text();

				number.text = this.number;

				number.color = '#000';

				number.font = 'bold 7px Arial';

				number.textAlign = 'center';

				number.textBaseline  = 'middle';

				number.x = 0;

				number.y = 0;	
				
				if (this.isDown) {

					number.rotation = 90;

				} else if (this.isStunned) {

					number.rotation = 180;
				}

				return number;
			},
			render : function() {
				
				if (!this.renderCache) {

					this.addChild(this.renderShape());

					this.addChild(this.renderNumber());			

					this.x = (this.location[0] * variables.gridUnit) + variables.gridUnit/2;

					this.y = (this.location[1] * variables.gridUnit) + variables.gridUnit/2;

					this.renderCache = this;
				}	
			}
		});

		return container;
	}

	return Player;

});