
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
			
			BBN.RenderEngine.renderBackground();

			this.generateTeams();
			this.dumpPlayersOntoPitchTemp();
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
				player = new BBN.Player(this.gameStage, "human" + i, team1, i+1);
				team1.players.push(player);
			}

			for (i = 0; i < 11; i++) {
				player = new BBN.Player(this.gameStage, "orc" + i, team2, i+1);
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

					teams[i].players[j].location = [gridX+OffSetX,gridY+halfWayY+OffSetY];
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
		}
	}
	
})();