const gulp = require('gulp');
const clean = require('../clean');
const copy = require('../copy');
const scripts = require('../scripts-min');
const sass = require('../sass-min');
const jsonCompile = require('../json-compile');
const npm = require('../npm');
const imageMin = require('../image-min');
const cleanExample = require('../clean-example');

module.exports = {
    fn: gulp.series(
        clean.fn,
        copy.fn,
        gulp.parallel(
            scripts.fn,
            sass.fn,
            jsonCompile.fn,
            npm.fn,
            imageMin.fn,
        ),
        cleanExample.fn,
    ),
};
