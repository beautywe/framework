const path = require('path');
const fs = require('fs');

const excluded = ['config', 'todo'];

function getDirFiles(_path) {
    let files = [];
    fs
        .readdirSync(_path)
        .filter(name => !excluded.includes(name))
        .forEach((name) => {
            const fileName = path.parse(name).name;
            const filePath = path.join(_path, `./${name}`);
            if (fs.lstatSync(filePath).isDirectory()) {
                files = files.concat(getDirFiles(filePath));
            } else {
                files.push({ fileName, filePath });
            }
        });

    files.filter(name => /.js$/.test(name));

    return files;
}

getDirFiles(path.join(__dirname, './')).forEach(({ fileName, filePath }) => {
    exports[fileName] = require(filePath).fn;
});
