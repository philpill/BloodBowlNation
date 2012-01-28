var BBN = BBN || (function(){
	
	return {
		pitchCanvas: null,
		pitchStage: null,
		gridCanvas: null,
		gridStage: null,
		gameCanvas: null,
		gameStage: null,
		canvasBounds: null,
		init: function() {
			console.log('-- BloodBowlNation --');
			
			this.pitchCanvas = document.getElementById("PitchCanvas");
			this.gameCanvas = document.getElementById("GameCanvas");
			this.gridCanvas = document.getElementById("GridCanvas");

			this.canvasBounds = new Rectangle();
			this.canvasBounds.width = this.gameCanvas.width;
			this.canvasBounds.height = this.gameCanvas.height;
			
			this.gameStage = new Stage(this.gameCanvas);
			this.pitchStage = new Stage(this.pitchCanvas);
			this.gridStage = new Stage(this.gridCanvas);
			
			this.gameStage.mouseEventsEnabled = true;
			
			this.Pitch.init(this.pitchStage, this.Game);
			this.Game.init(this.gameStage);
			
			$(this.gameCanvas).mousemove({that: this}, this.gameCanvasMouseMove);
			
			$(this.gameCanvas).click({that: this}, this.gameCanvasClick);
			
			Ticker.setFPS(this.Variables.gameFps);
			
			Ticker.addListener(this);

			$('#StopGameLoopLink').click({that:this},this.togglePauseGameLoopLinkClick);
		},
		togglePauseGameLoopLinkClick: function(e) {

			console.log('pause/unpause game loop');

			var that = e.data.that;

			Ticker.setPaused(!Ticker.getPaused());
		},
		tick: function() {
			console.log('gameTick');
		},
		gameCanvasMouseMove: function(e) {

			var that = e.data.that;
			
			var grids = _convertPixelsToGrids(that.pitchStage.mouseX, that.pitchStage.mouseY, that.Game.pitchUnitSize);
			
			that.Game.grid.renderCursor(grids[0], grids[1], that.Game.pitchUnitSize, that.gridStage);
		},
		gameCanvasClick: function(e) {

			console.log('gameCanvasClick()');

			var that = e.data.that;
			
			var grids = _convertPixelsToGrids(that.pitchStage.mouseX, that.pitchStage.mouseY, that.Game.pitchUnitSize);
			
			var gridEntities;

			console.log(grids);

			gridEntities = _castGridEntityHelper(that.Game.grid.space[grids[0]][grids[1]]);

			console.log(gridEntities);

			for (entity in gridEntities) {
							
					console.log(entity);						
			}
		}
	}
})();