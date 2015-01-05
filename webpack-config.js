var webpack = require('webpack');

module.exports = {
    entry: './client/js/boot.js',
    output: {
        path: './client/build',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test:/\.jsx/, loader: 'jsx-loader'}
        ]
    }
};
