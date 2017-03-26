var mongoose = require('mongoose');

/**
 * assignment schema
 */
var assignmentSchema = new mongoose.Schema({
    // a 1 to 1 relationship between course and applicant
    assignedApplicant: Number,  // student number
    assignedCourse: Object,  // Course code
    assignedHour: Number
});

module.exports = mongoose.model('assignment', assignmentSchema);
