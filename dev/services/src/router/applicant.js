
var ApplicantList = require('../../models/Applicant');

module.exports = function(app) {

    app.get('/getApplicantsList', function(req, res) {
        ApplicantList.find({}, function(err, appList){
        	if (err) {
                res.status(400)
                    .json({
                        status: 'error',
                        data: {},
                        message: err
                    });
        	} else {
        		console.log("Sending resp");
                res.status(200)
                    .json({
                        status: 'error',
                        data: appList,
                        message: "Successfully found all applicants"
                    });
        	}
        });
    });
    /*Test Call: http://localhost:8080/login?studentNum=1000192911&utorid=bondj */
    app.get('/login/', function(req, res) {
        var studNum = req.query.studentNum;
        var utorId = req.query.utorid;
        ApplicantList.find({studentNumber: studNum, UTORid: utorId}, function(err, appProf){
            if (err) {
                res.status(400)
                    .json({
                        status: 'error',
                        data: {},
                        message: "No student with these credential was found"
                    });
            } else {
                console.log("Sending resp");

                if (appProf.length > 0) {
                    res.status(200)
                        .json({
                            status: 'success',
                            data: appProf,
                            message: "Successfully found one student"
                        });
                } else {
                    res.status(400)
                        .json({
                            status: 'error',
                            data: {},
                            message: "No student with these credential was found"
                        });
                }
            }
        });
    });
    /*Test Call: http://localhost:8080/getApplicant?studentNum=1000192911 */
    app.get('/getApplicant/', function(req, res) {
        var studNum = req.query.studentNum;
        ApplicantList.find({studentNumber: studNum}, function(err, appProf){
            if (err) {
                res.status(400)
                    .json({
                        status: 'error',
                        data: {},
                        message: err
                    });
            }else {
                console.log("Sending resp");
                if (appProf.length > 0) {
                    res.status(200)
                        .json({
                            status: 'success',
                            data: appProf,
                            message: "Successfully found one student"
                        });
                } else {
                    res.status(400)
                        .json({
                            status: 'error',
                            data: {},
                            message: "No student with these credential was found"
                        });
                }
            }
        });
    });
     /*Test Call: http://localhost:8080/getApplicantTAHist?studentNum=1000192911 */
    app.get('/getApplicantTAHist/', function(req, res) {
        var studNum = req.query.studentNum;
        console.log(req.query);
        ApplicantList.find({studentNumber: studNum}, function(err, appTAProf){
            if (err) {
                res.status(400)
                    .json({
                        status: 'error',
                        data: {},
                        message: err
                    });
            } else {
                console.log("Sending resp");
                var appl = appTAProf[0];
                res.status(200)
                    .json({
                        status: 'success',
                        data: appl.studentInformation.TAHistory,
                        message: "Successfully found the student's TA history"
                    });
            }
        });
    });
    /* Get a list of applicants assigned to a given course code
    Test Call http://localhost:8080/getApplicantsByCourse?course=CSC165*/
    app.get('/getApplicantsByCourse/', function(req, res) {
        var course = req.query.course;
        ApplicantList.find({'positionAssigment.courseCode': course}, function(err, applicants) {
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
                        message: "found"
                    });
            }
        });
    });
};
