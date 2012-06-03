define ([

	'BBN.pitch', 
	'BBN.RenderEngine', 
	'BBN.Grid',
	'BBN.Game',
	'BBN.UserEvents',
	'BBN.Variables'

	], function(pitch, renderEngine, Grid, Game, userEvents, variables) {

		console.log(renderEngine);

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

			this.grid = new Grid(this.mainStage, gridWidth, gridHeight, gridUnit);
			this.game = new Game(this.mainStage, this.grid);

			pitch.init(this.backgroundStage, this.game);
			renderEngine.init(this.mainStage, this.backgroundStage);
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
			$('#ClearCacheLink').click({ that: this }, userEvents.clearCacheLinkClick);
			$('#StopGameLoopLink').click({ that: this}, userEvents.togglePauseGameLoopLinkClick);
			$('#TurnoverLink').click({ that: this }, userEvents.turnoverLinkClick);			
		},
		loadVariables: function () {
			this.variables = variables;
		},
		rebindMouseClick: function() {
			var that = this;
			this.mainStage.onPress = function (e) {
				userEvents.gameCanvasClick.call(that, e);
			};
		},
		tick: function () {
			document.getElementById('Ticks').innerHTML = 'ticks: ' + Ticker.getTicks(variables.gamePausable);
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
			
			var that, blockResults;

			that = this;

			blockResults = BBN.BlockEngine.mediateBlock(attacker, defender);

			console.log(blockResults);

			//greater strength selects blockResult

			if (blockResults.length === 1) {

				switch(blockResults[0]) {

					case 1: //attacker down
						//attacker knockdown
						$('#TurnoverLink').click();						
						break;
					case 2: //both down
						//test for block
						//attacker knockdown
						//test for block
						//defender knockdown
						$('#TurnoverLink').click();	
						break;
					case 3: //pushback
						that.mainStage.onPress = function (e) {
							BBN.UserEvents.pushBackClick.call(that, e);
						};
						break;
					case 4: //defender stumble
						that.mainStage.onPress = function (e) {
							BBN.UserEvents.pushBackClick.call(that, e);
						};
						//test for dodge
						//defender knockdown
						break;
					case 5: //defender down
						that.mainStage.onPress = function (e) {
							BBN.UserEvents.pushBackClick.call(that, e);
						};
						//defender knockdown
						break;	
					default:
						console.log('resolveBlock() error: BBN.BlockEngine.mediateBlock() cannot return ^[1-5]');
						break;											
				}
			}
		}
	}
});