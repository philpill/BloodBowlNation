var bloodBowlNation = bloodBowlNation || {
	canvas: null,
	canvasContext: null,
	init: function() {
		this.canvas = document.getElementById("GameCanvas");
		this.canvasContext = this.canvas.getContext("2d");
		this.game.init(this.canvas, this.canvasContext);
	},
	game: {
		pitchUnitSize: 20,
		canvasHeight: 26,
		canvasWidth: 15,
		grid: new Array(this.canvasWidth),
		init: function(canvas, canvasContext) {
			var i, j;
			for (i = 0; i <= this.canvasWidth; i++) {
				this.grid[i] = new Array(this.canvasHeight);
			}
			for (i = 0; i <= this.canvasWidth; i++) {
				for (j = 0; j <= this.canvasHeight; j++) {
					this.grid[i][j] = "";
				}
			}
			this.pitch.init(canvas, canvasContext, this);
			this.match.init(canvas, canvasContext, this);
			this.render();
		},
		insertPlayersTemp: function(context, pitchUnitSize, grid) {
			var i, x, y, gridX, gridY;
			for (i=0;i<11;i++) {
				x = (i*pitchUnitSize)+pitchUnitSize/2;
				y = pitchUnitSize+pitchUnitSize/2;
				gridX = Math.ceil(x/pitchUnitSize);
				gridY = Math.ceil(y/pitchUnitSize);
				grid[gridX][gridY] = "x";
				context.beginPath();
				context.arc(x, y, pitchUnitSize/4, 0, Math.PI * 2, false);
				context.closePath();
				context.fillStyle = "rgba(255,0,0,0.5)";
				context.fill();
				context.strokeStyle = "rgba(0,0,0,0.3)";
				context.stroke();
			}
			for (i=0;i<11;i++) {
				x = (i*pitchUnitSize)+pitchUnitSize/2;
				y = (2*pitchUnitSize)+pitchUnitSize/2;
				gridX = Math.ceil(x/pitchUnitSize);
				gridY = Math.ceil(y/pitchUnitSize);
				grid[gridX][gridY] = "y";
				context.beginPath();
				context.arc(x, y, pitchUnitSize/4, 0, Math.PI * 2, false);
				context.closePath();
				context.fillStyle = "rgba(0,0,255,0.5)";
				context.fill();
				context.strokeStyle = "rgba(0,0,0,0.3)";
				context.stroke();
			}
		},
		wrapFunction: function(fn, context, params) {
				return function() {
						fn.apply(context, params);
				};
		},
		renderQueue: [],
		render: function() {
			for (var i = 0; i < this.renderQueue.length; i++){
				if (typeof this.renderQueue[i]=== "function" ) {
					this.renderQueue[i]();
				}
			}
		},
		match: {
			pitch: this.pitch,
			gameContext: null,
			canvas: null,
			canvasContext: null,
			teams: [],
			team: function(teamName) {
				this.name = teamName;
				this.players = [];
			},
			player: function(playerName) {
				this.name = playerName;
				this.onSelect = function() { console.log(this.name + " selected"); }
			},
			renderPlayers: function(players, pitchRow, colour) {
				var gameContext = this.gameContext;
				var canvasContext = this.canvasContext;
				var grid = gameContext.grid;
				var pitchUnitSize = gameContext.pitchUnitSize
				var i, x, y, gridX, gridY;
				for(i=0;i<players.length;i++) {
					x = (i*pitchUnitSize)+pitchUnitSize/2;
					y = (pitchRow*pitchUnitSize)+pitchUnitSize/2;
					gridX = Math.ceil(x/pitchUnitSize);
					gridY = Math.ceil(y/pitchUnitSize);
					grid[gridX][gridY] = players[i];
					canvasContext.beginPath();
					canvasContext.arc(x, y, pitchUnitSize/4, 0, Math.PI * 2, false);
					canvasContext.closePath();
					canvasContext.fillStyle = colour;
					canvasContext.fill();
					canvasContext.strokeStyle = "rgba(0,0,0,0.3)";
					canvasContext.stroke();
				}
			},
			init: function(canvas, canvasContext, gameContext) {
				
				var player = gameContext.match.player, i, team = gameContext.match.team;
				gameContext.match.gameContext = gameContext;
				gameContext.match.canvas = canvas;
				gameContext.match.canvasContext = canvasContext;
				var team1 = new team("Reikland Reavers");
				var team2 = new team("Orcland Raiders");
				
				for (i = 0; i < 11; i++) {
					team1.players.push(new player("human" + i));
				}

				for (i = 0; i < 11; i++) {
					team2.players.push(new player("orc" + i));
				}

				gameContext.match.teams.push(team1);
				gameContext.match.teams.push(team2);

				gameContext.renderQueue.push(gameContext.wrapFunction(this.renderPlayers, this, [team1.players, 1, "rgba(255,0,0,0.5)"]));
				gameContext.renderQueue.push(gameContext.wrapFunction(this.renderPlayers, this, [team2.players, 2, "rgba(0,0,255,0.5)"]));
			}
		},
		pitch: {
			gameContext: null,
			leftOrigin: null,
			topOrigin: null,
			unitBorderColour: null,
			unitFillColour: null,
			boundaryLineColour: null,
			canvasContext: null,
			controls: {
				canvas: null
			},
			render: function() {
			
				var gameContext = this.gameContext;
				var grid = this.gameContext.grid;
				var canvas = this.controls.canvas;
				var canvasContext = this.canvasContext;
				var unit = this.gameContext.pitchUnitSize;
				var width = this.gameContext.canvasWidth;
				var height = this.gameContext.canvasHeight;
				var unitBorderColour = this.unitBorderColour;
				var unitFillColour = this.unitFillColour;
				var boundaryLineColour = this.boundaryLineColour;
				var pitchImage = new Image();
				pitchImage.src="Pitch.jpg";
				pitchImage.onload = function(e) {
					
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
				}
			},
			canvasClick: function(e) {
				
				var that = e.data.that;
				var grid = that.gameContext.grid;
				
				var left = e.pageX - this.offsetLeft;
				var top = e.pageY - this.offsetTop;
				//console.log("(" + left + ", " + top + ")");
				
				//work out grid position
				var leftGrid = Math.ceil(left/that.gameContext.pitchUnitSize);
				var topGrid = Math.ceil(top/that.gameContext.pitchUnitSize);
				
				//check to see if there's anything in this space
				if (leftGrid<grid.length && grid[leftGrid][topGrid]!=="" && grid[leftGrid][topGrid]!==undefined) {
					console.log("(" + leftGrid + ", " + topGrid + "): " + grid[leftGrid][topGrid].name);
					grid[leftGrid][topGrid].onSelect();
					//make that object active
				} else {
					console.log("(" + leftGrid + ", " + topGrid + ")"); 
				}
			},
			canvasMouseMove: function(e) {
			
				var that = e.data.that;
				var grid = that.gameContext.grid;
				var unit = that.gameContext.pitchUnitSize;
				var canvasContext = that.canvasContext;
				var canvas = that.controls.canvas;
				
				
				var left = e.pageX - this.offsetLeft;
				var top = e.pageY - this.offsetTop;
				
				//work out grid position
				var leftGrid = Math.ceil(left/unit) * unit - unit;
				var topGrid = Math.ceil(top/unit) * unit - unit;

			
				//console.log("(" + leftGrid + ", " + topGrid + ")"); 
				
				//render a little coloured square at these co ordinates
				
				canvasContext.strokeStyle="rgba(0,0,0,0.1)";
				canvasContext.fillStyle="rgba(0,0,0,0.1)";
				
				canvas.width = canvas.width;
				
				that.gameContext.render();
				
				canvasContext.strokeStyle="rgba(0,0,0,0.1)";
				canvasContext.fillStyle="rgba(0,0,0,0.1)";
				
				canvasContext.fillRect(leftGrid, topGrid, unit, unit);
			},
			init: function(canvas, canvasContext, gameContext) {
				this.gameContext=gameContext;
				this.unitFillColour="rgba(0,255,0,0)";
				this.unitBorderColour="rgba(0,0,0,0.1)";
				this.boundaryLineColour="rgba(255,255,255,1)";
				this.controls.canvas=canvas;
				this.canvasContext=canvasContext;
				$(this.controls.canvas).mousemove({that: this}, this.canvasMouseMove);
				$(this.controls.canvas).click({that: this}, this.canvasClick);
				gameContext.renderQueue.push(gameContext.wrapFunction(this.render, this));
			}
		}
	}
} 