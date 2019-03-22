const fs = require('fs');
const process = require('process');
const path = require('path');
const CONF = require('../config');

const app_dir = path.resolve(__dirname, '../');

const MESSAGE = {
    LOG_DIR_EXIST: '日志目录已存在',
    STORE_DIR_EXIST: '存储目录已存在',

    LOG_DIR_CREATE: `创建日志目录，目标路径：${CONF.log_dir}`,
    STORE_DIR_CREATE: `创建存储目录，目标路径：${CONF.store_dir}`,

    DIR_CREATE_SUCCESS: '\t-> 目录创建成功',
    DIR_CREATE_FAILED: '\t-> 目录创建失败',

    INSTALLED: `检测到已安装应用: \n\t应用目录：${app_dir}\n\t存储目录：${CONF.store_dir}\n\t日志目录：${CONF.log_dir}`,
    INSTALL_SUCCESS: `安装成功，感谢使用: \n\t应用目录：${app_dir}\n\t存储目录：${CONF.store_dir}\n\t日志目录：${CONF.log_dir}`,
    INSTALL_FAILED: '安装失败，请检查配置文件',
};

const dirExist = (dir) => {
    try {
        const stat = fs.statSync(dir);
        return stat.isDirectory();
    } catch (e) {
        return false;
    }
}

const mkDir = (dir) => {
    try {
        const res = fs.mkdirSync(dir, {
            recursive: true
        });
        return res === undefined;
    } catch (e) {
        return false;
    }
}

function main() {
    if (dirExist(CONF.store_dir) && dirExist(CONF.log_dir)) {
        console.log(MESSAGE.INSTALLED);
        return true;
    } else {
        // 日志目录创建
        if (dirExist(CONF.log_dir)) {
            console.log(MESSAGE.LOG_DIR_EXIST);
        } else {
            console.log(MESSAGE.LOG_DIR_CREATE);
            if (mkDir(CONF.log_dir)) {
                console.log(MESSAGE.DIR_CREATE_SUCCESS)
            } else {
                console.log(MESSAGE.DIR_CREATE_FAILED);
            }
        }

        // 存储目录创建
        if (dirExist(CONF.store_dir)) {
            console.log(MESSAGE.STORE_DIR_EXIST);
        } else {
            console.log(MESSAGE.STORE_DIR_CREATE);
            if (mkDir(CONF.store_dir)) {
                console.log(MESSAGE.DIR_CREATE_SUCCESS);
            } else {
                console.log(MESSAGE.DIR_CREATE_FAILED);
            }
        }
    }

    if (dirExist(CONF.store_dir) && dirExist(CONF.log_dir)) {
        console.log(MESSAGE.INSTALL_SUCCESS);
    } else {
        console.log(MESSAGE.INSTALL_FAILED);
    }
}

main();
