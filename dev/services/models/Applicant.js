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
  UTORid: String,
  lastName: String,
  firstName: String,
  phoneNumber: String,
  email: String,

  studentInformation: {
    programLevel: String,   /* Undergraduate, Masters, PhD */
    year: Number,
    programName: String,    /* E.g Computer Science */
    workStatus: String,    /* Options: "Legally Entitled" and "Student Visa"*/
    studentStatus: String,  /* Options: "Full-Time", "Part-Time", and "Not Enrolled" */
    TAHistory: [{
        courseCode: String,    /* Courses TA'd in the past*/
        timesTAd: Number
      }]
    }
});

module.exports = mongoose.model('Applicant', applicantSchema);
