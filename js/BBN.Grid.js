
if (typeof BBN == "undefined" || !BBN)
{
   var BBN = {};
}

(function() {

	BBN.Grid = function(width, length, pitchUnitSize) {

		var i, j;
		this.width = width;
		this.length = length;
		this.unit = pitchUnitSize;
		this.space = new Array(this.width);		
		for (i = 0; i < this.width; i++) {
			this.space[i] = new Array(this.length);
			for (j = 0; j < this.space[i].length; j++) {
				this.space[i][j] = [];
			}
		}
	}
	
	BBN.Grid.prototype.renderCursor = function(x, y, unit, stage) {
		
		stage.removeAllChildren();
		
		var pixels = _convertGridsToPixels(x, y, unit);
		
		var shape = new Shape();
		shape.graphics.beginFill("rgba(0,0,0,0.5)");
		shape.graphics.drawRect(pixels[0], pixels[1], unit, unit);
		shape.graphics.endFill();
		
		stage.addChild(shape);
		
		stage.update();
	}	

	BBN.Grid.prototype.initialise = function() {

		//predicates
		// 0 ~ halfway == home
		// halfway ~ end == away

		//allocate areas of grid to teams to define home/away
		
			//count number of teams		
			//divide pitch length by number of teams		
			//define endzones
			
		//define widezone: 4 squares in from each side
		
		//define halfway line ... ?
	}

	BBN.Grid.prototype.insertEntity = function(gridX, gridY, object) {	
		try {	
			if (!object instanceof BBN.Player && !object instanceof BBN.Ball) {			
				throw("BBN.Grid.prototype.insertObject() error: object not griddable");
			}		
			if (gridX > this.width) {					
				throw("BBN.Grid.prototype.insertObject() error: outside boundary");
			}		
			if (gridY > this.length) {					
				throw("BBN.Grid.prototype.insertObject() error: outside boundary");
			}
			if (object instanceof BBN.Player) {
				this.space[gridX][gridY].unshift(object);		
			} else if (object instanceof BBN.Ball) {
				this.space[gridX][gridY].push(object);
			}
		} catch(error) {	
			console.log(error);
		}
	}

	BBN.Grid.prototype.getEntityLocation = function(object) {
		var i, x, y;
		for (x = 0; x < this.width; x++) {		
			for (y = 0; y < this.length; y++) {
				for (i = 0; i < this.space[x][y].length; i++) {
					if (this.space[x][y][i] === object) {
						return [x, y, i]
					}
				}
			}
		}
		return null;
	}

	BBN.Grid.prototype.removeEntity = function(object) {	
		var i, x, y, location;
		try {		
			location = this.getEntityLocation(object);	
			if (location === null) {
				throw("BBN.Grid.prototype.removeEntity() error: object not found");
			}		
			x = location[0];
			y = location[1];
			i = location[2];		
			this.space[x][y].splice(i, 1);
		} catch(error) {	
			console.log(error);
		}
	}	
		
	BBN.Grid.prototype.moveEntity = function(destinationGridX, destinationGridY, object) {
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
	}	
		
	BBN.Grid.prototype.getGridX = function(x) {
		if (x < 1) { x = 1; }
		return Math.floor(x/this.unit);
	}
	BBN.Grid.prototype.getGridY = function(y) {
		if (y < 1) { y = 1; }
		return Math.floor(y/this.unit); 
	}
	BBN.Grid.prototype.getX = function(gridX) {
		if (gridX < 0) { gridX = 0; }
		return gridX*this.unit;
	}
	BBN.Grid.prototype.getY = function(gridY) {
		if (gridY < 0) { gridY = 0; }  
		return gridY*this.unit;
	}
})();