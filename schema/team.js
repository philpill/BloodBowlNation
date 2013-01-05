var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TeamSchema = new Schema({
    name: { type: String, required: true, index: { unique: true } },
    players: { type: Array },
    fanFactor: { type: Number },
    treasury: { type: Number },
    played: { type: Number },
    won: { type: Number },
    lost: { type: Number },
    drawn: { type: Number }
});

module.exports = mongoose.model('Team', TeamSchema);