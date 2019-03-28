const send = require('koa-send');
const ObjectService = require('../service/Object.service');
const response = require('../utils/response');
const { ListFormat } = require('../utils/format');
const { saveFile } = require('../utils/file');
const generateKey = require('../utils/generateKey');
const CONF = require('../../config');

class ObjectController {
    async get(ctx, next) {
        const { appKey, objectKey } = ctx.params;
        const objectPath = `${appKey}/${objectKey}`;
        console.log(objectPath);
        await send(ctx, objectPath, {
            root: CONF.store_dir
        });
    }

    async list(ctx) {
        const { pageSize, pageNum } = ctx.request.query;
        const find = await ObjectService.getObjectList({
            pageSize,
            pageNum
        });
        ctx.body = response(200, 'ok', ListFormat(find));
    }

    async post(ctx) {
        const { appKey } = ctx.params;
        const { appSecret } = ctx.request.body;
        const files = ctx.request.files.files;
        console.log(appKey, appSecret);
        console.log(files);

        // todo: 检测appKey是否存在且和appSecret是否匹配
        const key = generateKey();
        const ext = files.name.replace(/(\S*)\.([a-zA-Z0-9]+)$/g, '$2');
        const object = {
            objectKey: `${key}.${ext}`,
            objectType: files.type,
            objectName: files.name,
            objectSize: files.size,
            hash: files.hash,
            status: 1,
            createTime: +(new Date()),
            updateTime: null
        };
        const newPath = `${appKey}/${object.objectKey}`;
        const saveRes = saveFile(files, newPath);
        if (!saveRes) {
            ctx.body = response(500, 'save file failed', null);
        }

        // todo: 写数据库

        ctx.body = response(200, 'ok', object);
    }

    put(ctx, next) {

    }

    delete(ctx, next) {

    }
}

module.exports = new ObjectController();

