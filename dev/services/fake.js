process.env.NODE_ENV = 'development'; // dev environment by default

var util = require('./test/test-utils');
var fs = require('fs');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = mongoose.connect('localhost', 'serverDB');

var Applicant = require('./models/Applicant');
var Course = require('./models/Courses');
var Application = require('./models/Application');
var Assignment = require('./models/Assignment');

var applicantFile = './test/testData/applicants.json';
var courseFile = './test/testData/courses.json';
var applicationFile = './test/testData/applications.json';
var assignmentFile = './test/testData/assignments.json';


var populate = function(func){
    
    var data = fs.readFileSync(applicantFile);
    var applicants = JSON.parse(data);

    var data = fs.readFileSync(courseFile);
    var courses = JSON.parse(data);

    var data = fs.readFileSync(applicationFile);
    var applications = JSON.parse(data);

    var data = fs.readFileSync(assignmentFile);
    var assignments = JSON.parse(data);

    
    util.addApplicants(
	0, applicants, util.addCourses(
		0, courses, util.addApplications(
			0, applications, util.addAssignments(
			    0, assignments, func))));
};

var clean = function(func){
    util.cleanDB(func);
};

// process command-line arguments

if (process.argv.indexOf('--help') != -1 || process.argv.indexOf('-h') != -1) {
    console.log('Usage: fake.js [-t] [-ps] [-p] [-c]\n' +
		'-t \tuse testing environment (dummy database)\n' +
		'-ps \tpersist database connection after running script\n' +
		'-p \tpopulate database with fake data\n' +
		'-c \tclean database');

    db.disconnect();
    
} else {
    // use testing environment
    if (process.argv.indexOf('-t') != -1)
	process.env.NODE_ENV = 'test';

    var p = process.argv.indexOf('-p') != -1;
    var c = process.argv.indexOf('-c') != -1;
    
    // persist connection to DB
    var ps = process.argv.indexOf('-ps') != -1;

    if (p) {
	// populate and then clean DB
	if (c) {

	    // persist connection to DB
	    if (ps)
		populate(() => clean());
	    else
		populate(() => clean(() => db.disconnect()));
	    
	// populate DB and persist connection
	} else if (ps) {
	    populate(clean);

	// just populate DB
	} else {
	    populate(() => db.disconnect());
	}
	
    } else if (c) {
	// clean DB and persist connection
	if (ps)
	    clean();
	// just clean DB
	else
	    clean(() => db.disconnect());
    }
}
