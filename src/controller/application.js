const response = require('../utils/response');
const ApplicationService = require('../service/Application.service');
const log = require('../utils/log');
const { ListFormat } = require('../utils/format');

class ApplicationController {
    async apply(ctx) {
        const { appName, appInfo } = ctx.request.body;
        console.log(appName, appInfo);
        ctx.body = response(200, 'success', {});
    }

    approve(ctx, next) {

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
}

module.exports = new ApplicationController();
