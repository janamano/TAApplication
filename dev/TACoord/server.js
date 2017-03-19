const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const request = require('request-promise');
const app = express();

const compiler = webpack(webpackConfig);

app.use(express.static(__dirname + '/app/client'));

app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    stats: {
        colors: true,
    },
    historyApiFallback: true,
}));

var makeGetRequest = function (route, qParams, req, res) {
    var options = {
        uri: 'http://localhost:8080' + route,
        method: 'GET',
        qs: qParams
    }

    request(options)  
        .then(function (dataRecvd) {
            dataRecvd = JSON.parse(dataRecvd);
            
            // Request was successful
            if (dataRecvd.status === "success") {
                res.status(200)
                    .json({
                        status: dataRecvd.status,
                        data: dataRecvd["data"],
                        message: dataRecvd.message
                    });
            } else {
                res.status(400)
                    .json({
                        status: dataRecvd.status,
                        data: dataRecvd["data"],
                        message: dataRecvd.message
                    });
            }
        })
        .catch(function (err) {
            // An error occurred
            res.status(400).
            json({
                status: 'error',
                data: {},
                message: 'An error occurred'
            });
        });
}

// get a list of all the ourse that need TA Assignments
app.get('/getOpenCourses', function(req, res) {
    makeGetRequest('/getOpenings', {}, req, res);
});

// get a list of Applicants who applied to a certain course
app.get('/getApplicants', function(req, res) {
    makeGetRequest('/getApplicantsByCourse', {}, req, res);
});

/*
* TODO
app.get('/getAcceptedAssignments', function(req, res) {
    makeGetRequest('/api', {}, req, res);
});

app.get('/acceptApplicant', function(req, res) {
    makeGetRequest('/api', {}, req, res);
});

app.get('/rejectApplicant', function(req, res) {
    makeGetRequest('/api', {}, req, res);
});

*/


/* 
TODO: 
remove this comment once everyone has a solid feel for the structure 
of this project, and how the servers will interact.

Here (or in separate files, if we feel like being more modular) we will be 
adding handlers/routes that will call our main back-end server (via a URLs like
"localhost:8080/handler"). 

So, this React app (the TA Coordinator client), will call these handlers here, 
which in turn will call the routes/handlers in the main back-end server.
*/ 


const server = app.listen(4000, function() {
    const host = server.address().address;
    const port = server.address().port;
    console.log('TA coordinator client app listening at http://%s:%s', host, port);
});