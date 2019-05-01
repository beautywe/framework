
const gulp = require('gulp');
const gulpConfig = require('./config');

function copy() {
    const { from: _from, to: _to } = gulpConfig.copy;
    return gulp
        .src(_from)
        .pipe(gulp.dest(_to));
}

module.exports = {
    fn: copy,
};
