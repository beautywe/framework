const packageJSON = require('../../package.json');

const version = packageJSON.version;
const env = process.env.RUN_ENV || 'development';

// 环境的配置，会覆盖通用配置
const appInfo = {
    develpoment: {},
    production: {},
    test: {},
    common: {
        version,
        env,
        appid: '<%= appid %>',
        name: '<%= appName %>',
    },
};

module.exports.appInfo = Object.assign({}, appInfo.common, appInfo[env] || {});
