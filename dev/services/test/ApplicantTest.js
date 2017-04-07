var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/main');
var Applicant = require('../models/Applicant');

chai.should();
chai.use(chaiHttp);

var applicant = new Applicant({
      studentNumber: 94132310751,
	  UTORid: "job",
	  lastName: 'Jobs',
	  firstName: 'Steve',
	  phoneNumber: '+16471119111',
	  email: 'sj@stevejobs.com',

	  studentInformation: {
	    programLevel: 'PhD',   /* Undergraduate, Masters, PhD */
	    year: 2,
	    programName: 'Computer Science',    /* E.g Computer Science */
	    workStatus: "Legally Entitled",    /* Options: "Legally Entitled" and "Student Visa"*/
	    studentStatus: "Full-Time",  /* Options: "Full-Time", "Part-Time", and "Not Enrolled" */
	    TAHistory: [{
	      courseCode: 'CSC369',    /* Courses TA'd in the past*/
	      timesTAd: 10
	    }]
    }
});

function checkBasicStructure(response) {
  
  response.should.have.status(200);
  
  response.should.be.json;
  response.body.should.be.a('object');
  
  response.body.should.have.property('status');
  response.body.status.should.equal('success');
  
  response.body.should.have.property('data');
}


describe('Applicants', function() {
    beforeEach(function(onSetupComplete) {
      applicant.save(function() {
        onSetupComplete();
      });
    });
    
    afterEach(function(onTearDownComplete){
        Applicant.collection.remove({studentNumber: 94132310751});
        onTearDownComplete();
    });
    
    it('POST /saveApplicant saves an applicant profile', function(done) {
      
      chai.request(server).post('/saveApplicant').send(applicant).end(function(error, response) {
            checkBasicStructure(response);
            done();
      });
    });
    
    it('POST /saveTAHistory saves courses previously TA by the given applicant', function(done) {
      requestBody = {
        UTORid: 'bondj',
        studentNumber: 1007192911,
        TAHistory: applicant.studentInformation.TAHistory
      };

      chai.request(server).post('/saveTAHistory').send(requestBody).end(function(error, response) {
            checkBasicStructure(response);
            done();
      });        
    });
});