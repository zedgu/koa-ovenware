var parser = require('co-body');

exports.index = function(ctx) {
  ctx.body = ctx.model().index();
};
exports.get = function(ctx) {
  ctx.body = ctx.model().get(ctx.params.id);
};
exports.create = async function(ctx) {
  var body = await parser(ctx.req);

  ctx.body = ctx.model().create('post', body['post']);
};
