const ObjectModel = require('../model/Object.model');
const CONF = require('../../config');
const log = require('../utils/log');

class ObjectService {
    async getTheObject(appKey, objectKey) {
        return await ObjectModel.findOne({
            where: {
                appKey: appKey,
                objectKey: objectKey,
                status: 1
            }
        }).catch(err => {
            log(err);
            return null;
        });
    }
    async getAllObjectList(query = { pageSize: 50, pageNum: 1 }) {
        return await ObjectModel.findAndCountAll({
            where: {
                status: 1
            },
            offset: (query.pageNum - 1) * query.pageSize,
            limit: +query.pageSize
        }).catch(err => {
            log(err);
            return null;
        });
    }
    async getObjectsByAppkey(query = {}) {
        const appKey = query.appKey;
        const pageSize = query.pageSize || 50;
        const pageNum = query.pageNum || 1;
        return await ObjectModel.findAndCountAll({
            where: {
                appKey,
                status: 1
            },
            order: [['createTime', 'DESC']],
            offset: (pageNum - 1) * pageSize,
            limit: +pageSize
        }).catch(err => {
            log(err);
            return null;
        });
    }
    async createObject(object) {
        return await ObjectModel.create(object).catch(err => {
            log(err);
            return null;
        });
    }
    updateObject() {

    }
    deleteObject() {

    }
}

module.exports = new ObjectService();
