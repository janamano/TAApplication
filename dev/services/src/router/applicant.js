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

        /*
        Filter applicants by combination of querys.
        Possible query value: grad, takenPreq, TAed
        Test calls: http//localhost:8080/filterApplicants?query=grad;takenPreq;TAed=CSC108
        */
        app.get('/filterApplicants/', function(req, res) {

            var grad = req.query.query.includes('grad');
            //var takenPreq = req.query.query.includes('takenPreq');
            var TAed = req.query.query.includes('TAed');
            var index = req.query.query.indexOf('TAed') + 5;  // 5 = length of 'TAed='
            var course = req.query.query.substring(index, index + 6);  // 6 = length of CourseCode: CSC108
            console.log(course);
            var callbackFunc =  function(err, applicants) {
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
                            message: "Successfully filtered applicants"
                        });
                }
            };
            if (grad && TAed) {
                ApplicantList.find(
                    {$and: [
                        {'studentInformation.programLevel': {$ne: 'Undergraduate'}},
                        {'studentInformation.TAHistory': {$elemMatch: {courseCode: course}}}]},
                        callbackFunc);

            } else if (grad) {
                ApplicantList.find(
                        {'studentInformation.programLevel': {$ne: 'Undergraduate'}},
                        callbackFunc);
            } else if (TAed) {
                ApplicantList.find(
                        {'studentInformation.TAHistory': {$elemMatch: {courseCode: course}}},
                        callbackFunc);
            }

        });

        app.get('/getApplicantUtorid', function(req, res) {
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
                            data: appl.UTORid,
                            message: "Successfully found the student's utorid"
                        });
                }
            });
        });
    app.post('/saveApplicant/', function(req, res) {
        var UTORid = req.body.UTORid;
        var studentNumber = req.body.studentNumber;
        var lastName = req.body.lastName;
        var firstName = req.body.firstName;
        var phoneNumber = req.body.phoneNumber;
        var email = req.body.phoneNumber;
        var email = req.body.email;
        var programLevel = req.body.studentInformation.programLevel;
        var year = req.body.studentInformation.year;
        var programName = req.body.studentInformation.programName;
        var workStatus = req.body.studentInformation.workStatus;
        var studentStatus = req.body.studentInformation.studentStatus;
        
        console.log(req.body);
        console.log(req.body.utorid);
    
        /* Creates application and saves it */
        var newapplicant = new ApplicantList({
            UTORid: UTORid,
            studentNumber: studentNumber,
            lastName: lastName,
            firstName: firstName,
            phoneNumber: phoneNumber,
            email: email,
            studentInformation: {
                programLevel: programLevel,
                year: year,
                programName: programName,
                workStatus: workStatus,
                studentStatus: studentStatus
            }
        });
       newapplicant.save();
       res.status(200)
                    .json({
                        status: 'success',
                        data: {},
                        message: "assignment saved"
                    });
       
        });
};
