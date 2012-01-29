
if (typeof BBN == "undefined" || !BBN)
{
   var BBN = {};
}

(function() {

	BBN.Game = function(stage, grid) {
		this.stage = stage;
		this.grid = grid;
		this.teams = [];
	}

	BBN.Game.prototype = {
		selectedPlayer: {
			get: function() { return this._selectedPlayer; },
			set: function(value) { 
				//test easelJS stage
				this._selectedPlayer = value; 
			}
		},
		stage: {
			get: function() { return this._stage; },
			set: function(value) { 
				//test easelJS stage
				this._stage = value; 
			}
		},
		grid: {
			get: function() { return this._grid; },
			set: function(value) { 
				if (value instanceof BBN.Grid) {
					this._grid = value; 
				}
			}
		},
		teams: {
			get: function() { return this._teams; },
			set: function(value) { 
				if (value instanceof Array) {
					this._teams = value; 
				}
			}
		},
		generateTeams: function() {
			var player, i, team1, team2;
			this.ball = new BBN.Ball();

			team1 = new BBN.Team("Reikland Reavers");
			team2 = new BBN.Team("Orcland Raiders");

			team1.colours = ["rgba(150,150,255,1)","rgba(255,255,255,1)"];
			team2.colours = ["rgba(200,100,100,1)"];

			//needs 'proper' implementation
			team1.scoreZone = 0;
			team2.scoreZone = 25;
			
			for (i = 0; i < 11; i++) {
				player = new BBN.Player(this.stage, "human" + i, team1, i+1);
				team1.players.push(player);
			}

			for (i = 0; i < 11; i++) {
				player = new BBN.Player(this.stage, "orc" + i, team2, i+1);
				team2.players.push(player);
			}

			this.teams.push(team1);
			this.teams.push(team2);

			//console.log(this.teams);

			//localStorage["teams"] = JSON.stringify(this.teams);			

		},
		dumpPlayersOntoPitchTemp: function() {
			
			var i, j, x, y, grid, gridX, gridY, player, teams, gameContext, halfWayY, OffSetX, OffSetY, unit;

			teams = this.teams;
			grid = this.grid;
			gridUnit = grid.unit;
			
			OffSetX = 2;
			OffSetY = -1;

			halfWayY = Math.floor(grid.height/2);

			for (i = 0; i < teams.length; i++) {
				
				for (j = 0; j < teams[i].players.length; j++) {
					x = (j*gridUnit)+gridUnit/2;
					y = (i*gridUnit)+gridUnit/2;
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
		},
		init: function() {
			
			var i, j;

			BBN.RenderEngine.renderBackground();

			this.generateTeams();
			this.dumpPlayersOntoPitchTemp();
		},
		tick: function() {
			
			var team, player, players;

			var teams = this.teams;

			for (var i = 0; i< teams.length; i++){
				teams[i].tick();
				players = teams[i].players;
				for (var j = 0; j<players.length; j++) {
					players[j].tick();
				}
			}

			this.grid.selectedPlayer = this.selectedPlayer;

			this.grid.tick();
		}
	}

})();