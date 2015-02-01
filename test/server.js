var agent = require('supertest');
var Kow = require('..');
var koa = require('koa');

describe('Controllers', function(){
  var app = koa();

  var kow = Kow(app, {root: './examples/simple/lib'});
  var request = agent(app.callback());

  describe('index', function() {
    describe('GET /', function() {
      it('should get "Hello World!"', function(done) {
        request
          .get('/')
          .expect(200)
          .expect('Hello World!', done);
      });
      it('should get the ctrl by API exports.ctrl(ctrlName)', function(done) {
        request
          .get('')
          .query({ exports: '1'} )
          .expect(200)
          .expect('true', done);
      });
    });
    describe('POST /', function() {
      it('should get the ctrl by API this.ctrl(ctrlName)', function(done) {
        request
          .post('')
          .expect(200)
          .expect('true', done);
      });
    });
  });
  describe('/Items', function() {
    var ctrlName = this.title;
    describe('GET ' + ctrlName, function() {
      it('should get the model data', function(done) {
        request
          .get(ctrlName)
          .expect(200)
          .end(function(err, res) {
            res.body.should.eql(kow.models.items.index());
            done(err);
          });
      });
    });
    describe('POST /' + ctrlName, function() {
      describe('send post:true', function() {
        it('should get the data created by the own function of API this.model()', function(done) {
          request
            .post(ctrlName)
            .send({ post: 'true' })
            .expect(200)
            .expect(/true/, done);
        });
      });
    });
    describe('GET /' + ctrlName + '/:id', function() {
      it('should get res.body.id = params.id', function(done) {
        request
          .get(ctrlName + '/a')
          .expect(200)
          .expect(/A/, done);
      });
    });
  });
  describe('/users', function() {
    var ctrlName = this.title;
    describe('/', function() {
      describe('handle sub dir as well', function() {
        it('should get res.body = "in users"', function(done) {
          request
            .get(ctrlName)
            .expect(200)
            .expect('in users', done);
        });
      });
    });
    describe('/auth', function() {
      describe('When API exports.alias is set', function() {
        it('should be responsed "in sub dir"', function(done) {
          request
            .get(ctrlName + '/auth/index')
            .expect(200)
            .expect('in sub dir', done);
        });
      });
      describe('POST /', function() {
        it('should get the data by API exports.model()', function(done) {
          request
            .post(ctrlName + '/auth/')
            .expect(200)
            .end(function(err, res) {
              res.body.should.eql(kow.models['users/oauth'].index());
              done(err);
            });
        });
      });
      describe('#post() POST /:id', function() {
        it('should get the data by API exports.model(modelName)', function(done) {
          request
            .post(ctrlName + '/auth/aa')
            .expect(200)
            .end(function(err, res) {
              res.body.should.eql(kow.models['items'].index());
              done(err);
            });
        });
      });
    });
    describe('/info', function() {
      describe('#index()', function() {
        it('should handle sub sub dir as well', function(done) {
          request
            .get(ctrlName + '/info/mail')
            .expect(200)
            .expect('in /users/info', done);
        });
      });
    });
  });
  describe('/*', function() {
    describe('When a path has no matching routes', function() {
      it('should get 404 status, GET', function(done) {
        request
          .get('/the/path/is/not/exist')
          .expect(404, done);
      });
      it('should get 404 status, POST', function(done) {
        request
          .post('/the/path/is/not/exist')
          .expect(404, done);
      });
    });
  });
});

describe('When the prefix is a RegExp', function() {
  describe('the url not match the prefixPattern', function() {
    it('should get 404 when get /', function(done) {
      var app = koa();
      var kow = Kow(app, {
          root: './examples/simple/lib',
          prefix: /api\/\d\.\d/
        });
      var request = agent(app.callback());
      request
        .get('')
        .expect(404, done);
    });
    it('should get 404 when get /*', function(done) {
      var app = koa();
      var kow = Kow(app, {
          root: './examples/simple/lib',
          prefix: /api\/\d\.\d/i
        });
      var request = agent(app.callback());
      request
        .get('/the/path/is/not/exist')
        .expect(404, done);
    });
  });
  describe('the url match the prefixPattern', function() {
    it('should get the response', function(done) {
      var app = koa();
      var kow = Kow(app, {
          root: './examples/simple/lib',
          prefix: /api\/\d\.\d/g
        });
      var request = agent(app.callback());
      request
        .get('/api/1.0/')
        .expect(200)
        .expect('Hello World!', done);
    });
  });
});

describe('When the prefix is a String', function() {
  var app = koa();
  var kow = Kow(app, {
      root: './examples/simple/lib',
      prefix: '/api/0.1'
    });
  var request = agent(app.callback());

  describe('the url match the prefix', function() {
    it('should get the response', function(done) {
      request
        .get('/api/0.1/')
        .expect(200)
        .expect('Hello World!', done);
    });
  });
});