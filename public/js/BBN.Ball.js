define([

	'BBN.Variables'

	], function(variables) {

	var Ball = function() {

		var container = new Container();

		_.extend(container, {

			colour : "rgba(255,255,0,1)",
			inPossessionOf : null,
			location : null,
			render : function() {

				var graphics = new Graphics();

				graphics.beginFill(this.colour);
					
				graphics.setStrokeStyle(0.3).beginStroke('#000');
				
				graphics.drawCircle(0, 0, 4);

				graphics.endStroke();
				
				var shape = new Shape(graphics);

				this.addChild(shape);		

				this.x = (this.location[0] * variables.gridUnit) + variables.gridUnit/4;

				this.y = (this.location[1] * variables.gridUnit) + variables.gridUnit/4;

			},
			tick : function() {

				this.render();
			}
		});

		return container;
	}

	return Ball;
});