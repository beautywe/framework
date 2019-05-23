const csso = require('gulp-csso');
const gulpConfig = require('./config');
const sass = require('./sass');

function sassMin() {
    return sass.doCompile({
        ...gulpConfig.sass,
        afterCompiled: [
            stream => stream.pipe(csso()),
        ],
    });
}

module.exports = {
    fn: sassMin,
};
