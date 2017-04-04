
var AssignmentList = require('../../models/Assignment');
var CourseList = require('../../models/Courses');
var ApplicantList = require('../../models/Applicant');

module.exports = function(app) {

    app.get('/getAssignments', function(req, res) {
       AssignmentList.find({}, function(err, assignments) {
            if (err) {
                res.status(400)
                    .json({
                        status: 'error',
                        data: {},
                        message: err
                    });
            } else{
                console.log("Sending resp");
                res.status(200)
                    .json({
                        status: 'success',
                        data: assignments,
                        message: "Successfully found all assignments"
                    });
            } 
        });
    });
    /* Save Assignment
    Test Call:  http://localhost:8080/saveAssignment?applicant=1000192911&course=CSC108&hour=40
    */
    app.post('/saveAssignment/', function(req, res) {
        var applicant = req.body.applicant;  //student number  Number
        var course = req.body.course;  // course code  String
        var hours = req.body.hour;   // assigned hour Number

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
                console.log(req.body);
                console.log(course);                
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

    // // /* Get a list of applicants assigned to a given course code
    // // Test Call http://localhost:8080/getApplicantsByCourse?course=CSC108*/
    // app.get('/getAssignmentsByCourse/', function(req, res) {
    //     var course = req.query.course;
    //     // 1. find the assignments that's related to this course.
    //     AssignmentList.find({'assignedCourse.code': course}, function(err, assignments) {
    //         if (err) {
    //             res.status(400)
    //                 .json({
    //                     status: 'error',
    //                     data: {},
    //                     message: err
    //                 });
    //         } else {
    //             // 2. find the list of assigned applicants
    //             var listOfApplicants = [];
    //             for (var i = 0; i < assignments.length; i++) {
    //                 listOfApplicants.push(assignments[i].assignedApplicant);
    //             }

    //             // 3. Query the applicants info
    //             ApplicantList.find({studentNumber: listOfApplicants}, function(err, applicants) {
    //                 if (err) {
    //                     res.status(400)
    //                         .json({
    //                             status: 'error',
    //                             data: {},
    //                             message: err
    //                         });
    //                 } else {
    //                     res.status(200)
    //                         .json({
    //                             status: 'success',
    //                             data: applicants,
    //                             message: "found the applicants"
    //                         });
    //                 }
    //             });
    //         }
    //     });
    // });



};
