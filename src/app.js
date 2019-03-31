const Koa = require('koa');
const koaBody = require('koa-body');
const router = require('./router');
const auth = require('./utils/auth');
const response = require('./utils/response');
const CONF = require('../config');

const app = new Koa();

// logger
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

app
    .use(koaBody({
        multipart: true,
        formidable: {
            maxFileSize: CONF.maxFileSize || 10 * 1024 * 1024,
            multiples: true,
            uploadDir: `${CONF.storeDir}/.tmp`,
            keepExtensions: true,
            hash: 'md5'
        }
    }))
    .use(auth)
    .use(router.routes())
    .use(router.allowedMethods());

app.use(async (ctx, next) => {
    ctx.body = response(404, 'not found', null);
});


module.exports = app;
