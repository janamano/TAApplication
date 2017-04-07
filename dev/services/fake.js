var util = require('./src/test/test-utils');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = mongoose.connect('localhost', 'serverDB');

var Applicant = require('./models/Applicant');
var Course = require('./models/Courses');
var Application = require('./models/Application');
var Assignment = require('./models/Assignment');

// populate DB
if (process.argv[2] == '-p') {

    console.log('Applicant population in progress');
    util.addApplicant({
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
    
    util.addApplicant({
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
    
    util.addApplicant({
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

    util.addApplicant({
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
    
    util.addApplicant({
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
    
    util.addApplicant({
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

    util.addApplicant({
	studentNumber: 1123872341,
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

    console.log('Course population in progress');
    var course1 = {
	code: 'CSC108',
	title: 'Introduction to Computer Programming',
	instructor: 'Jennifer Campbell',
	numberOfTAs: 40,
	qualifications: 'Exellent OO programming skills, Python is an asset.'
    };
    util.addCourse(course1);

    var course2 = {
	code: 'CSC148',
	title: 'Introduction to Computer Science',
	instructor: 'Pit Franc',
	numberOfTAs: 20,
	qualifications: 'Obtained at least A in CSC108 and CSC148'
    };
    util.addCourse(course2);
    
    var course3 = {
	code: 'CSC207',
	title: 'Software Design',
	instructor: 'Anya Tafliovich',
	numberOfTAs: 20,
	qualifications: 'Excellent OO skills nad Experience with Java'
    };
    util.addCourse(course3);
    
    var course4 = {
	code: 'CSC209',
	title: 'Systems Programming',
	instructor: 'Bianca Schroeder',
	numberOfTAs: 10,
	qualifications: 'Excellent skills with C'
    };
    util.addCourse(course4);
    
    var course5 = {
	code: 'CSC343',
	title: 'Introduction to Databases',
	instructor: 'Nick Koudas',
	numberOfTAs: 30,
	qualifications: 'Knowledge of databases and SQL'
    };
    util.addCourse(course5);
    
    var course6 = {
	code: 'CSC301',
	title: 'Introduction to Software Engineering',
	instructor: 'Mathew Zaleski',
	numberOfTAs: 10,
	qualifications: 'Obtained at least A in CSC207 and CSC209'
    };
    util.addCourse(course6);
    
    var course7 = {
	code: 'CSC309',
	title: 'Programming on the Wb',
	instructor: 'Amir Chinaei',
	numberOfTAs: 20,
	qualifications: 'Excellent knowledge of HTML, CSS, and JavaScript'
    };
    util.addCourse(course7);
    
    var course8 = {
	code: 'CSC369',
	title: 'Operating Systems',
	instructor: 'Bogdan Simion',
	numberOfTAs: 20,
	qualifications: 'Obtained at least A in CSC209 and CSC258'
    };
    util.addCourse(course8);
    
    var course9 = {
	code: 'CSC258',
	title: 'Computer Organization',
	instructor: 'Francisco Estrada',
	numberOfTAs: 20,
	qualifications: 'Obtained at least A in CSC258'
    };
    util.addCourse(course9);
    
    var course10 = {
	code: 'CSC165',
	title: 'Mathematical Expression and Reasoning for Computer Science',
	instructor: 'David Liu',
	numberOfTAs: 5,
	qualifications: 'Must be good at reasoning and logic'
    };
    util.addCourse(course10);
    
    console.log('Application population in progress');
    util.addApplication({
	UTORid:'bondj',
	session: 'Summer 2017',
	coursePref: [
	    {
		courseCode: 'CSC258', rank: 1
	    },
	    {
		courseCode: 'CSC108', rank: 2
	    },
	    {
		courseCode: 'CSC148', rank: 3
	    },
	    {
		courseCode: 'CSC165', rank: 4
	    }],
	status: true
    });

    util.addApplication({
	UTORid:'gautams',
	session: 'Summer 2017',
	coursePref: [
	    {
		courseCode: 'CSC301', rank: 1
	    },
	    {
		courseCode: 'CSC148', rank: 2
	    },
	    {
		courseCode: 'CSC108', rank: 3
	    },
	    {
		courseCode: 'CSC207', rank: 4
	    }],
	status: true
    });

    util.addApplication({
	UTORid:'manoha56',
	session: 'Summer 2017',
	coursePref: [
	    {
		courseCode: 'CSC258', rank: 1
	    },
	    {
		courseCode: 'CSC108', rank: 2
	    },
	    {
		courseCode: 'CSC148', rank: 3
	    },
	    {
		courseCode: 'CSC309', rank: 4
	    }],
	status: true
    });

    util.addApplication({
	UTORid:'gsc123',
	session: 'Summer 2017',
	coursePref: [
	    {
		courseCode: 'CSC209', rank: 1
	    },
	    {
		courseCode: 'CSC207', rank: 2
	    },
	    {
		courseCode: 'CSC148', rank: 3
	    },
	    {
		courseCode: 'CSC369', rank: 4
	    }],
	status: true
    });

    util.addApplication({
	UTORid:'atheed12',
	session: 'Summer 2017',
	coursePref: [
	    {
		courseCode: 'CSC209', rank: 1
	    },
	    {
		courseCode: 'CSC207', rank: 1
	    },
	    {
		courseCode: 'CSC343', rank: 1
	    },
	    {
		courseCode: 'CSC369', rank: 1
	    }],
	status: true
    });

    util.addApplication({
	UTORid:'alexyan',
	session: 'Summer 2017',
	coursePref: [
	    {
		courseCode: 'CSC148', rank: 1
	    },
	    {
		courseCode: 'CSC209', rank: 1
	    },
	    {
		courseCode: 'CSC343', rank: 1
	    },
	    {
		courseCode: 'CSC369', rank: 1
	    }],
	status: true
    });
    
    util.addApplication({
	UTORid:'sajid32',
	session: 'Summer 2017',
	coursePref: [
	    {
		courseCode: 'CSC108', rank: 5
	    },
	    {
		courseCode: 'CSC309', rank: 4
	    },
	    {
		courseCode: 'CSC343', rank: 3
	    },
	    {
		courseCode: 'CSC367', rank: 1
	    }],
	status: true
    });

    console.log('Assignment population in progress');    
    util.addAssignment({
	assignedApplicant: 1007192911,
	assignedCourse: course1,
	assignedHour: 65
    });

    util.addAssignment({
	assignedApplicant: 1007192911,
	assignedCourse: course9,
	assignedHour: 65
    });

    util.addAssignment({
	assignedApplicant: 1123872340,
	assignedCourse: course2,
	assignedHour: 65
    });

    util.addAssignment({
	assignedApplicant: 1123872340,
	assignedCourse: course3,
	assignedHour: 65
    });

    util.addAssignment({
	assignedApplicant: 1000192911,
	assignedCourse: course1,
	assignedHour: 65
    });

    util.addAssignment({
	assignedApplicant: 1000192911,
	assignedCourse: course2,
	assignedHour: 65
    });

    util.addAssignment({
	assignedApplicant: 1123872341,
	assignedCourse: course4,
	assignedHour: 65
    });

    util.addAssignment({
	assignedApplicant: 1123872341,
	assignedCourse: course8,
	assignedHour: 65
    });

    util.addAssignment({
	assignedApplicant: 1123192911,
	assignedCourse: course4,
	assignedHour: 65
    });

    util.addAssignment({
	assignedApplicant: 1123192911,
	assignedCourse: course3,
	assignedHour: 65
    });

    util.addAssignment({
	assignedApplicant: 1123802340,
	assignedCourse: course2,
	assignedHour: 65
    });

    util.addAssignment({
	assignedApplicant: 1123802340,
	assignedCourse: course5,
	assignedHour: 65
    });

    util.addAssignment({
	assignedApplicant: 1123873911,
	assignedCourse: course1,
	assignedHour: 65
    });

    util.addAssignment({
	assignedApplicant: 1123873911,
	assignedCourse: course5,
	assignedHour: 65
    });

    console.log('Process Complete!');
    
    // clean DB
} else if (process.argv[2] == '-c'){

    console.log('Cleaning database');
    util.cleanDB();
    console.log('Process Complete!');
}

// do not persist connection to DB
if (process.argv.indexOf('-ps') == -1)
    db.disconnect();
