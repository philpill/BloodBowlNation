
(function(req) {


	var human = {

		lineman : {

			movement : 6,
			strength : 3,
			agility : 3,
			armour : 8
		}
	};

	var orc = {

		lineman : {

			movement : 5,
			strength : 3,
			agility : 3,
			armour : 9
		}
	};

	var attributes = {

		human : human,
		orc : orc
	};

	module.exports = {

		attributes : attributes
	};

})(require);