var mongoose = require('mongoose');

/**
 * Courses DB schema
 */
var coursesSchema = new mongoose.Schema({
    code: String,
    title: String, 
});

module.exports = mongoose.model('Courses', coursesSchema);