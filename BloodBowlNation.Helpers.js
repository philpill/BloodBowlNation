
//http://helephant.com/2009/11/29/javascript-method-context/
function addEvent(element, eventName, handler, context)
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
}

function _convertPixelsToGrids(x, y, unit) {
	return [Math.ceil(x/unit), Math.ceil(y/unit)];
}

function _convertGridsToPixels(gridX, gridY, unit) {
	return [gridX*unit-unit, gridY*unit-unit];
}	