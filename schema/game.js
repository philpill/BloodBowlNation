var mongoose = require('mongoose');

var base = require('./_base.js');

var Schema = mongoose.Schema;

var ObjectId = Schema.Types.ObjectId;

module.exports = mongoose.model('Game', new Schema(new base({

    name: { type: String, required: true },
    host: { type: ObjectId, ref: 'User', required: true },
    client: { type: ObjectId, ref: 'User'},
    hostTeam : { type: ObjectId, ref: 'Team' },
    clientTeam : { type: ObjectId, ref: 'Team' },
    gameTurn: { type: Number, required: true },
})));
