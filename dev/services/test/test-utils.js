var exports = module.exports = {};

var chai = require('chai');
var expect = chai.expect;

var Applicant = require('../models/Applicant');
var Course = require('../models/Courses');
var Application = require('../models/Application');
var Assignment = require('../models/Assignment');

// add single applicant to DB
exports.addApplicant = function(a, func){
    new Applicant(a).save().then(func);
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
    new Course(a).save().then(func);
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
    new Application(a).save().then(func);
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
    new Assignment(a).save().then(func);
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
    c.remove({}).exec().then(func);
};

// clean all collections of DB
exports.cleanDB = function(func){
    exports.cleanCollection(
	Applicant, () => exports.cleanCollection(
	    Course, () => exports.cleanCollection(
		Application, () => exports.cleanCollection(
		    Assignment, () => func()
		))));
};

// expect course a to have same properties and values as course b
exports.compareCourses = function(a, b){
    expect(a).to.have.property('code', b.code);
    expect(a).to.have.property('title', b.title);
    expect(a).to.have.property('instructor', b.instructor);
    expect(a).to.have.property('numberOfTAs', parseInt(b.numberOfTAs));
    expect(a).to.have.property('qualifications', b.qualifications);
};

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
