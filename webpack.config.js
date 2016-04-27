var webpack = require('webpack')
 ,  glob = require('glob').sync
 ,  ExtractTextPlugin = require('extract-text-webpack-plugin');

// Find all the css files but sort the common ones first
var cssFiles = glob('./src/common/**/*.css').concat(glob('./src/!(common)/**/*.css'));

module.exports = {
    entry: {
        'sir-trevor-blocks.js' : './src/entry.js',
        'sir-trevor-blocks.css' : cssFiles
    },
    output: {
        path: __dirname,
        filename: '[name]'
    },
    module: {
        loaders: [
            { test: /\.html$/, loader: 'html' },
            { test: /\.css$/,  loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name]'),
    ],
    externals: {
        'lodash': '_',
        'jquery': 'jQuery',
        'sir-trevor-js': 'SirTrevor',
        'i18n': 'i18n',
        'highlightjs': 'hljs',
        'ckeditor': 'CKEDITOR'
    }
};