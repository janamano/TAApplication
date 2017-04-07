var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/main');
var Applicant = require('../models/Applicant');
var Assignment = require('../models/Assignment');

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


describe('Assignments', function() {
    beforeEach(function(onSetupComplete) {
      applicant.save(function() {
            var assignment = new Assignment({
                  assignedApplicant: applicant,
                  assignedCourse: 'CSC369',
                  assignedHour: 42
            });
            assignment.save(function() {
                  onSetupComplete();
            });
      });
    });
    
    afterEach(function(onTearDownComplete){
        Assignment.collection.remove({assignedApplicant: 94132310751});
        Applicant.collection.remove({studentNumber: 94132310751});
        onTearDownComplete();
    });
        
    it('POST /saveAssignment assigns an applicant to the given course', function(done) {
      requestBody = {
            "applicant": "94132310751",
            "course": "CSC207",
            "hours": 40
      };
    
      chai.request(server).post('/saveAssignment').send(requestBody).end(function(error, response) {
          checkBasicStructure(response);
  
          Assignment.find({assignedApplicant: 94132310751}, function (err, assignments) {
              if (err) {
                  chai.assert.fail(0, 1, 'Could not retrieve assignments');
              }
              else {
                  chai.assert.equal(1, assignments.length, 'Applicant was not assigned correctly');
              }
              done();
          });
      });
    });
    
    it('POST /rejectApplicant rejects an applicant from the given course', function(done) {
      requestBody = {
            studentNumber: 94132310751,
            courseCode: 'CSC369'
      };
      
      chai.request(server).delete('/rejectApplicant').send(requestBody).end(function(error, response) {
            checkBasicStructure(response);
            done();
      });
    });
});