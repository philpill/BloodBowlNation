var BLOODBOWLNATION.Team = BLOODBOWLNATION.Team || (function(){

	Team = function(teamName) {
		this.name = teamName;
		this.players = [];
		this.colours = ["rgba(255,0,0,1)"];
		
	}
	Team.prototype.shout = function(){
		console.log(this.name);
	}
	
})();