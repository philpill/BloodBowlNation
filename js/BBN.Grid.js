
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

		this.cursorPathSquare = new Shape();
		this.stage.addChild(this.cursorPathSquare);	

		this.oppositionPlayerSquares = new Shape();
		this.stage.addChild(this.oppositionPlayerSquares);	
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
		selectedPlayerLocationCache: {
			get: function() { return this._selectedPlayerLocationCache; },
			set: function(value) { 
				if (typeof value instanceof Array) {
					this._selectedPlayerLocationCache = value;
				}
			}			
		},
		activeTeamCache: {
			get: function() { return this._activeTeamCache; },
			set: function(value) { 
				if (typeof value instanceof BBN.Team) {
					this._activeTeamCache = value;
				}
			}
		},
		oppositionPlayerSquares: {
			get: function() { return this._oppositionPlayerSquares; },
			set: function(value) { 
				//test instanceof EaselJS Shape
				this._oppositionPlayerSquares = value;
			}
		}, 
		selectedPlayerSquare: {
			get: function() { return this._selectedPlayer; },
			set: function(value) { 
				//test instanceof EaselJS Shape
				this._selectedPlayer = value;
			}
		},
		playerSquares: {
			get: function() { return this._playerSquares; },
			set: function(value) { 
				if (typeof value instanceof Array) {
					this._playerSquares = value;
				}
			}			
		},
		cursorPathSquare: {
			get: function() { return this._cursorPathSquare; },
			set: function(value) { 
				//test instanceof EaselJS Shape
				this._cursorPathSquare = value;
			}
		},	
		selectedPlayer: {
			get: function() { return this._selectedPlayer; },
			set: function(value) { 
				if (typeof value instanceof BBN.Player) {
					this._selectedPlayer = value;
				}
			}
		},		
		cursor: {
			get: function() { return this._cursor; },
			set: function(value) { 
				//test instanceof EaselJS Shape
				this._cursor = value;

			}
		},
		space: {
			get: function() { return this._space; },
			set: function(value) { 
				if (typeof value instanceof Array) {
					this._space = value;
				}
			}
		},
		unit: {
			get: function() { return this._unit; },
			set: function(value) { 
				if (typeof value === "number") {
					this._unit = value;
				}
			}
		},
		height: {
			get: function() { return this._height; },
			set: function(value) { 
				if (typeof value === "number") {
					this._height = value;
				}
			}
		},
		width: {
			get: function() { return this._width; },
			set: function(value) { 
				if (typeof value === "number") {
					this._width = value;
				}
			}
		},
		stage: {
			get: function() { return this._stage; },
			set: function(value) { 
				//test as instanceof easelJS stage
				this._stage = value;
			}
		},
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
		tick: function(activeTeam) {
			if (this.activeTeamCache !== activeTeam) {
				this.activeTeamCache = activeTeam;
				this.renderActiveTeamPlayerSquares()
			}
			this.renderCursor(this.stage.mouseX, this.stage.mouseY);
			if (this.selectedPlayer instanceof BBN.Player) {
				this.renderSelectedPlayerSquare();
				this.cursorPathSquare.graphics.clear();
				this.renderSelectedPlayerSquareToCursor([this.stage.mouseX, this.stage.mouseY]);
			} else {
				this.clearSelectedPlayerSquare();
				this.renderActiveTeamPlayerSquares();
			}
		},
		clearSelectedPlayerSquare: function() {
			this.selectedPlayerSquare.graphics.clear();
		},
		renderCursor: function(x, y) {
			var cursorColour = 'rgba(200, 200, 200, 1)';
			var grids = Helpers.convertPixelsToGrids(x, y, this.unit);
			this.renderBox(this.cursor, [grids], this.unit, cursorColour);
		},	
		renderSelectedPlayerSquare: function() {
			var grids = this.selectedPlayer.location;
			if (typeof grids === 'undefined') {
				this.selectedPlayerSquare.graphics.clear();
			} else {
				var playerSquareColour = 'rgba(0, 0, 0, 0.5)';
				this.renderSquares(this.selectedPlayerSquare, [grids], this.unit, playerSquareColour);
			}
			this.renderAdjacentOppositionSquares(grids);
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
		renderAdjacentOppositionSquares: function(grids) {

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
				
						if (gridEntities[entitiesLength].team !== this.selectedPlayer.team) {
							
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
		renderSelectedPlayerSquareToCursor: function(cursor) {
			var grids, path, i, board;
			if (this.selectedPlayer instanceof BBN.Player && this.selectedPlayer.hasMoved === false) {
				grids = Helpers.convertPixelsToGrids(cursor[0], cursor[1], this.unit);
				
				board = this.getBoard();

				path = a_star(this.selectedPlayer.location, grids, board, this.width, this.height);
				for (i = 0, pathLength = path.length; i < pathLength && i < this.selectedPlayer.movementAllowance; i++) {
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