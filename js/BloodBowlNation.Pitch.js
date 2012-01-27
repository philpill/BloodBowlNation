
if (typeof BBN == "undefined" || !BBN)
{
   var BBN = {};
}

(function() {

	BBN.Pitch = {
		gameContext: null,
		unitBorderColour: null,
		unitFillColour: null,
		boundaryLineColour: null,
		pitchStage: null,
		gameContext: null,
		pitchImage: null,
		backgroundImage: "img/Pitch.jpg",
		render: function() {			
			this.renderPitchImage();
		},
		renderPitchImage: function() {
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
			
			var fullWidth = this.gameContext.canvasWidth * this.gameContext.pitchUnitSize + 0.5;
			var fullHeight = this.gameContext.canvasHeight * this.gameContext.pitchUnitSize + 0.5;
			
			this.pitchStage.addChild(pitchBitmap);
			pitchBitmap.x = 0;
			pitchBitmap.y = 0;
			pitchBitmap.scaleX = 0.435;
			pitchBitmap.scaleY = 0.435;					
			this.pitchStage.addChild(shape);
			//vertical grid lines
			for (x=0.5; x < (width*unit)+unit; x+=unit) {	
				shape.graphics.beginStroke(boundaryLineColour).moveTo(x,0).lineTo(x,height*unit).endStroke();
			}
			//horizontal grid lines
			for (y=0.5; y < (height*unit)+unit; y+=unit) {
				shape.graphics.beginStroke(boundaryLineColour).moveTo(0,y).lineTo(width*unit,y).endStroke();
			}
			
			shape.graphics.beginStroke('#000').moveTo(0.5,0.5).lineTo(fullWidth, 0.5).lineTo(fullWidth, fullHeight).lineTo(0.5, fullHeight).lineTo(0.5, 0.5).endStroke();
			
			this.pitchStage.update();
		},
		init: function(pitchStage, gameContext) {
			this.gameContext=gameContext;
			this.unitFillColour="rgba(0,255,0,0)";
			this.unitBorderColour="rgba(0,0,0,0.1)";
			this.boundaryLineColour="rgba(0,100,0,0.1)";
			this.pitchStage = pitchStage;
			this.render();
		}
	}	
})();


