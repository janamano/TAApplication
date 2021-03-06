var ApplicantList = require('../../models/Applicant');
var Applications = require('../../models/Application');

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
        	
                res.status(200)
                    .json({
                        status: 'error',
                        data: appList,
                        message: "Successfully found all applicants"
                    });
            }
        });
    });

    app.get('/getApplicantByStudentNumber', function(req, res) {
        var studNum = req.query.studentNumber;
        ApplicantList.findOne({studentNumber: studNum}, function(err, applicant){
            if (err || applicant == null) {
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
                        data: applicant,
                        message: "Successfully found applicant"
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
        
        ApplicantList.find({studentNumber: studNum}, function(err, appTAProf){
            if (err || appTAProf.length == 0) {
                res.status(400)
                    .json({
                        status: 'error',
                        data: {},
                        message: err
                    });
            } else {
                
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
    app.get('/filterApplicants', function(req, res) {
        
        var courseUC = req.query.courseUC;
        var grad = req.query.query.includes('grad');
        var TAed = req.query.query.includes('TAed');
        
        var index = req.query.query.indexOf('TAed') + 5;  // 5 = length of 'TAed='
        
        var course = req.query.query.substring(index, index + 6);  // 6 = length of CourseCode: CSC108

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

        // get all the applciants who applied to this course 
        Applications.find({status: true, 'coursePref.courseCode': {$in: [courseUC]}}, function(err, applications) {
            if (err) {
                res.status(400)
                    .json({
                        status: 'error',
                        data: {},
                        message: err
                    });
            } else {

                // store their utorids in a list
                var listOfApplicants = [];
                for (var i = 0; i < applications.length; i++) {
                    listOfApplicants.push(applications[i].UTORid);
                }
	        // the filter was set to both grad students only and previously taed
                if (grad && TAed) {
                    ApplicantList.find(
                        {$and: [
                            {UTORid: listOfApplicants},
                            {'studentInformation.programLevel': {$ne: 'Undergraduate'}},
                            {'studentInformation.TAHistory': {$elemMatch: {courseCode: course}}}]},
                        callbackFunc);        
                    // 
                } else if (grad) {
                    ApplicantList.find(
                        {$and: [
                            {UTORid: listOfApplicants},
                            {'studentInformation.programLevel': {$ne: 'Undergraduate'}}]},
                        callbackFunc);
                } else if (TAed) {
                    ApplicantList.find(
                        {$and: [
                            {UTORid: listOfApplicants},
                            {'studentInformation.TAHistory': {$elemMatch: {courseCode: course}}}]},
                        callbackFunc);
                }

            }
        })
    });

    app.get('/getApplicantUtorid', function(req, res) {
        var studNum = req.query.studentNum;
        
        ApplicantList.find({studentNumber: studNum}, function(err, appTAProf){
            if (err || appTAProf.length == 0) {
                res.status(400)
                    .json({
                        status: 'error',
                        data: {},
                        message: err
                    });
            } else {
                
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
        var email = req.body.email;
        var programLevel = req.body.studentInformation.programLevel;
        var year = req.body.studentInformation.year;
        var programName = req.body.studentInformation.programName;
        var workStatus = req.body.studentInformation.workStatus;
        var studentStatus = req.body.studentInformation.studentStatus;
        
        ApplicantList.findOne({studentNumber: studentNumber}, function(err, student){
            if(err){
                res.status(400)
                    .json({
                        status: 'error',
                        data: {},
                        message: err
                    });
            }else{
                student.UTORid = UTORid;
                student.lastName = lastName;
                student.firstName = firstName;
                student.phoneNumber = phoneNumber;
                student.email = email;
                student.studentInformation.programLevel = programLevel;
                student.studentInformation.year = year;
                student.studentInformation.programName = programName;
                student.studentInformation.workStatus = workStatus;
                student.studentInformation.studentStatus = studentStatus;
                student.save();
                res.status(200)
                    .json({
                        status: 'success',
                        data: student,
                        message: "Successfully filtered applicants"
                    });
            }
        });
	
        /* THIS WILL STAY TILL WE DECIDE IF WE WILL BE ADDING NEW APPLICANTS */
        /* Creates application and saves it */
	/* var newapplicant = new ApplicantList({
           studentNumber: studentNumber,
           UTORid: UTORid,
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
           },
           TAHistory: []
           });
           
           ApplicantList.save(newapplicant, {w:1}, function(err, modified, stats){
           if(err){
           console.log(err);
           }else{
           console.log("MODIFIES: "+ modified);
           }
           
           });
	   //newapplicant.save();
	   console.log(newapplicant);
	   res.status(200)
           .json({
           status: 'success',
           data: {},
           message: "assignment saved"
           });
	   
           });*/
    })

    app.post('/saveTAHistory/', function(req, res) {
        var UTORid = req.body.UTORid;
        var studentNumber = req.body.studentNumber;
        var TAHistory = req.body.TAHistory;
        ApplicantList.findOne({studentNumber: studentNumber}, function(err, student){
            if(err || student == null){
                res.status(400)
                    .json({
                        status: 'error',
                        data: {},
                        message: err
                    });
            }else{
                student.studentInformation.TAHistory = TAHistory;
                student.save();
                res.status(200)
                    .json({
                        status: 'success',
                        data: student,
                        message: "Successfully filtered applicants"
                    });
            }
        });
	
        
    })



};
