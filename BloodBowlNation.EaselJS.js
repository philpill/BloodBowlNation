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
			console.log('init()');
			pitchCanvas = document.getElementById("PitchCanvas");
			gameCanvas = document.getElementById("GameCanvas");
			canvasBounds = new Rectangle();
			canvasBounds.width = gameCanvas.width;
			canvasBounds.height = gameCanvas.height;
			canvasStage = new Stage(gameCanvas);
			canvasStage.update();
			Ticker.setFPS(30);
			Ticker.addListener(window);
		}
	}

})();

function tick() {
	//console.log('test');
}