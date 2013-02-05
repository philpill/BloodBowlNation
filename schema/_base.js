var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ObjectId = Schema.ObjectId;

var _baseSchema = {
    createDate: { type: Date, required: true },
    createBy: { type: ObjectId, required: true },
    editDate: { type: Date },
    editBy: { type: ObjectId }
};

module.exports = _baseSchema;