
define (function(require) {

	var helpers = require('Helpers');

	return {

		mediateBlock: function(attacker, defender) {

			var results, blockResultsLength, defenderStrength, attackerStrength, roll;

			results = [];

			blockResultsLength = this.getBlockResults(attacker, defender);

			defenderStrength = defender.strength;

			attackerStrength = attacker.strength;

			while (blockResultsLength--) {

				roll = helpers.getRandom();

				switch(roll){
					case 1:
						console.log('attacker down');
						results.push(1);
						break;
					case 2:
						console.log('both down');
						results.push(2);
						break;
					case 3:
					case 4:
						console.log('push back');
						results.push(3);
						break;
					case 5:
						console.log('defender stumble');
						results.push(4);
						break;
					case 6:					
						console.log('defender down');
						results.push(5);
						break;
					default:
						console.log('mediateBlock() error: helpers.getRandom() cannot return ^[1-6]');
						break;
				}

				return results;
			}
		},
		getBlockResults: function(attackerStrength, defenderStrength) {

			var blockResults = 0;

			if (attackerStrength === defenderStrength) {

				blockResults = 1;
			
			} else {

				blockResults = 2;
			}		

			if ((attackerStrength > 2*defenderStrength)||(defenderStrength > 2*attackerStrength)) {

				blockResults = 3;
			}

			return blockResults;

		},
		pushBack: function(player) {
			
		},
		stumbleKnockDown: function(player) {
			this.pushBack(player);
			//test for dodge
			this.knockDown(player);
		},
		knockDown: function(player) {
			//test AV + injury
		}
	}
});