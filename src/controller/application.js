const response = require('../utils/response');


class ApplicationController {
    apply(ctx) {
        console.log(ctx.request.body);
        ctx.body = response(200, 'success', {});
    }

    approve(ctx, next) {

    }

    checkName(ctx, next) {

    }

    list(ctx, next) {

    }
}

module.exports = new ApplicationController();
