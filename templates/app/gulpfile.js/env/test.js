const gulp = require('gulp');
const clean = require('../clean');
const copy = require('../copy');
const scripts = require('../scripts');
const sass = require('../sass');
const jsonCompile = require('../json-compile');
const npm = require('../npm');

module.exports = {
    fn: gulp.series(
        clean.fn,
        copy.fn,
        gulp.parallel(
            scripts.fn,
            sass.fn,
            jsonCompile.fn,
            npm.fn,
        ),
    ),
};
