const gulp = require('gulp');
const tap = require('gulp-tap');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const path = require('path');
const clean = require('gulp-clean');
const gulpConfig = require('./config');

function doCompile({ from, to, afterCompiled = [] }) {
    const { whiteListForImport } = gulpConfig.sass;
    const toRemoveFiles = new Set();

    return Promise
        .resolve()

        // 编译 sass
        .then(() => new Promise((resolve, reject) => {
            // 编译任务
            afterCompiled.unshift(
                gulp
                    .src(from)

                    // 过滤 import 白名单，并记录到待删除列表
                    .pipe(tap((file) => {
                        const filePath = path.dirname(file.path);
                        const content = file.contents.toString();
                        content.replace(/@import\s+['|"](.+)['|"];/g, ($1, $2) => {
                            const isWhite = (whiteListForImport.filter(item => $2.indexOf(item) > -1)).length > 0;
                            if (isWhite) {
                                const rmPath = path.join(filePath, $2);
                                const filea = rmPath.replace(/src/, 'dist').replace(/\.scss/, '.wxss');
                                toRemoveFiles.add(filea);
                            }
                        });
                    }))

                    // 对 import 进行注释，绕过 sass 编译
                    .pipe(replace(/(@import.+;)/g, ($1, $2) => {
                        const isWhite = (whiteListForImport.filter(item => $1.indexOf(item) > -1)).length > 0;
                        return isWhite ? $2 : `/** ${$2} **/`;
                    }))

                    // sass 编译
                    .pipe(sass().on('error', sass.logError))

                    // 解除 import 注释
                    .pipe(replace(/(\/\*\*\s{0,})(@.+)(\s{0,}\*\*\/)/g, ($1, $2, $3) => $3.replace(/\.scss/g, '.wxss')))

                    // 文件重命名为 wxss
                    .pipe(rename({ extname: '.wxss' })),
            );

            // 写入目标目录
            afterCompiled.push(stream => stream
                .pipe(gulp.dest(to))
                .on('end', () => resolve({ toRemoveFiles }))
                .on('error', reject));

            // 执行任务
            afterCompiled.reduce((preResult, curTask) => curTask(preResult));
        }))

        // 清理白名单样式
        .then(() => {
            const arr = Array.from(toRemoveFiles);
            if (arr[0]) return gulp.src(arr, { read: false }).pipe(clean({ force: true }));
            return Promise.resolve();
        });
}

function sassTask() {
    return doCompile(gulpConfig.sass);
}

module.exports = {
    fn: sassTask,
    doCompile,
};
