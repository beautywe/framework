const env = process.env.RUN_ENV || 'dev';

const logger = Object.assign({
    prefix: 'BeautyWe',
    level: 'debug',
}, {
    // 开发环境的配置
    dev: {
        level: 'debug',
    },
    // 测试环境的配置
    test: {
        level: 'info',
    },
    // 线上环境的配置
    prod: {
        level: 'warn',
    },
}[env] || {});

module.exports.logger = logger;
