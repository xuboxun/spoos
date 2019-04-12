const response = require('./response');

const authPath = [
    '/application/checkName',
    '/application/create',
    '/application/list',
    '/application/detail/:appId',
    '/application/objects/:appId',
    '/application/:appId',
    '/object/list'
];

async function auth(ctx, next) {
    // todo: method校验
    const { url, method } = ctx;
    const needAuth = authPath.find(path => {
        if (url.indexOf(path) > -1) {
            return true;
        }
        return false;
    });
    if (needAuth) {
        console.log(`need auth: ${url}`);
        const authRes = !!ctx.session.account;
        if (!authRes) {
            ctx.body = response(401, 'unauthorized', null)
            return false;
        }
    }
    await next();
}


module.exports = auth;
