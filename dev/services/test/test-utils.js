var exports = module.exports = {};

var chai = require('chai');
var expect = chai.expect;
chai.should();
var fs = require('fs');
var random = require('random-js');

exports.Applicant = require('../models/Applicant');
exports.Course = require('../models/Courses');
exports.Application = require('../models/Application');
exports.Assignment = require('../models/Assignment');

// fake data files (paths are relative to location from which script is run)
exports.applicantFile = './test/testData/applicants.json';
exports.courseFile = './test/testData/courses.json';
exports.applicationFile = './test/testData/applications.json';
exports.assignmentFile = './test/testData/assignments.json';

// parsed fake data
var data = fs.readFileSync(exports.applicantFile);
exports.applicants = JSON.parse(data);
var data = fs.readFileSync(exports.courseFile);
exports.courses = JSON.parse(data);
var data = fs.readFileSync(exports.applicationFile);
exports.applications = JSON.parse(data);
var data = fs.readFileSync(exports.assignmentFile);
exports.assignments = JSON.parse(data);


/* Functions to set-up testing database */

// add single applicant to DB
exports.addApplicant = function(a, func){
    new exports.Applicant(a).save(func);
};

// add applicants recursively to DB
exports.addApplicants = function(i, applicants, func){
    if (i < applicants.length){

	// if we have added all applicants, call the callback function
	if (i == applicants.length-1)
	    exports.addApplicant(applicants[i], func);

	else
	    exports.addApplicant(applicants[i], function(){
		exports.addApplicants(i+1, applicants, func);
	    });
    }
};

// add single course to DB
exports.addCourse = function(a, func){
    new exports.Course(a).save(func);
};

// add courses recursively to DB       
exports.addCourses = function(i, courses, func){

    var courseIds = Object.keys(courses);
    
    (function recAdd(j){
	if (j < courseIds.length){

	    // if we have added all courses, call the callback function
	    if (j == courseIds.length-1)
		exports.addCourse(courses[courseIds[j]], func);

	    else
		exports.addCourse(courses[courseIds[j]], function(){
		    recAdd(j+1);
		});
	}
    })(i);
};

// add single application to DB
exports.addApplication = function(a, func){
    new exports.Application(a).save(func);
};

// add applications recursively to DB
exports.addApplications = function(i, applications, func){
    if (i < applications.length){

	// if we have added all applications, call the callback function
	if (i == applications.length-1)
	    exports.addApplication(applications[i], func);

	else
	    exports.addApplication(applications[i], function(){
		exports.addApplications(i+1, applications, func);
	    });
    }
};

// add single assignment to DB
exports.addAssignment = function(a, func){
    new exports.Assignment(a).save(func);
};

// add assignments recursively to DB
exports.addAssignments = function(i, assignments, func){
    if (i < assignments.length){

	// if we have added all assignments, call the callback function
	if (i == assignments.length-1)
	    exports.addAssignment(assignments[i], func);

	else
	    exports.addAssignment(assignments[i], function(){
		exports.addAssignments(i+1, assignments, func);
	    });
    }
};

// clean DB collection
exports.cleanCollection = function(c, func){
    c.remove({}, func);
};

// clean all collections of DB
exports.cleanDB = function(func){
    exports.cleanCollection(
	exports.Applicant, () => exports.cleanCollection(
	    exports.Course, () => exports.cleanCollection(
		exports.Application, () => exports.cleanCollection(
		    exports.Assignment, func
		))));
};

/* END: functions to set-up testing database */

/* functions to examine server responses */

// expect course a to have same properties and values as course b
exports.compareCourses = function(a, b){
    expect(a).to.have.property('code', b.code);
    expect(a).to.have.property('title', b.title);
    expect(a).to.have.property('instructor', b.instructor);
    expect(a).to.have.property('numberOfTAs', parseInt(b.numberOfTAs));
    expect(a).to.have.property('qualifications', b.qualifications);
};

exports.checkBasicStructureCourseResp = function(response) {
  
  response.should.have.status(200);
  
  response.should.be.json;
  response.body.should.be.a('object');
  
  response.body.should.have.property('status');
  response.body.status.should.equal('success');
  
  response.body.should.have.property('data');
  response.body.data.should.be.a('array');
}

