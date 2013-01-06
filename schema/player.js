var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ObjectId = Schema.ObjectId;

var PlayerSchema = new Schema({
    name: { type: String, required: true, index: { unique: true } },
    position: { type: ObjectId, required: true },
    created: { type: Date, required: true },
    team: { type: ObjectId },
    starPlayerPoints: { type: Number },
    skills: { type: Array },
    injuries: { type: Array },
    isStarPlayer: { type: Boolean },
    touchDowns: { type: Number }
});

module.exports = mongoose.model('Player', PlayerSchema);