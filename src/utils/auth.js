const response = require('./response');

const authPath = [
    '/api/application/apply',
    '/api/application/approve',
    '/api/application/list',
    '/api/object/list'
];

async function auth(ctx, next) {
    const { url, method } = ctx;
    if (authPath.indexOf(url) > -1) {
        console.log(`need auth: ${url}`);
        // todo: auth校验
        const authRes = false;
        if (!authRes) {
            ctx.body = response(401, 'unauthorized', null)
            return false;
        }
    }
    next();
}


module.exports = auth;