exports.checkBasicStructureApplicantResp = function(response) {
    
    response.should.have.status(200);
    
    response.should.be.json;
    response.body.should.be.a('object');
    
    response.body.should.have.property('status');
    response.body.status.should.equal('success');
    
    response.body.should.have.property('data');
}

exports.checkCourseAttributes = function(expected, actual) {
    actual.should.have.property('_id');
    actual.should.have.property('code');
    actual.should.have.property('title');
    actual.should.have.property('instructor');
    actual.should.have.property('numberOfTAs');
    actual.should.have.property('qualifications');
    actual.should.have.property('__v');

    // These value checks will be of more use once we use 'hooks' to
    // populate the database with test data before running each test
    actual.code.should.equal(expected.code);
    actual.title.should.equal(expected.title);
    actual.instructor.should.equal(expected.instructor);
    actual.numberOfTAs.should.equal(expected.numberOfTAs);
    actual.qualifications.should.equal(expected.qualifications);
}

exports.assert = function(response, expectedData, actualData) {
  exports.checkBasicStructureCourse(response);
  exports.checkCourseAttributes(expectedData, actualData);
}

// expect applicant a to have same properties and values as applicant b
exports.compareApplicants = function(a, b){
    expect(a).to.have.property('studentNumber', parseInt(b.studentNumber));
    expect(a).to.have.property('UTORid', b.UTORid);
    expect(a).to.have.property('lastName', b.lastName);
    expect(a).to.have.property('firstName', b.firstName);
    expect(a).to.have.property('phoneNumber', b.phoneNumber);
    expect(a).to.have.property('email', b.email);
    expect(a).to.have.property('studentInformation');
    expect(a).to.have.deep.property('studentInformation.programLevel',
				    b.studentInformation.programLevel);
    expect(a).to.have.deep.property('studentInformation.year',
				    parseInt(b.studentInformation.year));
    expect(a).to.have.deep.property('studentInformation.programName',
				    b.studentInformation.programName);
    expect(a).to.have.deep.property('studentInformation.workStatus',
				    b.studentInformation.workStatus);
    expect(a).to.have.deep.property('studentInformation.studentStatus',
				    b.studentInformation.studentStatus);
    expect(a).to.have.deep.property('studentInformation.TAHistory');

    var i;
    for (i = 0; i < b.studentInformation.TAHistory.length; i++){
	expect(a).to.have.deep.property('studentInformation.TAHistory[' + i + '].courseCode',
					b.studentInformation.TAHistory[i].courseCode);
	expect(a).to.have.deep.property('studentInformation.TAHistory[' + i + '].timesTAd',
					parseInt(b.studentInformation.TAHistory[i].timesTAd));
    }
};

// expect assignment a to have same properties and values as assignment b
exports.compareAssignments = function(a, b){
    expect(a).to.have.property('assignedApplicant', parseInt(b.assignedApplicant));
    expect(a).to.have.property('assignedHour', Number(b.assignedHour));
};


/* END: functions to examine server responses */

/* misc. functions */

exports.randInt = function(min, max){
    return random.integer(min, max)(random.engines.nativeMath);
};

exports.randSample = function(pop, size){
    return random.sample(random.engines.nativeMath, pop, size);
};

exports.randPick = function(pop){
    return random.pick(random.engines.nativeMath, pop, 1, pop.length);
};

// BUG HERE: doesn't differentiate between courses in different sessions, since I'm not sure how
//   to find the session of current interest
exports.filterApplicants = function(applications, applicants, courseCode, grad, TAed){
    return applicants.filter(
	function(applicant) {
	    if (grad && applicant.studentInformation.programLevel == 'Undergraduate')
		return false;

	    if (TAed && !(applicant.studentInformation.TAHistory.find(
		(c) => (c.courseCode == TAed && c.timesTAd > 0))))
		return false;
	    
	    var application = applications.find((a) => (a.UTORid == applicant.UTORid));
	    
	     // check that application was submitted
	    return (application && Boolean(application.status) &&
		    // check whether this course was applied to
		    application.coursePref.some((course) => (course.courseCode == courseCode)));
	});
};

/* END: misc. functions */
