
if (typeof BBN == "undefined" || !BBN)
{
   var BBN = {};
}

(function() {

	BBN.Grid = function(stage, width, height, unit) {

		var i, j;
		
		this.stage = stage;
		this.width = width;
		this.height = height;
		this.unit = unit;
		this.space = new Array(this.width);		
		for (i = 0; i < this.width; i++) {
			this.space[i] = new Array(this.height);
			for (j = 0; j < this.space[i].length; j++) {
				this.space[i][j] = [];
			}
		}

		this.cursor = new Shape();
		this.stage.addChild(this.cursor);

		this.selectedPlayerSquare = new Shape();
		this.stage.addChild(this.selectedPlayerSquare);

		this.defenderSquare = new Shape();
		this.stage.addChild(this.defenderSquare);		

		this.cursorPathSquare = new Shape();
		this.stage.addChild(this.cursorPathSquare);	

		this.oppositionPlayerSquares = new Shape();
		this.stage.addChild(this.oppositionPlayerSquares);
		
		this.pushBackSquares = new Shape();
		this.stage.addChild(this.pushBackSquares);
	}

	BBN.Grid.prototype.initialise = function() {

		//predicates
		// 0 ~ halfway == home
		// halfway ~ end == away

		//allocate areas of grid to teams to define home/away
		
			//count number of teams		
			//divide pitch height by number of teams		
			//define endzones
			
		//define widezone: 4 squares in from each side
		
		//define halfway line ... ?
	}

	BBN.Grid.prototype = {
		selectedPlayerLocationCache: null,
		activeTeamCache: null,
		oppositionPlayerSquares: null,
		selectedPlayerSquare: null,
		defenderSquare: null,
		pushBackSquares: null,
		playerSquares: null,
		cursorPathSquare: null,
		cursor: null,
		space: null,
		unit: null,
		height: null,
		width: null,
		stage: null,
		getGridX: function(x) {
			if (x < 1) { x = 1; }
			return Math.floor(x/this.unit);
		},
		getGridY: function(y) {
			if (y < 1) { y = 1; }
			return Math.floor(y/this.unit); 
		},
		getX: function(gridX) {
			if (gridX < 0) { gridX = 0; }
			return gridX*this.unit;
		},
		getY: function(gridY) {
			if (gridY < 0) { gridY = 0; }  
			return gridY*this.unit;
		},
		getSpace: function(x, y) {
			if (typeof this.space[x] === 'undefined') {
				return null;
			}
			return this.space[x][y];
		},
		moveEntity: function(destinationGridX, destinationGridY, object) {
			var player, ball;
			if (!object instanceof BBN.Player && !object instanceof BBN.Ball) {		
				throw("BBN.Grid.prototype.insertObject() error: object not griddable");
			}
			if (object instanceof BBN.Player) {
				player = object;	
				//ball = BBN.game.match.ball;
				//check ball is in possession of player and move
				//if (ball.inPossessionOf === player) {
					//this.moveEntity(destinationGridX, destinationGridY, ball);
					//check win condition
				//}
				player.location = [destinationGridX, destinationGridY];
			}
			this.removeEntity(object);
			this.insertEntity(destinationGridX, destinationGridY, object);
		},
		removeEntity: function(object) {	
			var i, x, y, location;
	
			location = this.getEntityLocation(object);	
			if (location === null) {
				throw("BBN.Grid.prototype.removeEntity() error: object not found");
			}		
			x = location[0];
			y = location[1];
			i = location[2];		
			this.space[x][y].splice(i, 1);
		},
		getEntityLocation: function(object) {
			var entityIndex;
			var gridWidth = this.width;
			var gridHeight = this.height;
			var space = this.space;

			while (gridWidth--) {
				gridHeight = this.height;
				while (gridHeight--) {
					entityIndex = space[gridWidth][gridHeight].length;
					while (entityIndex--) {
						if (space[gridWidth][gridHeight][entityIndex] === object) {
							return [gridWidth, gridHeight, entityIndex]
						}						
					}
				}
			}

			return null;
		},
		insertEntity: function(gridX, gridY, object) {	
			if (!object instanceof BBN.Player && !object instanceof BBN.Ball) {			
				throw("BBN.Grid.prototype.insertObject() error: object not griddable");
			}		
			if (gridX > this.width) {					
				throw("BBN.Grid.prototype.insertObject() error: outside boundary");
			}		
			if (gridY > this.height) {					
				throw("BBN.Grid.prototype.insertObject() error: outside boundary");
			}
			if (object instanceof BBN.Player) {
				this.space[gridX][gridY].unshift(object);		
			} else if (object instanceof BBN.Ball) {
				this.space[gridX][gridY].push(object);
			}
		},
		tick: function(activeTeam, selectedPlayer, defender) {
			if (this.activeTeamCache !== activeTeam) {
				this.activeTeamCache = activeTeam;
				this.renderActiveTeamPlayerSquares()
			}
			this.renderCursor(this.stage.mouseX, this.stage.mouseY);
			if (selectedPlayer instanceof BBN.Player) {

				this.renderSelectedPlayerSquare(selectedPlayer);
				this.cursorPathSquare.graphics.clear();
				this.pushBackSquares.graphics.clear();

				if (defender instanceof BBN.Player) {

					this.clearAdjacentOppositionSquares();

					this.renderDefenderSquare(defender);

					var pushBackSquares = Helpers.getPushBackSquares(selectedPlayer.location, defender.location);

					var unoccupiedPushBackSquares = [];

					for (var i = 0; i < pushBackSquares.length; i++) {
						
						var entities = this.space[pushBackSquares[i][0]][pushBackSquares[i][1]]

						if (entities.length === 0) {
							
							unoccupiedPushBackSquares.push([pushBackSquares[i][0], pushBackSquares[i][1]]);
						}
					}

					this.renderPushBackSquares(unoccupiedPushBackSquares);
				
				} else {

					this.clearDefenderSquare();
					
					this.renderSelectedPlayerSquareToCursor(selectedPlayer, [this.stage.mouseX, this.stage.mouseY]);
				}
				
			} else {
				this.clearDefenderSquare();
				this.clearSelectedPlayerSquare();
				this.renderActiveTeamPlayerSquares();
			}
		},
		clearDefenderSquare: function() {
			this.defenderSquare.graphics.clear();
		},		
		clearSelectedPlayerSquare: function() {
			this.selectedPlayerSquare.graphics.clear();
		},
		clearPushBackSquares: function() {
			this.pushBackSquares.graphics.clear();
		},
		renderPushBackSquares: function(grids) {
			var squareColour = 'rgba(200, 0, 0, 0.5)';

			this.renderSquares(this.pushBackSquares, grids, this.unit, squareColour);
		},
		renderCursor: function(x, y) {
			var cursorColour = 'rgba(200, 200, 200, 1)';
			var grids = Helpers.convertPixelsToGrids(x, y, this.unit);
			this.renderBox(this.cursor, [grids], this.unit, cursorColour);
		},
		renderDefenderSquare: function(defender) {
			var grids = defender.location;
			if (typeof grids === 'undefined') {
				defenderSquare.graphics.clear();
			} else {
				var playerSquareColour = 'rgba(200, 0, 0, 0.5)';
				this.renderSquares(this.defenderSquare, [grids], this.unit, playerSquareColour);
			}
		},		
		renderSelectedPlayerSquare: function(selectedPlayer) {
			var grids = selectedPlayer.location;
			if (typeof grids === 'undefined') {
				selectedPlayerSquare.graphics.clear();
			} else {
				var playerSquareColour = 'rgba(0, 0, 0, 0.5)';
				this.renderSquares(this.selectedPlayerSquare, [grids], this.unit, playerSquareColour);
			}
			if (!selectedPlayer.hasActioned) {
				this.renderAdjacentOppositionSquares(selectedPlayer, grids);
			}
		},
		renderBox: function(shape, gridsArray, gridUnit, colour) {

			var gridsArrayLength = gridsArray.length;
			var pixels, x, y;

			shape.graphics.clear();
			while (gridsArrayLength--) {
				if (gridsArray[gridsArrayLength] === null) {
					continue;
				}
				pixels = Helpers.convertGridsToPixels(gridsArray[gridsArrayLength][0], gridsArray[gridsArrayLength][1], gridUnit);

				x = pixels[0]+0.5;
				y = pixels[1]+0.5;

				shape.graphics.setStrokeStyle(1).beginStroke(colour).moveTo(x, y).lineTo(x + gridUnit, y).lineTo(x + gridUnit, y + gridUnit).lineTo(x, y + gridUnit).lineTo(x, y).endStroke();
			}			
		},
		renderSquares: function(shape, gridsArray, gridUnit, colour) {

			var gridsArrayLength = gridsArray.length;
			var pixels;

			shape.graphics.clear();
			while (gridsArrayLength--) {
				pixels = Helpers.convertGridsToPixels(gridsArray[gridsArrayLength][0], gridsArray[gridsArrayLength][1], gridUnit);
				shape.graphics.beginFill(colour);
				shape.graphics.drawRect(pixels[0]+0.5, pixels[1]+0.5, gridUnit, gridUnit);
				shape.graphics.endFill();
			}
		},
		clearAdjacentOppositionSquares: function() {
			
			this.oppositionPlayerSquares.graphics.clear();
		},
		renderAdjacentOppositionSquares: function(selectedPlayer, grids) {

			var adjacentSquares = this.getAdjacentSquares(grids), 
			adjacentLength = adjacentSquares.length,
			validSquaresArray = [], 
			gridEntities, gridEntity, 
			x, y,
			entitiesLength;

			while(adjacentLength--) {

				x = adjacentSquares[adjacentLength][0];

				y = adjacentSquares[adjacentLength][1];

				if (typeof this.space[x] === 'undefined' || typeof this.space[x][y] === 'undefined') {
					continue;
				}

				z = this.space[x][y];

				gridEntities = Helpers.castGridEntityHelper(z);

				entitiesLength = gridEntities.length;

				while (entitiesLength--) {

					if (gridEntities[entitiesLength] instanceof BBN.Player) {
				
						if (gridEntities[entitiesLength].team !== selectedPlayer.team) {
							
							validSquaresArray.push(adjacentSquares[adjacentLength]);
						}
					}
				}
			}

			this.renderSquares(this.oppositionPlayerSquares, validSquaresArray, this.unit, 'rgba(200, 0, 0, 0.5)');

		},
		getAdjacentSquares: function(grids) {
		
			var adjacentSquares = [], x = grids[0], y = grids[1];
			
			// 1 2 3
			// 4 5 6
			// 7 8 9
		
			adjacentSquares[0] = [x-1, y-1];
			adjacentSquares[1] = [x-1, y];
			adjacentSquares[2] = [x-1, y+1];
			
			adjacentSquares[3] = [x, y+1];
			adjacentSquares[4] = [x, y];
			adjacentSquares[5] = [x, y-1];
			
			adjacentSquares[6] = [x+1, y+1];
			adjacentSquares[7] = [x+1, y];
			adjacentSquares[8] = [x+1, y-1];
			
			return adjacentSquares;			
		},
		renderSelectedPlayerSquareToCursor: function(selectedPlayer, cursor) {
			var grids, path, i, board;
			if (selectedPlayer instanceof BBN.Player && selectedPlayer.hasMoved === false) {
				grids = Helpers.convertPixelsToGrids(cursor[0], cursor[1], this.unit);
				
				board = this.getBoard();

				path = a_star(selectedPlayer.location, grids, board, this.width, this.height);
				for (i = 0, pathLength = path.length; i < pathLength && i < selectedPlayer.movementAllowance; i++) {
					this.renderCursorPath(path[i].x, path[i].y);            		
            	}				
			}
		},
		renderActiveTeamPlayerSquares: function() {
			var team = this.activeTeamCache;
			if (this.selectedPlayer === null) {
				//render squares for all players
			}
		},
		getBoard: function() {
			var board = this.createBoard();
			board = this.populateBoard(board);

			return board;
		},
		createBoard: function() {
			//needs to represent entities on field
			var board = [];
			var boardWidth = this.width;
			var boardHeight = this.height;

			while (boardWidth--) {				
				boardHeight = this.height;
				board[boardWidth] = [];
				while (boardHeight--) {
					board[boardWidth][boardHeight] = 0;
				}
			}
			return board;
		},
		populateBoard: function(board) {

			//console.log(this.space);
			
			return board;
		},
		renderCursorPath: function(x, y) {
			var pathSquareColour = 'rgba(0,0,255,0.2)';
			var pixels = Helpers.convertGridsToPixels(x, y, this.unit);
			this.cursorPathSquare.graphics.beginFill(pathSquareColour);
			this.cursorPathSquare.graphics.drawRect(pixels[0], pixels[1], this.unit, this.unit);
			this.cursorPathSquare.graphics.endFill();				
		}
	}

})();