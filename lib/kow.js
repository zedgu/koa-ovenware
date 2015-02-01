var Ovenware = require('ovenware');
var Router = require('koa-router');
var debug = require('debug')('koa-ovenware');

var ow = Ovenware.prototype;

ow.middleware = function() {
  var ow = this;
  var app = this.app;
  var context = app.context;
  var router = new Router(app);

  app.use(router.middleware());

  function getObj(obj) {
    return function(name) {
      name = name || router.match(this.path)[0].route.name;
      return ow[obj][name.toLowerCase()];
    };
  }
  context.ctrl = getObj('ctrls');
  context.model = getObj('models');
};

ow.route = function(method, name, path, handler, handlerName) {
  debug('Route Added:  %s %s - [%s] -> %s', method.toUpperCase(), path, name, handlerName);

  this.app[method](name, path, this.preprocess(handler));
};

module.exports = Kow;

function Kow(app, options) {
  return new Ovenware(app, options);
}