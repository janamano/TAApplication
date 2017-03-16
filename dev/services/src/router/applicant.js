
var ApplicantList = require('../../models/Applicant')

module.exports = function(app) {
 
    app.get('/getApplicantsList', function(req, res) {
        ApplicantList.find({}, function(err, appList){
        	if(err){
        		res.send(err);
        	}else{
        		console.log("Sending resp");
        		res.send(appList);
        	}
        });
    });
    /*Test Call: http://localhost:8080/login?studentNum=1000192911&utorid=bondj */
    app.get('/login/', function(req, res) {
        var studNum = req.query.studentNum;
        var utorId = req.query.utorid;
        //console.log(req.query);
        ApplicantList.find({studentNumber: studNum, UTORid: utorId}, function(err, appProf){
            if(err){
                res.send(err);
            }else{
                console.log("Sending resp");
                res.send(appProf);
                
                
            }
        });
    });
    /*Test Call: http://localhost:8080/getApplicant?studentNum=1000192911 */
    app.get('/getApplicant/', function(req, res) {
        var studNum = req.query.studentNum;
        console.log(req.query);
        ApplicantList.find({studentNumber: studNum}, function(err, appProf){
            if(err){
                res.send(err);
            }else{
                console.log("Sending resp");
                res.send(appProf);   
            }
        });
    });
     /*Test Call: http://localhost:8080/getApplicantTAHist?studentNum=1000192911 */
    app.get('/getApplicantTAHist/', function(req, res) {
        var studNum = req.query.studentNum;
        console.log(req.query);
        ApplicantList.find({studentNumber: studNum}, function(err, appTAProf){
            if(err){
                res.send(err);
            }else{
                console.log("Sending resp");
                var appl = appTAProf[0];
                res.send(appl.studentInformation.TAHistory);   
            }
        });
    });
}