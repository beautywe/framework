
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const gulpConfig = require('./config');

function imageMin() {
    const { from: _from, to: _to } = gulpConfig.imageMin;
    return gulp
        .src(_from)
        .pipe(imagemin())
        .pipe(gulp.dest(_to));
}

module.exports = {
    fn: imageMin,
};
