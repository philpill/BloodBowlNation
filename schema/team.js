var mongoose = require('mongoose');

var base = require('./_base.js');

var Schema = mongoose.Schema;

var ObjectId = Schema.Types.ObjectId;

module.exports = mongoose.model('Team', new Schema(new base({

    name: { type: String, required: true, index: { unique: true } },
    players: { type: Array },
    fanFactor: { type: Number },
    treasury: { type: Number },
    played: { type: Number },
    won: { type: Number },
    lost: { type: Number },
    drawn: { type: Number },
    race: { type: ObjectId }

})));