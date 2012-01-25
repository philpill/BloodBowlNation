
if (typeof BBN == "undefined" || !BBN)
{
   var BBN = {};
}

(function() {

	BBN.Game = {
		pitchUnitSize: 20,
		canvasHeight: 26,
		canvasWidth: 15,
		gameStage: null,
		grid: null,
		teams: [],
		init: function(gameStage) {
			var i, j;			
			this.grid = new BBN.Grid(this.canvasWidth, this.canvasHeight, this.pitchUnitSize);				
			this.gameStage = gameStage;
			this.generateTeams();
			this.dumpPlayersOntoPitchTemp();
			
			this.renderQueue.push(this.wrapFunction(this.renderGrid, this, [this.teams, "rgba(255,0,0,0.5)"]));
			
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
		renderGrid: function(teams, colour) {
			var grid = this.grid,
				gridX, gridY, gridEntities, entity;
			
			if (this.selectedPlayer !== null) {
			
				//this.renderSelectedPlayerGrid();
				
				if (this.blockedPlayer !== null) {
				
					//this.renderPushBackSquares();
				}
			}
			
			for (gridX = 0; gridX < grid.space.length; gridX++) {

				for (gridY = 0; gridY < grid.space[gridX].length; gridY++) {

					gridEntities = _castGridEntityHelper(grid.space[gridX][gridY]);
				
					for (entity in gridEntities) {
							
						this.renderObject(gridEntities[entity], gridX, gridY);								
					}							
				}
			}
		},
		generateTeams: function() {
			var player, i, team1, team2;

			console.log("generateGameTemp()");

			this.ball = new BBN.Ball();

			team1 = new BBN.Team("Reikland Reavers");
			team2 = new BBN.Team("Orcland Raiders");

			team1.colours = ["rgba(0,0,255,1)","rgba(255,255,255,1)"];

			//needs 'proper' implementation
			team1.scoreZone = 0;
			team2.scoreZone = 25;
			
			for (i = 0; i < 11; i++) {
				player = new BBN.Player("human" + i, team1, i+1);
				team1.players.push(player);
			}

			for (i = 0; i < 11; i++) {
				player = new BBN.Player("orc" + i, team2, i+1);
				team2.players.push(player);
			}

			this.teams.push(team1);
			this.teams.push(team2);

			console.log(this.teams);

			//localStorage["teams"] = JSON.stringify(this.teams);
		},
		dumpPlayersOntoPitchTemp: function() {

			console.log('dumpPlayersOntoPitchTemp()');
		
			var i, j, x, y, grid, gridX, gridY, player, teams, gameContext, halfWayY, OffSetX, OffSetY;


			teams = this.teams;
			grid = this.grid;
			pitchUnitSize = this.pitchUnitSize;
			
			OffSetX = 2;
			OffSetY = -1;

			halfWayY = Math.floor(grid.space[0].length/2);

			for (i = 0; i < teams.length; i++) {
				
				for (j = 0; j < teams[i].players.length; j++) {
					//console.log('[' + i + '][' + j + ']');
					x = (j*pitchUnitSize)+pitchUnitSize/2;
					y = (i*pitchUnitSize)+pitchUnitSize/2;
					gridX = grid.getGridX(x);
					gridY = grid.getGridY(y);
					grid.space[gridX+OffSetX][gridY+halfWayY+OffSetY].push(teams[i].players[j]);							
				}
			}

			var randomX, randomY;

			randomX = Math.floor(Math.random()*(grid.space.length - 1));
			randomY = Math.floor(Math.random()*(grid.space[0].length/2 - 1));

			if (grid.space[randomX][randomY].length > 0) {
				//ball's fallen onto a player
				console.log("ball's landed on " + grid.space[randomX][randomY][0].name + " - do something");
				player = _castPlayerHelper(grid.space[randomX][randomY])[0];
				player.pickUpBall(this.ball);
			}

			grid.insertEntity(randomX, randomY, this.ball);
		},
		renderObject: function(object, gridX, gridY) {				
			if (object instanceof BBN.Player) {
				this.renderPlayer(gridX, gridY);					
			} else if (object instanceof BBN.Ball) {
				this.renderBall(gridX, gridY);					
			}
		},
		renderPlayer: function(gridX, gridY) {
		
			try {
			
				var teamColours = ["rgba(255, 255, 255, 1)"],
					player,
					//canvasContext = this.canvasContext,
					grid = this.grid,
					gridUnit = grid.unit,
					x, y, i;

				x = (gridX*gridUnit)+gridUnit/2;
				y = (gridY*gridUnit)+gridUnit/2;
				
				player = _castPlayerHelper(grid.space[gridX][gridY]);
				
				if (player === null) {
				
					throw "match.renderPlayer() error: player at grid.space[" + gridX + "][" + gridY + "] === null";
				}
				
				teamColours = player.colours;
				
				//renderedColours = canvasContext.createLinearGradient(x, y, x+gridUnit/32, y);
				
				for (i = 0; i < teamColours.length; i++) {

					if (i > 1) { break; } //not sure what to do if there are more than two colours

					if (i % 2) {
						//renderedColours.addColorStop(0, teamColours[i]);
						//renderedColours.addColorStop(0.5, teamColours[i]);
					} else {
						//renderedColours.addColorStop(0.5, teamColours[i]);
						//renderedColours.addColorStop(1, teamColours[i]);
					}
				}

				//canvasContext.beginPath();
				//canvasContext.arc(x, y, gridUnit/4, 0, Math.PI * 2, false);
				//canvasContext.closePath();

				//canvasContext.fillStyle = renderedColours;
				//canvasContext.fill();
				//canvasContext.strokeStyle = "rgba(0,0,0,1)";
				//canvasContext.stroke();

				//canvasContext.beginPath();
				//canvasContext.arc(x, y, gridUnit/4 + 1, 0, Math.PI * 2, false);

				//canvasContext.strokeStyle = "rgba(255,255,255,1)";
				//canvasContext.stroke();
				//canvasContext.closePath();

				//canvasContext.font = "6px Arial";
				//canvasContext.textBaseline = "middle";
				//canvasContext.textAlign = "center";
				//canvasContext.fillStyle = "black";
				
				//canvasContext.save();

				if (player.isProne) {
					//canvasContext.translate(x, y);
					//canvasContext.rotate(90 * Math.PI / 180);
					//canvasContext.fillText(player.number, 0, 0);
				
				} else if (player.isStunned) {
				
					//canvasContext.translate(x, y);
					//canvasContext.rotate(180 * Math.PI / 180);
					//canvasContext.fillText(player.number, 0, 0);
					
				} else {
				
					//canvasContext.fillText(player.number, x, y);
				}					
				
				//canvasContext.restore();
			
			} catch(error) {
			
				console.log(error);
			}
		},
		renderBall: function(gridX, gridY) {
			var teamColours,
				//canvasContext = this.canvasContext,
				grid = this.grid,
				gridUnit = grid.unit,
				x, y;

			x = (gridX*gridUnit)+gridUnit/2;
			y = (gridY*gridUnit)+gridUnit/2;

			//canvasContext.beginPath();
			//canvasContext.arc(x, y, gridUnit/4, 0, Math.PI * 2, false);
			//canvasContext.closePath();

			//canvasContext.beginPath();
			//canvasContext.arc(x+gridUnit/4, y+gridUnit/4, gridUnit/8 + 1, 0, Math.PI * 2, false);
			//canvasContext.fillStyle = "rgba(255,255,0,1)";
			//canvasContext.fill();
			//canvasContext.strokeStyle = "rgba(0,0,0,1)";
			//canvasContext.stroke();
			//canvasContext.closePath();					

		},
	}
	
})();