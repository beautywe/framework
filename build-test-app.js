const path = require('path');
const beautyweTemplates = require('./src/index');
const logger = require('./src/logger');
const TEST_APP_FLODER = path.join(__dirname, './test-app');
const del = require('del');
const fs = require('fs-extra');

return Promise
    .resolve()

    .then(() => fs.ensureDir(TEST_APP_FLODER))

    // clear app floader except ./node_modules (you should update by hand if necessary)
    .then(() => fs.readdir(TEST_APP_FLODER))
    .then((files) => Promise.all(files.map((file) => {
        if (file === 'node_modules') return Promise.resolve([]);
        else return del([path.join(TEST_APP_FLODER, `/${file}`)]);
    })))
    .then((results) => {
        results.forEach((result) => result.forEach((path) => logger.error('删除文件或文件夹:', path)));
    })

    // new app
    .then(() => beautyweTemplates.render({
        type: 'app',
        targetDir: TEST_APP_FLODER,
        params: {
            appName: 'beautywe-framework-test-app',
            appid: 'wx6740f8a0f88af0df',
            version: '0.0.1',
        },
    }))
    .then(result => result.forEach((item) => {
        logger.success(`生成文件：${item.targetPath}`);
    }))
    
    // new page
    .then(() => beautyweTemplates.render({
        type: 'page',
        targetDir: path.join(TEST_APP_FLODER, '/src/pages/home'),
        params: {
            name: 'home',
            route: 'pages/home/index',
            relativeToAppDir: '../../',
        },
    }))
    .then(result => result.forEach((item) => {
        logger.success(`生成文件：${item.targetPath}`);
    }))

    // new plugin
    .then(() => beautyweTemplates.render({
        type: 'plugin',
        targetDir: path.join(TEST_APP_FLODER, '/src/libs/plugins'),
        params: {
            name: 'testPlugin',
        },
        fileName: `test.js`,
    }))
    .then(result => result.forEach((item) => {
        logger.success(`生成文件：${item.targetPath}`);
    }));