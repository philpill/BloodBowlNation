
define(['Helpers'], function(helpers) {

	return {

		togglePauseGameLoopLinkClick: function (e) {
			console.log('pause/unpause game loop');
			Ticker.setPaused(!Ticker.getPaused());
			e.preventDefault();
		},
		clearCacheLinkClick: function (e) {
			console.log('clear cache - not in use');
			e.preventDefault();
		},
		turnoverLinkClick: function (e) {
			var that, activeTeam, teams, teamIndex, players, playerCount;
			that = e.data.that;
			activeTeam = that.game.activeTeam;
			teams = [];
			$.extend(teams, that.game.teams);
			teamIndex = teams.indexOf(activeTeam);
			teams.splice(teamIndex, 1);
			that.game.activeTeam = teams[Math.floor(Math.random() * teams.length)];
			activeTeam = that.game.activeTeam;
			console.log('turnover: ' + activeTeam.name);

			//need reinitialise function
			players = activeTeam.players;
			playerCount = players.length;
			while (playerCount--) {
				players[playerCount].hasMoved = false;
				players[playerCount].hasActioned = false;
			}
			
			that.game.selectedPlayer = null;
			that.game.defender = null;
			that.game.grid.clearAllSquares();
			that.rebindMouseClick();

			e.preventDefault();
		},
		playerActionClick: function (e) {
			var that, grids, selectedPlayer, player, playerLength, space;

			that = this;
			
			selectedPlayer = that.game.selectedPlayer;

			if (selectedPlayer === null) {
				
				console.log('playerActionClick() error: no player selected');

				that.rebindMouseClick();

				return false;				
			}

			grids = helpers.convertPixelsToGrids(e.stageX, e.stageY, that.variables.gridUnit);

			if (grids[0] > that.variables.gridWidth || grids[1] > that.variables.gridLength) {

				console.log('playerActionClick() error: click out of bounds');

				that.game.setSelectedPlayer(null);

				that.rebindMouseClick();

				return false;
			} 
				
			space = that.game.grid.getSpace(grids[0], grids[1]);

			player = helpers.castPlayerHelper(space);

			if (player === null) {
				
				that.movePlayer(selectedPlayer, grids, false);
			
			} else {
		
				if (that.game.activeTeam.name === player.team) {

					that.game.setSelectedPlayer(player);
		
				} else {

					if (selectedPlayer.hasActioned) {
						
						console.log('player has already actioned');

					} else {
						
						that.blockPlayer(player);	
					}
				}
			}
		},
		gameCanvasClick: function (e) {
			var grids, player, entity, space, that;

			that = this;
			
			grids = helpers.convertPixelsToGrids(e.stageX, e.stageY, that.variables.gridUnit);

			if (grids[0] > that.variables.gridWidth || grids[1] > that.variables.gridHeight) {
				console.log('gameCanvasClick(): out of bounds');
				return false;
			}
			
			if (typeof that.game.grid.space[grids[0]] === 'undefined' || typeof that.game.grid.space[grids[0]][grids[1]] === 'undefined') {
				console.log('gameCanvasClick(): out of bounds');
				return false;
			}
			
			space = that.game.grid.getSpace(grids[0], grids[1]);
			
			player = helpers.castPlayerHelper(space);
			
			if (player !== null) {
				
				if (that.game.activeTeam.name === player.team) {
			
					that.game.setSelectedPlayer(player);

					that.mainStage.onPress = function (e) { 

						BBN.UserEvents.playerActionClick.call(that, e);

					};
				}
			}
		},
		pushBackClick: function (e) {
			
			var grids, player, entity, space, that;

			console.log(that);

			that = this;

			console.log(that);
			
			grids = helpers.convertPixelsToGrids(e.stageX, e.stageY, this.variables.gridUnit);

			space = that.grid.getSpace(grids[0], grids[1]);
			
			if (helpers.isAdjacent(that.game.defender, { location: grids })) {

				if (helpers.isSpaceEmpty(space)) {

					that.movePlayer(that.game.defender, grids, true);

					that.game.defender = null;

					that.grid.clearPushBackSquares();

					//TODO: should follow up before moving again
					that.mainStage.onPress = function (e) { 

						BBN.UserEvents.playerActionClick.call(that, e); 
					};
				}
			}
		}
	}
});
