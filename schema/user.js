var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    email: { type: String },
    currentGame: { type: Number },
    teams: { type: Array },
    created: { type: Date, required: true }
});

module.exports = mongoose.model('User', UserSchema);