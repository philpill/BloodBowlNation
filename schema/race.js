var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RaceSchema = new Schema({
    name: { type: String, required: true, index: { unique: true } },
    positions: { type: Array, required: true },
    created: { type: Date, required: true }
});

module.exports = mongoose.model('Race', RaceSchema);