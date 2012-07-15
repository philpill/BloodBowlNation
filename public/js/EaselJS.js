define ([
 
 	'Cursor',
	'Grid',
	'Game',
	'UserEvents',
	'Variables',
	'BlockEngine',
	'Pitch',
	'Player',
	'Team',
	'Ball',
	'Helpers',
	'GameConfig',
	'Zone',
	'lib/EaselJS/lib/easeljs-0.4.2.min'

	], function(Cursor, Grid, Game, userEvents, variables, blockEngine, Pitch, Player, Team, Ball, helpers, gameConfig, Zone) {

	var grid, game, teams, pitch, ball;

	function generateTeams() {

		var player, i, team1, team2;

		team1 = new Team("Reikland Reavers");
		team2 = new Team("Orcland Raiders");

		team1.colours = ["rgba(150,150,255,1)","rgba(255,255,255,1)"];
		team2.colours = ["rgba(200,100,100,1)"];

		//needs 'proper' implementation
		team1.scoreZone = 0;
		team2.scoreZone = 25;
		
		for (i = 0; i < 11; i++) {
			player = new Player(new Zone(team1.colours[0], variables.playerBaseOutlineColour), "human" + i, team1, i+1, 'human', gameConfig.attributes.human.lineman);
			team1.players.push(player);
		}

		for (i = 0; i < 11; i++) {
			player = new Player(new Zone(team2.colours[0], variables.playerBaseOutlineColour), "orc" + i, team2, i+1, 'orc', gameConfig.attributes.orc.lineman);
			team2.players.push(player);
		}

		return [team1, team2];		
	}

	return {

		init: function () {

			console.log('-- BloodBowlNation --');

			grid = new Grid(variables.gridWidth, variables.gridHeight, variables.gridUnit);

			teams = generateTeams();

			pitch = new Pitch();

			ball = new Ball();

			cursor = new Cursor(new Zone(variables.cursorFillColour, variables.cursorOutlineColour));

			game = new Game(grid, teams, pitch, ball, cursor);

			game.init();

			this.rebindMouseClick();
			this.bindDomClicks();

			Ticker.useRAF = true; 
			Ticker.setFPS(variables.gameFps);
			//Ticker.setInterval(50);
			Ticker.addListener(this);
		},

		bindDomClicks: function () {
			$('#ClearCacheLink').click({ that: this }, userEvents.clearCacheLinkClick);
			$('#StopGameLoopLink').click({ that: this}, userEvents.togglePauseGameLoopLinkClick);
			$('#TurnoverLink').click({ that: this }, userEvents.turnoverLinkClick);			
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

			game.tick();			
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