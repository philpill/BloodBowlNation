
if (typeof BBN == "undefined" || !BBN)
{
   var BBN = {};
}

(function() {

	BBN.RenderEngine = {
		grid: null,
		backgroundStage: null,
		mainStage: null,
		pitchImage: null,
		init: function(mainStage, backgroundStage) {
			this.mainStage = mainStage;
			this.backgroundStage = backgroundStage;
		},
		renderBackground: function() {
			this.renderPitchImage();
		},
		renderMain: function(grid) {
			this.grid = grid;
			this.renderGrid();
		},
		renderPitchImage: function() {
			this.pitchImage = new Image();
			Helpers.addEvent(this.pitchImage, "load", this.pitchImageOnload, this);
			this.pitchImage.src = Variables.pitchImageSrc;
		},
		pitchImageOnload: function() {
			var pitchBitmap = new Bitmap(this.pitchImage);

			pitchBitmap.x = 0;
			pitchBitmap.y = 0;

			pitchBitmap.scaleX = 0.435;
			pitchBitmap.scaleY = 0.435;

			this.backgroundStage.addChild(pitchBitmap);

			this.renderPitchLines();
		},
		renderPitchLines: function() {
			var x, y,
				shape = new Shape(),
				unit = Variables.gridUnit,
				width = Variables.gridWidth,
				height = Variables.gridHeight,
				pitchGridLineColour = Variables.pitchGridLineColour,
				gameGridLineColour = Variables.gameGridLineColour,
				boundaryLineColour = Variables.boundaryLineColour;		
			
			var fullWidth = width * unit + 0.5;
			var fullHeight = height * unit + 0.5;

			//vertical grid lines
			for (x=0.5; x < (width*unit)+unit; x+=unit) {	
				shape.graphics.beginStroke(gameGridLineColour).moveTo(x,0).lineTo(x,height*unit).endStroke();
			}
			//horizontal grid lines
			for (y=0.5; y < (height*unit)+unit; y+=unit) {
				shape.graphics.beginStroke(gameGridLineColour).moveTo(0,y).lineTo(width*unit,y).endStroke();
			}

			//left
			shape.graphics.beginStroke(pitchGridLineColour).moveTo(4*unit+0.5,0).lineTo(4*unit+0.5,height*unit+0.5).endStroke();
			//right
			shape.graphics.beginStroke(pitchGridLineColour).moveTo(11*unit+0.5,0).lineTo(11*unit+0.5,height*unit+0.5).endStroke();
			//top
			shape.graphics.beginStroke(pitchGridLineColour).moveTo(0,unit+0.5).lineTo(width*unit+0.5,unit+0.5).endStroke();
			//middle
			shape.graphics.beginStroke(pitchGridLineColour).moveTo(0,13*unit+0.5).lineTo(width*unit+0.5,13*unit+0.5).endStroke();
			//bottom
			shape.graphics.beginStroke(pitchGridLineColour).moveTo(0,25*unit+0.5).lineTo(width*unit+0.5,25*unit+0.5).endStroke();
			
			//outline
			shape.graphics.beginStroke(boundaryLineColour).moveTo(0.5,0.5).lineTo(fullWidth, 0.5).lineTo(fullWidth, fullHeight).lineTo(0.5, fullHeight).lineTo(0.5, 0.5).endStroke();

			this.backgroundStage.addChild(shape);

			this.backgroundStage.update();
		},
		renderGrid: function() {
			var grid = this.grid,
				gridX, gridY, gridEntities, entity;
			
			if (this.selectedPlayer !== null) {
			
				//this.renderSelectedPlayerGrid();
				
				if (this.blockedPlayer !== null) {
				
					//this.renderPushBackSquares();
				}
			}
			
			for (gridX = 0; gridX < grid.space.length; gridX++) {

				for (gridY = 0; gridY < grid.space[gridX].length; gridY++) {

					if (typeof grid.space[gridX][gridY] !== 'undefined') {

						gridEntities = Helpers.castGridEntityHelper(grid.space[gridX][gridY]);
					
						for (entity in gridEntities) {
								
							BBN.RenderEngine.renderObject(gridEntities[entity], gridX, gridY);								
						}	
					}						
				}
			}
		},
		renderObject: function(object, gridX, gridY) {	
					
			if (object instanceof BBN.Player) {
				this.renderPlayer(gridX, gridY);					
			} else if (object instanceof BBN.Ball) {
				this.renderBall(gridX, gridY);					
			}
		},
		renderBall: function(gridX, gridY) {
		
			var teamColours,
				grid = this.grid,
				gridUnit = grid.unit,
				x, y,
				circle,
				graphics = new Graphics();

			x = (gridX*gridUnit)+gridUnit/2;
			y = (gridY*gridUnit)+gridUnit/2;

			graphics.beginFill('rgba(255,255,0,1)');
				
			graphics.setStrokeStyle(1).beginStroke('#000');
			
			graphics.drawCircle(x+4,y+4,4);

			graphics.endStroke();
			
			circle = new Shape(graphics);
			
			this.mainStage.addChild(circle);
		}
	}
})();