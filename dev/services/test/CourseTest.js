process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/main');
var expect = chai.expect;
chai.should();

var util = require('./test-utils');

chai.use(chaiHttp);

describe('Courses tests', function() {
    // hook to clean DB before each test is run
    beforeEach('clean DB', function(done) {
	util.cleanDB(done);
    });
   
    describe('GET tests: /getCourseList', function() {

	it('should list courses on /getCourseList GET when DB is empty',
	   function(done) {
	       chai.request(server)
		   .get('/getCourseList')
		   .end(function(err, res){

		       expect(res).to.have.status(200); // response status

		       expect(res.body.data).to.be.instanceof(Array);
		       expect(res.body.data).to.be.empty; // no courses returned
		       
		       done();
		   });
	   });

	it('should list exactly one/one course on /getCourseList GET',
	   function(done) {
	       var course = util.randPick(util.courses); // random course added
	       
	       util.addCourse(course, function(err, data){
		   
		   chai.request(server) 
		       .get('/getCourseList')
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

	it('should list all/all courses on /getCourseList GET',
	   function(done) {
	       
	       // perform server call and check result
	       function serverCall(){		   
		   chai.request(server) 
		       .get('/getCourseList')
		       .end(function(err, res){

			   expect(res).to.have.status(200); // response status

			   expect(res.body.data).to.be.instanceof(Array);
			   // correct number of courses returned
			   expect(res.body.data).to.have.length(util.courses.length);
			   
			   // check that courses have expected properties
			   var i, course;
			   for (i = 0; i < util.courses.length; i++){
			       course = res.body.data.find(
				   (course) => (course.code == util.courses[i].code));
			       expect(course).to.not.be.undefined;
			       
			       util.compareCourses(course, util.courses[i]);
			   }

			   done();
		       });
	       };

	       util.addCourses(0, util.courses, serverCall);
	   });
    });


    describe('GET tests: /getCourseInfo', function() {

	it('should list no course for non-existent course code on /getCourseInfo GET', 
	   function(done) {
	       
	       // perform server call and check result
	       function serverCall(){		   

		   chai.request(server) 
		       .get('/getCourseInfo')
		       .query({course: '0'})
		       .end(function(err, res){
			   expect(res).to.have.status(400); // response status
			   
			   // check that applicant has expected property
			   expect(res.body.data).to.be.empty;
			   
			   done();
		       });
	       };

	       util.addCourses(0, util.courses, serverCall);
	   });

	it('should list correct course information for course on /getCourseInfo GET',
	   function(done) {
	       var course = util.randPick(util.courses); // random course added
	       
	       // perform server call and check result
	       function serverCall(){		   

		   chai.request(server) 
		       .get('/getCourseInfo')
		       .query({course: course.code})
		       .end(function(err, res){
			   expect(res).to.have.status(200); // response status

			   expect(res.body.data).to.be.instanceof(Array);
			   expect(res.body.data).to.have.length(1); // only 1 course returned
			   
			   // check that course has expected properties
			   util.compareCourses(res.body.data[0], course);
			   
			   done();
		       });
	       };

	       util.addCourses(0, util.courses, serverCall);
	   });
    });

    
    describe('GET tests: /getOpenings', function() {
	
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

	it('should list exactly one/one course on /getOpenings GET',
	   function(done) {
	       var course = util.randPick(util.courses); // random course added
	       
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

	it('should list no open courses on /getOpenings GET',
	   function(done) {
	       // create courses that are not open
	       var fullCourses = JSON.parse(JSON.stringify(util.courses));
	       var i;
	       for (i = 0; i < util.courses.length; i++)
		   fullCourses[i].numberOfTAs = 0;
	       
	       function serverCall(){		   
		   chai.request(server) 
		       .get('/getOpenings')
		       .end(function(err, res){

			   expect(res).to.have.status(200); // response status

			   expect(res.body.data).to.be.instanceof(Array);
			   // correct number of courses returned
			   expect(res.body.data).to.have.length(0);
			   
			   done();
		       });
	       };

	       util.addCourses(0, fullCourses, serverCall);
	   });
	
	it('should list exactly (n-1) open/n courses on /getOpenings GET',
	   function(done) {
	       // create one course that is not open
	       var fullCourse = util.randInt(0, util.courses.length-1);
	       var coursesCopy = JSON.parse(JSON.stringify(util.courses));
	       coursesCopy[fullCourse].numberOfTAs = 0;
	       
	       function serverCall(){		   
		   chai.request(server) 
		       .get('/getOpenings')
		       .end(function(err, res){

			   expect(res).to.have.status(200); // response status

			   expect(res.body.data).to.be.instanceof(Array);
			   // correct number of courses returned
			   expect(res.body.data).to.have.length(coursesCopy.length-1);

			   // check that courses have expected properties
			   var i, course;
			   for (i = 0; i < coursesCopy.length-1; i++){
			       // skip full course
			       if (coursesCopy[i].code != coursesCopy[fullCourse].code){
				   
				   course = res.body.data.find(
				       (course) => (course.code == coursesCopy[i].code));
				   expect(course).to.not.be.undefined;
			       
				   util.compareCourses(course, coursesCopy[i]);
			       }
			   }

			   done();
		       });
	       };

	       util.addCourses(0, coursesCopy, serverCall);
	   });

	it('should list all/all courses on /getOpenings GET',
	   function(done) {
	       
	       // perform server call and check result
	       function serverCall(){		   
		   chai.request(server) 
		       .get('/getOpenings')
		       .end(function(err, res){

			   expect(res).to.have.status(200); // response status

			   expect(res.body.data).to.be.instanceof(Array);
			   // correct number of courses returned
			   expect(res.body.data).to.have.length(util.courses.length);
			   
			   // check that openings have expected properties
			   var i, course;
			   for (i = 0; i < util.courses.length; i++){
			       course = res.body.data.find(
				   (course) => (course.code == util.courses[i].code));
			       expect(course).to.not.be.undefined;
			       
			       util.compareCourses(course, util.courses[i]);
			   }

			   done();
		       });
	       };

	       util.addCourses(0, util.courses, serverCall);
	   });

	it('should list some open/all courses on /getOpenings GET',
	   function(done) {
      	       // create courses that are not open (randomize the number and selection of courses)
	       var numFullCourses = util.randInt(2, util.courses.length-2);
	       var coursesCopy = JSON.parse(JSON.stringify(util.courses));
	       var fullCourses = util.randSample(coursesCopy, numFullCourses);
	       var i;
	       for (i = 0; i < numFullCourses; i++)
		   fullCourses[i].numberOfTAs = 0;
	       
	       // perform server call and check result
	       function serverCall(){		   
		   chai.request(server) 
		       .get('/getOpenings')
		       .end(function(err, res){

			   expect(res).to.have.status(200); // response status

			   expect(res.body.data).to.be.instanceof(Array);
			   // correct number of courses returned
			   expect(res.body.data).to.have.length(
			       coursesCopy.length - numFullCourses);

			   // check that openings have expected properties
			   var i, course;
			   for (i = 0; i < coursesCopy.length; i++){
			       if (coursesCopy[i].numberOfTAs != 0){
			       
				   course = res.body.data.find(
				       (course) => (course.code == coursesCopy[i].code));
				   expect(course).to.not.be.undefined;
			       
				   util.compareCourses(course, coursesCopy[i]);
			       }
			   }

			   done();  
		       });
	       };

	       util.addCourses(0, coursesCopy, serverCall);
	   });

    });
   
});
