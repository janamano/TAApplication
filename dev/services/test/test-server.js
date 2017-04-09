process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/main');
var expect = chai.expect;
var fs = require('fs');

var util = require('./test-utils');

chai.use(chaiHttp);

// fake data files (paths are relative to location from which script is run)
var applicantFile = './test/testData/applicants.json';
var courseFile = './test/testData/courses.json';
var applicationFile = './test/testData/applications.json';
var assignmentFile = './test/testData/assignments.json';

// get fake data
var data = fs.readFileSync(applicantFile);
var applicants = JSON.parse(data);
data = fs.readFileSync(courseFile);
var courses = JSON.parse(data);
data = fs.readFileSync(applicationFile);
var applications = JSON.parse(data);
data = fs.readFileSync(assignmentFile);
var assignments = JSON.parse(data);


// descriptions of test cases

describe('GET tests: /getOpenings', function() {
    beforeEach('clean DB', function(done) {
	util.cleanDB(done);
    });
    
    it('should list no open courses on /getOpenings GET when DB is empty',
       function(done) {
	   chai.request(server)
	       .get('/getOpenings')
               .end(function(err, res){

		   expect(res).to.have.status(200); // response status

		   expect(res.body.data).to.be.instanceof(Array);
		   expect(res.body.data).to.be.empty; // no courses returned
		   
		   done();
	       });
       });

    it('should list exactly one open course on /getOpenings GET',
       function(done) {
	   var course = courses["course1"];
	   
	   util.addCourse(course, function(err, data){
	       
	       chai.request(server) 
		   .get('/getOpenings')
		   .end(function(err, res){

		       expect(res).to.have.status(200); // response status

		       expect(res.body.data).to.be.instanceof(Array);
		       expect(res.body.data).to.have.length(1); // only 1 course returned
		       
		       // check that opening has expected properties
		       util.compareCourses(res.body.data[0], course);
		       
		       done();
		   });
	   });
       });

    it('should list all open courses on /getOpenings GET',
       function(done) {
	   
	   // perform server call and check result
	   function serverCall(){		   
	       chai.request(server) 
		   .get('/getOpenings')
		   .end(function(err, res){

		       expect(res).to.have.status(200); // response status

		       expect(res.body.data).to.be.instanceof(Array);
		       // correct number of courses returned
		       expect(res.body.data).to.have.length(Object.keys(courses).length);
		       
		       // check that openings have expected properties
		       // note that we need two indices, since our course object is an associative
		       //   array, while the course object from the server is a simple array
		       var i, j = 0;
		       for (i in courses){
			   util.compareCourses(res.body.data[j], courses[i]);
			   j++;
		       }

		       done();
		   });
	   };

	   util.addCourses(0, courses, serverCall);
       });
});

