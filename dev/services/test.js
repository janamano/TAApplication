
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('localhost', 'serverDB');

var Applicant = require('./models/Applicant');

console.log('Applicant population in progress');
  var applicant = new Applicant({
    studentNumber: 1000192911,
	lastName: 'Bond',
	  firstName: 'James', 
	  phoneNumber: '+16471119111',
	  email: '007@gmail.com',

	  studentInformation: {
	    programLevel: 'PhD',   /* Undergraduate, Masters, PhD */
	    year: 2,
	    programName: 'CSC458',    /* E.g Computer Science */
	    workStatus: "Legally Entitled",    /* True=Eligible, False= Not eligible to work */
	    studenStatus: true,  /* True=Enrolled, False= Not Enrolled*/
	    academicHistory: [{
	    	courseCode : 'CSC410',
	    	grade : 100          /* Grade out of 100 */
	     }],
	    TAHistory: [{
	      courseCode: 'CSC108',    /* Courses TA'd in the past*/
	      timesTAd: 10
	    }]
	  }
	  });
	  applicant.save();

  console.log('Process Complete!');
