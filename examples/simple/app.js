var app = require('koa')()
  , kow = require('../..')
  ;

kow(app);

app.listen(3030);