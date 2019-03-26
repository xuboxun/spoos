const response = require('../utils/response');
const ApplicationService = require('../service/Application.service');
const { ListFormat } = require('../utils/format');
const CONF = require('../../config');
const log = require('../utils/log');

class ApplicationController {
    async create(ctx) {
        const { appName, appInfo } = ctx.request.body;
        if (!appName) {
            ctx.body = response(400, 'appName cannot be null', null);
            return false;
        }
        const nameExist = await ApplicationService.isNameExist(appName);
        if (nameExist) {
            ctx.body = response(400, 'appName exist', null);
            return false;
        }
        const res = await ApplicationService.createApp({
            appName,
            appInfo
        });
        if (!res) {
            ctx.body = response(500, 'create failed', res);
        } else {
            // todo: 创建应用目录
            ctx.body = response(200, 'success', res);
        }
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

    async delete(ctx) {
        const { appKey } = ctx.params;
        if (!appKey) {
            ctx.body = response(400, 'appKey cannot be null', null);
            return false;
        }
        const res = await ApplicationService.deleteApp(appKey);
        if (!res || !res[0]) {
            ctx.body = response(500, 'delete failed', null);
        } else {
            ctx.body = response(200, 'success', true);
        }

    }
}

module.exports = new ApplicationController();
