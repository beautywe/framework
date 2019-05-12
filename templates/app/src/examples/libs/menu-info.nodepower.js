const fs = require('fs-extra');
const path = require('path');

const menuDir = path.join(__dirname, '../pages/menu');
const menus = fs.readdirSync(menuDir).map(item => {
    const _menu = { id: item };
    _menu.pages = fs.readdirSync(path.join(menuDir, item));
    return _menu;
});

module.exports = menus;
