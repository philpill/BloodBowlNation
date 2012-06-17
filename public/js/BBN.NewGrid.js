
define(['BBN.Helpers'], function(helpers) {

	var Grid = function (width, height, unit) {

		Container.call(this);

		_.extend(this, {

			width : width,
			height : height,
			unit : unit
		}		
	}

	Grid.prototype = {

		activeTeamSquares : [],
		oppositionTeamSquares: [],
		activePlayerSquare: new Shape(),
		activeDefenderSquare: new Shape(),
		interactionSquares : [],
		cursorSquare: new Shape(),
		unit: null,
		height: null,
		width: null,

		tick : function(cursorLocation, activePlayerLocation, activeDefenderLocation, activeTeamLocations, oppositionLocations) {

			var that = this;

			this.removeAllChildren();

			this.addChild(this.cursorSquare);

			this.addChild(this.activePlayerSquare);

			this.addChild(this.activeDefenderSquare);		

			this.addChild(this.cursorPathSquare);

			this.activeTeamSquares = [];

			_.each(activeTeamLocations, function(square){

				var square = new Shape();

				that.activeTeamSquares.push(square);
			});

			this.oppositionTeamSquares = [];

			_.each(oppositionLocations, function(square){

				var square = new Shape();

				that.oppositionTeamSquares.push(square);
			});

			_.each(interactionSquares, function(square){

				var square = new Shape();

				that.interactionSquares.push(square);
			});
		},

		render : function() {


		},
		renderLocations : function(locations, colour) {

			var that = this;

			_.each(locations, function(location){

				that.renderLocation(location);
			});
		},
		renderLocation : function(location, colour) {

			var pixels;

			this.renderSquare(pixels);
		}
	}

	helpers.inheritPrototype(Grid, Container);

	return Grid;

});