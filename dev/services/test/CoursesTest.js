process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/main');
var expect = chai.expect;
chai.should();
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


describe('Courses tests', function() {
    // hook to clean DB before each test is run
    beforeEach('clean DB', function(done) {
	util.cleanDB(done);
    });
   
    describe('GET tests: /getCourseList', function() {

	it('should list no open courses on /getCourseList GET when DB is empty',
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
	       var courseID = util.randPick(Object.keys(courses)); // random course added
	       var course = courses[courseID];
	       
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


    describe('GET tests: /getCourseInfo', function() {

	// currently fails because there is no check of whether the course was found
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

	       util.addCourses(0, courses, serverCall);
	   });

	it('should list correct course information for course on /getCourseInfo GET',
	   function(done) {
	       var courseID = util.randPick(Object.keys(courses)); // random course added
	       
	       // perform server call and check result
	       function serverCall(){		   

		   chai.request(server) 
		       .get('/getCourseInfo')
		       .query({course: courses[courseID].code})
		       .end(function(err, res){
			   expect(res).to.have.status(200); // response status

			   expect(res.body.data).to.be.instanceof(Array);
			   expect(res.body.data).to.have.length(1); // only 1 course returned
			   
			   // check that applicant has expected property
			   util.compareCourses(res.body.data[0], courses[courseID]);
			   
			   done();
		       });
	       };

	       util.addCourses(0, courses, serverCall);
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
	       var courseID = util.randPick(Object.keys(courses)); // random course added
	       var course = courses[courseID];
	       
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
	       var fullCourses = JSON.parse(JSON.stringify(courses));
	       var i;
	       for (i in fullCourses)
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
	       var courseID = util.randPick(Object.keys(courses)); // random course added
	       var fullCourse = JSON.parse(JSON.stringify(courses[courseID]));
	       fullCourse.numberOfTAs = 0;
	       
	       function serverCall(){		   
		   chai.request(server) 
		       .get('/getOpenings')
		       .end(function(err, res){

			   expect(res).to.have.status(200); // response status

			   expect(res.body.data).to.be.instanceof(Array);
			   // correct number of courses returned
			   expect(res.body.data).to.have.length(Object.keys(courses).length-1);
			   
			   // check that openings have expected properties
			   // note that we need two indices, since we don't know the order in
			   //   which the courses will be returned
			   var i, j;
			   for (i in courses){
			       // skip first course, since it should be full
			       if (i != courseID){
				   for (j = 0; j < res.body.data.length; j++){
				       if (res.body.data[j].code == courses[i].code){
					   util.compareCourses(res.body.data[j], courses[i]);
					   break;
				       }
				   }
				   expect(j).to.be.below(res.body.data.length);
			       }
			   }			   

			   done();
		       });
	       };

	       // add full course
	       util.addCourse(fullCourse, function(){
		   // add open courses
		   util.addCourses(1, courses, serverCall);
	       }); 
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

	it('should list some open/all courses on /getOpenings GET',
	   function(done) {
      	       // create courses that are not open (randomize the number and selection of courses)
	       var numFullCourses = util.randInt(2, Object.keys(courses).length-2);
	       var fullCourses = util.randSample(Object.keys(courses), numFullCourses);
	       var coursesCopy = JSON.parse(JSON.stringify(courses));
	       var i;
	       for (i = 0; i < numFullCourses; i++)
		   coursesCopy[fullCourses[i]].numberOfTAs = 0;
	       
	       // perform server call and check result
	       function serverCall(){		   
		   chai.request(server) 
		       .get('/getOpenings')
		       .end(function(err, res){

			   expect(res).to.have.status(200); // response status

			   expect(res.body.data).to.be.instanceof(Array);
			   // correct number of courses returned
			   expect(res.body.data).to.have.length(
			       Object.keys(courses).length - numFullCourses);

			   // check that openings have expected properties
			   // note that we need two indices, since we don't know the order in
			   //   which the courses will be returned
			   var i, j;
			   for (i in coursesCopy){
			       if (coursesCopy[i] > 0){
				   for (j = 0; j < res.body.data.length; j++){
				       if (res.body.data[j].code == courses[i].code){
					   util.compareCourses(res.body.data[j], courses[i]);
					   break;
				       }
				   }
				   expect(j).to.be.below(res.body.data.length);
			       }
			   }		   

			   done();
		       });
	       };

	       util.addCourses(0, coursesCopy, serverCall);
	   });

    });
   
});
