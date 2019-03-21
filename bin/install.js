const fs = require('fs');
const path = require('path');
const CONF = require('../config');

const app_dir = path.resolve(__dirname, '../');

// TODO: 打印信息及过程优化
const MESSAGE = {
    DIR_EXIST: '目录已存在',
    DIR_NOT_EXIST: '目录尚未创建',

    LOG_DIR_CREATE_READY: `创建spoos日志目录，目标路径：${CONF.log_dir}`,
    STORE_DIR_CREATE_READY: `创建spoos存储目录，目标路径：${CONF.spoos_dir}`,

    DIR_CREATE_SUCCESS: '目录创建成功',
    DIR_CREATE_FAILED: '目录创建失败',

    INSTALL_SUCCESS: `安装成功，感谢使用: \n\t应用目录：${app_dir}\n\t存储目录：${CONF.spoos_dir}\n\t日志目录：${CONF.log_dir}`,
    INSTALL_FAILED: '安装失败，请检查配置文件',

    INSTALLED: `检测到已安装应用: \n\t应用目录：${app_dir}\n\t存储目录：${CONF.spoos_dir}\n\t日志目录：${CONF.log_dir}`,
};

const dirExist = (dir) => {
    console.log(`检测目录: ${dir}`);
    try {
        const stat = fs.statSync(dir);
        if (stat.isDirectory()) {
            console.log(`\t${MESSAGE.DIR_EXIST}`);
            return true;
        } else {
            console.log(`\t${MESSAGE.DIR_NOT_EXIST}`);
            return false;
        }
    } catch (e) {
        console.log(`\t${MESSAGE.DIR_NOT_EXIST}`);
        return false;
    }
}

const mkDir = (dir) => {
    try {
        const res = fs.mkdirSync(dir, {
            recursive: true
        });
        if (res === undefined) {
            console.log(MESSAGE.DIR_CREATE_SUCCESS);
        } else {
            console.log(MESSAGE.DIR_CREATE_FAILED);
        }
    } catch (e) {
        console.log(MESSAGE.DIR_CREATE_FAILED);
    }
}

function main() {
    if (dirExist(CONF.spoos_dir) && dirExist(CONF.log_dir)) {
        console.log(MESSAGE.INSTALLED);
        return true;
    } else {
        if (!dirExist(CONF.spoos_dir)) {
            console.log(MESSAGE.DIR_NOT_EXIST);
            console.log(MESSAGE.STORE_DIR_CREATE_READY);
            mkDir(CONF.spoos_dir);
        }
        if (!dirExist(CONF.log_dir) {
            console.log(MESSAGE.DIR_NOT_EXIST);
            console.log(MESSAGE.LOG_DIR_CREATE_READY);
            mkDir(CONF.log_dir);
        }
    }

    if (dirExist(CONF.spoos_dir) && dirExist(CONF.log_dir)) {
        console.log(MESSAGE.INSTALL_SUCCESS);
    } else {
        console.log(MESSAGE.INSTALL_FAILED);
    }

}

main();
