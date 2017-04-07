var util = require('./src/test/test-utils');
var fs = require('fs');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = mongoose.connect('localhost', 'serverDB');

var Applicant = require('./models/Applicant');
var Course = require('./models/Courses');
var Application = require('./models/Application');
var Assignment = require('./models/Assignment');

var applicantFile = './src/test/applicants.json';
var courseFile = './src/test/courses.json';
var applicationFile = './src/test/applications.json';
var assignmentFile = './src/test/assignments.json';

// populate DB
if (process.argv[2] == '-p') {

    console.log('Applicant population in progress');
    var data = fs.readFileSync(applicantFile);
    var applicants = JSON.parse(data);

    var i;
    for (i = 0; i < applicants.length; i++)
	util.addApplicant(applicants[i]);

    console.log('Course population in progress');
    var data = fs.readFileSync(courseFile);
    var courses = JSON.parse(data);

    var i;
    for (i in courses)
	util.addCourse(courses[i]);
    
    console.log('Application population in progress');
    var data = fs.readFileSync(applicationFile);
    var applications = JSON.parse(data);

    var i;
    for (i = 0; i < applications.length; i++)
	util.addApplication(applications[i]);

    console.log('Assignment population in progress');    
    var data = fs.readFileSync(assignmentFile);
    var assignments = JSON.parse(data);

    var i, a;
    for (i = 0; i < assignments.length; i++){
	// get the corresponding course from the course data
	a = assignments[i];
	a.assignedCourse = courses[a.assignedCourse];
	
	util.addAssignment(a);
    }

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
