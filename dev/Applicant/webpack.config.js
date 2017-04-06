const path = require('path');

module.exports = {
    context: path.join(__dirname, 'app/src'),
    entry: [
        './index.js',
    ],
    output: {
        path: path.join(__dirname, 'app/client'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ],
            },
        ],
    },
    resolve: {
        modules: [
            path.join(__dirname, 'node_modules'),
        ],
    },
};