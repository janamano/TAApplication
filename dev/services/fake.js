// process command-line argument to select testing/dev environment
// use dev environment by default
process.env.NODE_ENV = (process.argv.indexOf('-t') == -1) ? 'development' : 'test'; 
// server configuration file
var config = require('./src/_config');

var util = require('./test/test-utils');

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


var populate = function(func){
    util.addApplicants(
	0, util.applicants, util.addCourses(
		0, util.courses, util.addApplications(
			0, util.applications, util.addAssignments(
			    0, util.assignments, func))));
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
