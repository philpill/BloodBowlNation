var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ObjectId = Schema.ObjectId;

module.exports = function(struct) {

    var base = {

        createDate : { type: Date, required: true },
        createBy : { type: ObjectId, required: true },
        editDate : { type: Date },
        editBy : { type: ObjectId },
        description : { type: String }
    };

    for (var prop in base) {

        struct[prop] = base[prop];
    }

    return struct;
};