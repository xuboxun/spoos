const ObjectModel = require('../model/Object.model');
const response = require('../utils/response');
const { ListFormat } = require('../utils/format');
const CONF = require('../../config');
const log = require('../utils/log');

class ObjectService {
    getObjectByKey() {

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
    createObject() {

    }
    updateObject() {

    }
    deleteObject() {

    }
}

module.exports = new ObjectService();
