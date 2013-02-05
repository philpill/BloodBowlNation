var mongoose = require('mongoose');

var base = require('./_base.js');

var Schema = mongoose.Schema;

var ObjectId = Schema.Types.ObjectId;

module.exports = mongoose.model('Game', new Schema(base({

    name: { type: String, required: true, index: { unique: true } },
    host: { type: ObjectId, required: true },
    client: { type: ObjectId, required: true },
    gameTurn: { type: Number, required: true }

})));