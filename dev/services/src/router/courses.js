
var CourseList = require('../../models/Courses')

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
}