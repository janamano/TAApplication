var exports = module.exports = {};

var chai = require('chai');
var expect = chai.expect;

var Applicant = require('../models/Applicant');
var Course = require('../models/Courses');
var Application = require('../models/Application');
var Assignment = require('../models/Assignment');

exports.addApplicant = function(a, func){
    new Applicant(a).save(func);
};

exports.addCourse = function(a, func){
    new Course(a).save(func);
};

exports.addApplication = function(a, func){
    new Application(a).save(func);
};

exports.addAssignment = function(a, func){
    new Assignment(a).save(func);
};

exports.cleanCollection = function(c, func){
    c.remove({}).exec(func);
};

exports.cleanDB = function(){
    exports.cleanCollection(Applicant);
    exports.cleanCollection(Course);
    exports.cleanCollection(Application);
    exports.cleanCollection(Assignment);
};

exports.compareCourses = function(a, b){
    expect(a).to.have.property('code', b.code);
    expect(a).to.have.property('title', b.title);
    expect(a).to.have.property('instructor', b.instructor);
    expect(a).to.have.property('numberOfTAs', parseInt(b.numberOfTAs));
    expect(a).to.have.property('qualifications', b.qualifications);
};

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
