// process command-line argument to select testing/dev environment
// use dev environment by default
process.env.NODE_ENV = (process.argv.indexOf('-t') == -1) ? 'development' : 'test'; 
// server configuration file
var config = require('./src/_config');

var util = require('./test/test-utils');
var fs = require('fs');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

/*DB Connection*/
var db = mongoose.connect(config.mongoURI[process.env.NODE_ENV], function(err) {
    if(err) {
	console.log('Error connecting to the database. ' + err);
    } else {
	console.log('Connected to Database: ' + config.mongoURI[process.env.NODE_ENV]);
    }
});

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
    // match courseID in assignment to course itself
    var i;
    for (i = 0; i < assignments.length; i++)
	assignments.assignedCourse = courses[assignments.assignedCourse];
    
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
    var p = function(func){
	if (process.argv.indexOf('-p') != -1)
	    return () => { populate(func) };

	return func;
    };
    
    var c = function(func){
	if (process.argv.indexOf('-c') != -1)
	    return () => { clean(func); };

	return func;
    };
    
    // persist connection to DB
    var ps = (process.argv.indexOf('-ps') != -1) ? (() => {}) : db.disconnect;

    // invoke chained functions
    p(c(ps))();
}
