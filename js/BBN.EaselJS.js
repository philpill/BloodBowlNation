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
			
			
			//$(this.mainCanvas).mousemove({that: this}, this.gameCanvasMouseMove);
			
			$(this.mainCanvas).click({that: this}, this.gameCanvasClick);

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

			var that = e.data.that;

			var grids = Helpers.convertPixelsToGrids(that.mainStage.mouseX, that.mainStage.mouseY, that.variables.gridUnit);
						
			var gridEntities, entity, player = null;

			gridEntities = Helpers.castGridEntityHelper(that.game.grid.space[grids[0]][grids[1]]);

			for (entity in gridEntities) {

				if (gridEntities[entity] instanceof BBN.Player) {
					
					if (player === null) {
						player = that.game.selectedPlayer = gridEntities[entity];

						console.log(player);
					} else {
						console.log('error: more than one BBN.player in grid.space');
					}
				}
			}
		}
	}
})();