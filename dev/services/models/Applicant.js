var mongoose = require('mongoose');

/**
 * Applicant schema
 */
var applicantSchema = new mongoose.Schema({
    studentNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    lastName: String,
    firstName: String,
    phoneNumber: String,
    email: String,

    studentInformation: {
        programLevel: String,
        /* Undergraduate, Masters, PhD */
        year: Number,
        programName: String,
        /* E.g Computer Science */
        workStatus: String,
        /* Options: "Legally Entitled" and "Student Visa"*/
        studenStatus: Boolean,
        /* True=Enrolled, False= Not Enrolled*/
        academicHistory: [{
            courseCode: String,
            grade: Number /* Grade out of 100 */
        }],
        TAHistory: [{
            courseCode: String,
            /* Courses TA'd in the past*/
            timesTAd: Number
        }]
    },
    positionAssigment: [{
        courseCode: String,
        numberOfHours: Number,
    }]
});

module.exports = mongoose.model('Applicant', applicantSchema);
