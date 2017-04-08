var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../main');
var expect = chai.expect;
var fs = require('fs');

var util = require('./test-utils');

chai.use(chaiHttp);

// fake data files
var applicantFile = './test/applicants.json';
var courseFile = './test/courses.json';
var applicationFile = './test/applications.json';
var assignmentFile = './test/assignments.json';

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
    it('should list no open courses on /getOpenings GET when DB is empty');
    it('should list exactly one open course on /getOpenings GET when DB only contains one course');
    it('should list multiple courses on /getOpenings GET when DB contains multiple courses');
});

describe('GET tests: /getApplicantsList', function() {
    it('should list no applicants on /getApplicantsList GET when DB is empty');
    it('should list exactly one applicant on /getApplicantsList GET ' +
       'when DB only contains one applicant');
    it('should list multiple applicants on /getApplicantsList GET ' +
       'when DB contains multiple applicants');
});

describe('GET tests: /getApplicantsByCourse', function() {
    it('should list no applicants for course on /getApplicantsByCourse GET');
    it('should list exactly one applicant for one course on /getApplicantsByCourse GET');
    it('should list multiple applicants for one course on /getApplicantsByCourse GET');
});

describe('GET tests: /getApplicantUtorid', function() {
    it('should list no UTORid for non-existent student number on /getApplicantUtorid GET');    
    it('should list correct UTORid for applicant on /getApplicantUtorid GET');;    
});

describe('GET tests: /getApplicantByStudentNumber', function() {
    it('should list no applicants for non-existent student number' +
       'on /getApplicantByStudentNumber GET');
    it('should list correct applicant for applicant on /getApplicantByStudentNumber GET');
});

describe('GET tests: /getApplicantTAHist', function() {
    it('should list no applicants for non-existent student number on /getApplicantTAHist GET');
    it('should list correct TA history for applicant on /getApplicantTAHist GET');
});

describe('GET tests: /filterApplicants', function() {
    it('should list multiple applicants on /filterApplicants GET');
});

describe('GET tests: /getAssignments', function() {
    it('should list multiple assignments on /getAssignments GET');
});

describe('GET tests: /getAssignmentsByCourse', function() {
    it('should list multiple assignments for one course on /getAssignmentsByCourse GET');
});

// END: descriptions of test cases


it('should list no open courses on /getOpenings GET when DB is empty',
   function(done) {
       util.cleanDB();
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
       util.cleanDB();
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
       util.cleanDB();

       // add courses recursively to DB
       var courseIds = Object.keys(courses);
       
       function recAdd(i, then){
	   if (i < courseIds.length){
	       
	       util.addCourse(courses[courseIds[i]], function(err, data){
		   if (!err){
		       // if we have added all courses, call the callback function
		       if (i == courseIds.length-1)
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
	       .get('/getOpenings')
	       .end(function(err, res){

		   expect(res).to.have.status(200); // response status

		   expect(res.body.data).to.be.instanceof(Array);
		   // correct number of courses returned
		   expect(res.body.data).to.have.length(courseIds.length);
		   
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

       recAdd(0, serverCall);
   });

it('should list no applicants on /getApplicantsList GET when DB is empty',
   function(done) {
       util.cleanDB();
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
       util.cleanDB();
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
       util.cleanDB();

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


/*
it('should list multiple applicants for one course on /getApplicantsByCourse GET',
   function(done) {
       chai.request(server) 
           .get('/getApplicantsByCourse')
           .end(function(err, res){

	       expect(res).to.have.status(200); // response status
	       expect(res.body).to.be.an('object');

	       // check that applicants have expected properties
	       expect(res.body).to.have.property('studentNumber');
	       expect(res.body).to.have.property('UTORid');
	       expect(res.body).to.have.property('lastName');
	       expect(res.body).to.have.property('firstName');
	       expect(res.body).to.have.property('phoneNumber');
	       expect(res.body).to.have.property('email');
	       expect(res.body).to.have.property('studentInformation');
	       expect(res.body).to.have.deep.property('studentInformation.phoneNumber');
	       expect(res.body).to.have.deep.property('studentInformation.year');
	       expect(res.body).to.have.deep.property('studentInformation.programName');
	       expect(res.body).to.have.deep.property('studentInformation.workStatus');
	       expect(res.body).to.have.deep.property('studentInformation.studentStatus');
	       expect(res.body).to.have.deep.property('studentInformation.TAHistory');
	       expect(res.body).to.have.deep.property('studentInformation.TAHistory[0].courseCode');
	       expect(res.body).to.have.deep.property('studentInformation.TAHistory[0].timesTAd');
	       
	       done();
	   });
   });

it('should list multiple assignments on /getAssignments GET',
   function(done) {
       chai.request(server) 
           .get('/getAssignments')
           .end(function(err, res){

	       expect(res).to.have.status(200); // response status
	       expect(res.body).to.be.an('object');

	       done();
	   });
   });
*/

// currently fails because there is no check of whether the applicant was found
it('should list no UTORid for non-existent student number on /getApplicantUtorid GET', 
   function(done) {
       util.cleanDB();

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
       util.cleanDB();

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

// currently fails because there is no check of whether the applicant was found
it('should list no applicants for non-existent student number on /getApplicantByStudentNumber GET',
   function(done) {
       util.cleanDB();

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
       util.cleanDB();

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

// currently fails because there is no check of whether the applicant was found
it('should list no applicants for non-existent student number on /getApplicantTAHist GET',
   function(done) {
       util.cleanDB();

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
       util.cleanDB();

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


/*
it('should list multiple assignments for one course on /getAssignmentsByCourse GET',
   function(done) {
       chai.request(server) 
	   .get('/getAssignmentsByCourse')
	   .end(function(err, res){

	       expect(res).to.have.status(200); // response status
	       expect(res.body).to.be.an('object');

	       done();
	   });
   });

it('should list multiple applicants on /filterApplicants GET', function(done) {
    chai.request(server) 
	.get('/filterApplicants')
	.end(function(err, res){

	    expect(res).to.have.status(200); // response status
	    expect(res.body).to.be.an('object');

	    done();
	});
});
*/
