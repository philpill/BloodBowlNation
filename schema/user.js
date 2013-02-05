var mongoose = require('mongoose');

var base = require('./_base.js');

var Schema = mongoose.Schema;

var ObjectId = Schema.Types.ObjectId;

module.exports = mongoose.model('User', new Schema(new base({

    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    email: { type: String },
    currentGame: { type: Number },
    teams: { type: Array },
    created: { type: Date, required: true }

})));