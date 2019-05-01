
const copyFile = require('./copy-file');
const path = require('path');
const templatesDir = {
    'app': path.join(__dirname, '../templates/app'),
    'page': path.join(__dirname, '../templates/app/.templates/page'),
    'component': path.join(__dirname, '../templates/app/.templates/component'),
    'plugin': path.join(__dirname, '../templates/app/.templates/plugin'),
    'plugin-module': path.join(__dirname, '../templates/plugin/module'),
};

function render({ params, targetDir, type, fileName, sourceDir = templatesDir[type] } = {}){
    return copyFile({ params, fileName, targetDir, sourceDir });
}

module.exports = {
    render,
    templatesDir,
};