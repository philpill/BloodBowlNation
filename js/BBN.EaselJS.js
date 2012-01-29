var BBN = BBN || (function(){
	
	return {
		backgroundCanvas: null,
		backgroundStage: null,
		mainCanvas: null,
		mainStage: null,
		canvasBounds: null,
		init: function() {
			console.log('-- BloodBowlNation --');
			
			this.backgroundCanvas = document.getElementById("BackgroundCanvas");
			this.mainCanvas = document.getElementById("MainCanvas");

			this.canvasBounds = new Rectangle();
			this.canvasBounds.width = this.mainCanvas.width;
			this.canvasBounds.height = this.mainCanvas.height;
			
			this.backgroundStage = new Stage(this.backgroundCanvas);
			this.mainStage = new Stage(this.mainCanvas);
			
			this.mainStage.mouseEventsEnabled = true;
			
			this.RenderEngine.init();
			this.Game.init(this.mainStage);			
			this.Pitch.init(this.backgroundStage, this.Game);
			
			
			$(this.gameCanvas).mousemove({that: this}, this.gameCanvasMouseMove);
			
			$(this.gameCanvas).click({that: this}, this.gameCanvasClick);
			
			Ticker.setFPS(Variables.gameFps);
			
			Ticker.addListener(this);

			$('#StopGameLoopLink').click({that:this},this.togglePauseGameLoopLinkClick);

			this.RenderEngine.init(this.mainStage, this.backgroundStage);
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

			console.log('gameTick');

			//main game loop

			var team;

			var player;

			for (team in BBN.Game.teams) {
				
				//console.log(BBN.Game.teams[team]);

				BBN.Game.teams[team].tick();

				for (player in BBN.Game.teams[team].players) {
					
					//console.log(BBN.Game.teams[team].players[player]);

					BBN.Game.teams[team].players[player].tick();
				}
			}

			this.mainStage.update();
		},
		gameCanvasMouseMove: function(e) {

			var that = e.data.that;
			
			var grids = Helpers._convertPixelsToGrids(that.pitchStage.mouseX, that.pitchStage.mouseY, that.Game.pitchUnitSize);
			
			that.Game.grid.renderCursor(grids[0], grids[1], that.Game.pitchUnitSize, that.mainStage);
		},
		gameCanvasClick: function(e) {

			console.log('gameCanvasClick()');

			var that = e.data.that;
			
			var grids = Helpers._convertPixelsToGrids(that.mainStage.mouseX, that.mainStage.mouseY, that.Game.pitchUnitSize);
			
			var gridEntities;

			console.log(grids);

			gridEntities = Helpers._castGridEntityHelper(that.Game.grid.space[grids[0]][grids[1]]);

			console.log(gridEntities);

			for (entity in gridEntities) {
							
				console.log(entity);						
			}
		}
	}
})();