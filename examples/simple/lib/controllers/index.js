exports.index = function(ctx) {
  if (ctx.query.exports) {
    ctx.body = exports.ctrl() === exports.ctrl('index');
  } else {
    ctx.body = 'Hello World!';
  }
};

exports.create = function(ctx) {
  ctx.body = ctx.ctrl() === exports;
};
