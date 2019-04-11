/*
* 客户端
* */

const Koa = require('koa');
const path = require('path');
const serve = require('koa-static');
const historyApiFallback = require('koa2-history-api-fallback');


const client = new Koa();

client.use(historyApiFallback());


const clientPath = path.resolve(__dirname, '../client/build');
client.use(
    serve(clientPath)
);


module.exports = client;
