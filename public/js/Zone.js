define(['Variables', 'Helpers'], function(variables, helpers){

	var Zone = function (fillColour, outlineColour) {

		var container = new Container();

		var baseZone = new Shape();

		baseZone.alpha = 0.5;

		var pathSquares = new Container();

		pathSquares.alpha = 0.3;		

		function getBoard() {

			return populateBoard(createBoard());
		}

		function createBoard() {

			//needs to represent entities on field

			var board = [];

			var boardWidth = variables.gridWidth;

			var boardHeight = variables.gridHeight;

			while (boardWidth--) {		

				boardHeight = variables.gridHeight;

				board[boardWidth] = [];

				while (boardHeight--) {

					board[boardWidth][boardHeight] = 0;
				}
			}

			return board;
		}

		function populateBoard(board) {

			//get locations of obstacles
			
			return board;
		}

		function renderGraphics(graphicsObject) {

			//console.log('renderGraphics()');

			graphicsObject.clear();

			graphicsObject.beginStroke(outlineColour);

			graphicsObject.beginFill(fillColour);

			graphicsObject.rect(0, 0, variables.gridUnit, variables.gridUnit);	
		
		}

		_.extend(container, { 

			clearBase : function() {

				//console.log('Zone.clearBase()');

				baseZone.graphics.clear();
			},

			renderBase : function(location) {

				//console.log('Zone.renderBase()');

				renderGraphics(baseZone.graphics);

				var pixelLocation = helpers.convertGridsToPixels(location[0], location[1], variables.gridUnit);

				baseZone.x = pixelLocation[0] - 0.5;

				baseZone.y = pixelLocation[1] - 0.5;
			},

			clearCursorPath : function() {

				pathSquares.removeAllChildren();
			},

			//memory leak
			renderCursorPath : function(entityLocation, cursorLocation, squares) {

				//console.log('renderCursorPath()');

				var path, locationsArray, shape, pixelLocation;

				path = a_star(entityLocation, cursorLocation, getBoard(), variables.gridWidth, variables.gridHeight);
				
				locationsArray = _.last(_.initial(_.zip(_.pluck(path, 'x'), _.pluck(path, 'y'))), squares) || [];

				this.clearCursorPath();

				_.each(locationsArray, function(location){

					shape = new Shape();

					renderGraphics(shape.graphics);

					pixelLocation = helpers.convertGridsToPixels(location[0], location[1], variables.gridUnit);

					shape.x = pixelLocation[0] - 0.5;

					shape.y = pixelLocation[1] - 0.5;					

					pathSquares.addChild(shape);
				});							
			},			

			renderBlockZone : function() {


			},

			init : function() {

				//console.log('Zone.init()');

				this.removeAllChildren();

				this.addChild(baseZone);

				this.addChild(pathSquares);
			}
		});

		return container;
	}

	helpers.inheritPrototype(Zone, Container);

	return Zone;

});