const _ = require('lodash');
const config = require('./config');

module.exports = {
    pages: _.values(config.routes),
    window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'BeautyWe App',
        navigationBarTextStyle: 'black',
    },
    usingComponents: {
        'global-view': '/components/global-view/index',
    },
};
