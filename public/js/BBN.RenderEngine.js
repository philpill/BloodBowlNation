define(['BBN.Helpers', 'BBN.Variables'], function(Helpers, variables) {
	
	return {

		grid: null,
		backgroundStage: null,
		mainStage: null,
		pitchImage: null,
		init: function(mainStage, backgroundStage) {
			this.mainStage = mainStage;
			this.backgroundStage = backgroundStage;
		},
		renderPitch: function(pitch) {

			this.mainStage.removeChild(pitch);

			this.mainStage.addChild(pitch);
		},
		renderGrid: function() {
			var grid = this.grid,
				gridX, gridY, gridEntities, entity;
			
			if (this.selectedPlayer !== null) {
			
				//this.renderSelectedPlayerGrid();
				
				if (this.blockedPlayer !== null) {
				
					//this.renderPushBackSquares();
				}
			}
			
			for (gridX = 0; gridX < grid.space.length; gridX++) {

				for (gridY = 0; gridY < grid.space[gridX].length; gridY++) {

					if (typeof grid.space[gridX][gridY] !== 'undefined') {

						gridEntities = Helpers.castGridEntityHelper(grid.space[gridX][gridY]);
					
						for (entity in gridEntities) {
								
							BBN.RenderEngine.renderObject(gridEntities[entity], gridX, gridY);								
						}	
					}						
				}
			}
		},
		renderObject: function(entity) {	
					
			if (entity instanceof BBN.Player) {
				this.renderPlayer(entity);					
			} else if (entity instanceof BBN.Ball) {
				this.renderBall(entity);					
			}
		},
		renderBall: function(ball) {

			this.mainStage.removeChild(ball);
			
			this.mainStage.addChild(ball);
		},
		renderPlayer: function(player) {

			this.mainStage.removeChild(player);

			this.mainStage.addChild(player);	
		}
	}
});