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
			var that, gridWidth, gridHeight, gridUnit, grid;

			console.log('-- BloodBowlNation --');

			this.initCanvas();			
			this.loadVariables();

			gridWidth = this.variables.gridWidth;
			gridHeight = this.variables.gridHeight;
			gridUnit = this.variables.gridUnit;

			this.grid = new BBN.Grid(this.mainStage, gridWidth, gridHeight, gridUnit);
			this.game = new BBN.Game(this.mainStage, this.grid);

			this.Pitch.init(this.backgroundStage, this.game);
			this.RenderEngine.init(this.mainStage, this.backgroundStage);
			this.game.init();

			this.rebindMouseClick();
			this.bindDomClicks();

			Ticker.setFPS(this.variables.gameFps);
			Ticker.addListener(this);
		},
		initCanvas: function () {
			this.backgroundCanvas = document.getElementById("BackgroundCanvas");
			this.mainCanvas = document.getElementById("MainCanvas");

			this.canvasBounds = new Rectangle();
			this.canvasBounds.width = this.mainCanvas.width;
			this.canvasBounds.height = this.mainCanvas.height;

			this.backgroundStage = new Stage(this.backgroundCanvas);
			this.backgroundStage.name = 'background';

			this.mainStage = new Stage(this.mainCanvas);
			this.mainStage.name = 'main';
			this.mainStage.mouseEventsEnabled = true;			
		},
		bindDomClicks: function () {
			$('#ClearCacheLink').click({ that: this }, BBN.UserEvents.clearCacheLinkClick);
			$('#StopGameLoopLink').click({ that: this}, BBN.UserEvents.togglePauseGameLoopLinkClick);
			$('#TurnoverLink').click({ that: this }, BBN.UserEvents.turnoverLinkClick);			
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
		movePlayer: function (player, grids, isPushBack) {

			if (player.hasMoved && !isPushBack) {
				console.log('player has already moved');
			} else {
				player.move(grids);
				this.game.grid.moveEntity(grids[0], grids[1], player);
				this.game.forceRenderRefresh = true;
			}
		},
		blockPlayer: function (defender) {

			var player = this.game.selectedPlayer;

			if (Helpers.isAdjacent(player, defender)) {

				console.log('a: ' + player.name + ' - d: ' + defender.name);

				this.game.defender = defender;

				player.block(defender);

				this.resolveBlock(player, defender);
			}			
		},
		resolveBlock: function (attacker, defender) {
			
			//implement block mediator
			var that = this;

			var roll = Helpers.getRandom();

			switch(roll){
				case 1:
				case 2:
					console.log('push back');
					break;
				case 3:
					console.log('attacker down');
					break;
				case 4:
					console.log('both down');
					break;
				case 5:
					console.log('defender down');
					break;
				case 6:
					console.log('defender stumble');
					break;
			}

			//attacker down

			//defender pushback
			that.mainStage.onPress = function (e) {
				BBN.UserEvents.pushBackClick.call(that, e);
			};

			//defender pushback and down

			//both down
		}
	};
}());