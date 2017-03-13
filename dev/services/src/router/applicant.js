
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
}