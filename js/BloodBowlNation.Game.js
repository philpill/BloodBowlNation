
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
			this.ball = new BBN.Ball();

			team1 = new BBN.Team("Reikland Reavers");
			team2 = new BBN.Team("Orcland Raiders");

			team1.colours = ["rgba(0,0,255,0.2)","rgba(255,255,255,1)"];
			team2.colours = ["rgba(255,0,0,0.7)"];

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

			var i, j, x, y, grid, gridX, gridY, player, teams, gameContext, halfWayY, OffSetX, OffSetY;

			teams = this.teams;
			grid = this.grid;
			pitchUnitSize = this.pitchUnitSize;
			
			OffSetX = 2;
			OffSetY = -1;

			halfWayY = Math.floor(grid.space[0].length/2);

			for (i = 0; i < teams.length; i++) {
				
				for (j = 0; j < teams[i].players.length; j++) {
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
					grid = this.grid,
					gridUnit = grid.unit,
					x, y, i,
					circle,
					graphics = new Graphics();

				x = (gridX*gridUnit)+gridUnit/2;
				y = (gridY*gridUnit)+gridUnit/2;
				
				player = _castPlayerHelper(grid.space[gridX][gridY]);
				
				if (player === null) {
				
					throw "match.renderPlayer() error: player at grid.space[" + gridX + "][" + gridY + "] === null";
				}
				
				teamColours = player.colours;
				
				if (teamColours.length === 2) {
					graphics.beginLinearGradientFill([teamColours[0],teamColours[1]], [0, 0], x, y, x+3, y);				
				} else {
				
					graphics.beginFill(teamColours[0]);
				}
				
				graphics.setStrokeStyle(1).beginStroke("#fff");
				graphics.drawCircle(x,y,7);
				graphics.endStroke();
				graphics.setStrokeStyle(1).beginStroke("#000");
				graphics.drawCircle(x,y,6);
				graphics.endStroke();
				
				circle = new Shape(graphics);
				circle.shadow = new Shadow('#000', 0, 0, 1);
				
				var playerNumber = new Text();
				playerNumber.text = player.number;
				playerNumber.color = '#000';
				playerNumber.font = 'bold 7px Arial';
				playerNumber.textAlign = 'center';
				playerNumber.textBaseline  = 'middle';
				playerNumber.x = x;
				playerNumber.y = y;	
				playerNumber.shadow = new Shadow('#fff', 0, 0, 4);
				
				if (player.isProne) {
					playerNumber.rotation = 90;				
				
				} else if (player.isStunned) {
					playerNumber.rotation = 180;				
					
				}
				
				this.gameStage.addChild(circle);
				
				this.gameStage.addChild(playerNumber);
				
				this.gameStage.update();
			
			} catch(error) {
			
				console.log(error);
			}
		},
		renderBall: function(gridX, gridY) {
		
			var teamColours,
				grid = this.grid,
				gridUnit = grid.unit,
				x, y,
				circle,
				graphics = new Graphics();

			x = (gridX*gridUnit)+gridUnit/2;
			y = (gridY*gridUnit)+gridUnit/2;

			graphics.beginFill('rgba(255,255,0,1)');
				
			graphics.setStrokeStyle(1).beginStroke('#000');
			
			graphics.drawCircle(x+4,y+4,4);

			graphics.endStroke();
			
			circle = new Shape(graphics);
			
			this.gameStage.addChild(circle);
		},
	}
	
})();