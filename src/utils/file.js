const fs = require('fs');
const CONF = require('../../config');
const log = require('../utils/log');

const storePath = CONF.store_dir;


function dirExist(dir) {
    try {
        const stat = fs.statSync(dir);
        return stat.isDirectory();
    } catch (e) {
        return false;
    }
}

// 创建应用存储目录
function createAppDir(appKey) {
    const appDir = `${storePath}/${appKey}`;
    // 如果目录已存在，报错
    if (dirExist(appDir)) {
        log(`${appDir} existed`);
        return false;
    }
    try {
        fs.mkdirSync(appDir, {
            recursive: false
        });
        log(`${appDir} created successfully`);
        return true;
    } catch (e) {
        log(e);
        return false;
    }
}

// 写文件、存储对象
function saveFile(file, newPath) {
    if (!file || !newPath) {
        return false;
    }
    try {
        fs.renameSync(file.path, `${storePath}/${newPath}`);
        return true;
    } catch (e) {
        log(e);
        return false;
    }
}

module.exports = {
    createAppDir,
    saveFile
};
