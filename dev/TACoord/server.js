const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const request = require('request-promise');
const bodyParser = require('body-parser')
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

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

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

var makePostRequest = function (route, qBody, req, res) {
    var options = {  
        method: 'POST',
        uri: 'http://localhost:8080' + route,
        body: qBody,
        json: true
    }
    request(options)  
        .then(function (response) {
            // Request was successful
            res.status(200)
                .json({
                    status: 'success',
                    data: {},
                    message: "message"

                    
                });
        })
        .catch(function (err) {
            // An error occurred
            res.status(400)
                .json({
                    status: 'error',
                    data: {},
                    message: "error message"
                });
        })
}

var makeDeleteRequest = function (route, qBody, req, res) {
    var options = {  
        method: 'DELETE',
        uri: 'http://localhost:8080' + route,
        body: qBody,
        json: true
    }
    request(options)  
        .then(function (response) {
            // Request was successful
            res.status(200)
                .json({
                    status: 'success',
                    data: {},
                    message: "message"

                    
                });
        })
        .catch(function (err) {
            // An error occurred
            res.status(400)
                .json({
                    status: 'error',
                    data: {},
                    message: "error message"
                });
        })
}

var makePutRequest = function (route, qParams, req, res) {
    var options = {
        uri: 'http://localhost:8080' + route,
        method: 'PUT',
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
    makeGetRequest('/getOpenings', req.query, req, res);
});

// get a list of Applicants who applied to a certain course
app.get('/getApplicants', function(req, res) {
    makeGetRequest('/getApplicantsByCourse', req.query, req, res);
});

app.get('/getAcceptedAssignments', function(req, res) {
    makeGetRequest('/getAssignments', req.query, req, res);
});

app.get('/getUtorid', function(req, res) {
    makeGetRequest('/getApplicantUtorid', req.query, req, res);
});

app.get('/getApplicantInfo', function(req, res) {
    makeGetRequest('/getApplicantByStudentNumber', req.query, req, res);
});

app.get('/getCourse', function(req, res) {
    makeGetRequest('/getCourseInfo', req.query, req, res);
});

app.get('/getAssignments', function(req, res) {
    makeGetRequest('/getAssignmentsByCourse/', req.query, req, res);
});

app.get('/filter', function(req, res) {
    makeGetRequest('/filterApplicants/', req.query, req, res);
});

app.get('/getRank', function(req, res) {
    makeGetRequest('/getRanking/', req.query, req, res);
});

app.post('/createAssignment', function(req, res) {
    makePostRequest('/saveAssignment/', req.body, req, res);
});

app.post('/changeNumTAs', function(req, res) {
    console.log(req.body)
    makePostRequest('/changeTAs/', req.body, req, res);
});

app.delete('/reject', function(req, res) {
    makeDeleteRequest('/rejectApplicant/', req.body, req, res);
});

module.exports = app;

const server = app.listen(4000, function() {
    const host = server.address().address;
    const port = server.address().port;
    console.log('TA coordinator client app listening at http://%s:%s', host, port);
});
