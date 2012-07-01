
define(['Helpers', 'Variables', 'lib/AStar'], function(helpers, variables) {

	var Grid = function (stage, width, height, unit) {

		Container.call(this);

		_.extend(this, {

			zIndex : 2,
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
			tick : function(cursorLocation, activePlayerLocation, activeDefenderLocation, activeTeamLocations, oppositionLocations) {

				//console.log('Grid.tick()');

				//console.log(cursorLocation);
				//console.log(activePlayerLocation);
				//console.log(activeDefenderLocation);
				//console.log(activeTeamLocations);
				//console.log(oppositionLocations);

				this.render(cursorLocation, activePlayerLocation);
			},

			render : function(cursorLocation, activePlayerLocation) {

				if (cursorLocation.length > 0) {

					this.renderCursor(cursorLocation, activePlayerLocation);
				}

				if (activePlayerLocation.length > 0) {
				
					this.renderActivePlayer(activePlayerLocation);
				}

				if (cursorLocation.length > 0 && activePlayerLocation.length > 0) {

					this.renderPath(cursorLocation, activePlayerLocation);
				}			

				this.renderDefender();
				this.renderActiveTeam();
				this.renderOppositionTeam();
			},
			renderCursor : function(cursorLocation, activePlayerLocation) {

				var location = helpers.convertGridsToPixels(cursorLocation[0], cursorLocation[1], variables.gridUnit);

				this.renderLocation(this.cursorSquare, location, variables.cursorFillColour, variables.cursorOutlineColour);
			},

			renderActivePlayer: function(playerLocation) {

				var location = helpers.convertGridsToPixels(playerLocation[0], playerLocation[1], variables.gridUnit);

				this.renderLocation(this.activePlayerSquare, location, variables.playerSquareColour);
			},

			renderPath : function(cursorLocation, playerLocation) {

				var that = this;

				var path = a_star(playerLocation, cursorLocation, this.getBoard(), this.width, this.height);

				var locationsArray = _.zip(_.pluck(path, 'x'), _.pluck(path, 'y'));

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

			renderDefender : function() {

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

				shape.graphics.clear();

				shape.graphics.beginStroke(outlineColour);

				shape.graphics.beginFill(fillColour);

				shape.graphics.rect(0, 0, variables.gridUnit, variables.gridUnit);

				shape.x = location[0];

				shape.y = location[1];
			},
			init : function() {

				this.stage.addChild(this);
			}
							
		});		

		this.addChild(this.cursorSquare);

		this.addChild(this.activePlayerSquare);

		this.addChild(this.activeDefenderSquare);		

		this.addChild(this.cursorPathSquare);

		this.addChild(this.activeTeamSquares);

		this.addChild(this.oppositionTeamSquares);

		this.addChild(this.pathSquares);
	}

	helpers.inheritPrototype(Grid, Container);

	return Grid;

});