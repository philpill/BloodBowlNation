
if (typeof BBN == "undefined" || !BBN)
{
   var BBN = {};
}

(function() {

	BBN.Game = {
		pitchUnitSize: 20,
		canvasHeight: 26,
		canvasWidth: 15,
		gameStage: null,
		grid: null,
		init: function(gameStage) {
			var i, j;			
			this.grid = new BBN.Grid(this.canvasWidth, this.canvasHeight, this.pitchUnitSize);				
			this.gameStage = gameStage;
		}		
	}
	
})();