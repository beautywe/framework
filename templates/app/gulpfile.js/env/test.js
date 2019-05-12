const gulp = require('gulp');
const clean = require('../clean');
const copy = require('../copy');
const scripts = require('../scripts');
const sass = require('../sass');
const nodeJsPower = require('../nodejs-power');
const npm = require('../npm');

module.exports = {
    fn: gulp.series(
        clean.fn,
        copy.fn,
        gulp.parallel(
            scripts.fn,
            sass.fn,
            npm.fn,
        ),
        nodeJsPower.fn,
    ),
};
