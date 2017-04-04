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

app.get('/all-courses', function(req, res) {
    makeGetRequest('/getCourseList', {}, req, res);
});

app.get('/course-info', function(req, res) {
    makeGetRequest('/getCourseInfo', req.query, req, res);
});

app.get('/login', function(req, res) {
    makeGetRequest('/login', req.query, req, res);
});

app.get('/get-applicant', function(req, res) {
    makeGetRequest('/getApplicant', req.query, req, res);
});

app.get('/get-rankings', function(req, res) {
    makeGetRequest('/getApplication', req.query, req, res);
});

app.post('/save-rankings', function(req, res) {
    let body = {
        rankings: req.body.rankings,
        utorid: req.body.utorid,
        status: req.body.status,
        session: req.body.session
    }
    makePostRequest('/saveApplication', body, req, res);
});

app.post('/save-profile', function(req, res) {
    makePostRequest('/saveProfile', req.body, req, res);
});

app.post('/save-TA-history', function(req, res) {
    makePostRequest('/saveTAHistory', req.body, req, res);
});

app.get('/submit-application', function(req, res) {
    makeGetRequest('/submitApplication', req.query, req, res);
});

const server = app.listen(3000, function() {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Applicant client app listening at http://%s:%s', host, port);
});