
define(['Helpers', 'Variables', 'lib/EaselJS/lib/easeljs-0.4.2.min'], function(helpers, variables) {

	var Grid = function (width, height, unit) {

		var stage = new Stage(document.getElementById("MainCanvas"));

		stage.tickOnUpdate = true;

		function isPlayerClicked(e) {

			//console.log('isPlayerClicked()');

			var isPlayerClicked = false;

			var grid = e.target;

			var object = grid.getObjectUnderPoint(e.stageX, e.stageY).parent;

			//abitrary test of attribute to determine player
			isPlayerClicked = !!object.movementAllowance;

			return isPlayerClicked;
		}

		_.extend(stage, {

			name : 'Grid',
			mouseEventsEnabled : true,
			width : width,
			height : height,
			unit : unit,
			onClick : function(e) {

				if (isPlayerClicked(e)) {

					var player = this.getObjectUnderPoint(e.stageX, e.stageY).parent;

					player.onClick(e);
				
				} else {

					var game = e.target.parent;

					game.onGridClick(this);
				}
			},				
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