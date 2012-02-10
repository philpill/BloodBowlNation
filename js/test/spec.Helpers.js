console.log('-- test.Helpers --');
describe("Helpers", function() {
	it("should exist", function() {
		expect(Helpers).not.toBeNull();
	});
	it("should return grids for pixels", function() {
		var x, y, unit, grids, testFunction;
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
		var gridx, gridy, unit, pixels, testFunction;
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
});