/* --- Dependencies / libraries / frameworks --- */
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));

// The main instance of our HTTP server
var server = require('http').Server(app);


/* -- TODO: Attach request handlers for endpoints - */


/* ---------- Server Start up  -------------------- */

var hostname = 'localhost';
var port = 8080;

// Start listening for requests
server.listen(process.env.PORT || port, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});