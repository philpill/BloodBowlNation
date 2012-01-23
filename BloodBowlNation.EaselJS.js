var BBN = BBN || (function(){

	return {
		pitchCanvas: null,
		pitchCanvasContext: null,
		gameCanvas: null,
		gameCanvasContext: null,
		pitchStage: null,
		canvasStage: null,
		canvasBounds: null,
		init: function() {
			console.log('-- BloodBowlNation --');
			
			pitchCanvas = document.getElementById("PitchCanvas");
			gameCanvas = document.getElementById("GameCanvas");
			
			$(gameCanvas).mousemove({that: this}, this.gameCanvasMouseMove);
			
			canvasBounds = new Rectangle();
			canvasBounds.width = gameCanvas.width;
			canvasBounds.height = gameCanvas.height;
			gameStage = new Stage(gameCanvas);
			pitchStage = new Stage(pitchCanvas);
			
			gameStage.mouseEventsEnabled = true;
			
			this.Pitch.init(pitchStage, this.game);
			this.game.init(gameStage);
			Ticker.setFPS(30);
			//Ticker.addListener(window);
		},
		gameCanvasMouseMove: function(e) {
			var that = e.data.that;
		},
		game: {
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
	}
})();

function tick() {
	//console.log('test');
}