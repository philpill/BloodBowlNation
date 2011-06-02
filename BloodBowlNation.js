var bloodBowlNation = bloodBowlNation || (function(){

	Team = function(teamName) {
		this.name = teamName;
		this.players = [];
		this.colours = ["rgba(255,0,0,1)"];
		
	}
	Team.prototype.shout = function() {
		console.log(this.name);
	}
	
	Player = function(playerName, team, playerNumber) {
		this.name = playerName;
		this.colours = team.colours;
		this.number = playerNumber;
		this.team = team;
	}		
	Player.prototype.onSelect = function() {
		console.log(this.name + " selected");
	}
	
	Ball = function() {
		this.colour = "rgba(255,255,0,1)";
	}
	
	Grid = function(width, length, pitchUnitSize) {
		var i, i;
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
	
	return {
		pitchCanvas: null,
		pitchCanvasContext: null,
		canvas: null,
		canvasContext: null,
		init: function() {
			this.pitchCanvas = document.getElementById("PitchCanvas");
			this.pitchCanvas.reset = function() { this.width = this.width; } //this way of resetting the canvas is stupid
			this.canvas = document.getElementById("GameCanvas");
			this.canvas.reset = function() { this.width = this.width; } //again, stupid
			this.canvasContext = this.canvas.getContext("2d");
			this.pitchCanvasContext = this.pitchCanvas.getContext("2d");
			this.game.init(this.canvas, this.canvasContext, this.pitchCanvas, this.pitchCanvasContext);
		},
		game: {
<<<<<<< HEAD
		pitchUnitSize: 20,
		canvasHeight: 26,
		canvasWidth: 15,
		grid: null,
		init: function(canvas, canvasContext, pitchCanvas, pitchCanvasContext) {
			var i, j;			
			this.grid = new Grid(this.canvasWidth, this.canvasHeight, this.pitchUnitSize);
			this.pitch.init(pitchCanvas, pitchCanvasContext, this);
			this.match.init(canvas, canvasContext, this);
			this.render();
		},
		wrapFunction: function(fn, context, params) {
			return function() {
				fn.apply(context, params);
			};
		},
		renderQueue: [],
		render: function() {
			for (var i = 0; i < this.renderQueue.length; i++){
				if (typeof this.renderQueue[i] === "function" ) {
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
			ball: null,
			selectedPlayer: null,
			renderPlayer: function(gridX, gridY) {
				var teamColours,
					canvasContext = this.canvasContext,
					grid = this.gameContext.grid,
					gridUnit = grid.unit,
					x, y, i;
				
				x = (gridX*gridUnit)+gridUnit/2;
				y = (gridY*gridUnit)+gridUnit/2;
								
				teamColours = grid.space[gridX][gridY][0].colours;
									
				renderedColours = canvasContext.createLinearGradient(x, y, x+gridUnit/32, y);
				
				for (i = 0; i < teamColours.length; i++) {
					
					if (i > 1) { break; } //not sure what to do if there are more than two colours
				
					if (i % 2) {
						renderedColours.addColorStop(0, teamColours[i]);
						renderedColours.addColorStop(0.5, teamColours[i]);
					} else {
						renderedColours.addColorStop(0.5, teamColours[i]);
						renderedColours.addColorStop(1, teamColours[i]);
					}
				}

				canvasContext.beginPath();
				canvasContext.arc(x, y, gridUnit/4, 0, Math.PI * 2, false);
				canvasContext.closePath();
				
				canvasContext.fillStyle = renderedColours;
				canvasContext.fill();
				canvasContext.strokeStyle = "rgba(0,0,0,1)";
				canvasContext.stroke();
				
				canvasContext.beginPath();
				canvasContext.arc(x, y, gridUnit/4 + 1, 0, Math.PI * 2, false);
				
				canvasContext.strokeStyle = "rgba(255,255,255,1)";
				canvasContext.stroke();
				canvasContext.closePath();
				
				canvasContext.font = "6px Arial";
				canvasContext.textBaseline = "middle";
				canvasContext.textAlign = "center";
				canvasContext.fillStyle = "black";
				canvasContext.fillText(grid.space[gridX][gridY].number, x, y);		
				
			},
			renderBall: function(gridX, gridY) {
				var teamColours,
					canvasContext = this.canvasContext,
					grid = this.gameContext.grid,
					gridUnit = grid.unit,
					x, y;

				x = (gridX*gridUnit)+gridUnit/2;
				y = (gridY*gridUnit)+gridUnit/2;
				
				canvasContext.beginPath();
				canvasContext.arc(x, y, gridUnit/4, 0, Math.PI * 2, false);
				canvasContext.closePath();
			
				canvasContext.beginPath();
				canvasContext.arc(x+gridUnit/4, y+gridUnit/4, gridUnit/8 + 1, 0, Math.PI * 2, false);
				canvasContext.fillStyle = grid.space[gridX][gridY].colour;
				canvasContext.fill();
				canvasContext.strokeStyle = "rgba(0,0,0,1)";
				canvasContext.stroke();
				canvasContext.closePath();					
				
			},
			renderGrid: function(teams, colour) {
				var canvasContext = this.canvasContext,
					grid = this.gameContext.grid,
					gridUnit = grid.unit,
					gridX, gridY;
				
				for (gridX = 0; gridX < grid.space.length; gridX++) {

					for (gridY = 0; gridY < grid.space[gridX].length; gridY++) {
					
						if (grid.space[gridX][gridY].length !== 0) {

							if (grid.space[gridX][gridY] instanceof Player) {
							
								this.renderPlayer(gridX, gridY);
								
							} else if (grid.space[gridX][gridY] instanceof Ball) {

								this.renderBall(gridX, gridY);
							}
						}
					}
				}
			},
			deselectPlayer: function() {
				this.gameContext.match.selectedPlayer = null;
			},
			canvasClick: function(e) {
				
				var that = e.data.that;
				var grid = that.gameContext.grid;
				
				var position = $("#PitchCanvas").position();
				var parentPosition = $("#Container").offset();
				
				var left = e.pageX - position.left - parentPosition.left;
				var top = e.pageY - position.top - parentPosition.top;
				
				//work out grid position
				var leftGrid = Math.floor(left/that.gameContext.pitchUnitSize);
				var topGrid = Math.floor(top/that.gameContext.pitchUnitSize);
				
				var movementLimit = 1;
				
				var isEmptySquare, isOutOfBounds, isWithinMovementLimit;
				
				var i;
				
				var player;
				
				isOutOfBounds = (leftGrid>=grid.space.length-1 || topGrid>=grid.space[0].length-1);
				
				if (isOutOfBounds) {
					that.deselectPlayer();
				} else {
					isEmptySquare = (grid.space[leftGrid][topGrid]===null);
				
					//check for playerSelected
					if (that.selectedPlayer) {
						if (isEmptySquare) {
							//move player
							width:
							for (i = 0; i < grid.space.length; i++) {
								length:
								for (j = 0; j < grid.space[i].length; j++) {
									
									isWithinMovementLimit = (leftGrid <= i+movementLimit && leftGrid >= i-movementLimit) && (topGrid <= j+movementLimit && topGrid >= j-movementLimit)
								
									if (grid.space[i][j] === that.selectedPlayer) {
										if (!isOutOfBounds && isWithinMovementLimit) {
											grid.space[leftGrid][topGrid] = that.selectedPlayer;
											grid.space[i][j] = null;
=======
			pitchUnitSize: 20,
			canvasHeight: 26,
			canvasWidth: 15,
			grid: new Array(this.canvasWidth),
			init: function(canvas, canvasContext, pitchCanvas, pitchCanvasContext) {
				var i, j;
				var test = new Grid(15, 26, 20);
				console.log(test);
				for (i = 0; i <= this.canvasWidth; i++) {
					this.grid[i] = new Array(this.canvasHeight);
				}
				for (i = 0; i <= this.canvasWidth; i++) {
					for (j = 0; j <= this.canvasHeight; j++) {
						this.grid[i][j] = null;
					}
				}

				this.pitch.init(pitchCanvas, pitchCanvasContext, this);
				this.match.init(canvas, canvasContext, this);
				this.render();
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
				ball: null,
				selectedPlayer: null,
				renderPlayers: function(teams, colour) {
					var gameContext = this.gameContext;
					var canvasContext = this.canvasContext;
					var grid = gameContext.grid;
					var pitchUnitSize = gameContext.pitchUnitSize
					var i, j, k, x, y, gridX, gridY, teamColours, renderedColours;
					
					for(i = 0;i < gameContext.grid.length;i++) {
						for (j = 0;j < gameContext.grid[i].length; j++) {
							if (gameContext.grid[i][j] !== null && gameContext.grid[i][j] !== undefined && gameContext.grid[i][j] !== "") {
							
								x = (i*pitchUnitSize)+pitchUnitSize/2;
								y = (j*pitchUnitSize)+pitchUnitSize/2;
								canvasContext.beginPath();
								canvasContext.arc(x, y, pitchUnitSize/4, 0, Math.PI * 2, false);
								canvasContext.closePath();

								if (gameContext.grid[i][j] instanceof Player) {
								
									teamColours = gameContext.grid[i][j].colours;
										
									renderedColours = canvasContext.createLinearGradient(x,y,x+pitchUnitSize/32,y);
									
									for (k = 0; k < teamColours.length; k++) {
										
										if (k > 1) { break; } //not sure what to do if there are more than two colours
									
										if (k%2) {

											renderedColours.addColorStop(0, teamColours[k]);
											renderedColours.addColorStop(0.5, teamColours[k]);
										} else {

											renderedColours.addColorStop(0.5, teamColours[k]);
											renderedColours.addColorStop(1, teamColours[k]);
										}
									}

									canvasContext.fillStyle = renderedColours;
									canvasContext.fill();
									canvasContext.strokeStyle = "rgba(0,0,0,1)";
									canvasContext.stroke();
									
									canvasContext.beginPath();
									canvasContext.arc(x, y, pitchUnitSize/4 + 1, 0, Math.PI * 2, false);
									
									canvasContext.strokeStyle = "rgba(255,255,255,1)";
									canvasContext.stroke();
									canvasContext.closePath();
									
									canvasContext.font = "6px Arial";
									canvasContext.textBaseline = "middle";
									canvasContext.textAlign = "center";
									canvasContext.fillStyle = "black";
									canvasContext.fillText(gameContext.grid[i][j].number, x, y);
									
								} else if (gameContext.grid[i][j] instanceof Ball) {
								
									canvasContext.beginPath();
									canvasContext.arc(x+pitchUnitSize/4, y+pitchUnitSize/4, pitchUnitSize/8 + 1, 0, Math.PI * 2, false);
									canvasContext.fillStyle = gameContext.grid[i][j].colour;
									canvasContext.fill();
									canvasContext.strokeStyle = "rgba(0,0,0,1)";
									canvasContext.stroke();
									canvasContext.closePath();
								}
							}
						}
					}
				},
				deselectPlayer: function() {
					this.gameContext.match.selectedPlayer = null;
				},
				canvasClick: function(e) {
					
					var that = e.data.that;
					var grid = that.gameContext.grid;
					
					var position = $("#PitchCanvas").position();
					var parentPosition = $("#Container").offset();
					
					var left = e.pageX - position.left - parentPosition.left;
					var top = e.pageY - position.top - parentPosition.top;
					
					//work out grid position
					var leftGrid = Math.floor(left/that.gameContext.pitchUnitSize);
					var topGrid = Math.floor(top/that.gameContext.pitchUnitSize);
					
					var movementLimit = 1;
					
					var isEmptySquare, isOutOfBounds, isWithinMovementLimit;
					
					var i;
					
					var player;
					
					isOutOfBounds = (leftGrid>=grid.length-1 || topGrid>=grid[0].length-1);
					
					if (isOutOfBounds) {
						that.deselectPlayer();
					} else {
						isEmptySquare = (grid[leftGrid][topGrid]===null || grid[leftGrid][topGrid]==="" && grid[leftGrid][topGrid]===undefined);
					
						//check for playerSelected
						if (that.selectedPlayer) {
							if (isEmptySquare) {
								//move player
								width:
								for (i = 0; i < grid.length; i++) {
									length:
									for (j = 0; j < grid[i].length; j++) {
										
										isWithinMovementLimit = (leftGrid <= i+movementLimit && leftGrid >= i-movementLimit) && (topGrid <= j+movementLimit && topGrid >= j-movementLimit)
									
										if (grid[i][j] === that.selectedPlayer) {
											if (!isOutOfBounds && isWithinMovementLimit) {
												grid[leftGrid][topGrid] = that.selectedPlayer;
												grid[i][j] = null;
											}
											break width;
>>>>>>> 811598b1c95c332a9c36757b30aecadf82b56d54
										}
									}
								}
							} else if (grid[leftGrid][topGrid] instanceof Ball) {
								//pick up ball, or something
							} else if (grid[leftGrid][topGrid] === that.selectedPlayer) {
								//self - do nothing probably
							} else if (grid[leftGrid][topGrid] instanceof Player) {
							
								//if other teamm
								//BLOCK
							
							} else {

							}
<<<<<<< HEAD
						} else if (grid.space[leftGrid][topGrid] instanceof Ball) {
							//pick up ball, or something
						} else if (grid.space[leftGrid][topGrid] === that.selectedPlayer) {
							//self - do nothing probably
						} else if (grid.space[leftGrid][topGrid] instanceof Player) {
						
							//if other teamm
							//BLOCK
						
						} else {

						}
					} else {
						//no player selected
						//check to see if there's anything in this space
						if (!isEmptySquare) {
							
							if (grid.space[leftGrid][topGrid] instanceof Player) {
								player = grid.space[leftGrid][topGrid];
								player.onSelect = that.gameContext.match.playerSelect;
								that.gameContext.match.selectedPlayer = player;
=======
						} else {
							//no player selected
							//check to see if there's anything in this space
							if (!isEmptySquare) {
								
								if (grid[leftGrid][topGrid] instanceof Player) {
									player = grid[leftGrid][topGrid];
									player.onSelect = that.gameContext.match.playerSelect;
									that.gameContext.match.selectedPlayer = player;
								}
>>>>>>> 811598b1c95c332a9c36757b30aecadf82b56d54
							}
						}
					}
				},
				canvasMouseMove: function(e) {
				
					var that = e.data.that;
					var grid = that.gameContext.grid;
					var unit = that.gameContext.pitchUnitSize;
					var canvasContext = that.canvasContext;
					var canvas = that.canvas;
					
					var position = $("#PitchCanvas").position();
					var parentPosition = $("#Container").offset();
					
					var left = e.pageX - position.left - parentPosition.left;
					var top = e.pageY - position.top - parentPosition.top;
					
					//work out grid position
					var leftGridRender = Math.ceil(left/unit) * unit - unit;
					var topGridRender = Math.ceil(top/unit) * unit - unit;

<<<<<<< HEAD
				var leftGrid = Math.floor(left/unit);
				var topGrid = Math.floor(top/unit);
				
				var i, j, x, y;
				
				var gridCursorFillStyle = "rgba(0,0,0,0.7)";
				
				var outOfBounds = (leftGrid>=grid.space.length-1 || topGrid>=grid.space[0].length-1);
=======
					var leftGrid = Math.floor(left/unit);
					var topGrid = Math.floor(top/unit);
					
					var i, j, x, y;
					
					var gridCursorFillStyle = "rgba(0,0,0,0.7)";
					
					var outOfBounds = (leftGrid>=grid.length-1 || topGrid>=grid[0].length-1);
>>>>>>> 811598b1c95c332a9c36757b30aecadf82b56d54

					canvas.reset();

<<<<<<< HEAD
				if (!outOfBounds) {
					canvasContext.beginPath();
					canvasContext.fillStyle = gridCursorFillStyle;
					canvasContext.fillRect(leftGridRender, topGridRender, unit, unit);
					canvasContext.closePath();
				}
				
				//get selected player
				//console.log(that.gameContext.match.selectedPlayer);
				
				//find grid for selected player
				
				if (that.gameContext.match.selectedPlayer !== null) {
					width:
					for (i = 0; i < grid.space.length; i++) {
						length:
						for (j = 0; j < grid.space[i].length; j++) {
							if (grid.space[i][j] === that.gameContext.match.selectedPlayer) {
								x = i*unit;
								y = j*unit;
=======
					if (!outOfBounds) {
						canvasContext.beginPath();
						canvasContext.fillStyle = gridCursorFillStyle;
						canvasContext.fillRect(leftGridRender, topGridRender, unit, unit);
						canvasContext.closePath();
					}
					
					//get selected player
					//console.log(that.gameContext.match.selectedPlayer);
					
					//find grid for selected player
					
					if (that.gameContext.match.selectedPlayer !== null) {
						width:
						for (i = 0; i < grid.length; i++) {
							length:
							for (j = 0; j < grid[i].length; j++) {
								if (grid[i][j] === that.gameContext.match.selectedPlayer) {
									x = i*unit;
									y = j*unit;
>>>>>>> 811598b1c95c332a9c36757b30aecadf82b56d54

									//render little square under selected player
									//canvasContext.beginPath();
									canvasContext.fillStyle = gridCursorFillStyle;
									canvasContext.fillRect(x, y, unit, unit);
									canvasContext.stroke();
									//canvasContext.closePath();
									
									//render valid movement squares around selected player
									canvasContext.fillStyle = "rgba(100,170,255,0.5)";
									canvasContext.fillRect(x-unit, y-unit, unit, unit);
									canvasContext.fillRect(x-unit, y, unit, unit);
									canvasContext.fillRect(x-unit, y+unit, unit, unit);
									canvasContext.fillRect(x, y+unit, unit, unit);
									canvasContext.fillRect(x, y-unit, unit, unit);
									canvasContext.fillRect(x+unit, y+unit, unit, unit);
									canvasContext.fillRect(x+unit, y, unit, unit);
									canvasContext.fillRect(x+unit, y-unit, unit, unit);
									canvasContext.stroke();
									
									
									break width;
								}
							}
						}
					}
					
					that.gameContext.render();
				},
				generateGameTemp: function() {
					var player, i, gameContext, grid, pitchUnitSize, pitchRow;

<<<<<<< HEAD
				console.log("generateGameTemp()");
				
				this.ball = new Ball();
				
				var team1 = new Team("Reikland Reavers");
				var team2 = new Team("Orcland Raiders");
				
				team1.shout();
				team2.shout();
				
				team1.colours = ["rgba(0,0,255,1)","rgba(255,255,255,1)"];
				
				for (i = 0; i < 11; i++) {
					player = new Player("human" + i, team1, i+1);
					team1.players.push(player);
				}

				for (i = 0; i < 11; i++) {
					player = new Player("orc" + i, team2, i+1);
					team2.players.push(player);
				}
=======
					console.log("generateGameTemp()");
					
					this.ball = new Ball();
					
					var team1 = new Team("Reikland Reavers");
					var team2 = new Team("Orcland Raiders");
					
					team1.shout();
					team2.shout();
					
					team1.colours = ["rgba(0,0,255,1)","rgba(255,255,255,1)"];
					
					for (i = 0; i < 11; i++) {
						player = new Player("human" + i, team1.colours, i+1);
						team1.players.push(player);
					}

					for (i = 0; i < 11; i++) {
						player = new Player("orc" + i, team2.colours, i+1);
						team2.players.push(player);
					}
>>>>>>> 811598b1c95c332a9c36757b30aecadf82b56d54

					this.teams.push(team1);
					this.teams.push(team2);
					
					localStorage["teams"] = JSON.stringify(this.teams);
				},
				dumpPlayersOntoPitchTemp: function() {

					var i, j, x, y, gridX, gridY, teams, gameContext, halfWayY, OffSetX, OffSetY;

<<<<<<< HEAD
				gameContext = this.gameContext;
				teams = this.teams;
				grid = gameContext.grid;
				pitchUnitSize = gameContext.pitchUnitSize;
				OffSetX = 2;
				OffSetY = -1;
				
				halfWayY = Math.floor(grid.space[0].length/2);

				for (i = 0; i < teams.length; i++) {
					for (j = 0; j < teams[i].players.length; j++) {
						x = (j*pitchUnitSize)+pitchUnitSize/2;
						y = (i*pitchUnitSize)+pitchUnitSize/2;
						gridX = Math.floor(x/pitchUnitSize);
						gridY = Math.floor(y/pitchUnitSize);
						grid.space[gridX+OffSetX][gridY+halfWayY+OffSetY] = teams[i].players[j];
=======
					gameContext = this.gameContext;
					teams = this.teams;
					grid = gameContext.grid;
					pitchUnitSize = gameContext.pitchUnitSize;
					OffSetX = 2;
					OffSetY = -1;

					halfWayY = Math.floor(grid[0].length/2);

					for (i = 0; i < teams.length; i++) {
						for (j = 0; j < teams[i].players.length; j++) {
							x = (j*pitchUnitSize)+pitchUnitSize/2;
							y = (i*pitchUnitSize)+pitchUnitSize/2;
							gridX = Math.floor(x/pitchUnitSize);
							gridY = Math.floor(y/pitchUnitSize);
							grid[gridX+OffSetX][gridY+halfWayY+OffSetY] = teams[i].players[j];
						}
>>>>>>> 811598b1c95c332a9c36757b30aecadf82b56d54
					}

<<<<<<< HEAD
				var randomX, randomY;
				
					randomX = Math.floor(Math.random()*(grid.space.length - 1));
					randomY = Math.floor(Math.random()*(grid.space[0].length/2 - 1));
					
				if (grid.space[randomX][randomY].length > 0) {
					//ball's fallen onto a player
					console.log("ball's landed on " + grid.space[randomX][randomY][0].name + " - do something");
				}
				
				grid.space[randomX][randomY] = this.ball;
				
			},
			rehydratePlayers: function() {
				var i, j, player, teams = [], JSONteams = JSON.parse(localStorage["teams"]);
								
				console.log("rehydratePlayers()");
								
				this.ball = new Ball();
				
				for (i = 0; i < JSONteams.length; i++) {				
					teams[i] = new Team(JSONteams[i].name);				
					for (j = 0; j < JSONteams[i].players.length; j++) {					
						player = new Player(JSONteams[i].players[j].name, JSONteams[i].players[j].colours, JSONteams[i].players[j].number);					
						teams[i].players.push(player);
					}					
				}				
				this.teams = teams;
			},
			init: function(canvas, canvasContext, gameContext) {
				var i;
				this.gameContext = gameContext;
				this.canvas = canvas;
				this.canvasContext = canvasContext;

				if (localStorage["teams"] === null || localStorage["teams"] === undefined) {
					this.generateGameTemp();
				} else {
					this.rehydratePlayers();
				}
				
				this.dumpPlayersOntoPitchTemp();

				this.gameContext.renderQueue.push(gameContext.wrapFunction(this.renderGrid, this, [this.teams, "rgba(255,0,0,0.5)"]));

				$(this.canvas).mousemove({that: this}, this.canvasMouseMove);
				$(this.canvas).click({that: this}, this.canvasClick);
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
			
				var gameContext = this.gameContext,
					grid = this.gameContext.grid,
					canvas = this.controls.canvas,
					canvasContext = this.canvasContext,
					unit = this.gameContext.pitchUnitSize,
					width = this.gameContext.canvasWidth,
					height = this.gameContext.canvasHeight,
					unitBorderColour = this.unitBorderColour,
					unitFillColour = this.unitFillColour,
					boundaryLineColour = this.boundaryLineColour,
					pitchImage = new Image()
				
				pitchImage.src="Pitch.jpg";
				pitchImage.onload = function(e) {
=======
					var randomX, randomY;
					
						randomX = Math.floor(Math.random()*(grid.length - 1));
						randomY = Math.floor(Math.random()*(grid[0].length/2 - 1));
						
					if (grid[randomX][randomY] !== null) {
						//ball's fallen onto a player
						console.log("ball's landed on " + grid[randomX][randomY].name + " - do something");
					}
>>>>>>> 811598b1c95c332a9c36757b30aecadf82b56d54
					
					grid[randomX][randomY] = this.ball;
					
				},
				rehydratePlayers: function() {
					var i, j, player, teams = [], JSONteams = JSON.parse(localStorage["teams"]);
									
					console.log("rehydratePlayers()");
									
					this.ball = new Ball();
					
					for (i = 0; i < JSONteams.length; i++) {				
						teams[i] = new Team(JSONteams[i].name);				
						for (j = 0; j < JSONteams[i].players.length; j++) {					
							player = new Player(JSONteams[i].players[j].name, JSONteams[i].players[j].colours, JSONteams[i].players[j].number);					
							teams[i].players.push(player);
						}					
					}				
					this.teams = teams;
				},
				init: function(canvas, canvasContext, gameContext) {
					var i;
					this.gameContext = gameContext;
					this.canvas = canvas;
					this.canvasContext = canvasContext;

					if (localStorage["teams"] === null || localStorage["teams"] === undefined) {
						this.generateGameTemp();
					} else {
						this.rehydratePlayers();
					}

					this.dumpPlayersOntoPitchTemp();

					gameContext.renderQueue.push(gameContext.wrapFunction(this.renderPlayers, this, [this.teams, "rgba(255,0,0,0.5)"]));

					$(this.canvas).mousemove({that: this}, this.canvasMouseMove);
					$(this.canvas).click({that: this}, this.canvasClick);
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
						
						canvas.reset();
						
						//canvasContext.drawImage(pitchImage, 0, 0, unit*width, unit*height);
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
						
						canvasContext.closePath();
					}
				},
				init: function(canvas, canvasContext, gameContext) {
					this.gameContext=gameContext;
					this.unitFillColour="rgba(0,255,0,0)";
					this.unitBorderColour="rgba(0,0,0,0.1)";
					this.boundaryLineColour="rgba(255,255,255,1)";
					this.controls.canvas=canvas;
					this.canvasContext=canvasContext;
					gameContext.renderQueue.push(gameContext.wrapFunction(this.render, this));
				}
			}
		}
	}
})();