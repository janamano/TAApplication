
var AssignmentList = require('../../models/Assignment');
var CourseList = require('../../models/Courses');
var ApplicantList = require('../../models/Applicant');

module.exports = function(app) {

    /* Save Assignment
    Test Call:  http://localhost:8080/saveAssignment?applicant=1000192911&course=CSC108&hour=40
    */
    app.post('/saveAssignment/', function(req, res) {
        var applicant = req.query.applicant;  //student number  Number
        var course = req.query.course;  // course code  String
        var hours = req.query.hour;   // assigned hour Number

        // Check to see if there is remaining position in course.
        CourseList.find({$and: [{code: course}, {numberOfTAs: {$ne: 0}}]}, function(err, course) {
            if (err) {
                res.status(400)
                    .json({
                        status: 'error',
                        data: {},
                        message: err
                    });
            } else {
                // save the assignment
                var assignment = new AssignmentList({
                    assignedApplicant: applicant,  // student number
                    assignedCourse: course,  // Course code
                    assignedHour: hours
                });
                assignment.save();
                res.status(200)
                    .json({
                        status: 'success',
                        data: {},
                        message: "assignment saved"
                    });
            }
        });

    });

    /* Get a list of applicants assigned to a given course code
    Test Call http://localhost:8080/getApplicantsByCourse?course=CSC108*/
    app.get('/getApplicantsByCourse/', function(req, res) {
        var course = req.query.course;
        // 1. find the assignments that's related to this course.
        AssignmentList.find({'assignedCourse.code': course}, function(err, assignments) {
            if (err) {
                res.status(400)
                    .json({
                        status: 'error',
                        data: {},
                        message: err
                    });
            } else {
                // 2. find the list of assigned applicants
                res.status(200)
                    .json({
                        status: 'success',
                        data: assignments,
                        message: "found"
                    });
            }
        });
    });



};
