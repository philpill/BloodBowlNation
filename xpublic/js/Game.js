
define(function(require) {

	var Cursor = require('Cursor'),
		Team = require('Team'),
		Player = require('Player'),
		Ball = require('Ball'),
		Pitch = require('Pitch'),
		blockEngine = require('BlockEngine'),
		helpers = require('Helpers'),
		variables = require('Variables');

	require('lib/jquery.min');


	var Game = function (grid, teams, pitch, ball, cursor) {

		var container = new Container();

		container.addChild(pitch);

		container.addChild(grid);

		var allPlayersCache = [];

		function getAllPlayers() {

			var allPlayers = [];

			if (allPlayersCache.length > 0) {

				allPlayers = allPlayersCache;

			} else {

				_.each(teams, function(team) {

					allPlayers = _.union(allPlayers, team.players);
				});

				allPlayersCache = allPlayers;
			}

			return allPlayers;
		}

		_.extend(container, {

			name : 'Game',
			teams : teams,
			ball : ball,
			activeTeam: null,
			selectedPlayer: null,
			selectedDefender: null,
			defender: null,
			stage: null,
			forceRenderRefresh: null,

			onPlayerClick : function(player) {

				console.log('Game.onPlayerClick()');

				$(document).trigger('playerSelected');

				if (player.team === this.activeTeam.name) {

					this.attackerClick(player);

				} else {

					this.defenderClick(player);
				}
			},

			onGridClick : function(grid, e) {

				console.log('Game.onGridClick()');

				if (this.selectedPlayer && !this.selectedDefender) {

					var grids = helpers.convertPixelsToGrids(e.stageX, e.stageY, variables.gridUnit);

					this.selectedPlayer.move(grids);
				}
			},

			getAllPlayers : getAllPlayers,

			clearAllPlayerBases : function() {

				_.each(this.getAllPlayers(), function(player) {

					player.clearBase();
				});
			},

			attackerClick: function(player) {

				//console.log('Game.attackerClick()');

				this.clearAllPlayerBases();

				player.setSelected();

				this.selectedPlayer = player;

				this.selectedDefender = null;
			},

			defenderClick: function(defender) {

				//console.log('Game.defenderClick()');

				if (helpers.isAdjacent(this.selectedPlayer, defender)) {

					console.log('a: ' + this.selectedPlayer.name + ' - d: ' + defender.name);

					defender.setSelected();

					this.selectedDefender = defender;

					var results = blockEngine.mediateBlock(this.selectedPlayer, this.selectedDefender);
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

				grid.addChild(cursor);

				grid.addChild(ball);

				_.each(this.getAllPlayers(), function(player) {

					grid.addChild(player);
				});

				_.invoke(teams, 'init');

				pitch.init();

				pitch.update();

				grid.init();

				cursor.init();

				this.activeTeam = teams[0];
				this.deploy();
				this.forceRenderRefresh = false;
			},

			tick: function() {

				//console.log('Game.tick()');

				_.invoke(teams, 'tick');

				ball.tick();

				if (grid.mouseInBounds) {

					cursor.tick(this.selectedPlayer, this.selectedDefender, helpers.convertPixelsToGrids(grid.mouseX, grid.mouseY, variables.gridUnit));
				}

				grid.tick();
			}
		});

		return container;
	}

	helpers.inheritPrototype(Game, Container);

	return Game;

});