const md5 = require('md5');
const UserService = require('../service/User.service');
const response = require('../utils/response');

class AuthController {
    async auth(ctx) {
        if (ctx.session.account) {
            const userInfo = {
                account: ctx.session.account
            };
            ctx.body = response(200, 'auth success', userInfo);
        } else {
            ctx.body = response(200, 'auth failed', false);
        }
    }

    async login(ctx) {
        const { account, password } = ctx.request.body;
        if (!account || !password) {
            ctx.body = response(400, 'account or password cannot be null');
            return false;
        }

        const md5Password = md5(password);
        const auth = UserService.checkAccountPassword(account, md5Password);
        if (!auth) {
            ctx.body = response(200, 'auth failed', false);
            return false;
        }

        ctx.session.account = auth.account;
        ctx.body = response(200, 'success', true);
    }

    async logout(ctx) {
        ctx.session.account = null;
        ctx.body = response(200, 'logout success', true);
    }
}

module.exports = new AuthController();
