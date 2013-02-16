var mongoose = require('mongoose');

var base = require('./_base.js');

var Schema = mongoose.Schema;

var ObjectId = Schema.Types.ObjectId;

module.exports = mongoose.model('Skill', new Schema(new base({

    name: { type: String, required: true, index: { unique: true } },
    positions: { type: Array },
    eventTrigger: { type: ObjectId },
    race: { type: ObjectId }
})));