var applications = require('../../models/Application');
var applicants = require('../../models/Applicant');
module.exports = function(app) {
     /*Test Call: http://localhost:8080/getApplication?utorid=bondj */
    app.get('/getApplication/', function(req, res) {
        console.log("Reached");
        var utorId = req.query.utorid;
        applications.find({ UTORid: utorId }, function(err, application){
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
                        status: 'success',
                        data: application,
                        message: "Successfully found all applicants"
                    });
        	}
        });
    });
    app.post('/saveApplication/', function(req, res) {
        var utorId = req.body.utorid;
        var ssn = req.body.session;
        var sts = req.body.status;
        
        console.log(req.body);
        console.log(req.body.utorid);
    
        /* Get all the course rank combinations and adds them to a list */
        var courseRankComb = [];
            for(i=0; i<=5; i++){
                for(j=0; j<req.body.rankings[i].length; j++){
                    var crsRank = {
                        courseCode: String(req.body.rankings[i][j]),
                        rank: i
                    }
                    console.log(crsRank);
                    
                    courseRankComb.push(crsRank);
                }
            }
            console.log("COURSE RANK COMBO")
            console.log(courseRankComb);
        applications.findOne({UTORid: utorId}, function(err, applcn){
            if(err){
                res.status(400)
                    .json({
                        status: 'error',
                        data: {},
                        message: err
                    });
            }else{
                if(applcn == null){
                    console.log("Doesnt exist in db. Creating application.");
                /* Creates application and saves it */
                    var newapplication = new applications({
                        UTORid: utorId,
                        session: ssn,
                        coursePref: courseRankComb,
                        status: sts 
                    });
                    newapplication.save();
                    res.status(200)
                        .json({
                            status: 'success',
                            data: {},
                            message: "assignment saved"
                        });
                }else{
                    console.log("Application exists. Modifying")
                    console.log(applcn);
                    applcn.status= sts;
                    applcn.session = ssn;
                    applcn.coursePref = courseRankComb;
                    applcn.save();
                    res.status(200)
                            .json({
                                status: 'success',
                                data: applcn,
                                message: "Successfully filtered applicants"
                            });
                }
                
            }
        });
        
    });
    app.get('/submitApplication/', function(req, res) {
        var utorId = req.query.utorid;
        applications.findOne({UTORid: utorId}, function(err, application){
            if(err){
                res.status(400)
                    .json({
                        status: 'error',
                        data: {},
                        message: err
                    });
            }else{
                application.status = true;
                application.save();
                console.log("Sending resp");
                res.status(200)
                    .json({
                        status: 'success',
                        data: application,
                        message: "Successfully submitted Application"
                    });
            }
        });
    });

    app.get('/getApplicantsByCourse', function(req, res) {
        var course = req.query.course;
        applications.find({status: true, 'coursePref.courseCode': {$in: [course]}}, function(err, applications) {
            if (err) {
                res.status(400)
                .json({
                    status: 'error',
                    data: {},
                    message: err
                });
            } else {
                var listOfApplicants = [];
                for (var i = 0; i < applications.length; i++) {
                    listOfApplicants.push(applications[i].UTORid);
                }
                applicants.find({UTORid: listOfApplicants}, function(err, applicants) {
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
        })
    });
};