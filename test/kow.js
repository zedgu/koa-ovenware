var app = require('koa')();
var Kow = require('..');

describe('Kow Testing', function(){
  describe('Kow(app, {root: "./examples/simple/lib"})', function() {
    var kow = Kow(app, {root: './examples/simple/lib'});
    it('should be set with new root path "./examples/simple/lib"', function() {
      kow.conf.root.should.eql("./examples/simple/lib");
    });
    it('should get items model of kow.models', function() {
      kow.models.items.should.be.an.Object;
    });
    it('should load all models', function() {
      kow.models.should.have.properties(['users/oauth', 'items', 'categories']);
    });
  });
  describe('#setting()', function() {
    it('should return an object, no matter what type param you put', function() {
      Kow(app, null).conf.should.be.an.Object;
      Kow(app, '').conf.should.be.an.Object;
      Kow(app, undefined).conf.should.be.an.Object;
      Kow(app, false).conf.should.be.an.Object;
      Kow(app, function(){}).conf.should.be.an.Object;    
    });
    it('should always have properties ["root", "ctrl", "model", "routes", "aliases"]', function() {
      Kow(app, null).conf.should.have.properties(["root", "ctrl", "model", "routes", "aliases"]);
    });
    it('should get correct format and other defaultSetting', function() {
      Kow(app, {root: 'a', ctrl: 'b', model: 'c'}).conf.should.have.properties({
        root: 'a',
        ctrl: 'b',
        model: 'c',
        routes: {
          'index': {
            method: 'get',
            path: ''
          },
          'create': {
            method: 'post',
            path: ''
          },
          'get': {
            method: 'get',
            path: '/:id'
          },
          'update': {
            method: 'put',
            path: '/:id'
          },
          'del': {
            method: 'delete',
            path: '/:id'
          }
        },
        aliases: {
          index: ''
        },
        prefix: '/'
      });
    });
  });
  describe('#load()', function() {
    it('should load dirpath which is not exist with no err and return an object {}', function() {
      Kow(app, {root: 'a', ctrl: 'b'}).ctrls.should.eql({}, 'need {}');
    });
    it('should load files in sub dirs', function() {
      Kow(app, {root: './examples/simple/lib'}).ctrls.should.have.properties(['index', 'items', 'users/oauth', 'users/info/mail']);
    });
  });
});
