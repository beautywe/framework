const env = process.env.RUN_ENV || 'development';

const loggerConfig = {
    develpoment: {
        level: 'debug',
    },
    production: {
        level: 'warn',
    },
    test: {
        level: 'info',
    },
};

const base = {
    prefix: 'BeautyWe',
    level: 'debug',
};

module.exports.logger = Object.assign({}, base, loggerConfig[env] || {});
