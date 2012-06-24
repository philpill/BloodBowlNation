
define ({

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
	inheritPrototype : function(subType, superType) {

		var prototype = Object(superType.prototype);
		prototype.constructor = subType;
		subType.prototype = prototype;
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
		if (array instanceof Array) {
			for (i = 0; i < array.length; i++) {
				if (array[i] instanceof Player) {
					return array[i];
				}
			}
		}
		return null;		
	},
	castBallHelper: function(array)  {
		var i;
		for (i = 0; i < array.length; i++) {
			if (array[i] instanceof Ball) {
				return array[i];
			}
		}
		return null;		
	},
	castGridEntityHelper: function(array) {
		var i, entityArray = [];
		if (array instanceof Array) {
			for (i = 0, arrayLength = array.length; i < arrayLength; i++) {
				if (array[i] instanceof Player || array[i] instanceof Ball) {
					entityArray.push(array[i]);
				}
			}
		}
		return entityArray;		
	},
	isSpaceEmpty: function(array) {

		return (this.castGridEntityHelper(array).length === 0);
	},
	isAdjacent: function(e1, e2) {

		var loc1 = e1.location;
		var loc2 = e2.location;

		var x = Math.abs(loc1[0] - loc2[0]);
		var y = Math.abs(loc1[1] - loc2[1]);

		if ((x < 2) && (y < 2)) {

			//dirty bool cast
			return !!(x|y);
		}

		return false;
	},
	getPushBackSquares: function(aLocation, dLocation) {
		
		var aX, aY, dX, dY, iX, iY, jX, jY, kX, kY, pushBackLocation;
		
		aX = aLocation[0];
		aY = aLocation[1];
		
		dX = dLocation[0];
		dY = dLocation[1];
		
		jX = aX - 2*(aX - dX); //direct tackles
		jY = aY - 2*(aY - dY);
		
		if (dX === jX) { 
		//horizontal tackle
			iX = dX - 1;
			iY = jY;
			kX = dX + 1;
			kY = jY;
			
		} else if (dY === jY) { 
		//vertical tackle
			iX = jX;
			iY = dY - 1;
			kX = jX;
			kY = dY + 1;
		
		} else {
		//diagonal tackle
			iX = dX;
			iY = aY - 2*(aY - dY);
			jX = -1*(aX) + 2*(dX);
			jY = -1*(aY) + 2*(dY);
			kX = aX - 2*(aX - dX);
			kY = dY;
		}
		
		pushBackLocation = new Array();
		
		pushBackLocation[0] = [iX, iY];
		pushBackLocation[1] = [jX, jY];
		pushBackLocation[2] = [kX, kY];
							
		return pushBackLocation;
		
		//formula to determine diagonal tackle
		//a = (1/(a+b)) - b
		
		//formula to work out three straight gridsquares
		//a = 2(a - b) + c
		//a - 2(a - b) = c
		//16 - 2(16 - 17) = 18 = 16 - 2(-1) == a < c
		//9 - 2(9 - 8) = 7 = 9 - 2(1) == a > c
	},
	getRandom: function(max, min) {
	
		min = min ? min : 1;
		max = max ? max : 6;

		return Math.floor(Math.random() * (max - min + 1)) + min; 
	}
	
});