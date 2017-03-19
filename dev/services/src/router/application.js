var applications = require('../../models/Application');

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
        var session = req.body.session;
        var status = req.body.status;
        var rankings = req.body.rankings;
        console.log(rankings);
        res.send("RECVD");
        /*
        rankings: {
            1: ["CSC165"],
            2: ["CSC108", "CSC324"],
            3: ["CSC443"],
            4: [],
            5: ["CSC207", "CSC236"],
            0: []
            }
        */ 

        /*
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
        });*/
    });
   
};
