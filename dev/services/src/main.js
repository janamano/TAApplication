/* --- Dependencies / libraries / frameworks --- */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));
mongoose.Promise = global.Promise;
// The main instance of our HTTP server
var server = require('http').Server(app);

module.exports = server;

/*DB Connection*/
mongoose.connect("mongodb://localhost:27017/serverDB", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});

/* -- TODO: Attach request handlers for endpoints - */


/* ---------- Server Start up  -------------------- */

var hostname = 'localhost';
var port = 8080;

var applicationRoute = require('./router/application')(app);
var applicantsRoute = require('./router/applicant')(app);
var coursesRoute = require('./router/courses')(app);
var assignmentRoute = require('./router/assignment')(app);


// Start listening for requests
server.listen(process.env.PORT || port, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});
