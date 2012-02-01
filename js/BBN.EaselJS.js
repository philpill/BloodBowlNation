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

			$('#StopGameLoopLink').click({that:this},this.togglePauseGameLoopLinkClick);

			this.RenderEngine.init(this.mainStage, this.backgroundStage);

			this.game.init();

			Ticker.setFPS(Variables.gameFps);

			Ticker.addListener(this);
		},
		loadVariables: function () {
			this.variables = Variables;
		},
		togglePauseGameLoopLinkClick: function(e) {

			console.log('pause/unpause game loop');

			var that = e.data.that;

			Ticker.setPaused(!Ticker.getPaused());

			e.preventDefault();
		},
		tick: function() {

			//do render stuff here

			//this.RenderEngine.renderMain(this.Game.grid);

			//main game loop

			var ticks = document.getElementById('Ticks');

			ticks.innerHTML= 'ticks: ' + Ticker.getTicks(Variables.gamePausable);

			var measuredFps = document.getElementById('MeasuredFps');

			measuredFps.innerHTML= 'fps: ' + Ticker.getMeasuredFPS();

			this.game.tick();

			this.mainStage.update();
		},
		gameCanvasClick: function(e) {

			var that = this;

			var grids = Helpers.convertPixelsToGrids(e.stageX, e.stageY, that.variables.gridUnit);
						
			var gridEntities, entity;

			if (grids[0] > that.variables.gridWidth || grids[1] > that.variables.gridLength) {
				return false;
			}

			gridEntities = Helpers.castGridEntityHelper(that.game.grid.space[grids[0]][grids[1]]);

			var isPlayerSelected = that.game.selectedPlayer instanceof BBN.Player;

			if (isPlayerSelected && gridEntities.length === 0) {
				that.game.grid.moveEntity(grids[0], grids[1], that.game.selectedPlayer);
				that.game.forceRenderRefresh = true;
				that.game.selectedPlayer.hasMoved = true;
			}

			for (entity in gridEntities) {

				if (gridEntities[entity] instanceof BBN.Player) {

					if (isPlayerSelected) {
						//block or switch selected player
						that.resolvePlayerAction(gridEntities[entity]);

					} else {
						//select player
						that.game.selectedPlayer = gridEntities[entity];
					}
				
				} else if (gridEntities[entity] instanceof BBN.Ball) {
					//pickup ball
				}
			}
		},
		resolvePlayerAction: function(player) {
			console.log('resolvePlayerAction()');

			if (player.team === this.game.selectedPlayer.team) {
				
				this.game.selectedPlayer = player;
			}
		}
	}
})();