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
			tick: function() {
				
			}
		}
	})();
})();