const babelConf = {
    presets: ['@babel/preset-env'],
    plugins: ['array-includes'],
};

const DIST_DIR = './dist';
const APP_DIR = './src';
const conf = {
    DIST_DIR,
    APP_DIR,
    ENV: process.env.NODE_ENV,
};

conf.nodeJsPower = {
    from: `${APP_DIR}/**/*.nodepower.js`,
    to: DIST_DIR,
    mode: 'commonjs',
};

conf.npm = {
    from: `${APP_DIR}/npm/index.js`,
    to: `${DIST_DIR}/npm`,
    babel: babelConf,
};

conf.scripts = {
    from: [
        `${APP_DIR}/**/*.js`,
        `!${APP_DIR}/npm/**/*.js`,
        `!${APP_DIR}/config/**/!(index).js`,
        `!${APP_DIR}/**/*${conf.nodeJsPower.extentions}.js`,
    ],
    to: DIST_DIR,
    babel: babelConf,
};

conf.imageMin = {
    from: [`${APP_DIR}/**/*.{png,jpg,gif}`],
    to: DIST_DIR,
};

conf.sass = {
    from: `${APP_DIR}/**/*.{scss,wxss}`,
    to: `${DIST_DIR}`,
    cssFilterFiles: [
        'style/mixin/index.scss',
        'style/variable/index.scss',
        'style/variable/color.scss',
        'style/variable/font.scss',
    ],
};

conf.copy = {
    from: [
        `${APP_DIR}/**/*.{json,wxml,wxs,png,jpg,jpeg,gif}`,
    ],
    to: `${DIST_DIR}`,
};

conf.clean = {
    dir: [`${DIST_DIR}/**`],
};

module.exports = conf;
