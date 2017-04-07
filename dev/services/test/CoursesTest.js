var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/main');
chai.should();

chai.use(chaiHttp);

function checkBasicStructure(response) {
  
  response.should.have.status(200);
  
  response.should.be.json;
  response.body.should.be.a('object');
  
  response.body.should.have.property('status');
  response.body.status.should.equal('success');
  
  response.body.should.have.property('data');
  response.body.data.should.be.a('array');
}

function checkCourseAttributes(expected, actual) {
  actual.should.have.property('_id');
  actual.should.have.property('code');
  actual.should.have.property('title');
  actual.should.have.property('instructor');
  actual.should.have.property('numberOfTAs');
  actual.should.have.property('qualifications');
  actual.should.have.property('__v');
  
  // These value checks will be of more use once we use 'hooks' to
  // populate the database with test data before running each test
  actual.code.should.equal(expected.code);
  actual.title.should.equal(expected.title);
  actual.instructor.should.equal(expected.instructor);
  actual.numberOfTAs.should.equal(expected.numberOfTAs);
  actual.qualifications.should.equal(expected.qualifications);
}


function assert(response, expectedData, actualData) {
  checkBasicStructure(response);
  checkCourseAttributes(expectedData, actualData);
}

describe('Courses', function() {
  it('GET /courseList returns list of all courses', function(done) {
    
    chai.request(server).get('/getCourseList').end(function(error, response) {
      
      expected = {
        code: "CSC207",
        title: "Software Design",
        instructor: "Anya Tafliovich",
        numberOfTAs: 20,
        qualifications: "Excellent OO skills nad Experience with Java",
        __v: 0
      };
      
      actual = response.body.data[0];      
      assert(response, expected, actual);
      
      done();
    });
  });
  
  it('GET /getOpenings returns list of all unassigned TA positions', function(done) {
    
    chai.request(server).get('/getOpenings').end(function (error, response) {
      
      expected = {
        code: "CSC148",
        title: "Introduction to Computer Science",
        instructor: "Pit Franc",
        numberOfTAs: 20,
        qualifications: "Obtained at least A in CSC108 and CSC148",
        __v: 0
      };
      
      actual = response.body.data[1];
      assert(response, expected, actual);
      done();
    });
  });
});