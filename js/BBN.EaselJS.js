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
			this.loadVariables();
			gridWidth = this.variables.gridWidth;
			gridHeight = this.variables.gridHeight;
			gridUnit = this.variables.gridUnit;
			this.grid = new BBN.Grid(this.mainStage, gridWidth, gridHeight, gridUnit);
			this.game = new BBN.Game(this.mainStage, this.grid);

			//rewrite
			this.Pitch.init(this.backgroundStage, this.game);
			
			that = this;
			this.rebindMouseClick();
			$('#ClearCacheLink').click({ that: this }, BBN.UserEvents.clearCacheLinkClick);
			$('#StopGameLoopLink').click({ that: this}, BBN.UserEvents.togglePauseGameLoopLinkClick);
			$('#TurnoverLink').click({ that: this }, BBN.UserEvents.turnoverLinkClick);
			this.RenderEngine.init(this.mainStage, this.backgroundStage);
			this.game.init();
			Ticker.setFPS(Variables.gameFps);
			Ticker.addListener(this);
		},
		loadVariables: function () {
			this.variables = Variables;
		},
		rebindMouseClick: function() {
			var that = this;
			this.mainStage.onPress = function (e) {
				BBN.UserEvents.gameCanvasClick.call(that, e);
			};
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
		blockPlayer: function (player) {
			if (Helpers.isAdjacent(this.game.selectedPlayer, player)) {

				console.log('a: ' + this.game.selectedPlayer.name + ' - d: ' + player.name);

				this.game.defender = player;

				this.resolveBlock(this.game.selectedPlayer, this.game.defender);
			}			
		},
		resolveBlock: function (attacker, defender) {
			
			//implement block mediator

			var that = this;

			that.mainStage.onPress = function (e) {
				BBN.UserEvents.pushBackClick.call(that, e);
			};
		}
	};
}());