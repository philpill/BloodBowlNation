var BLOODBOWLNATION.Grid = BLOODBOWLNATION.Grid || (function(){

	Grid = function(width, length, pitchUnitSize) {
		this.width = width;
		this.length = length;
		this.unit = pitchUnitSize;
		this.space = new Array(this.width);		
		for (var i = 0; i < this.width; i++) {
			this.space[i] = new Array(this.length);
		}
	}
	Grid.prototype.getGridX = function(x) {
		if (x < 1) { x = 1; }
		return Math.floor(x/this.unit);
	}
	Grid.prototype.getGridY = function(y) {
		if (y < 1) { y = 1; }
		return Math.floor(y/this.unit);
	}
	Grid.prototype.getX = function(gridX) {
		if (gridX < 0) { gridX = 0; }
		return gridX*this.unit;
	}
	Grid.prototype.getY = function(gridY) {
		if (gridY < 0) { gridY = 0; }  
		return gridY*this.unit;
	}	
	
})();