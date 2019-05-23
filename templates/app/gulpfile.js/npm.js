const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const gulpConfig = require('./config');

const RUN_ENV = process.env.RUN_ENV;

const { from: _from, to: _to, babel: babelConf } = gulpConfig.npm;

const webpackConfig = Object.assign({
    mode: 'production',
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: babelConf,
        }],
    },
    output: {
        filename: 'index.js',
        libraryTarget: 'umd',
    },
}, {
    dev: {
        optimization: { minimize: false },
    },
    test: {},
    prod: {},
}[RUN_ENV] || {});

function doCompile(task) {
    return task.pipe(webpackStream(webpackConfig), webpack);
}

function npm() {
    return doCompile(gulp.src(_from)).pipe(gulp.dest(_to));
}

module.exports = {
    fn: npm,
    doCompile,
};
