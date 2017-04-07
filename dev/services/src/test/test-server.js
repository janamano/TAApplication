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
    it('should list exactly one open course on /getOpenings GET');
    it('should list multiple courses on /getOpenings GET');
});

describe('GET tests: /getApplicantsByCourse', function() {     
    it('should list multiple applicants for one course on /getApplicantsByCourse GET');
});

describe('GET tests: /getAssignments', function() {
    it('should list multiple assignments on /getAssignments GET');
});

describe('GET tests: /getApplicantUtorid', function() {
    it('should list single UTORid for one applicant on /getApplicantUtorid GET');
});

describe('GET tests: /getApplicantByStudentNumber', function() {
    it('should list no applicants for non-existent student number' +
       'on /getApplicantByStudentNumber GET');
    it('should list exactly one applicant for one student number' +
       'on /getApplicantByStudentNumber GET');
});

describe('GET tests: /getAssignmentsByCourse', function() {
    it('should list multiple assignments for one course on /getAssignmentsByCourse GET');
});

describe('GET tests: /filterApplicants', function() {
    it('should list multiple applicants on /filterApplicants GET');
});

describe('POST tests', function() {
    it('should add a single assignment on /saveAssignment POST');
    it('should change number of TAs on /changeTAs POST');
});

describe('DELETE tests', function() {
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
		   
		   // check that openings have expected properties
		   expect(res.body.data).to.have.deep.property('[0].code',
							       course.code);
		   expect(res.body.data).to.have.deep.property('[0].title',
							       course.title);
		   expect(res.body.data).to.have.deep.property('[0].instructor',
							       course.instructor);
		   expect(res.body.data).to.have.deep.property('[0].numberOfTAs',
							       parseInt(course.numberOfTAs));
		   expect(res.body.data).to.have.deep.property('[0].qualifications',
							       course.qualifications);
		   
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
		       expect(res.body.data).to.have.deep.property('[' + j + '].code',
								   courses[i].code);
		       expect(res.body.data).to.have.deep.property('[' + j + '].title',
								   courses[i].title);
		       expect(res.body.data).to.have.deep.property('[' + j + '].instructor',
								   courses[i].instructor);
		       expect(res.body.data).to.have.deep.property('[' + j + '].numberOfTAs',
								   parseInt(courses[i].numberOfTAs));
		       expect(res.body.data).to.have.deep.property('[' + j + '].qualifications',
								   courses[i].qualifications);
		       j++;
		   }

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
it('should list single UTORid for one applicant on /getApplicantUtorid GET',
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
		   console.log(res.body.data);
		   expect(res).to.have.status(200); // response status
		   
		   // check that applicant has expected property
		   expect(res.body.data).to.equal(applicants[0].UTORid);
		   
		   done();
	       });
       };

       recAdd(0, serverCall);
   });
/*
it('should list single applicant for one student number on /getApplicantByStudentNumber GET',
   function(done) {
       chai.request(server) 
	   .get('/getApplicantByStudentNumber')
	   .end(function(err, res){

	       expect(res).to.have.status(200); // response status
	       expect(res.body).to.be.an('object');

	       done();
	   });
   });

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