describe('GET tests: /getApplicantsList', function() {
    beforeEach('clean DB', function(done) {
	util.cleanDB(done);
    });

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

    it('should list exactly one applicant on /getApplicantsList GET ' +
       'when DB only contains one applicant',
       function(done) {
           var applicant = applicants[0];
	   
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

    it('should list multiple applicants on /getApplicantsList GET ' +
       'when DB contains multiple applicants',
       function(done) {
	   
	   // add applicants recursively to DB
	   function recAdd(i, then){
	       if (i < applicants.length){
		   
		   util.addApplicant(applicants[i], function(err, data){
		       if (!err){
			   // if we have added all applicants, call the callback function
			   if (i == applicants.length-1)
			       then();
			   else
			       recAdd(i+1, then);
		       }
		   });
	       }
	   };

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

	   recAdd(0, serverCall);
       });
});

describe('GET tests: /getApplicantsByCourse', function() {
    beforeEach('clean DB', function(done) {
	util.cleanDB(done);
    });

    it('should list no applicants for course on /getApplicantsByCourse GET');
    it('should list exactly one applicant for one course on /getApplicantsByCourse GET');
    it('should list multiple applicants for one course on /getApplicantsByCourse GET');
});

describe('GET tests: /getApplicantUtorid', function() {
    beforeEach('clean DB', function(done) {
	util.cleanDB(done);
    });

    // currently fails because there is no check of whether the applicant was found
    it('should list no UTORid for non-existent student number on /getApplicantUtorid GET', 
       function(done) {
	   
	   // add applicants recursively to DB       
	   function recAdd(i, then){
	       if (i < applicants.length){
		   
		   util.addApplicant(applicants[i], function(err, data){
		       if (!err){
			   // if we have added all applicants, call the callback function
			   if (i == applicants.length-1)
			       then();
			   else
			       recAdd(i+1, then);
		       }
		   });
	       }
	   };

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

	   recAdd(0, serverCall);
       });

    it('should list correct UTORid for applicant on /getApplicantUtorid GET',
       function(done) {
	   
	   // add applicants recursively to DB       
	   function recAdd(i, then){
	       if (i < applicants.length){
		   
		   util.addApplicant(applicants[i], function(err, data){
		       if (!err){
			   // if we have added all applicants, call the callback function
			   if (i == applicants.length-1)
			       then();
			   else
			       recAdd(i+1, then);
		       }
		   });
	       }
	   };

	   // perform server call and check result
	   function serverCall(){		   

	       chai.request(server) 
		   .get('/getApplicantUtorid')
		   .query({studentNum: parseInt(applicants[0].studentNumber)})
		   .end(function(err, res){
		       expect(res).to.have.status(200); // response status
		       
		       // check that applicant has expected property
		       expect(res.body.data).to.equal(applicants[0].UTORid);
		       
		       done();
		   });
	   };

	   recAdd(0, serverCall);
       });
});

describe('GET tests: /getApplicantByStudentNumber', function() {
    beforeEach('clean DB', function(done) {
	util.cleanDB(done);
    });

    // currently fails because there is no check of whether the applicant was found
    it('should list no applicants for non-existent student number ' +
       'on /getApplicantByStudentNumber GET',
       function(done) {

	   // add applicants recursively to DB       
	   function recAdd(i, then){
	       if (i < applicants.length){

		   util.addApplicant(applicants[i], function(err, data){
		       if (!err){
			   // if we have added all applicants, call the callback function
			   if (i == applicants.length-1)
			       then();
			   else
			       recAdd(i+1, then);
		       }
		   });
	       }
	   };

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

	   recAdd(0, serverCall);
       });

    it('should list correct applicant for applicant on /getApplicantByStudentNumber GET',
       function(done) {
	   
	   // add applicants recursively to DB       
	   function recAdd(i, then){
	       if (i < applicants.length){
		   
		   util.addApplicant(applicants[i], function(err, data){
		       if (!err){
			   // if we have added all applicants, call the callback function
			   if (i == applicants.length-1)
			       then();
			   else
			       recAdd(i+1, then);
		       }
		   });
	       }
	   };

	   // perform server call and check result
	   function serverCall(){		   

	       chai.request(server) 
		   .get('/getApplicantByStudentNumber')
		   .query({studentNumber: applicants[0].studentNumber})
		   .end(function(err, res){
		       expect(res).to.have.status(200); // response status
		       
		       expect(res.body.data).to.be.an('object');
		       util.compareApplicants(res.body.data, applicants[0]);
		       
		       done();
		   });
	   };

	   recAdd(0, serverCall);
       });
});

describe('GET tests: /getApplicantTAHist', function() {
    beforeEach('clean DB', function(done) {
	util.cleanDB(done);
    });

    // currently fails because there is no check of whether the applicant was found
    it('should list no applicants for non-existent student number on /getApplicantTAHist GET',
       function(done) {
	   
	   // add applicants recursively to DB       
	   function recAdd(i, then){
	       if (i < applicants.length){
		   
		   util.addApplicant(applicants[i], function(err, data){
		       if (!err){
			   // if we have added all applicants, call the callback function
			   if (i == applicants.length-1)
			       then();
			   else
			       recAdd(i+1, then);
		       }
		   });
	       }
	   };

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

	   recAdd(0, serverCall);
       });

    it('should list correct TA history for applicant on /getApplicantTAHist GET',
       function(done) {
	   
	   // add applicants recursively to DB       
	   function recAdd(i, then){
	       if (i < applicants.length){
		   
		   util.addApplicant(applicants[i], function(err, data){
		       if (!err){
			   // if we have added all applicants, call the callback function
			   if (i == applicants.length-1)
			       then();
			   else
			       recAdd(i+1, then);
		       }
		   });
	       }
	   };

	   // perform server call and check result
	   function serverCall(){		   

	       chai.request(server) 
		   .get('/getApplicantTAHist')
		   .query({studentNum: parseInt(applicants[0].studentNumber)})
		   .end(function(err, res){
		       expect(res).to.have.status(200); // response status
		       expect(res.body.data).to.be.an('array');
		       expect(res.body.data).to.be.have.length(
			   applicants[0].studentInformation.TAHistory.length);
		       
		       // check that TA history object has expected properties
		       var i;
		       for (i = 0; i < applicants[0].studentInformation.TAHistory.length; i++){
			   expect(res.body.data[i]).to.have.property(
			       'courseCode',
			       applicants[0].studentInformation.TAHistory[i].courseCode);
			   expect(res.body.data[i]).to.have.property(
			       'timesTAd',
			       parseInt(applicants[0].studentInformation.TAHistory[i].timesTAd));
		       }
		       
		       done();
		   });
	   };

	   recAdd(0, serverCall);
       });
});

describe('GET tests: /filterApplicants', function() {
    beforeEach('clean DB', function(done) {
	util.cleanDB(done);
    });

    
    it('should list multiple applicants on /filterApplicants GET');
});

describe('GET tests: /getAssignments', function() {
    beforeEach('clean DB', function(done) {
	util.cleanDB(done);
    });

    
    it('should list multiple assignments on /getAssignments GET');
});

describe('GET tests: /getAssignmentsByCourse', function() {
    beforeEach('clean DB', function(done) {
	util.cleanDB(done);
    });

    
    it('should list multiple assignments for one course on /getAssignmentsByCourse GET');
});
