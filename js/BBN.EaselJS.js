var BBN = BBN || (function () {
	return {
		backgroundCanvas: null,
		backgroundStage: null,
		mainCanvas: null,
		mainStage: null,
		canvasBounds: null,
		game: null,
		grid: null,
		variables: null,
		init: function () {
			var that, gridWidth, gridHeight, gridUnit;
			console.log('-- BloodBowlNation --');
			this.backgroundCanvas = document.getElementById("BackgroundCanvas");
			this.mainCanvas = document.getElementById("MainCanvas");
			this.canvasBounds = new Rectangle();
			this.canvasBounds.width = this.mainCanvas.width;
			this.canvasBounds.height = this.mainCanvas.height;
			this.backgroundStage = new Stage(this.backgroundCanvas);
			this.mainStage = new Stage(this.mainCanvas);
			this.backgroundStage.name = 'background';
			this.mainStage.name = 'main';
			this.mainStage.mouseEventsEnabled = true;
			this.RenderEngine.init();
			this.loadVariables();
			gridWidth = this.variables.gridWidth;
			gridHeight = this.variables.gridHeight;
			gridUnit = this.variables.gridUnit;
			this.grid = new BBN.Grid(this.mainStage, gridWidth, gridHeight, gridUnit);
			this.game = new BBN.Game(this.mainStage, this.grid);
			this.Pitch.init(this.backgroundStage, this.game);
			that = this;
			this.rebindMouseClick();
			$('#ClearCacheLink').click({
				that: this
			}, this.clearCacheLinkClick);
			$('#StopGameLoopLink').click({
				that: this
			}, this.togglePauseGameLoopLinkClick);
			$('#TurnoverLink').click({
				that: this
			}, this.turnoverLinkClick);
			this.RenderEngine.init(this.mainStage, this.backgroundStage);
			this.game.init();
			Ticker.setFPS(Variables.gameFps);
			Ticker.addListener(this);
		},
		loadVariables: function () {
			this.variables = Variables;
		},
		clearCacheLinkClick: function (e) {
			console.log('clear cache - not in use');
			e.preventDefault();
		},
		rebindMouseClick: function() {
			var that = this;
			this.mainStage.onPress = function (e) {
				that.gameCanvasClick(e);
			};
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
			console.log('turnover: ' + activeTeam.name);
			players = activeTeam.players;
			playerCount = players.length;
			while (playerCount--) {
				players[playerCount].hasMoved = false;
				players[playerCount].hasActioned = false;
			}
			that.game.selectedPlayer = that.game.grid.selectedPlayer = null;
			that.rebindMouseClick();
			e.preventDefault();
		},
		togglePauseGameLoopLinkClick: function (e) {
			console.log('pause/unpause game loop');
			Ticker.setPaused(!Ticker.getPaused());
			e.preventDefault();
		},
		tick: function () {
			document.getElementById('Ticks').innerHTML = 'ticks: ' + Ticker.getTicks(Variables.gamePausable);
			document.getElementById('MeasuredFps').innerHTML = 'fps: ' + Ticker.getMeasuredFPS();
			this.game.tick();
			this.mainStage.update();
		},
		movePlayer: function (grids) {
			var game = this.game;
			if (game.selectedPlayer.hasMoved === true) {
				console.log('player has already moved');
			} else {
				game.grid.moveEntity(grids[0], grids[1], game.selectedPlayer);
				game.forceRenderRefresh = true;
				game.selectedPlayer.hasMoved = true;
			}
		},
		playerActionClick: function (e) {
			var that, grids, selectedPlayer, player, playerLength, space;

			that = this;
			
			selectedPlayer = that.game.selectedPlayer;

			if (selectedPlayer === null) {
				
				console.log('playerActionClick() error: no player selected');

				this.rebindMouseClick();

				return false;				
			}

			grids = Helpers.convertPixelsToGrids(e.stageX, e.stageY, that.variables.gridUnit);

			if (grids[0] > that.variables.gridWidth || grids[1] > that.variables.gridLength) {

				console.log('playerActionClick() error: click out of bounds');

				this.game.setSelectedPlayer(null);

				this.rebindMouseClick();

				return false;
			} 
				
			space = this.game.grid.getSpace(grids[0], grids[1]);

			player = Helpers.castPlayerHelper(space);

			if (player === null) {
				
				this.movePlayer(grids);
			
			} else {
		
				if (this.game.activeTeam.name === player.team) {

					this.game.setSelectedPlayer(player);
		
				} else {

					this.blockPlayer(player);	
				}
			}
		},
		gameCanvasClick: function (e) {
			var grids, player, entity, space, that;

			that = this;
			
			grids = Helpers.convertPixelsToGrids(e.stageX, e.stageY, this.variables.gridUnit);

			if (grids[0] > this.variables.gridWidth || grids[1] > this.variables.gridHeight) {
				console.log('gameCanvasClick(): out of bounds');
				return false;
			}
			
			if (typeof this.game.grid.space[grids[0]] === 'undefined' || typeof this.game.grid.space[grids[0]][grids[1]] === 'undefined') {
				console.log('gameCanvasClick(): out of bounds');
				return false;
			}
			
			space = this.game.grid.getSpace(grids[0], grids[1]);
			
			player = Helpers.castPlayerHelper(space);
			
			if (player !== null) {
				
				if (this.game.activeTeam.name === player.team) {
			
					this.game.setSelectedPlayer(player);

					this.mainStage.onPress = function (e) { that.playerActionClick(e); };
				}
			}
		},
		blockPlayer: function(player) {
			if (Helpers.isAdjacent(this.game.selectedPlayer, player)) {
				console.log('blocker: ' + this.game.selectedPlayer.name + ' defender: ' + player.name);
			}			
		}
	};
}());