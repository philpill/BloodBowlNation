var mongoose = require('mongoose');

var base = require('./_base.js');

var Schema = mongoose.Schema;

var ObjectId = Schema.Types.ObjectId;

module.exports = mongoose.model('Event', new Schema(new base({

    name: { type: String, required: true, index: { unique: true } }

})));