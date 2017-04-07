var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../main');
var expect = chai.expect;

var util = require('./test-utils');

chai.use(chaiHttp);

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
	       expect(res.body.data).to.be.empty;
	       
	       done();
	   });
   });

it('should list exactly one open course on /getOpenings GET',
   function(done) {
       util.cleanDB();
       var course = {
	   code: 'CSC165',
	   title: 'Mathematical Expression and Reasoning for Computer Science',
	   instructor: 'David Liu',
	   numberOfTAs: 5,
	   qualifications: 'Must be good at reasoning and logic'
       };
       
       util.addCourse(course, function(err, data){
	   
	   chai.request(server) 
               .get('/getOpenings')
               .end(function(err, res){

		   expect(res).to.have.status(200); // response status

		   expect(res.body.data).to.be.instanceof(Array);
		   expect(res.body.data).to.have.length(1);
		   
		   // check that openings have expected properties
		   expect(res.body.data).to.have.deep.property('[0].code',
							       course.code);
		   expect(res.body.data).to.have.deep.property('[0].title',
							       course.title);
		   expect(res.body.data).to.have.deep.property('[0].instructor',
							       course.instructor);
		   expect(res.body.data).to.have.deep.property('[0].numberOfTAs',
							       course.numberOfTAs);
		   expect(res.body.data).to.have.deep.property('[0].qualifications',
							       course.qualifications);
		   
		   done();
	       });
       });
   });

it('should list all open courses on /getOpenings GET',
   function(done) {
       util.cleanDB();
       var courses = [{
	   code: 'CSC309',
	   title: 'Programming on the Wb',
	   instructor: 'Amir Chinaei',
	   numberOfTAs: 20,
	   qualifications: 'Excellent knowledge of HTML, CSS, and JavaScript'
       },
		      {
			  code: 'CSC369',
			  title: 'Operating Systems',
			  instructor: 'Bogdan Simion',
			  numberOfTAs: 20,
			  qualifications: 'Obtained at least A in CSC209 and CSC258'
		      },
		      {
			  code: 'CSC258',
			  title: 'Computer Organization',
			  instructor: 'Francisco Estrada',
			  numberOfTAs: 20,
			  qualifications: 'Obtained at least A in CSC258'
		      }];

       util.addCourse(courses[0], function(err, data){
	   util.addCourse(courses[1], function(err, data){
	       util.addCourse(courses[2], function(err, data){
		   
		   chai.request(server) 
		       .get('/getOpenings')
		       .end(function(err, res){

			   expect(res).to.have.status(200); // response status

			   expect(res.body.data).to.be.instanceof(Array);
			   expect(res.body.data).to.have.length(3);
			   
			   // check that openings have expected properties
			   expect(res.body.data).to.have.deep.property('[0].code',
								       courses[0].code);
			   expect(res.body.data).to.have.deep.property('[0].title',
								       courses[0].title);
			   expect(res.body.data).to.have.deep.property('[0].instructor',
								       courses[0].instructor);
			   expect(res.body.data).to.have.deep.property('[0].numberOfTAs',
								       courses[0].numberOfTAs);
			   expect(res.body.data).to.have.deep.property('[0].qualifications',
								       courses[0].qualifications);


			   expect(res.body.data).to.have.deep.property('[1].code',
								       courses[1].code);
			   expect(res.body.data).to.have.deep.property('[1].title',
								       courses[1].title);
			   expect(res.body.data).to.have.deep.property('[1].instructor',
								       courses[1].instructor);
			   expect(res.body.data).to.have.deep.property('[1].numberOfTAs',
								       courses[1].numberOfTAs);
			   expect(res.body.data).to.have.deep.property('[1].qualifications',
								       courses[1].qualifications);

			   expect(res.body.data).to.have.deep.property('[2].code',
								       courses[2].code);
			   expect(res.body.data).to.have.deep.property('[2].title',
								       courses[2].title);
			   expect(res.body.data).to.have.deep.property('[2].instructor',
								       courses[2].instructor);
			   expect(res.body.data).to.have.deep.property('[2].numberOfTAs',
								       courses[2].numberOfTAs);
			   expect(res.body.data).to.have.deep.property('[2].qualifications',
								       courses[2].qualifications);

			   done();
		       });
	       });
	   });
       });
   });

/*it('should list multiple applicants for one course on /getApplicantsByCourse GET',
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

it('should list single UTORid for one applicant on /getApplicantUtorid GET',
   function(done) {
       chai.request(server) 
	   .get('/getApplicantUtorid')
	   .end(function(err, res){
	       
	       expect(res).to.have.status(200); // response status
	       expect(res.body).to.be.an('object');

	       done();
	   });
   });

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
