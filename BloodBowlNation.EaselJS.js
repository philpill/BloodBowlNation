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
			this.pitch.init(pitchStage, this.game);
			this.game.init(gameStage);
			Ticker.setFPS(30);
			//Ticker.addListener(window);
		},
		pitch: {
			gameContext: null,
			unitBorderColour: null,
			unitFillColour: null,
			boundaryLineColour: null,
			pitchStage: null,
			gameContext: null,
			backgroundImage: "Pitch.jpg",
			render: function() {
				var gameContext = this.gameContext,
					canvasContext = this.canvasContext,
					unit = gameContext.pitchUnitSize,
					width = gameContext.canvasWidth,
					height = gameContext.canvasHeight,
					unitBorderColour = this.unitBorderColour,
					boundaryLineColour = this.boundaryLineColour,
					pitchImage = new Image();
				pitchImage.src = this.backgroundImage;
				pitchImage.onload = function() {
					var pitchBitmap = new Bitmap(pitchImage);
					pitchStage.addChild(pitchBitmap);
					pitchBitmap.x = 0;
					pitchBitmap.y = 0;
					pitchBitmap.scaleX = 0.435;
					pitchBitmap.scaleY = 0.435;
					var shape = new Shape();
					pitchStage.addChild(shape);
					//vertical grid lines
					for (var x=0.5; x < (width*unit)+unit; x+=unit) {	
						shape.graphics.beginStroke(boundaryLineColour).moveTo(x,0).lineTo(x,height*unit).endStroke();
					}
					//horizontal grid lines
					for (var y=0.5; y < (height*unit)+unit; y+=unit) {
						shape.graphics.beginStroke(boundaryLineColour).moveTo(0,y).lineTo(width*unit,y).endStroke();
					}
					pitchStage.update();
				}
			},
			init: function(pitchStage, gameContext) {
				this.gameContext=gameContext;
				this.unitFillColour="rgba(0,255,0,0)";
				this.unitBorderColour="rgba(0,0,0,0.1)";
				this.boundaryLineColour="rgba(0,100,0,0.1)";
				this.pitchStage = pitchStage;
				this.render();
			}
		},
		game: {
			pitchUnitSize: 20,
			canvasHeight: 26,
			canvasWidth: 15,
			gameStage: null,
			grid: {
				width: this.canvasWidth,					
				length: this.canvasHeight,
				unit: this.pitchUnitSize,
				space: null				
			},
			init: function(gameStage) {
				var i, j;
			
				this.grid.space = new Array(this.canvasWidth);
				for (i = 0; i < this.canvasWidth; i++) {
					this.grid.space[i] = new Array(this.canvasHeight);
					for (j = 0; j < this.grid.space[i].length; j++) {
						this.grid.space[i][j] = [];
					}
				}
				this.gameStage = gameStage;
			}		
		}
	}
})();

function tick() {
	//console.log('test');
}