exports.index = function *() {
  if (this.query.exports) {
    this.body = exports.ctrl() === exports.ctrl('index');
  } else {
    this.body = 'Hello World!';
  }
};

exports.create = function *() {
  this.body = this.ctrl() === exports;
};
