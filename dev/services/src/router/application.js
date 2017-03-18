var applications = require('../../models/Application');

module.exports = function(app) {
     /*Test Call: http://localhost:8080/getApplicantion?utorid=bondj */
    app.get('/getApplicantion/', function(req, res) {
        var utorId = req.query.utorid;
        applications.find({UTORid: utorId}, function(err, application){
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
                        data: application,
                        message: "Successfully found all applicants"
                    });
        	}
        });
    });
   
};
