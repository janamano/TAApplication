var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('localhost', 'serverDB');

var Applicant = require('./models/Applicant');
var Course = require('./models/Courses');
console.log('Applicant population in progress');
var applicant = new Applicant({
      studentNumber: 1000192911,
	  UTORid: "bondj",
	  lastName: 'Bond',
	  firstName: 'James',
	  phoneNumber: '+16471119111',
	  email: '007@gmail.com',

	  studentInformation: {
	    programLevel: 'PhD',   /* Undergraduate, Masters, PhD */
	    year: 2,
	    programName: 'Computer Science',    /* E.g Computer Science */
	    workStatus: "Legally Entitled",    /* Options: "Legally Entitled" and "Student Visa"*/
	    studentStatus: "Full-Time",  /* Options: "Full-Time", "Part-Time", and "Not Enrolled" */
	    TAHistory: [{
	      courseCode: 'CSC108',    /* Courses TA'd in the past*/
	      timesTAd: 10
	    }]
    }
});
applicant.save();

var applicant2 = new Applicant({

    studentNumber: 1000123456,
    UTORid: "utori11"
});
applicant2.save();

	 var course1 = new Course({
    	code: 'CSC108',
	  	title: 'Introduction to Computer Programming',
        instructor: 'Jennifer Campbell',
        numberOfTAs: 40,
        qualifications: 'Exellent OO programming skills, Python is an asset.'
	  });
	  course1.save();

		var course2 = new Course({
    	code: 'CSC148',
	  	title: 'Introduction to Computer Science',
        instructor: 'Pit Franc',
        numberOfTAs: 20,
        qualifications: 'Obtained at least A in CSC108 and CSC148'
	  });
	  course2.save();

		var course3 = new Course({
    	code: 'CSC165',
	  	title: 'Mathematical Expression and Reasoning for Computer Science',
        instructor: 'David Liu',
        numberOfTAs: 5,
        qualifications: 'Must be good at reasoning and logic'
	  });
	  course3.save();

  console.log('Process Complete!');
