
define(['Team', 'Player', 'Ball', 'Pitch', 'Helpers'], function(Team, Player, Ball, Pitch, helpers) {

	var Game = function (grid, teams, pitch, ball) {

		var container = new Container();

		container.addChild(pitch);

		container.addChild(grid);		

		_.extend(container, {

			name : 'Game',
			teams : teams,
			ball : ball,
			allPlayersCache : [],
			activeTeam: null,
			selectedPlayer: null,
			selectedDefender: null,
			defender: null,
			stage: null,
			forceRenderRefresh: null,

			onPlayerClick : function(player) {

				console.log('Game.onPlayerClick()');

				if (player.team === this.activeTeam.name) {

					this.attackerClick(player);
				
				} else {

					this.defenderClick(player);
				}
				
			},

			attackerClick: function(player) {

				//console.log('Game.attackerClick()');

				this.selectedPlayer = player;
			},

			defenderClick: function(defender) {

				//console.log('Game.defenderClick()');

				if (helpers.isAdjacent(this.selectedPlayer, defender)) {

					console.log('a: ' + this.selectedPlayer.name + ' - d: ' + defender.name);

					this.selectedDefender = defender;
				}
			},

			deploy : function() {

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

				grid.addChild(ball);
				
				_.each(this.getAllPlayers(), function(player) {

					grid.addChild(player);
				});

				pitch.init();

				pitch.update();

				grid.init();
				
				this.activeTeam = teams[0];
				this.deploy();
				this.forceRenderRefresh = false;
			},

			getAllPlayers: function() {

				var allPlayers = [];

				if (this.allPlayersCache.length > 0) {

					allPlayers = this.allPlayersCache;

				} else {

					_.each(teams, function(team) {

						allPlayers = _.union(allPlayers, team.players);
					});
					
					this.allPlayersCache = allPlayers;
				}

				return allPlayers;
			},

			tick: function() {

				//console.log('Game.tick()');

				_.invoke(teams, 'tick');

				ball.tick();

				grid.tick(this.selectedPlayer, this.selectedDefender, teams[0], teams[1]);
			}
		});

		return container;
	}

	helpers.inheritPrototype(Game, Container);

	return Game;

});