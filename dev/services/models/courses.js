var mongoose = require('mongoose');

/**
 * Courses DB schema
 */
var coursesSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    title: String,
    instructor: String,
    numberOfTAs: Number,
    qualificants: String
});

module.exports = mongoose.model('Courses', coursesSchema);
