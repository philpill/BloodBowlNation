
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
		selectedDefender: null,
		defender: null,
		stage: null,
		pitch: null,
		grid: null,
		teams: null,
		allPlayersCache: null,
		forceRenderRefresh: null,
		setSelectedPlayer: function(player) {

			if (player instanceof Player) {

				this.selectedPlayer = player;
			}
		},
		deploy : function() {

			var teams = this.teams;
			var grid = this.grid;
			var ball = this.ball;

			_.each(teams, function(team, i){

				_.each(team.players, function(player, j){

					teams[i].players[j].location = [j + 2, i + Math.floor(grid.height/2) - 1];
				});
			});

			var randomX = Math.floor(Math.random()*(grid.width - 1));
			var randomY = Math.floor(Math.random()*(Math.floor(grid.height/2) - 1));

			ball.location = [randomX, randomY];
		},
		init: function() {

			var stage = this.stage;

			stage.addChild(this.pitch);

			stage.addChild(this.ball);
			
			_.each(this.getAllPlayers(), function(player) {

				stage.addChild(player);
			});

			this.pitch.init();
			
			this.activeTeam = this.teams[0];
			this.deploy();
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
		tick: function(cursorLocation) {

			//console.log('Game.tick()');

			_.invoke(this.teams, 'tick');

			this.ball.tick();

			var activePlayerLocation = this.selectedPlayer ? this.selectedPlayer.location : [];

			var activeDefenderLocation = this.selectedDefender ? this.selectedDefender.location : [];

			var activeTeamLocation = _.pluck(this.teams[0].players, 'location');

			var oppositionTeamLocation = _.pluck(this.teams[1].players, 'location');

			this.grid.tick(cursorLocation, activePlayerLocation, activeDefenderLocation, activeTeamLocation, oppositionTeamLocation);
		}
	}

	return Game;

});