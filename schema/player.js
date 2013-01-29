var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ObjectId = Schema.ObjectId;

var PlayerSchema = new Schema({
    name: { type: String, required: true },
    position: { type: ObjectId },
    created: { type: Date, required: true },
    starPlayerPoints: { type: Number },
    skills: { type: Array },
    injuries: { type: Array },
    isStarPlayer: { type: Boolean },
    touchDowns: { type: Number }
});

module.exports = mongoose.model('Player', PlayerSchema);