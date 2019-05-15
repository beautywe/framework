const through2 = require('through2');
const PluginError = require('plugin-error');
const defineModule = require('gulp-define-module');
const gulp = require('gulp');

const PLUGIN_NAME = 'gulp-nodejs-power';
const gulpConfig = require('./config');

function toJSON() {
    return through2.obj(function handler(file, encoding, callback) {
        // nothing to do
        if (file.isNull()) {
            return callback(null, file);
        }

        if (file.isStream()) {
            return this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
        } if (file.isBuffer()) {
            delete require.cache[file.path];
            // eslint-disable-next-line
            const jsObj = require(file.path);
            const json = JSON.stringify(jsObj);
            file.contents = new Buffer(json, 'utf8');
            return callback(null, file);
        }

        return callback(null, file);
    });
}

function doCompile({ from: _from, to: _to }) {
    return gulp
        .src(_from)
        .pipe(toJSON())
        .pipe(defineModule(gulpConfig.nodeJsPower.mode))
        .pipe(gulp.dest(_to));
}

function nodeJsPower() {
    return doCompile({
        from: gulpConfig.nodeJsPower.from,
        to: gulpConfig.nodeJsPower.to,
    });
}

module.exports = {
    fn: nodeJsPower,
    toJSON,
    doCompile,
};
