
var CourseList = require('../../models/Courses');

module.exports = function(app) {

    app.get('/getCourseList', function(req, res) {
        CourseList.find({}, function(err, courseList) {
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
                        data: courseList,
                        message: "Successfully found all courses"
                    });
            }
        });
    });

    app.get('/getCourseInfo', function(req, res) {
        var course = req.query.course;
        CourseList.find({code: course}, function(err, responseCourse) {
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
                        data: responseCourse,
                        message: "Successfully found this course's info"
                    });
            }
        });
    });

    /* return a list of courses that has open TA positions
    Test Call: http://localhost:8080/getOpenings*/
    app.get('/getOpenings', function(req, res) {
        CourseList.find({remainingPosition: {$ne: 0}}, function(err, openCourse) {
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
                        data: openCourse,
                        message: "Successfully found all courses with open TA positions"
                    });
            }
        });
    });
};
