process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/main');
var expect = chai.expect;
chai.should();

var util = require('./test-utils');

chai.use(chaiHttp);

var applicant = new util.Applicant({
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


describe('Assignments tests', function() {
    // hook to clean DB before each test is run
    beforeEach('clean DB', function(done) {
	util.cleanDB(done);
    });
    
    /*beforeEach(function(onSetupComplete) {
      applicant.save(function() {
      var assignment = new util.Assignment({
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
      util.Assignment.collection.remove({assignedApplicant: 94132310751});
      util.Applicant.collection.remove({studentNumber: 94132310751});
      onTearDownComplete();
      });*/

    describe('GET tests: /getAssignments', function() {

	it('should list no assignments on /getAssignments GET when DB is empty',
	   function(done) {
	       chai.request(server)
		   .get('/getAssignments')
		   .end(function(err, res){

		       expect(res).to.have.status(200); // response status

		       expect(res.body.data).to.be.instanceof(Array);
		       expect(res.body.data).to.be.empty; // no courses returned
		       
		       done();
		   });
	   });

	it('should list exactly one/one assignment on /getAssignments GET',
	   function(done) {
	       var assignment = util.randPick(util.assignments); // random assignment added
	       
	       // perform server call and check result
	       function serverCall(){
		   chai.request(server) 
		       .get('/getAssignments')
		       .end(function(err, res){

			   expect(res).to.have.status(200); // response status

			   expect(res.body.data).to.be.instanceof(Array);
			   expect(res.body.data).to.have.length(1); // only 1 assignment returned
			   
			   // check that assignment has expected properties
			   util.compareAssignments(res.body.data[0], assignment);
		   
			   done();
		       });
	       };
	       
	       util.addCourses(
		   0, util.courses, util.addApplicants(
		       0, util.applicants, util.addApplications(
			   0, util.applications, util.addAssignment(
			       assignment, serverCall))));
	   });

	it('should list all/all assignments on /getAssignments GET',
	   function(done) {
	       
	       // perform server call and check result
	       function serverCall(){		   
		   chai.request(server) 
		       .get('/getAssignments')
		       .end(function(err, res){

			   expect(res).to.have.status(200); // response status

			   expect(res.body.data).to.be.instanceof(Array);
			   // correct number of assignments returned
			   expect(res.body.data).to.have.length(util.assignments.length);
			   
			   // check that assignments have expected properties
			   var i, ass;
			   for (i = 0; i < util.assignments.length; i++){
			       ass = res.body.data.find(
				   (ass) => (ass.assignedApplicant ==
					     util.assignments[i].assignedApplicant));
			       expect(ass).to.not.be.undefined;
			       
			       util.compareAssignments(ass, util.assignments[i]);
			   }
			   
			   done();
		       });
	       };

	       util.addCourses(
		   0, util.courses, util.addApplicants(
		       0, util.applicants, util.addApplications(
			   0, util.applications, util.addAssignments(
			       0, util.assignments, serverCall))));
	   });
    });

    describe('GET tests: /getAssignmentsByCourse', function() {
	
	it('should list multiple assignments for one course on /getAssignmentsByCourse GET');
	
    });

    
    describe('POST tests: /saveAssignment', function() {

	it('POST /saveAssignment assigns an applicant to the given course', function(done) {
	    requestBody = {
		"applicant": "94132310751",
		"course": "CSC207",
		"hours": 40
	    };
	    
	    chai.request(server).post('/saveAssignment').send(requestBody).end(function(error, response) {
		util.checkBasicStructureApplicantResp(response);
		
		util.Assignment.find({assignedApplicant: 94132310751}, function (err, assignments) {
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
    });

    
    describe('POST tests: /rejectApplicant', function() {
	
	it('POST /rejectApplicant rejects an applicant from the given course', function(done) {
	    requestBody = {
		studentNumber: 94132310751,
		courseCode: 'CSC369'
	    };
	    
	    chai.request(server).delete('/rejectApplicant').send(requestBody).end(function(error, response) {
		util.checkBasicStructureApplicantResp(response);
		done();
	    });
	});
    });
});
