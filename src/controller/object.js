const send = require('koa-send');
const ObjectService = require('../service/Object.service');
const ApplicationService = require('../service/Application.service');
const response = require('../utils/response');
const { ListFormat } = require('../utils/format');
const { saveFile } = require('../utils/file');
const generateKey = require('../utils/generateKey');
const CONF = require('../../config');

class ObjectController {
    async get(ctx) {
        const { appKey, objectKey } = ctx.params;

        const application = await ApplicationService.getAppByKey(appKey);
        if (!application) {
            ctx.body = response(400, 'application does not exist');
            return false;
        }

        const object = await ObjectService.getTheObject(appKey, objectKey);
        if (!object) {
            ctx.body = response(400, 'object does not exist');
            return false;
        }

        const path = `${appKey}/${object.objectName}`;
        await send(ctx, path, {
            root: CONF.storeDir
        });
    }

    async listAll(ctx) {
        const { pageSize, pageNum } = ctx.request.query;
        const find = await ObjectService.getAllObjectList({
            pageSize,
            pageNum
        });
        ctx.body = response(200, 'ok', ListFormat(find));
    }

    async post(ctx) {
        const { origin } = ctx.request;
        const { appKey } = ctx.params;
        const { appSecret } = ctx.request.body;
        const files = ctx.request.files.files;

        if (!appKey || !appSecret || !files) {
            ctx.body = response(400, 'request error');
            return false;
        }

        // 检测appKey是否存在且和appSecret是否匹配
        const check = await ApplicationService.checkAppKeySecret(appKey, appSecret);
        if (!check) {
            ctx.body = response(400, 'appKey and appSecret not match');
            return false;
        }

        // 构建新object
        const key = generateKey();
        const name = files.name.replace(/(.*)\.([a-zA-Z0-9]+)$/g, '$1');
        const ext = files.name.replace(/(.*)\.([a-zA-Z0-9]+)$/g, '$2');
        const object = {
            appKey: appKey,
            objectKey: key,
            objectName: `${key}.${ext}`,
            sourceName: name,
            type: files.type,
            size: files.size,
            hash: files.hash,
            status: 1,
            createTime: +(new Date()),
            updateTime: null
        };

        // 存文件
        const newPath = `${appKey}/${object.objectName}`;
        const saveRes = saveFile(files, newPath);
        if (!saveRes) {
            ctx.body = response(500, 'save file failed', null);
            return false;
        }

        // 写入数据库
        const dbRes = await ObjectService.createObject(object);
        if (!dbRes) {
            ctx.body = response(500, 'create failed');
            return false;
        }
        const res = {
            object: dbRes,
            apiPath: `${origin}/api/object/${appKey}/${object.objectKey}`,
            nginxPath: CONF.pluginNginx ? `${CONF.domain}/${appKey}/${object.objectName}` : undefined
        };
        ctx.body = response(200, 'ok', res);
    }

    put(ctx, next) {

    }

    delete(ctx, next) {

    }
}

module.exports = new ObjectController();

