const fse = require('fs-extra');
const nodePath = require('path');
const _ = require('lodash');

const logger = require('./logger');

function render(sourcePath, targetPath, params) {
    return Promise
        .resolve()
        .then(() => fse.readFile(sourcePath, 'utf8'))
        .then(data => _.template(data, { interpolate: /<%=([\s\S]+?)%>/g })(params))
        .then(content => fse.outputFile(targetPath, content, { encoding: 'utf8' }));
}

function copyFile({ sourceDir, targetDir, params, fileName }) {
    return fse
        .readdir(sourceDir)
        .then(files => files.map(file => ({
            name: file,
            stat: fse.statSync(nodePath.join(sourceDir, file)),
        })))
        .then(files => Promise.all(files.map((file) => {
            const targetPath = nodePath.join(targetDir, fileName || file.name);
            const sourcePath = nodePath.join(sourceDir, file.name);

            // TODO 在第一次递归的时候，必须存在 index.js index.json index.wxml 三个文件。

            // 遇到文件夹，递归
            if (file.stat.isDirectory()) {
                return copyFile({ sourceDir: sourcePath, targetDir: targetPath, params });
            }

            return Promise
                .resolve()

                // 检查目标文件是否存在
                .then(() => new Promise((resolve, reject) => {
                    fse
                        .access(targetPath)
                        .then(() => reject(new Error('file already exist')))
                        .catch(() => resolve());
                }))

                .then(() => {
                    // 只有 json,wxml,js,wxss,scss，支持变量渲染
                    if (/\.(json|wxml|js|wxss|scss|md)$/.test(targetPath) && !/\.templates/.test(targetPath)) return render(sourcePath, targetPath, params);

                    // 其他资源，直接复制
                    return fse.copy(sourcePath, targetPath);
                })

                .then(() => ({ sourcePath, targetPath }))

                .catch(err => logger.error(`复制文件出错：${targetPath}, `, err));
        })))
        .then(data => _.compact(_.flatten(data, true)));
}

module.exports = copyFile;
