var mongoose = require('mongoose');

var base = require('./_base.js');

var Schema = mongoose.Schema;

var ObjectId = Schema.Types.ObjectId;

module.exports = mongoose.model('Position', new Schema(new base({

	name: { type: String, required: true, index: { unique: true } },
	skills: { type: Array },
	race: { type: ObjectId },
	movement: { type: Number, min: 2, max: 9 },
	strength: { type: Number, min: 1, max: 7  },
	agility: { type: Number, min: 1, max: 4 },
	armour: { type: Number, min: 6, max: 10 },
	cost: { type: Number, min: 20000, max: 160000 },
	quantity: { type: Number, min: 0, max: 16 },
	skillsCategories: {
		general: { type: Number, min: 0, max: 2 },
		agility: { type: Number, min: 0, max: 2 },
		strength: { type: Number, min: 0, max: 2 },
		passing: { type: Number, min: 0, max: 2 },
		mutation: { type: Number, min: 0, max: 2 }
	}

})));