var parser = require('co-body');

exports.index = function *() {
  this.body = this.model().index();
};
exports.get = function *() {
  this.body = this.model().get(this.params.id);
};
exports.create = function *() {
  var body = yield parser(this.req);

  this.body = this.model().create('post', body['post']);
};
