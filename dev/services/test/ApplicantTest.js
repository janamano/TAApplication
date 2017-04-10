process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/main');
var expect = chai.expect;
chai.should();
var fs = require('fs');

var util = require('./test-utils');

chai.use(chaiHttp);

// get fake data
var data = fs.readFileSync(util.applicantFile);
var applicants = JSON.parse(data);
var data = fs.readFileSync(util.courseFile);
var courses = JSON.parse(data);
var data = fs.readFileSync(util.applicationFile);
var applications = JSON.parse(data);
var data = fs.readFileSync(util.assignmentFile);
var assignments = JSON.parse(data);
// match courseID in assignment to course itself
var i;
for (i = 0; i < assignments.length; i++)
    assignments.assignedCourse = courses[assignments.assignedCourse];


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


describe('Applicants tests', function(){
    // hook to clean DB before each test is run
    beforeEach('clean DB', function(done) {
	util.cleanDB(done);
    });

    describe('GET tests: /getApplicantsList', function() {
	
	it('should list no applicants on /getApplicantsList GET when DB is empty',
	   function(done) {
               chai.request(server)
		   .get('/getApplicantsList')
		   .end(function(err, res){

		       expect(res).to.have.status(200); // response status

		       expect(res.body.data).to.be.instanceof(Array);
		       expect(res.body.data).to.be.empty; // no courses returned
		       
		       done();
		   });
	   });

	it('should list exactly one/one applicant on /getApplicantsList GET',
	   function(done) {
               var applicant = util.randPick(applicants); // random applicant added
	       
	       util.addApplicant(applicant, function(err, data){
		   
		   chai.request(server) 
		       .get('/getApplicantsList')
		       .end(function(err, res){

			   expect(res).to.have.status(200); // response status

			   expect(res.body.data).to.be.instanceof(Array);
			   expect(res.body.data).to.have.length(1); // only 1 applicant returned
			   
			   // check that applicant has expected properties
			   util.compareApplicants(res.body.data[0], applicant);
			   
			   done();
		       });
	       });
	   });

	it('should list all/all applicants on /getApplicantsList GET',
	   function(done) {
	       
	       // perform server call and check result
	       function serverCall(){		   
		   chai.request(server) 
		       .get('/getApplicantsList')
		       .end(function(err, res){

			   expect(res).to.have.status(200); // response status

			   expect(res.body.data).to.be.instanceof(Array);
			   // correct number of applicants returned
			   expect(res.body.data).to.have.length(applicants.length);
			   
			   // check that applicants have expected properties
			   var i;
			   for (i = 0; i < applicants.length; i++)
			       util.compareApplicants(res.body.data[i], applicants[i]);

			   done();
		       });
	       };

	       util.addApplicants(0, applicants, serverCall);
	   });
    });

    // NOTE: /getApplicant is not tested because it is identical in concept to this route
    describe('GET tests: /getApplicantByStudentNumber', function() {

	// currently fails because there is no check of whether the applicant was found
	it('should list no applicants for non-existent student number ' +
	   'on /getApplicantByStudentNumber GET',
	   function(done) {

	       // perform server call and check result
	       function serverCall(){		   

		   chai.request(server) 
		       .get('/getApplicantByStudentNumber')
		       .query({studentNum: 0})
		       .end(function(err, res){
			   expect(res).to.have.status(400); // response status
			   
			   // check that applicant has expected property
			   expect(res.body.data).to.be.empty;
			   
			   done();
		       });
	       };
	       
	       util.addApplicants(0, applicants, serverCall);
	   });

	it('should list correct applicant for applicant on /getApplicantByStudentNumber GET',
	   function(done) {	
               var applicant = util.randPick(applicants); // random applicant selected
       
	       // perform server call and check result
	       function serverCall(){		   

		   chai.request(server) 
		       .get('/getApplicantByStudentNumber')
		       .query({studentNumber: applicant.studentNumber})
		       .end(function(err, res){
			   expect(res).to.have.status(200); // response status
			   
			   expect(res.body.data).to.be.an('object');
			   util.compareApplicants(res.body.data, applicant);
			   
			   done();
		       });
	       };

	       util.addApplicants(0, applicants, serverCall);
	   });
    });

    describe('GET tests: /getApplicantTAHist', function() {

	// currently fails because there is no check of whether the applicant was found
	it('should list no applicants for non-existent student number on /getApplicantTAHist GET',
	   function(done) {
	       
	       // perform server call and check result
	       function serverCall(){		   

		   chai.request(server) 
		       .get('/getApplicantTAHist')
		       .query({studentNum: 0})
		       .end(function(err, res){
			   expect(res).to.have.status(400); // response status
			   
			   // check that applicant has expected property
			   expect(res.body.data).to.be.empty;
			   
			   done();
		       });
	       };

	       util.addApplicants(0, applicants, serverCall);
	   });

	it('should list correct TA history for applicant on /getApplicantTAHist GET',
	   function(done) {
	       
               var applicant = util.randPick(applicants); // random applicant selected

	       // perform server call and check result
	       function serverCall(){		   

		   chai.request(server) 
		       .get('/getApplicantTAHist')
		       .query({studentNum: parseInt(applicant.studentNumber)})
		       .end(function(err, res){
			   expect(res).to.have.status(200); // response status
			   expect(res.body.data).to.be.an('array');
			   expect(res.body.data).to.be.have.length(
			       applicant.studentInformation.TAHistory.length);
			   
			   // check that TA history object has expected properties
			   var i;
			   for (i = 0; i < applicant.studentInformation.TAHistory.length; i++){
			       expect(res.body.data[i]).to.have.property(
				   'courseCode',
				   applicant.studentInformation.TAHistory[i].courseCode);
			       
			       expect(res.body.data[i]).to.have.property(
				   'timesTAd',
				   parseInt(applicant.studentInformation.TAHistory[i].timesTAd));
			   }
			   
			   done();
		       });
	       };

	       util.addApplicants(0, applicants, serverCall);
	   });
    });

    describe('GET tests: /filterApplicants', function() {

	it('should list all grad applicants for one course on /filterApplicants GET',
	   function(done) {

	       // random course selected
	       var course = courses[util.randPick(Object.keys(courses))].code;

	       var filteredApplicants =
		   util.filterApplicants(applications, applicants, course, true);

	       // perform server call and check result
	       function serverCall(){		   

		   chai.request(server) 
		       .get('/filterApplicants')
		       .query({courseUC: course, query: 'grad'})
		       .end(function(err, res){
			   expect(res).to.have.status(200); // response status
			   
			   expect(res.body.data).to.be.instanceof(Array);
			   // correct number of applicants returned
			   expect(res.body.data).to.have.length(filteredApplicants.length);

			   // check that applicants have expected properties
			   var i, app;
			   for (i = 0; i < filteredApplicants.length; i++){
			       app = res.body.data.find(
				   (app) => (app.UTORid == filteredApplicants[i].UTORid));
			       expect(app).to.not.be.undefined;
			       
			       util.compareApplicants(app, filteredApplicants[i]);
			   }

			   done();
		       });
	       };

	       util.addApplicants(
		   0, applicants, util.addCourses(
		       0, courses, util.addApplications(
			   0, applications, serverCall)));
	   });

	it('should list all applicants who have previously TAed ' +
	   'for one course on /filterApplicants GET',
	   function(done) {

	       // random courses selected
	       var course = courses[util.randPick(Object.keys(courses))].code;
	       var courseTAed = courses[util.randPick(Object.keys(courses))].code;
	       
	       var filteredApplicants =
		   util.filterApplicants(applications, applicants, course, false, courseTAed);

	       // perform server call and check result
	       function serverCall(){		   

		   chai.request(server) 
		       .get('/filterApplicants')
		       .query({courseUC: course, query: 'TAed=' + courseTAed})
		       .end(function(err, res){
			   expect(res).to.have.status(200); // response status
			   
			   expect(res.body.data).to.be.instanceof(Array);
			   // correct number of applicants returned
			   expect(res.body.data).to.have.length(filteredApplicants.length);

			   // check that applicants have expected properties
			   var i, app;
			   for (i = 0; i < filteredApplicants.length; i++){
			       app = res.body.data.find(
				   (app) => (app.UTORid == filteredApplicants[i].UTORid));
			       expect(app).to.not.be.undefined;
			       
			       util.compareApplicants(app, filteredApplicants[i]);
			   }

			   done();
		       });
	       };

	       util.addApplicants(
		   0, applicants, util.addCourses(
		       0, courses, util.addApplications(
			   0, applications, serverCall)));
	   });

	it('should list all grad applicants who have previously TAed ' +
	   'for one course on /filterApplicants GET',
	   function(done) {

	       // random courses selected
	       var course = courses[util.randPick(Object.keys(courses))].code;
	       var courseTAed = courses[util.randPick(Object.keys(courses))].code;
	       
	       var filteredApplicants =
		   util.filterApplicants(applications, applicants, course, true, courseTAed);

	       // perform server call and check result
	       function serverCall(){		   

		   chai.request(server) 
		       .get('/filterApplicants')
		       .query({courseUC: course, query: 'grad;TAed=' + courseTAed})
		       .end(function(err, res){
			   expect(res).to.have.status(200); // response status
			   
			   expect(res.body.data).to.be.instanceof(Array);
			   // correct number of applicants returned
			   expect(res.body.data).to.have.length(filteredApplicants.length);

			   // check that applicants have expected properties
			   var i, app;
			   for (i = 0; i < filteredApplicants.length; i++){
			       app = res.body.data.find(
				   (app) => (app.UTORid == filteredApplicants[i].UTORid));
			       expect(app).to.not.be.undefined;
			       
			       util.compareApplicants(app, filteredApplicants[i]);
			   }

			   done();
		       });
	       };

	       util.addApplicants(
		   0, applicants, util.addCourses(
		       0, courses, util.addApplications(
			   0, applications, serverCall)));
	   });
    });

    describe('GET tests: /getApplicantUtorid', function() {

	it('should list no UTORid for non-existent student number on /getApplicantUtorid GET', 
	   function(done) {

	       // perform server call and check result
	       function serverCall(){		   

		   chai.request(server) 
		       .get('/getApplicantUtorid')
		       .query({studentNum: 0})
		       .end(function(err, res){
			   expect(res).to.have.status(400); // response status
			   
			   // check that applicant has expected property
			   expect(res.body.data).to.be.empty;
			   
			   done();
		       });
	       };

	       util.addApplicants(0, applicants, serverCall);
	   });

	it('should list correct UTORid for applicant on /getApplicantUtorid GET',
	   function(done) {

               var applicant = util.randPick(applicants); // random applicant selected
	       
	       // perform server call and check result
	       function serverCall(){		   

		   chai.request(server) 
		       .get('/getApplicantUtorid')
		       .query({studentNum: parseInt(applicant.studentNumber)})
		       .end(function(err, res){
			   expect(res).to.have.status(200); // response status
			   
			   // check that applicant has expected property
			   expect(res.body.data).to.equal(applicant.UTORid);
			   
			   done();
		       });
	       };

	       util.addApplicants(0, applicants, serverCall);
	   });
    });


    describe('POST tests: /saveApplicant', function() {
	
	it('POST /saveApplicant saves an applicant profile',
	   function(done) {

	        // random applicant selected
               var applicant = JSON.parse(JSON.stringify(util.randPick(applicants)));

	       applicant.lastName = applicant.firstName = applicant.phoneNumber =
		   applicant.email = applicant.studentInformation.programName = '0';

	       // perform server call and check result
	       function serverCall(){		   
		   
		   chai.request(server)
		       .post('/saveApplicant')
		       .send(applicant)
		       .end(function(error, response) {
			   util.checkBasicStructureApplicantResp(response);
			   done();
		       });
	       };
	       
	       util.addApplicants(0, applicants, serverCall); 
	   });
    });

    describe('POST tests: /saveTAHistory', function() {
	it('POST /saveTAHistory saves courses previously TA by the given applicant',
	   function(done) {
	    requestBody = {
		UTORid: 'bondj',
		studentNumber: 1007192911,
		TAHistory: applicant.studentInformation.TAHistory
	    };

	    chai.request(server).post('/saveTAHistory').send(requestBody).end(function(error, response) {
		util.checkBasicStructureApplicantResp(response);
		done();
	    });        
	});
    });
});
