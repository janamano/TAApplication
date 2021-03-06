
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
                var courseToAdd = { "code": course.code, "title": course.title, "instructor": course.instructor, "numberOfTAs": course.numberOfTAs, "qualifications": course.qualifications }

                // save the assignment
                var assignment = new AssignmentList({
                    assignedApplicant: applicant,  // student number
                    assignedCourse: course,  // Course code
                    assignedHour: hours
                });

                assignment.save(function (err) {
                  if (err) {
                     res.status(500)
                     .json({
                        status: 'error',
                        data: {},
                        message: err
                    });
                  }
                  else {
                     res.status(200)
                       .json({
                           status: 'success',
                           data: {},
                           message: "assignment saved"
                     });
                  }
               });
            }
        });

    });

    // /* Get a list of applicants assigned to a given course code
    // Test Call http://localhost:8080/getAssignmentsByCourse?course=CSC108*/
    app.get('/getAssignmentsByCourse/', function(req, res) {
        var course = req.query.course;
        // 1. find the assignments that's related to this course.
        AssignmentList.find({'assignedCourse': course}, function(err, assignments) {
            if (err) {
                res.status(400)
                    .json({
                        status: 'error',
                        data: {},
                        message: err
                    });
            } else {
                // 2. find the list of assigned applicants
                var listOfApplicants = [];
                for (var i = 0; i < assignments.length; i++) {
                    listOfApplicants.push(assignments[i].assignedApplicant);
                }

                // 3. Query the applicants info
                ApplicantList.find({studentNumber: listOfApplicants}, function(err, applicants) {
                    if (err) {
                        res.status(400)
                            .json({
                                status: 'error',
                                data: {},
                                message: err
                            });
                    } else {
                        res.status(200)
                            .json({
                                status: 'success',
                                data: applicants,
                                message: "found the applicants"
                            });
                    }
                });
            }
        });
    });

    app.delete('/rejectApplicant/', function(req, res) {
        var studentNumber = req.body.studentNumber;
        var courseCode = req.body.courseCode;
        
        AssignmentList.findOneAndRemove({assignedApplicant: studentNumber, 'assignedCourse': courseCode}, function(err, assignment){
            if(err){
                res.status(400)
                        .json({
                            status: 'error',
                            data: {},
                            message: err
                        });
            } else {
                res.status(200)
                        .json({
                            status: 'success',
                            data: assignment,
                            message: "Successfully deleted assignment"
                        });
            }
        });
    
        
    })



};
