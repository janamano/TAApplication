var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/main');
chai.should();

chai.use(chaiHttp);

describe('Courses', function() {
  it('GET /courseList returns list of all courses', function(done) {
    chai.request(server)
    .get('/getCourseList')
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      
      res.body.should.have.property('status');
      res.body.status.should.equal('success');
      
      res.body.should.have.property('data');      
      res.body.data.should.be.a('array');
      
      data = res.body.data;
      data[0].should.have.property('_id');
      data[0].should.have.property('code');
      data[0].should.have.property('title');
      data[0].should.have.property('instructor');
      data[0].should.have.property('numberOfTAs');
      data[0].should.have.property('qualifications');
      data[0].should.have.property('__v');
      
      // These value checks will be of more use once we use 'hooks' to
      // populate the database with test data before running each test
      data[0].code.should.equal('CSC207');
      data[0].title.should.equal('Software Design');
      data[0].instructor.should.equal('Anya Tafliovich');
      data[0].numberOfTAs.should.equal(20);
      data[0].qualifications.should.equal('Excellent OO skills nad Experience with Java');
      done();
    });
  });
});