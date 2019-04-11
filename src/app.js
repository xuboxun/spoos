const Koa = require('koa');
const mount = require('koa-mount');
const client = require('./client');
const api = require('./api');

const app = new Koa();
app.use(mount('/client', client));
app.use(mount('/api', api));


module.exports = app;
