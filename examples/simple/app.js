const koa = require('koa');
const app = new koa();
const kow = require('../..');

kow(app);

app.listen(3030);