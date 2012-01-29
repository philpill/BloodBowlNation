
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
		selectedPlayerSquare: {
			get: function() { return this._selectedPlayer; },
			set: function(value) { 
				//test instanceof EaselJS Shape
				this._selectedPlayer = value;
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
		moveEntity: function(destinationGridX, destinationGridY, object) {
			var player, ball;
			if (!object instanceof BBN.Player && !object instanceof BBN.Ball) {		
				throw("BBN.Grid.prototype.insertObject() error: object not griddable");
			}
			if (object instanceof BBN.Player) {
				player = object;	
				ball = BBN.game.match.ball;
				//check ball is in possession of player and move
				if (ball.inPossessionOf === player) {
					this.removeEntity(ball);	
					this.insertEntity(destinationGridX, destinationGridY, ball);		
					//check win condition
				}
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
			var i, x, y;
			for (x = 0; x < this.width; x++) {		
				for (y = 0; y < this.height; y++) {
					for (i = 0; i < this.space[x][y].length; i++) {
						if (this.space[x][y][i] === object) {
							return [x, y, i]
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
		tick: function() {
			this.renderCursor(this.stage.mouseX, this.stage.mouseY);
			this.renderSelectedPlayerSquare();
		},
		renderCursor: function(x, y) {
			var cursorColour = 'rgba(0,0,0,0.5)';
			var grids = Helpers.convertPixelsToGrids(x, y, this.unit);
			var pixels = Helpers.convertGridsToPixels(grids[0], grids[1], this.unit);
			this.cursor.graphics.clear();
			this.cursor.graphics.beginFill(cursorColour);
			this.cursor.graphics.drawRect(pixels[0], pixels[1], this.unit, this.unit);
			this.cursor.graphics.endFill();
		},	
		renderSelectedPlayerSquare: function() {
			var grids = this.selectedPlayer.location;
			if (typeof grids !== 'undefined') {
				var playerSquareColour = 'rgba(0,0,0,0.5)';
				var pixels = Helpers.convertGridsToPixels(grids[0], grids[1], this.unit);
				this.selectedPlayerSquare.graphics.clear();
				this.selectedPlayerSquare.graphics.beginFill(playerSquareColour);
				this.selectedPlayerSquare.graphics.drawRect(pixels[0], pixels[1], this.unit, this.unit);
				this.selectedPlayerSquare.graphics.endFill();
			}
		}	
	}

})();