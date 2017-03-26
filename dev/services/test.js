var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('localhost', 'serverDB');

var Applicant = require('./models/Applicant');
var Course = require('./models/Courses');
var Assignment = require('./model/assignment')

console.log('Applicant population in progress');
var applicant1 = new Applicant({
      studentNumber: 1007192911,
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
var applicant2 = new Applicant({
      studentNumber: 1000192911,
	  UTORid: "manoha56",
	  lastName: 'Manoharan',
	  firstName: 'Janarthanan',
	  phoneNumber: '+16471112331',
	  email: 'janamano@gmail.com',

	  studentInformation: {
	    programLevel: 'Undergraduate',   /* Undergraduate, Masters, PhD */
	    year: 3,
	    programName: 'Computer Science',    /* E.g Computer Science */
	    workStatus: "Legally Entitled",    /* Options: "Legally Entitled" and "Student Visa"*/
	    studentStatus: "Full-Time",  /* Options: "Full-Time", "Part-Time", and "Not Enrolled" */
	    TAHistory: [{
	      courseCode: 'CSC108',    /* Courses TA'd in the past*/
	      timesTAd: 2
	    },
		{
	      courseCode: 'CSC148',    /* Courses TA'd in the past*/
	      timesTAd: 2
	    }]
    }
});
var applicant3 = new Applicant({
      studentNumber: 1123192911,
	  UTORid: "atheed12",
	  lastName: 'Thameem',
	  firstName: 'Atheed',
	  phoneNumber: '+16471231234',
	  email: 'athameem@gmail.com',

	  studentInformation: {
	    programLevel: 'Undergraduate',   /* Undergraduate, Masters, PhD */
	    year: 3,
	    programName: 'Computer Science',    /* E.g Computer Science */
	    workStatus: "Legally Entitled",    /* Options: "Legally Entitled" and "Student Visa"*/
	    studentStatus: "Full-Time",  /* Options: "Full-Time", "Part-Time", and "Not Enrolled" */
	    TAHistory: [{
	      courseCode: 'CSC343',    /* Courses TA'd in the past*/
	      timesTAd: 2
	    },
		{
	      courseCode: 'CSC148',    /* Courses TA'd in the past*/
	      timesTAd: 2
	    }]
    }
});
var applicant4 = new Applicant({
      studentNumber: 1123873911,
	  UTORid: "sajid32",
	  lastName: 'Ahmed',
	  firstName: 'Sajid',
	  phoneNumber: '+16472231234',
	  email: 'sajid123@gmail.com',

	  studentInformation: {
	    programLevel: 'Masters',   /* Undergraduate, Masters, PhD */
	    year: 3,
	    programName: 'Computer Science',    /* E.g Computer Science */
	    workStatus: "Legally Entitled",    /* Options: "Legally Entitled" and "Student Visa"*/
	    studentStatus: "Full-Time",  /* Options: "Full-Time", "Part-Time", and "Not Enrolled" */
	    TAHistory: [{
	      courseCode: 'CSC443',    /* Courses TA'd in the past*/
	      timesTAd: 4
	    },
		{
	      courseCode: 'CSC343',    /* Courses TA'd in the past*/
	      timesTAd: 2
	    }]
    }
});
var applicant5 = new Applicant({
      studentNumber: 1123872340,
	  UTORid: "gautams",
	  lastName: 'Gautam',
	  firstName: 'Siddharth',
	  phoneNumber: '+16473231234',
	  email: 'sid123@gmail.com',

	  studentInformation: {
	    programLevel: 'Masters',   /* Undergraduate, Masters, PhD */
	    year: 3,
	    programName: 'Computer Science',    /* E.g Computer Science */
	    workStatus: "Legally Entitled",    /* Options: "Legally Entitled" and "Student Visa"*/
	    studentStatus: "Full-Time",  /* Options: "Full-Time", "Part-Time", and "Not Enrolled" */
	    TAHistory: [{
	      courseCode: 'CSC148',    /* Courses TA'd in the past*/
	      timesTAd: 1
	    },
		{
	      courseCode: 'CSC343',    /* Courses TA'd in the past*/
	      timesTAd: 2
	    }]
    }
});
var applicant6 = new Applicant({
      studentNumber: 1123802340,
	  UTORid: "alexyan",
	  lastName: 'Yan',
	  firstName: 'Alex',
	  phoneNumber: '+16473232134',
	  email: 'yanman@gmail.com',

	  studentInformation: {
	    programLevel: 'PhD',   /* Undergraduate, Masters, PhD */
	    year: 3,
	    programName: 'Computer Science',    /* E.g Computer Science */
	    workStatus: "Legally Entitled",    /* Options: "Legally Entitled" and "Student Visa"*/
	    studentStatus: "Part-Time",  /* Options: "Full-Time", "Part-Time", and "Not Enrolled" */
	    TAHistory: [{
	      courseCode: 'CSC148',    /* Courses TA'd in the past*/
	      timesTAd: 1
	    },
		{
	      courseCode: 'CSC343',    /* Courses TA'd in the past*/
	      timesTAd: 2
	    },
		{
	      courseCode: 'CSC108',    /* Courses TA'd in the past*/
	      timesTAd: 6
	    },
		{
	      courseCode: 'CSC207',    /* Courses TA'd in the past*/
	      timesTAd: 5
	    }]
    }
});
var applicant7 = new Applicant({
      studentNumber: 1123872340,
	  UTORid: "gsc123",
	  lastName: 'Singh Cadiuex',
	  firstName: 'Gabrielle',
	  phoneNumber: '+16471111234',
	  email: 'gscgscgsc@gmail.com',

	  studentInformation: {
	    programLevel: 'Masters',   /* Undergraduate, Masters, PhD */
	    year: 3,
	    programName: 'Computer Science',    /* E.g Computer Science */
	    workStatus: "Legally Entitled",    /* Options: "Legally Entitled" and "Student Visa"*/
	    studentStatus: "Full-Time",  /* Options: "Full-Time", "Part-Time", and "Not Enrolled" */
	    TAHistory: [{
	      courseCode: 'CSC148',    /* Courses TA'd in the past*/
	      timesTAd: 1
	    },
		{
	      courseCode: 'CSC207',    /* Courses TA'd in the past*/
	      timesTAd: 10
	    }]
    }
});
applicant1.save();
applicant2.save();
applicant3.save();
applicant4.save();
applicant5.save();
applicant6.save();
applicant7.save();

var course1 = new Course({
	code: 'CSC108',
	title: 'Introduction to Computer Programming',
	instructor: 'Jennifer Campbell',
	numberOfTAs: 40,
	qualifications: 'Exellent OO programming skills, Python is an asset.'
});

var course2 = new Course({
	code: 'CSC148',
	title: 'Introduction to Computer Science',
	instructor: 'Pit Franc',
	numberOfTAs: 20,
	qualifications: 'Obtained at least A in CSC108 and CSC148'
});
var course3 = new Course({
	code: 'CSC207',
	title: 'Software Design',
	instructor: 'Anya Tafliovich',
	numberOfTAs: 20,
	qualifications: 'Excellent OO skills nad Experience with Java'
});
var course4 = new Course({
	code: 'CSC209',
	title: 'Systems Programming',
	instructor: 'Bianca Schroeder',
	numberOfTAs: 10,
	qualifications: 'Excellent skills with C'
});
var course5 = new Course({
	code: 'CSC343',
	title: 'Introduction to Databases',
	instructor: 'Nick Koudas',
	numberOfTAs: 30,
	qualifications: 'Knowledge of databases and SQL'
});
var course6 = new Course({
	code: 'CSC301',
	title: 'Introduction to Software Engineering',
	instructor: 'Mathew Zaleski',
	numberOfTAs: 10,
	qualifications: 'Obtained at least A in CSC207 and CSC209'
});
var course7 = new Course({
	code: 'CSC309',
	title: 'Programming on the Wb',
	instructor: 'Amir Chinaei',
	numberOfTAs: 20,
	qualifications: 'Excellent knowledge of HTML, CSS, and JavaScript'
});
var course8 = new Course({
	code: 'CSC369',
	title: 'Operating Systems',
	instructor: 'Bogdan Simion',
	numberOfTAs: 20,
	qualifications: 'Obtained at least A in CSC209 and CSC258'
});
var course9 = new Course({
	code: 'CSC258',
	title: 'Computer Organization',
	instructor: 'Francisco Estrada',
	numberOfTAs: 20,
	qualifications: 'Obtained at least A in CSC258'
});
var course10 = new Course({
	code: 'CSC165',
	title: 'Mathematical Expression and Reasoning for Computer Science',
	instructor: 'David Liu',
	numberOfTAs: 5,
	qualifications: 'Must be good at reasoning and logic'
});
course1.save()
course2.save();
course3.save()
course4.save();
course5.save()
course6.save();
course7.save()
course8.save();
course9.save();
course10.save();

var assignment1 = new Assignment({
	assignedApplicant: 1123872340,
	assignedCourse: 'CSC108',
	assignedHour: 65
});
var assignment2 = new Assignment({
	assignedApplicant: 1123872340,
	assignedCourse: 'CSC148',
	assignedHour: 65
});
var assignment3 = new Assignment({
	assignedApplicant: 1123872340,
	assignedCourse: 'CSC258',
	assignedHour: 65
});
var assignment4 = new Assignment({
	assignedApplicant: 1123802340,
	assignedCourse: 'CSC108',
	assignedHour: 65
});
var assignment5 = new Assignment({
	assignedApplicant: 1123802340,
	assignedCourse: 'CSC148',
	assignedHour: 65
});
var assignment6 = new Assignment({
	assignedApplicant: 1123802340,
	assignedCourse: 'CSC165',
	assignedHour: 65
});

var assignment7 = new Assignment({
	assignedApplicant: 1000192911,
	assignedCourse: 'CSC207',
	assignedHour: 65
});
var assignment8 = new Assignment({
	assignedApplicant: 1000192911,
	assignedCourse: 'CSC209',
	assignedHour: 65
});
var assignment9 = new Assignment({
	assignedApplicant: 1000192911,
	assignedCourse: 'CSC301',
	assignedHour: 65
});
var assignment10 = new Assignment({
	assignedApplicant: 1123872340,
	assignedCourse: 'CSC369',
	assignedHour: 65
});
var assignment11 = new Assignment({
	assignedApplicant: 1123872340,
	assignedCourse: 'CSC309',
	assignedHour: 65
});
var assignment12 = new Assignment({
	assignedApplicant: 1123872340,
	assignedCourse: 'CSC343',
	assignedHour: 65
});
var assignment13 = new Assignment({
	assignedApplicant: 1123192911,
	assignedCourse: 'CSC369',
	assignedHour: 65
});
var assignment14 = new Assignment({
	assignedApplicant: 1123192911,
	assignedCourse: 'CSC309',
	assignedHour: 65
});
var assignment15 = new Assignment({
	assignedApplicant: 1123192911,
	assignedCourse: 'CSC343',
	assignedHour: 65
});
var assignment16 = new Assignment({
	assignedApplicant: 1007192911,
	assignedCourse: 'CSC369',
	assignedHour: 65
});
var assignment17 = new Assignment({
	assignedApplicant: 1007192911,
	assignedCourse: 'CSC309',
	assignedHour: 65
});
var assignment18 = new Assignment({
	assignedApplicant: 1007192911,
	assignedCourse: 'CSC343',
	assignedHour: 65
});
var assignment19 = new Assignment({
	assignedApplicant: 1123802340,
	assignedCourse: 'CSC108',
	assignedHour: 65
});
var assignment20 = new Assignment({
	assignedApplicant: 1123802340,
	assignedCourse: 'CSC148',
	assignedHour: 65
});
var assignment21 = new Assignment({
	assignedApplicant: 1123802340,
	assignedCourse: 'CSC258',
	assignedHour: 65
});

console.log('Process Complete!');
