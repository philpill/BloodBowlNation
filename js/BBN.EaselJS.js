var BBN = BBN || (function(){
	
	return {
		backgroundCanvas: null,
		backgroundStage: null,
		mainCanvas: null,
		mainStage: null,
		canvasBounds: null,
		game: null,
		grid: null,
		variables: null,
		init: function() {
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

			var gridWidth = this.variables.gridWidth;
			var gridHeight = this.variables.gridHeight;
			var gridUnit = this.variables.gridUnit;

			this.grid = new BBN.Grid(this.mainStage, gridWidth, gridHeight, gridUnit);	
			this.game = new BBN.Game(this.mainStage, this.grid);	
					
			this.Pitch.init(this.backgroundStage, this.game);
			
			var that = this;

			this.mainStage.onPress = function(e) { that.gameCanvasClick(e) };

			$('#ClearCacheLink').click({that:this}, this.clearCacheLinkClick);

			$('#StopGameLoopLink').click({that:this}, this.togglePauseGameLoopLinkClick);

			$('#TurnoverLink').click({that:this}, this.turnoverLinkClick);

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
		turnoverLinkClick: function (e) {

			var that, activeTeam, teams, teamIndex, players, playerCount;

			that = e.data.that;

			activeTeam = that.game.activeTeam;

			teams = [];

			$.extend(teams, that.game.teams);

			teamIndex = teams.indexOf(activeTeam);

			teams.splice(teamIndex, 1);

			that.game.activeTeam = teams[Math.floor(Math.random()*teams.length)];

			console.log('turnover: ' + that.game.activeTeam.name);

			players = that.game.activeTeam.players;
			playerCount = players.length;
			while (playerCount--) {
				players[playerCount].hasMoved = false;
				players[playerCount].hasActioned = false;
			}

			that.game.selectedPlayer = that.game.grid.selectedPlayer = null;

			e.preventDefault();
		},
		togglePauseGameLoopLinkClick: function(e) {

			console.log('pause/unpause game loop');

			var that = e.data.that;

			Ticker.setPaused(!Ticker.getPaused());

			e.preventDefault();
		},
		tick: function() {

			//do render stuff here

			//main game loop

			document.getElementById('Ticks').innerHTML = 'ticks: ' + Ticker.getTicks(Variables.gamePausable);

			document.getElementById('MeasuredFps').innerHTML = 'fps: ' + Ticker.getMeasuredFPS();

			this.game.tick();

			this.mainStage.update();
		},
		gameCanvasClick: function(e) {

			var that = this;

			var grids = Helpers.convertPixelsToGrids(e.stageX, e.stageY, that.variables.gridUnit);
						
			var gridEntities, entity, space;

			if (grids[0] > that.variables.gridWidth || grids[1] > that.variables.gridLength) {
				console.log('gameCanvasClick(): out of bounds');
				return false;
			}

			if (typeof that.game.grid.space[grids[0]] === 'undefined') {
				console.log('gameCanvasClick(): out of bounds');
				return false;				
			}

			space = that.game.grid.space[grids[0]][grids[1]];

			gridEntities = Helpers.castGridEntityHelper(space);

			var isPlayerSelected = that.game.selectedPlayer instanceof BBN.Player;

			if (isPlayerSelected && gridEntities.length === 0) {

				if (that.game.selectedPlayer.hasMoved === true) {
					console.log('player has already moved');
				
				} else {

					that.game.grid.moveEntity(grids[0], grids[1], that.game.selectedPlayer);
					that.game.forceRenderRefresh = true;
					that.game.selectedPlayer.hasMoved = true;
				}
			}

			for (entity in gridEntities) {

				if (gridEntities[entity] instanceof BBN.Player) {

					if (isPlayerSelected) {
						//block or switch selected player
						that.resolvePlayerAction(gridEntities[entity]);

					} else {
						//select player


						if (that.game.activeTeam.name === gridEntities[entity].team) {
							that.game.selectedPlayer = that.game.grid.selectedPlayer = gridEntities[entity];
						}
					}
				
				} else if (gridEntities[entity] instanceof BBN.Ball) {
					//pickup ball
				}
			}
		},
		resolvePlayerAction: function(player) {
			if (player.team === this.game.selectedPlayer.team) {
				
				this.game.selectedPlayer = this.game.grid.selectedPlayer = player;
			} else {
				
				//block!
			}
		}
	}
})();