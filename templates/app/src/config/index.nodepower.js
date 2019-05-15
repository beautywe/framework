const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(path.join(__dirname));

const result = {};

files
    .filter(name => name !== 'index.js')
    .forEach((name) => {
        Object.assign(result, require(path.join(__dirname, `./${name}`)));
    });

module.exports = result;
