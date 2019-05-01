
const gulp = require('gulp');
const babel = require('gulp-babel');
const gulpConfig = require('./config');

const { from, to, babel: babelConf } = gulpConfig.scripts;

function doCompile(task) {
    return task.pipe(babel(babelConf));
}

function scripts() {
    return doCompile(gulp.src(from)).pipe(gulp.dest(to));
}

module.exports = {
    fn: scripts,
    doCompile,
};

