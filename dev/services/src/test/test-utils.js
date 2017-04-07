var exports = module.exports = {};

var Applicant = require('../../models/Applicant');
var Course = require('../../models/Courses');
var Application = require('../../models/Application');
var Assignment = require('../../models/Assignment');

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
