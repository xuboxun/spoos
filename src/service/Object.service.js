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
    async getObjectList(query = { pageSize: 50, pageNum: 1 }) {
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
