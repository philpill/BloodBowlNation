
var mongoose = require('mongoose');

var base = require('./_base.js');

var Schema = mongoose.Schema;

var ObjectId = Schema.Types.ObjectId;

module.exports = mongoose.model('Player', new Schema(new base({

    name: { type: String, required: true },
    position: { type: ObjectId },
    starPlayerPoints: { type: Number },
    skills: { type: Array },
    injuries: { type: Array },
    isStarPlayer: { type: Boolean },
    touchDowns: { type: Number },
    race: { type: ObjectId }

})));