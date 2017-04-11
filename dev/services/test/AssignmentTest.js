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
	       // duplicate course & applicant, SOMETIMES, when assignment is added
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

	it('should list no assignments for one course on /getAssignmentsByCourse GET',
	   function(done) {
	       var course = util.randPick(util.courses).code; // random course selected

	       // find assignments to all other courses
	       var otherAssignments = util.assignments.filter(
		   (ass) => (ass.assignedCourse != course));
	       
	       // perform server call and check result
	       function serverCall(){
		   chai.request(server) 
		       .get('/getAssignmentsByCourse')
		       .query({'course': course})
		       .end(function(err, res){

			   expect(res).to.have.status(200); // response status

			   expect(res.body.data).to.be.instanceof(Array);
			   expect(res.body.data).to.be.empty; // no assignments returned
			   
			   done();
		       });
	       };

	       util.addCourses(
		   0, util.courses, util.addApplicants(
		       0, util.applicants, util.addApplications(
			   0, util.applications, util.addAssignments(
			       0, otherAssignments, serverCall))));
	   });

	it('should list one/one assignment for one course on /getAssignmentsByCourse GET',
	   function(done) {
	       var assignment = util.randPick(util.assignments); // random assignment selected
	       var course = assignment.assignedCourse;
	       var applicant = util.applicants.find(
		   (app) => (app.studentNumber == assignment.assignedApplicant));

	       // find assignments to all other courses
	       var otherAssignments = util.assignments.filter(
		   (ass) => (ass.assignedCourse != course));
	       // add first assignment to this course
	       otherAssignments.push(assignment)
	       
	       // perform server call and check result
	       function serverCall(){
		   chai.request(server) 
		       .get('/getAssignmentsByCourse')
		       .query({'course': course})
		       .end(function(err, res){

			   expect(res).to.have.status(200); // response status

			   expect(res.body.data).to.be.instanceof(Array);
			   // only one assignment (applicant) returned
			   expect(res.body.data).to.have.length(1);

			   util.compareApplicants(res.body.data[0], applicant);
			   
			   done();
		       });
	       };

	       util.addCourses(
		   0, util.courses, util.addApplicants(
		       0, util.applicants, util.addApplications(
			   0, util.applications, util.addAssignments(
			       0, otherAssignments, serverCall))));
	   });
	
	it('should list multiple assignments for one course on /getAssignmentsByCourse GET',
	   function(done) {
      	       
	       var assignmentsCopy = JSON.parse(JSON.stringify(util.assignments));
	       
	       // find courses with multiple assignments
	       var multAssignments = (function(courseList){
		   assignmentsCopy.sort((a, b) => (a.assignedCourse > b.assignedCourse));

		   var i, count = 0;
		   for (i = 1; i < assignmentsCopy.length; i++){

		       while (i < assignmentsCopy.length && assignmentsCopy[i].assignedCourse ==
			      assignmentsCopy[i-1].assignedCourse)
			   count++, i++;
		       
		       if (count > 0){
			   courseList.push(assignmentsCopy.slice(i-count-1, i));
			   count = 0;
		       }
		   }
		   return courseList;
	       })([]);

	       // select random course
	       var assignment = util.randPick(multAssignments);

	       // perform server call and check result
	       function serverCall(){
		   chai.request(server) 
		       .get('/getAssignmentsByCourse')
		       .query({'course': assignment[0].assignedCourse})
		       .end(function(err, res){

			   expect(res).to.have.status(200); // response status

			   expect(res.body.data).to.be.instanceof(Array);
			   // correct number of assignments (applicants) returned
			   expect(res.body.data).to.have.length(assignment.length);

			   // correct applicants returned
			   var i, app;
			   for (i = 0; i < assignment.length; i++){

			       app1 = util.applicants.find(
				   (app) => (app.studentNumber == assignment[0].assignedApplicant));
			       expect(app1).to.not.be.undefined;

			       app2 = res.body.data.find(
				   (app) => (app.studentNumber == assignment[0].assignedApplicant));
			       expect(app2).to.not.be.undefined;

			       util.compareApplicants(app2, app1);
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

    
    describe('POST tests: /saveAssignment', function() {

	it('POST /saveAssignment assigns an applicant to the given course',
	   function(done) {

	       // generate random assignment
	       var course, applicant;
	       do {
		   course = util.randPick(util.courses);
		   applicant = util.randPick(util.applicants);

		   // ensure that the fake assignment doesn't already exist
	       } while (util.assignments.find((ass) => (ass.assignedApplicant == applicant &&
							ass.assignedCourse == course)));
	       
	    requestBody = {
		"applicant": applicant.studentNumber,
		"course": course.code,
		"hours": 40
	    };
	    
	       chai.request(server)
		   .post('/saveAssignment')
		   .send(requestBody)
		   .end(function(error, response) {
		       util.checkBasicStructureApplicantResp(response);
		
		       util.Assignment.find(
			   {assignedApplicant: applicant.studentNumber},
			   function (err, assignments) {
			       if (err) {
				   chai.assert.fail(0, 1, 'Could not retrieve assignments');
			       }
			       else {
				   chai.assert.equal(1, assignments.length,
						     'Applicant was not assigned correctly');
			       }
			   });
		       
		       done();
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
