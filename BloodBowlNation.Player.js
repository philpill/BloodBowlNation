var BLOODBOWLNATION.Player = BLOODBOWLNATION.Player || (function(){

	Player = function(playerName, colours, playerNumber) {
		this.name = playerName;
		this.colours = colours;
		this.number = playerNumber;
	}		
	Player.prototype.onSelect = function() {
		console.log(this.name + " selected");
	}	

})();