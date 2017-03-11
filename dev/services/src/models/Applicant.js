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
    programLevel: String,   /* Undergraduate, Masters, PhD */
    year: Number,
    programName: String,    /* E.g Computer Science */
    workStatus: boolean,    /* True=Eligible, False= Not eligible to work */
    studenStatus: boolean,  /* True=Enrolled, False= Not Enrolled*/
    academicHistory: [{
    courseCode : String,
    grade : Number          /* Grade out of 100 */
     }],
    TAHistory: [{
      courseCode: String,    /* Courses TA'd in the past*/
      timesTAd: Number
    }]
  }

});

module.exports = mongoose.model('Applicant', applicantSchema);