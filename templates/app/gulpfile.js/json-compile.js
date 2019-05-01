const through2 = require('through2');
const PluginError = require('plugin-error');
const defineModule = require('gulp-define-module');
const gulp = require('gulp');
const rename = require('gulp-rename');

const PLUGIN_NAME = 'gulp-json-compile';
const gulpConfig = require('./config');

function toJSON() {
    return through2.obj(function handler(file, encoding, callback) {
        // nothing to do
        if (file.isNull()) {
            return callback(null, file);
        }

        if (file.isStream()) {
            return this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
        } else if (file.isBuffer()) {
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

function doCompile({ from: _from, to: _to, fileMode = 'json', output }) {
    if (fileMode === 'commonjs') {
        return gulp
            .src(_from)
            .pipe(toJSON())
            .pipe(defineModule('commonjs'))
            .pipe(gulp.dest(_to));
    }
    return gulp
            .src(_from)
            .pipe(toJSON())
            .pipe(rename({
                basename: output.filename,
                extname: output.json || '.json',
            }))
            .pipe(gulp.dest(_to));
}

function jsonCompile() {
    const tasks = [];
    gulpConfig.jsonCompile.forEach((conf) => {
        tasks.push(new Promise((resolve) => {
            doCompile(conf).on('end', resolve);
        }));
    });
    return Promise.all(tasks);
}


module.exports = {
    fn: jsonCompile,
    toJSON,
    doCompile,
};
