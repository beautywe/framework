
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const gulpConfig = require('./config');
const scripts = require('./scripts');

const { from, to } = gulpConfig.scripts;

function scriptsMin() {
    return scripts
        .doCompile(gulp.src(from))
        .pipe(uglify())
        .pipe(gulp.dest(to));
}

module.exports = {
    fn: scriptsMin,
};

