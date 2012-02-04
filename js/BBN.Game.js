
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
		activeTeam: {
			get: function() { return this._activeTeam; },
			set: function(value) { 
				if (value instanceof BBN.Team) {
					this._activeTeam = value; 
				}
			}
		}, 
		selectedPlayer: {
			get: function() { return this._selectedPlayer; },
			set: function(value) { 
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
		allPlayersCache: {
			get: function() { return this._allPlayersCache; },
			set: function(value) { 
				if (value instanceof Array) {
					this._allPlayersCache = value; 
				}
			}
		},
		forceRenderRefresh: {
			get: function() { return this._forceRenderRefresh; },
			set: function(value) { 
				if (value instanceof Boolean) {
					this._forceRenderRefresh = value; 
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
			this.activeTeam = this.teams[0];
			this.dumpPlayersOntoPitchTemp();
			this.forceRenderRefresh = false;
		},
		removeAllRenderedPlayers: function() {
			var stage = this.stage, child, count;
			count = stage.getNumChildren();
			while (count--) {
				child = stage.getChildAt(count);
				if (child.name === 'playerCircle' || child.name === 'playerNumber') {
					stage.removeChild(child);
				}				
			}
		},
		getAllPlayers: function() {

			var teams, players, teamCount, playerCount;
			var allPlayers = [];

			if (this.allPlayersCache.length > 0) {

				allPlayers = this.allPlayersCache;

			} else {

				teams = this.teams;
				teamCount = teams.length;
				while (teamCount--) {
					players = teams[teamCount].players;
					playerCount = players.length;
					while (playerCount--) {
						allPlayers.push(players[playerCount]);
					}
				}
				
				this.allPlayersCache = allPlayers;
			}

			return allPlayers;
		},
		tick: function() {
			var allPlayers = this.getAllPlayers();				
			var playerCount = allPlayers.length;
			if (this.forceRenderRefresh) {				
				this.removeAllRenderedPlayers();				
				while(playerCount--) {
					allPlayers[playerCount].refreshRender();
					allPlayers[playerCount].tick();				
				}				
				this.forceRenderRefresh = false;	
			} else {				
				while(playerCount--) {				
					allPlayers[playerCount].tick();				
				}			
			}
			this.grid.tick(this.activeTeam);
		}
	}

})();