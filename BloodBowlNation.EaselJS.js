var BBN = BBN || (function(){

	return {
		pitchCanvas: null,
		pitchCanvasContext: null,
		gameCanvas: null,
		gameCanvasContext: null,
		pitchStage: null,
		canvasStage: null,
		canvasBounds: null,
		variables: {
			unitFillColour: "rgba(0,255,0,0)",
			unitBorderColour: "rgba(0,0,0,0.1)",
			boundaryLineColour: "rgba(0,100,0,0.1)",
			pitchBitmapScaleX: 0.435,
			pitchBitmapScaleY: 0.435,
			pitchUnitSize: 20,
			canvasHeight: 26,
			canvasWidth: 15			
		},
		init: function() {
			console.log('-- bloodbowlnation --');
			
			pitchCanvas = document.getElementById("PitchCanvas");
			gameCanvas = document.getElementById("GameCanvas");
			
			$(gameCanvas).mousemove({that: this}, this.gameCanvasMouseMove);
			
			canvasBounds = new Rectangle();
			canvasBounds.width = gameCanvas.width;
			canvasBounds.height = gameCanvas.height;
			gameStage = new Stage(gameCanvas);
			pitchStage = new Stage(pitchCanvas);
			
			gameStage.mouseEventsEnabled = true;
			
			this.pitch.init(pitchStage, this.game);
			this.game.init(gameStage);
			Ticker.setFPS(30);
			//Ticker.addListener(window);
		},
		gameCanvasMouseMove: function(e) {
			var that = e.data.that;
		},
		pitch: {
			gameContext: null,
			unitBorderColour: null,
			unitFillColour: null,
			boundaryLineColour: null,
			pitchStage: null,
			gameContext: null,
			pitchImage: null,
			backgroundImage: "Pitch.jpg",
			render: function() {
				this.pitchImage = new Image();
				addEvent(this.pitchImage, "load", this.pitchImageOnload, this);
				this.pitchImage.src = this.backgroundImage;
			},
			pitchImageOnload: function() {
				var x, y, 
					pitchBitmap = new Bitmap(this.pitchImage),
					shape = new Shape(),
					gameContext = this.gameContext,
					unit = gameContext.pitchUnitSize,
					width = gameContext.canvasWidth,
					height = gameContext.canvasHeight,
					unitBorderColour = this.unitBorderColour,
					boundaryLineColour = this.boundaryLineColour;			
				
				pitchStage.addChild(pitchBitmap);
				pitchBitmap.x = 0;
				pitchBitmap.y = 0;
				pitchBitmap.scaleX = 0.435;
				pitchBitmap.scaleY = 0.435;					
				pitchStage.addChild(shape);
				//vertical grid lines
				for (x=0.5; x < (width*unit)+unit; x+=unit) {	
					shape.graphics.beginStroke(boundaryLineColour).moveTo(x,0).lineTo(x,height*unit).endStroke();
				}
				//horizontal grid lines
				for (y=0.5; y < (height*unit)+unit; y+=unit) {
					shape.graphics.beginStroke(boundaryLineColour).moveTo(0,y).lineTo(width*unit,y).endStroke();
				}
				pitchStage.update();
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