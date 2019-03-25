const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');
const ApplicationModel = require('../model/Application.model');
const log = require('../utils/log');


class ApplicationService {
    // 检测appName是否存在
    async isNameExist(appName) {
        const find = await ApplicationModel.findOne({
            where: {
                appName: appName
            }
        }).catch(err => {
            log(err);
            return false;
        });
        return !!find;
    }
    async getAppByKey(appKey) {
        return await ApplicationModel.findOne({
            where: {
                appKey: appKey
            }
        }).catch(err => {
            log(err);
            return null;
        });
    }
    async getAppList(query = { pageSize: 10, pageNum: 1 }) {
        return await ApplicationModel.findAndCountAll({
            attributes: ['appId', 'ownerId', 'appKey', 'appName', 'appInfo', 'createTime', 'updateTime'],
            offset: (query.pageNum - 1) * query.pageSize,
            limit: +query.pageSize
        }).catch(err => {
            log(err);
            return null;
        });
    }
    // 新增应用
    createApp() {

    }
    // 更新应用
    updateApp() {

    }
    // 删除应用
    deleteApp() {

    }

}

module.exports = new ApplicationService();
