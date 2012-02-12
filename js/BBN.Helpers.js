
var Helpers = {

	//http://helephant.com/2009/11/29/javascript-method-context/
	addEvent: function(element, eventName, handler, context)
	{
	    var wrapper = handler;
	    if(context)
	    {
	        // create an anonymous function
	        // that uses a closure to access the context parameter
	        // and then uses Function.call() to invoke the real event handler
	        wrapper = function(e) {
	            handler.call(context, e);
	        }
	    }
	    if(element.addEventListener)
	        element.addEventListener(eventName, wrapper, false);
	    else if(element.attachEvent)
	        element.attachEvent("on" + eventName, wrapper);
	},
	wrapFunction: function(fn, context, params) {
		return function() {
			fn.apply(context, params);
		};
	},
	convertPixelsToGrids: function(x, y, unit) {
		if ((typeof(x) === 'number')&&(typeof(y) === 'number')&&(typeof(unit) === 'number')) {
			return [Math.floor(x/unit), Math.floor(y/unit)];
		}
		return null;
	},
	convertGridsToPixels: function(gridX, gridY, unit) {
		if ((typeof(gridX) === 'number')&&(typeof(gridY) === 'number')&&(typeof(unit) === 'number')) {
			return [gridX*unit, gridY*unit];
		}
		return null;
	},
	castPlayerHelper: function(array) {
		var i;
		for (i = 0; i < array.length; i++) {
			if (array[i] instanceof BBN.Player) {
				return array[i];
			}
		}
		return null;		
	},
	castBallHelper: function(array)  {
		var i;
		for (i = 0; i < array.length; i++) {
			if (array[i] instanceof BBN.Ball) {
				return array[i];
			}
		}
		return null;		
	},
	castGridEntityHelper: function(array) {
		var i, entityArray = [];
		for (i = 0, arrayLength = array.length; i < arrayLength; i++) {
			if (array[i] instanceof BBN.Player || array[i] instanceof BBN.Ball) {
				entityArray.push(array[i]);
			}
		}
		return entityArray;		
	},
	isAdjacent: function(e1, e2) {

		isAdjacent = false;

		var loc1 = e1.location;
		var loc2 = e2.location;

		var x = Math.abs(loc1[0] - loc2[0]);
		var y = Math.abs(loc1[1] - loc2[1]);

		console.log(x);
		console.log(y);

		if ((x === 1)||(y === 1)) {
			isAdjacent = true;
		}

		return isAdjacent;
	}
}