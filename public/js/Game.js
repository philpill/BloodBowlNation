
define(['Cursor', 'Team', 'Player', 'Ball', 'Pitch', 'Helpers', 'Variables'], function(Cursor, Team, Player, Ball, Pitch, helpers, variables) {

	var Game = function (grid, teams, pitch, ball, cursor) {

		var container = new Container();

		container.addChild(pitch);

		container.addChild(grid);

		grid.onClick = function(e){

			//console.log('Game.onClick()');

			//console.log(e);

			if (isPlayerClicked(e)) {

				var player = grid.getObjectUnderPoint(e.stageX, e.stageY).parent;

				player.onClick(e);
			}
		};

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

		function isPlayerClicked(e) {

			//console.log('isPlayerClicked()');

			var isPlayerClicked = false;

			var grid = e.target;

			var object = grid.getObjectUnderPoint(e.stageX, e.stageY).parent;

			//abitrary test of attribute to determine player
			isPlayerClicked = !!object.movementAllowance;

			return isPlayerClicked;
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

				if (player.team === this.activeTeam.name) {

					this.attackerClick(player);		
				
				} else {

					this.defenderClick(player);
				}				
			},

			onGridClick : function(e) {


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