var BBN = BBN || (function(){
	
	return {
		pitchCanvas: null,
		gameCanvas: null,
		pitchStage: null,
		gameStage: null,
		canvasBounds: null,
		init: function() {
			console.log('-- BloodBowlNation --');
			
			this.pitchCanvas = document.getElementById("PitchCanvas");
			this.gameCanvas = document.getElementById("GameCanvas");

			this.canvasBounds = new Rectangle();
			this.canvasBounds.width = this.gameCanvas.width;
			this.canvasBounds.height = this.gameCanvas.height;
			this.gameStage = new Stage(this.gameCanvas);
			this.pitchStage = new Stage(this.pitchCanvas);
			
			this.gameStage.mouseEventsEnabled = true;
			
			this.Pitch.init(this.pitchStage, this.Game);
			this.Game.init(this.gameStage);
			
			$(this.gameCanvas).mousemove({that: this}, this.gameCanvasMouseMove);
			
			Ticker.setFPS(30);
			//Ticker.addListener(window);
		},
		gameCanvasMouseMove: function(e) {
			var that = e.data.that;
			
			//console.log(that);
			
			//console.log(that.pitchStage.mouseX + ', ' + that.pitchStage.mouseY);
			
			var grids = _convertPixelsToGrids(that.pitchStage.mouseX, that.pitchStage.mouseY, that.Game.pitchUnitSize);
			
			that.Pitch.renderCursor(grids[0], grids[1], that.Game.pitchUnitSize);
		}
	}
})();

function tick() {
	//console.log('test');
}