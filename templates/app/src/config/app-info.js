const packageJSON = require('../../package.json');

const { version } = packageJSON;
const env = process.env.RUN_ENV || 'dev';

const appInfo = Object.assign({
    version,
    RUN_ENV: env,
    appid: '<%= appid %>',
    name: '<%= appName %>',
}, {
    // 开发环境的配置
    dev: {},
    // 测试环境的配置
    test: {},
    // 线上环境的配置
    prod: {},
}[env] || {});

module.exports.appInfo = appInfo;
