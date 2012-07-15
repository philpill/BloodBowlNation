define(['Variables', 'Helpers'], function(variables, helpers){

	var Zone = function (fillColour, outlineColour) {

		var container = new Container();

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


		_.extend(container, { 

			baseZone : null,
			pathSquares : null,
			renderGraphics : function(graphicsObject) {

				//console.log('renderGraphics()');

				graphicsObject.clear();

				graphicsObject.beginStroke(outlineColour);

				graphicsObject.beginFill(fillColour);

				graphicsObject.rect(0, 0, variables.gridUnit, variables.gridUnit);				
			},

			clearBase : function() {

				//console.log('Zone.clearBase()');

				this.baseZone.graphics.clear();
			},

			renderBase : function(location) {

				//console.log('Zone.renderBase()');

				//console.log(location);

				this.renderGraphics(this.baseZone.graphics);

				var pixelLocation = helpers.convertGridsToPixels(location[0], location[1], variables.gridUnit);

				//console.log(pixelLocation);

				this.baseZone.x = pixelLocation[0];

				this.baseZone.y = pixelLocation[1];
			},

			clearCursorPath : function() {

				this.pathSquares.removeAllChildren();
			},

			renderCursorPath : function(entityLocation, cursorLocation, squares) {

				//console.log('renderCursorPath()');

				var that = this;

				var path = a_star(entityLocation, cursorLocation, getBoard(), variables.gridWidth, variables.gridHeight);
				
				var locationsArray = _.last(_.initial(_.zip(_.pluck(path, 'x'), _.pluck(path, 'y'))), squares) || [];

				var locations = [];

				this.clearCursorPath();

				_.each(locationsArray, function(location){

					var shape = new Shape();

					that.renderGraphics(shape.graphics);

					var pixelLocation = helpers.convertGridsToPixels(location[0], location[1], variables.gridUnit)

					//console.log(pixelLocation);

					shape.x = pixelLocation[0];

					shape.y = pixelLocation[1];					

					that.pathSquares.addChild(shape);
				});							
			},			

			renderBlockZone : function() {


			},

			init : function() {

				//console.log('Zone.init()');

				this.baseZone = new Shape();

				this.baseZone.alpha = 0.5;

				this.pathSquares = new Container();

				this.pathSquares.alpha = 0.3;

				this.addChild(this.baseZone);

				this.addChild(this.pathSquares);
			}
		});

		return container;
	}

	helpers.inheritPrototype(Zone, Container);

	return Zone;

});