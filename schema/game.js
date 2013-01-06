var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ObjectId = Schema.ObjectId;

var GameSchema = new Schema({
    name: { type: String, required: true, index: { unique: true } },
    created: { type: Date, required: true },
    host: { type: ObjectId, required: true },
    client: { type: ObjectId, required: true },
    gameTurn: { type: Number, required: true }
});

module.exports = mongoose.model('Game', GameSchema);