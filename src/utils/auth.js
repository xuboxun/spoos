const response = require('./response');

const authPath = [
    'GET /application/checkName',
    'GET /application/list',
    'GET /application/detail/',
    'GET /application/objects/',
    'POST /application/create',
    'DELETE /application/',
    'GET /object/list'
].map(item  => {
    return item.replace(/\s+/g, ' ');
});

async function auth(ctx, next) {
    const { url, method } = ctx;

    const needAuth = authPath.find(path => {
        const authMethod = path.split(' ')[0].toUpperCase();
        const authUrl = path.split(' ')[1];

        if (method === authMethod && url.indexOf(authUrl) === 0) {
            return true;
        }
        return false;
    });
    if (needAuth) {
        console.log(`need auth: ${url}`);
        const authRes = !!ctx.session.account;
        if (!authRes) {
            ctx.body = response(401, 'unauthorized', null);
            return false;
        }
    }
    await next();
}


module.exports = auth;
