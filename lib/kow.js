const Ovenware = require('ovenware');
const Router = require('koa-router');
const debug = require('debug')('koa-ovenware');

const ow = Ovenware.prototype;

ow.middleware = function() {
  let ow = this;
  let app = this.app;
  let context = app.context;
  let router = new Router(app);

  // koa-router 5.x no longer support app[method];
  this.router = app.get ? app : router;

  app.use(router.middleware());
  // app.use(router.routes());
  // app.use(router.allowedMethods());

  function getObj(obj) {
    return function(name) {
      // koa-router 3.x return x.router.name;
      // koa-router 4.x return x.name;
      // koa-router 5.x return x.path[i].name;
      name = name || (
        router.match(this.path).path ?
          router.match(this.path).path[0].name :
          (router.match(this.path)[0].name || router.match(this.path)[0].route.name)
        );
      return ow[obj][name.toLowerCase()];
    };
  }
  context.ctrl = getObj('ctrls');
  context.model = getObj('models');
};

ow.route = function(method, name, path, handler, handlerName) {
  debug('Route Added:  %s %s - [%s] -> %s', method.toUpperCase(), path, name, handlerName);

  this.router[method](name, path, this.preprocess(handler, path, name));
};

module.exports = Ovenware;
