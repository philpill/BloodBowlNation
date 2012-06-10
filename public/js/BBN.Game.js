
define([

	'BBN.RenderEngine', 
	'BBN.Team', 
	'BBN.Player', 
	'BBN.Ball',
	'BBN.Pitch'

	], function(renderEngine, Team, Player, Ball, Pitch) {

	var Game = function (stage, grid, teams, pitch, ball) {
		this.stage = stage;
		this.grid = grid;
		this.teams = teams;
		this.pitch = pitch;
		this.ball = ball;
	}

	Game.prototype = {
		activeTeam: null,
		selectedPlayer: null,
		defender: null,
		stage: null,
		pitch: null,
		grid: null,
		teams: null,
		allPlayersCache: null,
		forceRenderRefresh: null,
		setSelectedPlayer: function(player) {
			if (player instanceof Player) {
			
				this.selectedPlayer = this.grid.selectedPlayer = player;
			}
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

			this.ball.location = [randomX, randomY];
		},
		init: function() {
			
			var i, j;

			this.renderPitch();
			this.renderBall();

			this.pitch.init();

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
		renderPitch : function() {

			renderEngine.renderPitch(this.pitch);
		},
		renderBall : function() {

			renderEngine.renderBall(this.ball);
		},		
		tick: function() {

			//console.log('Game.tick()');

			_.invoke(this.teams, 'tick');

			this.ball.tick();

			//this.grid.tick(this.activeTeam, this.selectedPlayer, this.defender);
		}
	}

	return Game;

});