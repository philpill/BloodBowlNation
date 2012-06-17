define ([
 
	'BBN.NewGrid',
	'BBN.Game',
	'BBN.UserEvents',
	'BBN.Variables',
	'BBN.BlockEngine',
	'BBN.Pitch',
	'BBN.Player',
	'BBN.Team',
	'BBN.Ball'

	], function(Grid, Game, userEvents, variables, blockEngine, Pitch, Player, Team, Ball) {

	return {

		backgroundCanvas: null,
		backgroundStage: null,
		mainCanvas: null,
		mainStage: null,
		canvasBounds: null,
		game: null,
		grid: null,
		variables: null,
		pitch: null,
		init: function () {

			var that, gridWidth, gridHeight, gridUnit, grid;

			console.log('-- BloodBowlNation --');

			this.initCanvas();			
			this.loadVariables();

			gridWidth = this.variables.gridWidth;
			gridHeight = this.variables.gridHeight;
			gridUnit = this.variables.gridUnit;

			this.grid = new Grid(this.mainStage, gridWidth, gridHeight, gridUnit);

			var teams = this.generateTeams();

			var pitch = new Pitch();

			var ball = new Ball();

			this.game = new Game(this.mainStage, this.grid, teams, pitch, ball);

			this.game.init();

			this.rebindMouseClick();
			this.bindDomClicks();

			Ticker.useRAF = true; 
			Ticker.setFPS(this.variables.gameFps);
			//Ticker.setInterval(17);
			Ticker.addListener(this);
		},
		initCanvas: function () {

			var that = this;

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

			this.mainStage.onPlayerSelect = function(player) {

				console.log(player);

				that.game.setSelectedPlayer(player);
			}	
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

/*			this.mainStage.onPress = function (e) {
				userEvents.gameCanvasClick.call(that, e);
			};*/

		},
		tick: function () {
			document.getElementById('Ticks').innerHTML = 'ticks: ' + Ticker.getTicks(variables.gamePausable);
			document.getElementById('MeasuredFps').innerHTML = 'fps: ' + Ticker.getMeasuredFPS();
			this.game.tick();
			this.mainStage.update();
		},
		generateTeams: function() {

			var player, i, team1, team2;

			team1 = new Team("Reikland Reavers");
			team2 = new Team("Orcland Raiders");

			team1.colours = ["rgba(150,150,255,1)","rgba(255,255,255,1)"];
			team2.colours = ["rgba(200,100,100,1)"];

			//needs 'proper' implementation
			team1.scoreZone = 0;
			team2.scoreZone = 25;
			
			for (i = 0; i < 11; i++) {
				player = new Player("human" + i, team1, i+1, 'human', 8);
				team1.players.push(player);
			}

			for (i = 0; i < 11; i++) {
				player = new Player("orc" + i, team2, i+1, 'orc', 8);
				team2.players.push(player);
			}

			return [team1, team2];		

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

			blockResults = blockEngine.mediateBlock(attacker, defender);

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
							userEvents.pushBackClick.call(that, e);
						};
						break;
					case 4: //defender stumble
						that.mainStage.onPress = function (e) {
							userEvents.pushBackClick.call(that, e);
						};
						//test for dodge
						//defender knockdown
						break;
					case 5: //defender down
						that.mainStage.onPress = function (e) {
							userEvents.pushBackClick.call(that, e);
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