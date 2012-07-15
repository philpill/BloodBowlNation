define(['Variables', 'Helpers'], function(variables, helpers){

	var Cursor = function (cursorZone) {

		var container = new Container();	

		_.extend(container, { 

			init : function() {

				console.log('Cursor.init()');

				this.addChild(cursorZone);

				cursorZone.init();
			},

			tick : function(activePlayer, defendingPlayer, mouseLocation) {

				cursorZone.clearCursorPath();

				if (_.isEmpty(mouseLocation)) {

					return;
				}

				cursorZone.renderBase(mouseLocation);

				if (activePlayer && !defendingPlayer) {

					cursorZone.renderCursorPath(mouseLocation, activePlayer.location, activePlayer.movementAllowance);
				}				
			}
		});

		return container;
	}

	helpers.inheritPrototype(Cursor, Container);

	return Cursor;

});