const gulp = require('gulp');
const csso = require('gulp-csso');
const gulpConfig = require('./config');
const sass = require('./sass');

function sassMin() {
    const { from, to } = gulpConfig.sass;
    return sass
        .doCompile(gulp.src(from))
        .pipe(csso())
        .pipe(gulp.dest(to));
}

module.exports = {
    fn: sassMin,
};
