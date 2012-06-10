
define (['BBN.Helpers', 'BBN.Variables'], function(helpers, variables) {

	var Pitch = function() {

		var container = new Container();

		_.extend(container, {

			init: function() {

				this.render();

			},
			tick : function() {

				console.log('Pitch.tick()');

			},
			render : function() {

				console.log('Pitch.render()');

				this.addChild(this.renderPitchImage());

				this.addChild(this.renderPitchLines());
			},
			renderPitchImage: function() {

				var pitchImage = new Image();

				pitchImage.src = variables.pitchImageSrc;

				var pitchBitmap = new Bitmap(pitchImage);

				pitchBitmap.x = 0;
				pitchBitmap.y = 0;

				pitchBitmap.scaleX = 0.435;
				pitchBitmap.scaleY = 0.435;

				return pitchBitmap;
			},
			renderPitchLines: function() {
				var x, y, i, j,
					shape = new Shape(),
					unit = variables.gridUnit,
					width = variables.gridWidth,
					height = variables.gridHeight,
					pitchGridLineColour = variables.pitchGridLineColour,
					gameGridLineColour = variables.gameGridLineColour,
					boundaryLineColour = variables.boundaryLineColour,
					fullWidth = width * unit + 0.5,
					fullHeight = height * unit + 0.5;		

				//vertical grid lines
				for (x = 0.5, i = (width * unit) + unit; x < i; x += unit) {

					shape.graphics.beginStroke(gameGridLineColour).moveTo(x, 0).lineTo(x, height*unit).endStroke();
				}

				//horizontal grid lines
				for (y = 0.5, j = (height * unit) + unit; y < j; y += unit) {

					shape.graphics.beginStroke(gameGridLineColour).moveTo(0, y).lineTo(width*unit, y).endStroke();
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

				return shape;
			}
		});

		return container;
	}

	return Pitch;
});


