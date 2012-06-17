
define([

	'BBN.Team', 
	'BBN.Player', 
	'BBN.Ball',
	'BBN.Pitch'

	], function(Team, Player, Ball, Pitch) {

	var Game = function (stage, grid, teams, pitch, ball) {
		this.stage = stage;
		this.grid = grid;
		this.teams = teams;
		this.pitch = pitch;
		this.ball = ball;
		this.allPlayersCache = [];
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

			this.renderPitch();
			this.renderBall();
			this.renderPlayers();

			this.pitch.init();
			
			this.activeTeam = this.teams[0];
			this.dumpPlayersOntoPitchTemp();
			this.forceRenderRefresh = false;
		},
		getAllPlayers: function() {

			var allPlayers = [];

			if (this.allPlayersCache.length > 0) {

				allPlayers = this.allPlayersCache;

			} else {

				var teams = this.teams;

				_.each(teams, function(team) {

					allPlayers = _.union(allPlayers, team.players);
				});
				
				this.allPlayersCache = allPlayers;
			}

			return allPlayers;
		},
		renderPlayers : function() {

			var that = this;

			var players = this.getAllPlayers();
			
			_.each(players, function(player) {

				that.stage.addChild(player);
			});
		},
		renderPitch : function() {

			this.stage.addChild(this.pitch);
		},
		renderBall : function() {

			this.stage.addChild(this.ball);
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