const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');
const ApplicationModel = require('../model/Application.model');
const log = require('../utils/log');
const generateKey = require('../utils/generateKey');


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
                appKey: appKey,
                status: 1
            }
        }).catch(err => {
            log(err);
            return null;
        });
    }
    async getAppList(query = { pageSize: 10, pageNum: 1 }) {
        return await ApplicationModel.findAndCountAll({
            where: {
                status: 1
            },
            attributes: {
                exclude: ['appSecret']
            },
            offset: (query.pageNum - 1) * query.pageSize,
            limit: +query.pageSize
        }).catch(err => {
            log(err);
            return null;
        });
    }
    // 新增应用
    async createApp(payload) {
        const application = {
            appName: payload.appName,
            appInfo: payload.appInfo,
            appKey: generateKey(),
            appSecret: generateKey(),
            status: 1,
            createTime: +(new Date()),
            updateTime: null
        };
        return await ApplicationModel.create(application).catch(err => {
            log(err);
            return null;
        })
    }
    // 更新应用
    updateApp() {

    }
    // 删除应用，不从数据库删除，仅置status为0
    async deleteApp(appKey) {
        return await ApplicationModel.update({
            status: 0
        }, {
            where: {
                appKey: appKey,
                status: 1
            }
        }).catch(err => {
            log(err);
            return null;
        });
    }

}

module.exports = new ApplicationService();
