const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
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