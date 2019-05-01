
const del = require('del');
const gulpConfig = require('./config');

function clean() {
    const { dir } = gulpConfig.clean;
    return del(dir);
}

module.exports = {
    fn: clean,
};
