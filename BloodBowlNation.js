var bloodBowlNation = bloodBowlNation || {
	canvas: null,
	canvasContext: null,
	init: function() {
		this.canvas = document.getElementById("GameCanvas");
		this.canvasContext = this.canvas.getContext("2d");
		this.game.init(this.canvas, this.canvasContext);
	},
	player: {
		position: null,
		player: function(position) {
			this.position = position;
		}
	},
	game: {
		pitchUnitSize: 20,
		canvasHeight: 26,
		canvasWidth: 15,
		grid: new Array(this.canvasWidth),
		init: function(canvas, canvasContext) {
			var i, j;
			console.log(this.grid);
			for (i = 0; i < this.canvasWidth; i++) {
				this.grid[i] = new Array(this.canvasHeight);
			}
			for (i = 0; i < this.canvasWidth; i++) {
				for (j = 0; j < this.canvasHeight; j++) {
					this.grid[i][j] = "";
				}
			}
			this.pitch.init(canvas, canvasContext, this.pitchUnitSize, this.canvasWidth, this.canvasHeight, this.grid, this.insertPlayersTemp);
		},
		insertPlayersTemp: function(context, pitchUnitSize, grid) {
		
			var x, y;
		
			for (var i=0;i<11;i++) {
				x = (i*pitchUnitSize)+pitchUnitSize/2;
				y = pitchUnitSize+pitchUnitSize/2;
				console.log("(" + x + ", " + y + ")");
				console.log(grid);
				grid[x][y] = "x";
				context.beginPath();
				context.arc(x, y, pitchUnitSize/4, 0, Math.PI * 2, false);
				context.closePath();
				context.fillStyle = "rgba(255,0,0,0.5)";
				context.fill();
				context.strokeStyle = "rgba(0,0,0,0.3)";
				context.stroke();
			}

			for (var i=0;i<11;i++) {
				x = (i*pitchUnitSize)+pitchUnitSize/2;
				y = (2*pitchUnitSize)+pitchUnitSize/2;
				grid[x][y] = "y";
				context.beginPath();
				context.arc(x, y, pitchUnitSize/4, 0, Math.PI * 2, false);
				context.closePath();
				context.fillStyle = "rgba(0,0,255,0.5)";
				context.fill();
				context.strokeStyle = "rgba(0,0,0,0.3)";
				context.stroke();
			}
			console.log(grid);
		},
		pitch: {
			grid: null,
			leftOrigin: null,
			topOrigin: null,
			unit: null,
			height: null,
			width: null,
			unitBorderColour: null,
			unitFillColour: null,
			boundaryLineColour: null,
			canvasContext: null,
			controls: {
				canvas: null
			},
			render: function(insertPlayersTemp) {
				var grid = this.grid;
				var canvas = this.controls.canvas;
				var canvasContext = this.canvasContext;
				var unit = this.unit;
				var width = this.width;
				var height = this.height;
				var unitBorderColour = this.unitBorderColour;
				var unitFillColour = this.unitFillColour;
				var boundaryLineColour = this.boundaryLineColour;
				var pitchImage = new Image();
				pitchImage.src="Pitch.jpg";
				pitchImage.onload = function(e) {
					
					console.log(e);
				
					canvasContext.drawImage(pitchImage, 0, 0, unit*width, unit*height);
					canvasContext.beginPath();
					canvasContext.fillStyle = unitFillColour;
					canvasContext.fillRect(0,0,width*unit,height*unit);
					
					//vertical grid lines
					for (var x=0.5; x < (width*unit)+unit; x+=unit)
					{
						canvasContext.moveTo(x, 0);
						canvasContext.lineTo(x, height*unit);
					}
					//horizontal grid lines
					for (var y=0.5; y < (height*unit)+unit; y+=unit)
					{
						canvasContext.moveTo(0, y);
						canvasContext.lineTo(width*unit, y);
					}
					canvasContext.strokeStyle=unitBorderColour;
					canvasContext.stroke();
					
					//upper touchline
					canvasContext.beginPath();
					canvasContext.moveTo(0, 1*unit);
					canvasContext.lineTo(width*unit, 1*unit);
					canvasContext.strokeStyle=boundaryLineColour;
					canvasContext.stroke();
					
					//halfway line
					canvasContext.beginPath();
					canvasContext.moveTo(0, (height*unit)/2);
					canvasContext.lineTo(width*unit, (height*unit)/2);
					canvasContext.strokeStyle=boundaryLineColour;
					canvasContext.stroke();

					//lower touchline
					canvasContext.beginPath();
					canvasContext.moveTo(0, height*unit-unit);
					canvasContext.lineTo(width*unit, height*unit-unit);
					canvasContext.strokeStyle=boundaryLineColour;
					canvasContext.stroke();
					
					//left sideline
					canvasContext.beginPath();
					canvasContext.moveTo(4*unit, 0);
					canvasContext.lineTo(4*unit, unit*height);
					canvasContext.strokeStyle=boundaryLineColour;
					canvasContext.stroke();
					
					//right sideline
					canvasContext.beginPath();
					canvasContext.moveTo(11*unit, 0);
					canvasContext.lineTo(11*unit, unit*height);
					canvasContext.strokeStyle=boundaryLineColour;
					canvasContext.stroke();
					
					insertPlayersTemp(canvasContext, unit, grid);
				}
			},
			canvasClick: function(e) {
				
				var that = e.data.that;
			
				var left = e.pageX - this.offsetLeft;
				var top = e.pageY - this.offsetTop;
				console.log("(" + left + ", " + top + ")");
				
				//work out grid position
				var leftGrid = Math.ceil(left/that.unit);
				var topGrid = Math.ceil(top/that.unit);
				console.log("(" + leftGrid + ", " + topGrid + ")"); 
				
				//check to see if there's anything in this space
			},
			init: function(canvas, canvasContext, pitchUnitSize, pitchWidth, pitchHeight, grid, insertPlayersTemp) {
				this.grid=grid;
				this.unit=pitchUnitSize;
				this.height=pitchHeight;
				this.width=pitchWidth;
				this.unitFillColour="rgba(0,255,0,0)";
				this.unitBorderColour="rgba(0,0,0,0.1)";
				this.boundaryLineColour="rgba(255,255,255,1)";
				this.controls.canvas=canvas;
				this.canvasContext=canvasContext;
				$(this.controls.canvas).click({that: this}, this.canvasClick);
				this.render(insertPlayersTemp);
			}
		}
	}
} 