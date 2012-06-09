
define(['BBN.RenderEngine', 'BBN.Team', 'BBN.Player', 'BBN.Ball'], function(renderEngine, Team, Player, Ball){

	var Game = function (stage, grid) {
		this.stage = stage;
		this.grid = grid;
		this.teams = [];
	}

	Game.prototype = {
		activeTeam: null,
		selectedPlayer: null,
		defender: null,
		stage: null,
		grid: null,
		teams: null,
		allPlayersCache: null,
		forceRenderRefresh: null,
		setSelectedPlayer: function(player) {
			if (player instanceof Player) {
			
				this.selectedPlayer = this.grid.selectedPlayer = player;
			}
		},
		generateTeams: function() {
			var player, i, team1, team2;
			this.ball = new Ball();

			team1 = new Team("Reikland Reavers");
			team2 = new Team("Orcland Raiders");

			team1.colours = ["rgba(150,150,255,1)","rgba(255,255,255,1)"];
			team2.colours = ["rgba(200,100,100,1)"];

			//needs 'proper' implementation
			team1.scoreZone = 0;
			team2.scoreZone = 25;
			
			for (i = 0; i < 11; i++) {
				player = new Player("human" + i, team1, i+1, 'human', 8);
				team1.players.push(player);
			}

			for (i = 0; i < 11; i++) {
				player = new Player("orc" + i, team2, i+1, 'orc', 8);
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

			for (i = 0, teamLength = teams.length; i < teamLength; i++) {
				
				for (j = 0, teamPlayersLength = teams[i].players.length; j < teamPlayersLength; j++) {
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

			renderEngine.renderBackground();

			this.generateTeams();
			this.renderAllPlayers();
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

			if ((this.allPlayersCache !== null) && (this.allPlayersCache.length > 0)) {

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
		renderAllPlayers : function() {

			var allPlayers, playerCount, player;

			allPlayers = this.getAllPlayers();				
			playerCount = allPlayers.length;
			
			while(playerCount--) {
				player = allPlayers[playerCount];
				renderEngine.renderPlayer(player);
			}
		},
		tick: function() {

			//console.log('Game.tick()');

			_.invoke(this.teams, 'tick');

			//this.grid.tick(this.activeTeam, this.selectedPlayer, this.defender);
		}
	}

	return Game;

});