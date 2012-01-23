
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
		backgroundImage: "Pitch.jpg",
		render: function() {
			this.pitchImage = new Image();
			addEvent(this.pitchImage, "load", this.pitchImageOnload, this);
			this.pitchImage.src = this.backgroundImage;
		},
		renderCursor: function(x, y, unit) {
		
			console.log(x + ', ' + y + ', ' + unit);
			
			var shape = new Shape();
			shape.graphics.beginFill("rgba(100,100,100,0.2)");
			shape.graphics.drawRect(x, y, unit, unit);
			shape.graphics.endFill();
			
			this.pitchStage.addChild(shape);
			
			this.pitchStage.update();
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


