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
		
		this.renderCache = [];
		
		//these values should come from a player type class (e.g. Human Blocker)
		this.movementAllowance = playerMovement;
		this.strength = playerStrength;
		this.agility = playerAgility;
		this.armourValue = playerArmourValue;
		
		this.isDown = false;
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
			isDown: null,
			isStunned: null,
			isKnockedOut: null,
			hasMoved: null,
			hasActioned: null,
			renderCache: null,
			clearRenderCache: function() {
				this.renderCache = [];
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
				
			}
		}
	})();
})();