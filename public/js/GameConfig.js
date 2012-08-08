define([], function(){

	var human = {

		lineman : {

			movement : 6,
			strength : 3,
			agility : 3,
			armour : 8
		}
	}

	var orc = {

		lineman : {

			movement : 5,
			strength : 3,
			agility : 3,
			armour : 9
		}
	}

	return {

		attributes : {
			human : human,
			orc : orc
		}
	}
});