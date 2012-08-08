describe("BloodBowlNation", function() {

	it("should exist", function() {

		expect(BBN).not.toBeNull();

	});

	describe("Variables", function() {

		it("should exist", function() {

			expect(BBN.Variables).not.toBeNull();

		});

	});

	describe("Player", function() {

		var player;

		beforeEach(function () {
    		player = new BBN.Player();
		});

		it("should exist", function() {

			expect(BBN.Player).not.toBeNull();

		});

		it("should instatiate a player", function() {

			expect(player).not.toBeNull();

		});		
	});	
});