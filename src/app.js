const Koa = require('koa');
const mount = require('koa-mount');
const session = require('koa-session');
const client = require('./client');
const api = require('./api');

const app = new Koa();

app.keys = ['spoos keys'];
const SessionConfig = {
    key: 'spoos:session',
    maxAge: 86400000,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
};

app.use(session(SessionConfig, app));

app.use(mount('/client', client));
app.use(mount('/', api));


module.exports = app;
