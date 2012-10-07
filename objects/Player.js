
(function(req) {

	var Player = function(name, number, race, attributes){

		this.name = name;
		this.number = number;
		this.race = race;

		if (attributes) {

			this.movementAllowance = attributes.movement;
			this.strength = attributes.strength;
			this.agility = attributes.agility;
			this.armourValue = attributes.armour;
		}
	};

	Player.prototype = {

		name : '',
		number : 0,
		race : '',
		movementAllowance : 0,
		strength : 0,
		agility : 0,
		armourValue : 0
	};


	module.exports = Player;

})(require);