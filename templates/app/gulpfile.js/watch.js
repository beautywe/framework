
const gulp = require('gulp');
const babel = require('gulp-babel');
const gulpConf = require('./config');
const nPath = require('path');
const jsonCompile = require('./json-compile');
const sassCompile = require('./sass');
const npmCompile = require('./npm');
const del = require('del');
const chalk = require('chalk');
const TimeBuried = require('time-buried');

function resolvePath(path) {
    const filePath = nPath.resolve(path);
    const distPath = nPath.resolve(gulpConf.DIST_DIR);
    const appPath = nPath.resolve(gulpConf.APP_DIR);
    const distFilePath = filePath.replace(appPath, distPath);
    const toPath = nPath.resolve(distFilePath, '../');

    return { filePath, toPath, distFilePath };
}

function generateWatcher({ from, changeOrAdd }) {
    function handlerChangeOrAdd(event) {
        return (path) => {
            const tR = new TimeBuried();
            const tN = event;
            const { distFilePath } = resolvePath(path);
            tR.start(tN);
            changeOrAdd(path).on('end', () => {
                tR.end(tN);
                const diff = tR.getValue(tN).diff;
                console.log(`File ${chalk.yellow(distFilePath)} was ${event} after ${chalk.magenta(`${diff}ms`)}`);
            });
        };
    }

    return gulp
        .watch(from)
        .on('unlink', (path) => {
            const tR = new TimeBuried();
            const tN = 'unlink';
            const { distFilePath } = resolvePath(path);
            tR.start(tN);
            del(distFilePath)
                .then(() => {
                    tR.end(tN);
                    const diff = tR.getValue(tN).diff;
                    console.log(`File ${chalk.yellow(distFilePath)} was removed after ${chalk.magenta(`${diff}ms`)}`);
                });
        })
        .on('add', handlerChangeOrAdd('add'))
        .on('change', handlerChangeOrAdd('change'));
}

function watchScripts() {
    return generateWatcher({
        from: gulpConf.scripts.from,
        changeOrAdd(path) {
            const { filePath, toPath } = resolvePath(path);

            return gulp
                .src(filePath)
                .pipe(babel(gulpConf.scripts.babel))
                .pipe(gulp.dest(toPath));
        },
    });
}

function watchAssets() {
    return generateWatcher({
        from: gulpConf.copy.from,
        changeOrAdd(path) {
            const { filePath, toPath } = resolvePath(path);
            return gulp
                .src(filePath)
                .pipe(gulp.dest(toPath));
        },
    });
}

function watchJsonCompile() {
    const watchers = [];
    gulpConf.jsonCompile.forEach((conf) => {
        watchers.push(new Promise((resolve) => {
            generateWatcher({
                from: conf.from,
                changeOrAdd(path) {
                    return jsonCompile.doCompile(Object.assign({}, conf, { from: path }));
                },
            })
            .on('end', resolve);
        }));
    });

    return Promise.all(watchers);
}

function watchStyle() {
    return generateWatcher({
        from: gulpConf.sass.from,
        changeOrAdd(path) {
            const { filePath, toPath } = resolvePath(path);
            return sassCompile
                .doCompile(gulp.src(filePath))
                .pipe(gulp.dest(toPath));
        },
    });
}

function watchNPM() {
    return generateWatcher({
        from: gulpConf.npm.from,
        changeOrAdd(path) {
            const { filePath, toPath } = resolvePath(path);
            return npmCompile
                .doCompile(gulp.src(filePath))
                .pipe(gulp.dest(toPath));
        },
    });
}

module.exports = {
    fn: gulp.parallel(watchScripts, watchAssets, watchJsonCompile, watchStyle, watchNPM),
    resolvePath,
};
