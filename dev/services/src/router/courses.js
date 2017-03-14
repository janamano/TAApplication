
var CourseList = require('../../models/Courses');

module.exports = function(app) {

    app.get('/getCourseList', function(req, res) {
        CourseList.find({}, function(err, courseList){
        if(err){
        res.send(err);
        }else{
        console.log("Sending resp");
        res.send(courseList);
        }
        });
    });

    app.get('/getCourseInfo', function(req, res) {
        var course = req.query.course;
        console.log('look for course code:' + course);
        CourseList.find({code: course}, function(err, responseCourse) {
            if (err) {
                res.status(400).send(err);
            } else{
                res.status(200).json(responseCourse);
            }
        });
    });
};
