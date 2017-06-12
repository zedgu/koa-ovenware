exports.alias = 'auth';
exports.routes = {
  entry: {
    method: 'get',
    path: '/index'
  },
  post: {
    method: 'post',
    path: '/'
  },
  get: {
    method: 'post',
    path: '/:id'
  }
}
exports.entry = function(ctx) {
  ctx.body = 'in sub dir';
};

exports.post = function(ctx) {
  ctx.body = exports.model().index();
};
exports.get = function(ctx) {
  ctx.body = exports.model('items').index();
}
