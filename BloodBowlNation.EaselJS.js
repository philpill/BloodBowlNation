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
			gameStage = new Stage(gameCanvas);
			pitchStage = new Stage(pitchCanvas);

			this.game.init(pitchStage, gameStage);
			Ticker.setFPS(30);
			//Ticker.addListener(window);
		},
		game: {
			pitchStage: null,
			gameStage: null,
			init: function(pitchStage, gameStage) {
				this.pitchStage = pitchStage;
				this.gameStage = gameStage;
				this.pitch.init(this.pitchStage, this.gameStage);
			},
			pitch: {
				pitchStage: null,
				gameStage: null,
				gameContext: null,
				backgroundImage: "Pitch.jpg",
				render: function() {
					var pitchImage = new Image();

					pitchImage.src = this.backgroundImage;

					pitchImage.onload = function() {
					
						var pitchBitmap = new Bitmap(pitchImage);	
						
						pitchStage.addChild(pitchBitmap);
						
						pitchBitmap.x = 0;
						pitchBitmap.y = 0;
						pitchBitmap.scaleX = 0.5;
						pitchBitmap.scaleY = 0.5;
		
						pitchStage.update();
					}						
				},
				init: function(pitchStage, gameStage) {
					this.pitchStage = pitchStage;
					this.gameStage = gameStage;	
					this.render();
				}
			}		
		}
	}

})();

function tick() {
	//console.log('test');
}