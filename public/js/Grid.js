
define(['Helpers', 'Variables', 'lib/EaselJS/lib/easeljs-0.4.2.min'], function(helpers, variables) {

	var Grid = function (width, height, unit) {

		var stage = new Stage(document.getElementById("MainCanvas"));

		_.extend(stage, {

			name : 'Grid',
			mouseEventsEnabled : true,
			
			width : width,
			height : height,
			unit : unit,
			tick : function() {

				this.update();
			},

			render : function() {

			},

			init : function() {

			}
							
		});		

		return stage;
	}

	helpers.inheritPrototype(Grid, Stage);

	return Grid;

});