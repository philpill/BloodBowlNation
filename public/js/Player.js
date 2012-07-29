define(['Variables', 'Helpers', 'lib/EaselJS/lib/easeljs-0.4.2.min'], function(variables, helpers) {

	var Player = function (playerZone, playerName, playerTeam, playerNumber, playerRace, playerAttributes) {

		var container = new Container();

		_.extend(container, {

			zone : playerZone,
			name: playerName,
			colours: playerTeam.colours,
			location: null,
			number: playerNumber,
			team: playerTeam.name,
			race: playerRace,
			movementAllowance: playerAttributes.movement,
			strength: playerAttributes.strength,
			agility: playerAttributes.agility,
			armourValue: playerAttributes.armour,
			isDown: false,
			isStunned: false,
			isKnockedOut: false,
			hasMoved: false,
			hasActioned: false,
			renderCache: null,
			onClick : function(e) {

				console.log(this);

				//this is bullshit
				var game = e.target.parent;

				game.onPlayerClick(this);
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

				console.log('tick()');
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

				number.x = 0.5;

				number.y = 0.5;	
				
				if (this.isDown) {

					number.rotation = 90;

				} else if (this.isStunned) {

					number.rotation = 180;
				}

				return number;
			},
			setSelected : function() {

				this.renderBase();
			},
			renderBase : function () {

				//console.log('Player.renderBase()');

				//shim to render top left corner of grid square
				this.zone.renderBase([-0.5, -0.5]);
			},
			clearBase : function () {

				//console.log('Player.clearBase()');

				playerZone.clearBase();
			},
			render : function() {

				this.x = (this.location[0] * variables.gridUnit) + variables.gridUnit/2 - 0.5;

				this.y = (this.location[1] * variables.gridUnit) + variables.gridUnit/2 - 0.5;
			},
			init : function() {

				//console.log('Player.init()');

				this.removeAllChildren();

				this.zone = playerZone;

				this.zone.init();

				this.addChild(this.zone);

				this.addChild(this.renderShape());

				this.addChild(this.renderNumber());					
			}
		});

		return container;
	}

	helpers.inheritPrototype(Player, Container);

	return Player;

});