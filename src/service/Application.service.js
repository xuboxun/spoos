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
    async getAppById(appId) {
        return await ApplicationModel.findOne({
            where: {
                appId: appId,
            }
        }).catch(err => {
            log(err);
            return null;
        });
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
    async checkAppKeySecret(appKey, appSecret) {
        return await ApplicationModel.findOne({
            where: {
                appKey: appKey,
                appSecret: appSecret,
                status: 1
            }
        }).catch(err => {
            log(err);
            return null;
        });
    }
    async getAppList(query) {
        const pageSize = query.pageSize || 10;
        const pageNum = query.pageNum || 1;
        return await ApplicationModel.findAndCountAll({
            // where: {
            //     status: 1
            // },
            attributes: {
                exclude: ['appSecret']
            },
            offset: (pageNum - 1) * pageSize,
            limit: +pageSize
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
    async deleteApp(appId) {
        return await ApplicationModel.update({
            status: 0
        }, {
            where: {
                appId: appId,
                status: 1
            }
        }).catch(err => {
            log(err);
            return null;
        });
    }

}

module.exports = new ApplicationService();
