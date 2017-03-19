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
        var ssn = req.body.session;
        var sts = req.body.status;
        
        console.log(req.body);
        console.log(req.body.utorid);
    
        /* Get all the course rank combinations and adds them to a list */
        var courseRankComb = [];
            for(i=0; i<5; i++){
                for(j=0; j<req.body.rankings[i].length; j++){
                    var crsRank = {
                        courseCode: String(req.body.rankings[i][j].courseCode),
                        rank: req.body.rankings[i][j].rank
                    }
                    console.log(crsRank);
                    
                    courseRankComb.push(crsRank);
                }
            }
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
       
        });   
    };
   

