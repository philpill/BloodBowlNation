console.log('-- test.Helpers --');
describe("Helpers", function() {

	var x, y, unit, grids, testFunction;

	var entity1, entity2, isAdjacent;

	var gridx, gridy, unit, pixels;

	var array, isEmpty, player;

	var minValue, maxValue, testValue;

	beforeEach(function () {
		entity1 = {};
		entity2 = {};
		isAdjacent = false;
		x = 0;
		y = 0;
		unit = 0;
		grids = [];
		gridx = 0;
		gridy = 0;
		unit = 0;
		pixels = [];
		minValue = 0;
		maxValue = 0;
		testValue = 0;
	});

	it("should exist", function() {
		expect(Helpers).not.toBeNull();
	});
	it("should return true for adjacent grid entities", function() {
		testFunction = Helpers.isAdjacent;
		entity1.location = [0, 1];
		entity2.location = [0, 0];
		isAdjacent = testFunction(entity1, entity2);
		expect(isAdjacent).toBeTruthy();

		entity1.location = [5, 1];
		entity2.location = [0, 0];
		isAdjacent = testFunction(entity1, entity2);
		expect(isAdjacent).toBeFalsy();

		entity1.location = [5, 5];
		entity2.location = [0, 0];
		isAdjacent = testFunction(entity1, entity2);
		expect(isAdjacent).toBeFalsy();

		entity1.location = [0, 0];
		entity2.location = [0, 0];
		isAdjacent = testFunction(entity1, entity2);
		expect(isAdjacent).toBeFalsy();

		entity1.location = [13, 27];
		entity2.location = [43, 16];
		isAdjacent = testFunction(entity1, entity2);
		expect(isAdjacent).toBeFalsy();

		entity1.location = [16, 9];
		entity2.location = [15, 9];
		isAdjacent = testFunction(entity1, entity2);
		expect(isAdjacent).toBeTruthy();		
	});
	it("should return grids for pixels", function() {		
		testFunction = Helpers.convertPixelsToGrids;
		x = 100;
		y = 100;
		unit = 10;
		grids = [];
		grids = testFunction(x, y, unit);
		expect(grids).toEqual([10, 10]);
		x = 0;
		y = 0;
		unit = 10;
		grids = [];
		grids = testFunction(x, y, unit);
		expect(grids).toEqual([0, 0]);
		x = 253; //36.14
		y = 168; //24
		unit = 7;
		grids = [];
		grids = testFunction(x, y, unit);
		expect(grids).toEqual([36, 24]);
		x = 256; //36.57
		y = 184; //26.29
		unit = 7;
		grids = [];
		grids = testFunction(x, y, unit);
		expect(grids).toEqual([36, 26]);
		x = 'a';
		y = 100;
		unit = 7;
		grids = [];
		grids = testFunction(x, y, unit);
		expect(grids).toBeNull();
	});
	it("should return pixels for grids", function() {		
		testFunction = Helpers.convertGridsToPixels;
		gridx = 5;
		gridy = 10;
		unit = 20;
		pixels = [];
		pixels = testFunction(gridx, gridy, unit);
		expect(pixels).toEqual([100, 200]);
		gridx = 8;
		gridy = 12;
		unit = 13;
		pixels = [];
		pixels = testFunction(gridx, gridy, unit);
		expect(pixels).toEqual([104, 156]);
		gridx = 10;
		gridy = 12;
		unit = 'b';
		pixels = [];
		pixels = testFunction(gridx, gridy, unit);
		expect(pixels).toBeNull();
	});
	it("should know empty spaces", function() {	

		spyOn(BBN, 'Player').andCallThrough();
    	player = new BBN.Player(null, null, { name: '', colours:[]});


		testFunction = Helpers.isSpaceEmpty;
		array = [], isEmpty = null;
		array[0] = player;
		array[1] = [4, 5, 6];
		array[2] = 3;
		array[3] = 'TEST';
		array[4] = { name: 'test' };
		isEmpty = testFunction(array);
		expect(isEmpty).toBeFalsy();
		
		array = [], isEmpty = null;
		array[0] = new Object();
		array[1] = [4, 5, 6];
		array[2] = 3;
		array[3] = 'TEST';
		array[4] = { name: 'test' };
		isEmpty = testFunction(array);
		expect(isEmpty).toBeTruthy();
	});
	it("should return a random value within the specified range", function() {

		minValue = 3;
		maxValue = 9;
		testValue;

		testFunction = Helpers.getRandom;

		testValue = testFunction(minValue, maxValue);

		expect(testValue).not.toBeLessThan(minValue);

		expect(testValue).not.toBeGreaterThan(maxValue);
	});
	it("should return a random value between 1 and 6 by default", function() {

		minValue = undefined;
		maxValue = undefined;
		testValue;

		testFunction = Helpers.getRandom;

		testValue = testFunction(minValue, maxValue);

		expect(testValue).not.toBeLessThan(1);

		expect(testValue).not.toBeGreaterThan(6);
	});
});