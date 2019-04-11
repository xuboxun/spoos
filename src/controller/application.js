const response = require('../utils/response');
const ApplicationService = require('../service/Application.service');
const ObjectService = require('../service/Object.service');
const { ListFormat } = require('../utils/format');
const { createAppDir } = require('../utils/file');
const log = require('../utils/log');

class ApplicationController {
    async create(ctx) {
        const { appName, appInfo } = ctx.request.body;
        if (!appName) {
            ctx.body = response(400, 'appName cannot be null');
            return false;
        }
        const nameExist = await ApplicationService.isNameExist(appName);
        if (nameExist) {
            ctx.body = response(400, 'appName exist');
            return false;
        }
        const res = await ApplicationService.createApp({
            appName,
            appInfo
        });
        if (!res) {
            ctx.body = response(500, 'create failed');
            return false;
        }
        const mkdirRes = createAppDir(res.appKey);
        if (!mkdirRes) {
            ctx.body = response(500, 'create app dir error');
            return false;
        }
        ctx.body = response(200, 'success', res);
    }

    async checkName(ctx) {
        const { appName } = ctx.request.query;
        const exist = await ApplicationService.isNameExist(appName);
        ctx.body = response(200, 'ok', exist);
    }

    async list(ctx) {
        const { pageSize, pageNum } = ctx.request.query;
        const find = await ApplicationService.getAppList({
            pageSize,
            pageNum
        });
        ctx.body = response(200, 'ok', ListFormat(find));
    }

    async detail(ctx) {
        const { appId } = ctx.params;

        if (!appId) {
            ctx.body = response(400, 'appId cannot be null', null);
            return false;
        }

        const application = await ApplicationService.getAppById(appId);
        if (!application) {
            ctx.body = response(400, 'application does not exist');
            return false;
        }
        ctx.body = response(200, 'success', application);
    }

    async listObjects(ctx) {
        const { appId } = ctx.params;
        const { pageSize, pageNum } = ctx.request.query;

        if (!appId) {
            ctx.body = response(400, 'appId cannot be null', null);
            return false;
        }

        const application = await ApplicationService.getAppById(appId);
        if (!application) {
            ctx.body = response(400, 'application does not exist');
            return false;
        }

        const find = await ObjectService.getObjectsByAppkey({
            appKey: application.appKey,
            pageSize,
            pageNum
        });
        ctx.body = response(200, 'ok', ListFormat(find));
    }

    async delete(ctx) {
        const { appId } = ctx.params;
        if (!appId) {
            ctx.body = response(400, 'appId cannot be null', null);
            return false;
        }
        const res = await ApplicationService.deleteApp(appId);
        if (!res || !res[0]) {
            ctx.body = response(500, 'delete failed', null);
        } else {
            ctx.body = response(200, 'success', true);
        }

    }
}

module.exports = new ApplicationController();
