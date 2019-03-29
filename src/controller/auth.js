const md5 = require('md5');
const UserService = require('../service/User.service');
const response = require('../utils/response');

class AuthController {
    async auth(ctx) {
        const { account, password } = ctx.request.body;
        if (!account || !password) {
            ctx.body = response(400, 'account or password cannot be null');
            return false;
        }

        const md5Password = md5(password);
        const dbRes = await UserService.checkAccountPassword(account, md5Password);
        if (!dbRes) {
            ctx.body = response(200, 'auth failed', false);
            return false;
        }

        // todo: session or token
        ctx.body = response(200, 'success', true);
    }
}

module.exports = new AuthController();
