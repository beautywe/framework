
const del = require('del');
const path = require('path');
const fs = require('fs-extra');
const gulpConfig = require('./config');

const subpkgName = 'examples';
const appJsonPath = path.join(__dirname, '../', `${gulpConfig.DIST_DIR}/app.json`);
const exampleFilePath = path.join(__dirname, '../', `${gulpConfig.DIST_DIR}/examples`);

function cleanExample() {
    return fs
        .readJSON(appJsonPath)

        // clean app.json
        .then((appJson) => {
            appJson.subPackages = appJson.subPackages.filter(item => item.root !== subpkgName);
            fs.writeFileSync('./dist/app.json', JSON.stringify(appJson));
            return fs.writeJSON(appJsonPath, appJson, { spaces: '\t' });
        })

        // clean files
        .then(() => del([exampleFilePath]));
}

module.exports = {
    fn: cleanExample,
};
