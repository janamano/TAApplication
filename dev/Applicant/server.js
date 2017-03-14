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
        // Request was successful
        res.status(200).
        json({
            status: 'success',
            data: JSON.parse(dataRecvd),
            message: 'Retrieved courses info'
        });
    })
    .catch(function (err) {
        // An error occurred
        res.status(400).
        json({
            status: 'error',
            data: {},
            message: 'An error occurred'
        });
    })
}

app.get('/all-courses', function(req, res) {
    makeGetRequest('/getCourseList', {}, req, res);
});

/* 
TODO: 
remove this comment once everyone has a solid feel for the structure 
of this project, and how the servers will interact.

Here (or in separate files, if we feel like being more modular) we will be 
adding handlers/routes that will call our main back-end server (via a URLs like
"localhost:8080/handler"). 

So, this React app (the Applicant client), will call these handlers here, which
in turn will call the routes/handlers in the main back-end server.
*/ 


const server = app.listen(3000, function() {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Applicant client app listening at http://%s:%s', host, port);
});