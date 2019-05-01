const gulp = require('gulp');
const tap = require('gulp-tap');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const path = require('path');
const gulpConfig = require('./config');

function doCompile(task) {
    const hasRmCssFiles = new Set();
    const { cssFilterFiles } = gulpConfig.sass;

    return task.pipe(tap((file) => {
        // 当前处理文件的路径
        const filePath = path.dirname(file.path);
        // 当前处理内容
        const content = file.contents.toString();
        // 找到filter的scss，并匹配是否在配置文件中
        content.replace(/@import\s+['|"](.+)['|"];/g, ($1, $2) => {
            const hasFilter = cssFilterFiles.filter(item => $2.indexOf(item) > -1);
            // hasFilter > 0表示filter的文件在配置文件中，打包完成后需要删除
            if (hasFilter.length > 0) {
                const rmPath = path.join(filePath, $2);
                // 将src改为dist，.scss改为.wxss，例如：'/xxx/src/scss/const.scss' => '/xxx/dist/scss/const.wxss'
                const filea = rmPath.replace(/src/, 'dist').replace(/\.scss/, '.wxss');
                // 加入待删除列表
                hasRmCssFiles.add(filea);
            }
        });
    }))
    .pipe(replace(/(@import.+;)/g, ($1, $2) => {
        const hasFilter = cssFilterFiles.filter(item => $1.indexOf(item) > -1);
        if (hasFilter.length > 0) {
            return $2;
        }
        return `/** ${$2} **/`;
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(replace(/(\/\*\*\s{0,})(@.+)(\s{0,}\*\*\/)/g, ($1, $2, $3) => $3.replace(/\.scss/g, '.wxss')))
    .pipe(rename({
        extname: '.wxss',
    }));
}

function sassTask() {
    const { from: _from, to: _to } = gulpConfig.sass;
    return doCompile(gulp.src(_from)).pipe(gulp.dest(_to));
}

module.exports = {
    fn: sassTask,
    doCompile,
};
