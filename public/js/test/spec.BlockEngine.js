console.log('-- test.BlockEngine --');
describe("BlockEngine", function() {

	var results, attacker, defender;

	beforeEach(function () {

		results = 0;
		attacker = {};
		defender = {};
	});

	it("should exist", function() {
		expect(BBN.BlockEngine).not.toBeNull();
		expect(BBN.BlockEngine).not.toBeUndefined();
	});

	describe("blocking", function() {

		it("should return one block result if strengths are equal (9)", function() {

			attacker.strength = 4;
			defender.strength = 4;

			results = BBN.BlockEngine.getBlockResults(attacker.strength, defender.strength);

			expect(results).toEqual(1);

		});

		it("should return at least two block results if strengths are unequal (9)", function() {

			attacker.strength = 5;
			defender.strength = 4;

			results = BBN.BlockEngine.getBlockResults(attacker.strength, defender.strength);

			expect(results).toBeGreaterThan(1);

			attacker.strength = 1;
			defender.strength = 6;

			results = BBN.BlockEngine.getBlockResults(attacker.strength, defender.strength);

			expect(results).toBeGreaterThan(1);			

		});

		it("should return three block results if one strength is more than double (9)", function() {

			attacker.strength = 2;
			defender.strength = 7;

			results = BBN.BlockEngine.getBlockResults(attacker.strength, defender.strength);

			expect(results).toEqual(3);

			attacker.strength = 6;
			defender.strength = 2;

			results = BBN.BlockEngine.getBlockResults(attacker.strength, defender.strength);

			expect(results).toEqual(3);

		});				
	});
});