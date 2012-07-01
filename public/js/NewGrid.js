
define(['Helpers', 'Variables', 'lib/AStar', 'lib/EaselJS/lib/easeljs-0.4.2.min'], function(helpers, variables) {

	var Grid = function (width, height, unit) {

		var stage = new Stage(document.getElementById("MainCanvas"));

		function getMouseLocation() {

			return stage.mouseInBounds ? helpers.convertPixelsToGrids(stage.mouseX, stage.mouseY, variables.gridUnit) : [];
		}

		_.extend(stage, {

			name : 'Grid',
			mouseEventsEnabled : true,
			activeTeamSquares : new Container(),
			oppositionTeamSquares: new Container(),
			activePlayerSquare: new Shape(),
			activeDefenderSquare: new Shape(),
			interactionSquares : new Container(),
			cursorSquare: new Shape(),
			pathSquares:new Container(),
			width : width,
			height : height,
			unit : unit,
			stage : stage,
			tick : function(activePlayer, activeDefender, activeTeam, defendingTeam) {

				//console.log('Grid.tick()');

				//console.log(cursorLocation);
				//console.log(activePlayerLocation);
				//console.log(activeDefenderLocation);
				//console.log(activeTeamLocations);
				//console.log(oppositionLocations);

				var activePlayerLocation = activePlayer ? activePlayer.location : [];

				var activeDefenderLocation = activeDefender ? activeDefender.location : [];

				this.render(getMouseLocation(), activePlayerLocation, activeDefenderLocation);

				this.update();
			},

			render : function(cursorLocation, activePlayerLocation, activeDefenderLocation) {

				var playerSelected = activePlayerLocation.length > 0;

				var defenderSelected = activeDefenderLocation.length > 0;


				if (cursorLocation.length > 0) {

					this.renderCursor(cursorLocation, activePlayerLocation);
				}

				if (playerSelected) {

					//console.log(activePlayerLocation);

					this.renderActivePlayer(activePlayerLocation);

					if (!defenderSelected) {

						this.renderOppositionTeam();
					}
				
				} else {

					this.renderActiveTeam();
				}

				if (defenderSelected) {

					//console.log(activeDefenderLocation);
				
					this.renderActiveDefender(activeDefenderLocation);
				}

				if (cursorLocation.length > 0 && playerSelected && !defenderSelected) {

					this.renderPath(cursorLocation, activePlayerLocation);
				
				} else {

					this.clearPath();
				}	

			},
			renderCursor : function(cursorLocation, activePlayerLocation) {

				//console.log('Grid.renderCursor()');

				//console.log(cursorLocation);

				var location = helpers.convertGridsToPixels(cursorLocation[0], cursorLocation[1], variables.gridUnit);

				this.renderLocation(this.cursorSquare, location, variables.cursorFillColour, variables.cursorOutlineColour);
			},

			renderActivePlayer: function(playerLocation) {

				//console.log('Grid.renderActivePlayer()');

				var location = helpers.convertGridsToPixels(playerLocation[0], playerLocation[1], variables.gridUnit);

				this.renderLocation(this.activePlayerSquare, location, variables.playerSquareColour);
			},

			renderActiveDefender: function(playerLocation) {

				//console.log('Grid.renderActiveDefender()');

				var location = helpers.convertGridsToPixels(playerLocation[0], playerLocation[1], variables.gridUnit);

				this.renderLocation(this.activeDefenderSquare, location, variables.playerSquareColour);
			},

			clearPath : function() {

				this.pathSquares.removeAllChildren();
			},	

			renderPath : function(cursorLocation, playerLocation) {

				var that = this;

				var path = a_star(playerLocation, cursorLocation, this.getBoard(), this.width, this.height);
				
				var locationsArray = _.zip(_.pluck(path, 'x'), _.pluck(path, 'y')) || [];

				var locations = [];

				that.pathSquares.removeAllChildren();

				_.each(locationsArray, function(location){

					locations.push(helpers.convertGridsToPixels(location[0], location[1], variables.gridUnit));

					that.pathSquares.addChild(new Shape());
				});

				that.renderLocations(that.pathSquares, locations, variables.cursorFillColour);
			},

			getBoard: function() {

				var board = this.createBoard();

				board = this.populateBoard(board);

				return board;
			},

			createBoard: function() {

				//needs to represent entities on field

				var board = [];

				var boardWidth = this.width;

				var boardHeight = this.height;

				while (boardWidth--) {		

					boardHeight = this.height;

					board[boardWidth] = [];

					while (boardHeight--) {

						board[boardWidth][boardHeight] = 0;
					}
				}

				return board;
			},

			populateBoard: function(board) {
				
				return board;
			},
			renderActiveTeam : function() {

			},
			renderOppositionTeam : function() {

			},
			renderLocations : function(container, locations, fillColour, outlineColour) {

				var that = this;

				_.each(container.children, function(child, i){

					child.x = locations[i][0];

					child.y = locations[i][1];

					child.graphics.clear();

					child.graphics.beginStroke(outlineColour);

					child.graphics.beginFill(fillColour);

					child.graphics.rect(0, 0, variables.gridUnit, variables.gridUnit);

				});
			},
			renderLocation : function(shape, location, fillColour, outlineColour) {

				//console.log('Grid.renderLocation()');

				shape.graphics.clear();

				shape.graphics.beginStroke(outlineColour);

				shape.graphics.beginFill(fillColour);

				shape.graphics.rect(0, 0, variables.gridUnit, variables.gridUnit);

				shape.x = location[0];

				shape.y = location[1];
			},
			init : function() {

			},
							
		});		

		stage.addChild(stage.cursorSquare);

		stage.addChild(stage.activePlayerSquare);

		stage.addChild(stage.activeDefenderSquare);		

		stage.addChild(stage.cursorPathSquare);

		stage.addChild(stage.activeTeamSquares);

		stage.addChild(stage.oppositionTeamSquares);

		stage.addChild(stage.pathSquares);

		return stage;
	}

	helpers.inheritPrototype(Grid, Stage);

	return Grid;

});