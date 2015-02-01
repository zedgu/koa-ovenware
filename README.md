Koa-Ovenware
=======

[![NPM version][npm-image]][npm-url] 
[![build status][travis-image]][travis-url] 
[![Test coverage][coveralls-image]][coveralls-url]
[![NPM Monthly Downloads][npm-download]][npm-url]
[![Dependencies][david-image]][david-url]
[![License][license-image]][license-url]
[![Tips][tips-image]][tips-url]

Automatic Model / Controller Loader for Koa

* Write a controller and get all route pattern you want.
* Compatible with other middlewares including view renders.

Install
-------
```sh
npm install koa-ovenware --save
```

Simple Usage
------------
####Require...
```js
var kow = require('koa-ovenware');
```

####Config...
```js
kow(app);
```

####Controller file
Default path of controllers: ./lib/controllers/

in index.js:
```js
exports.index = function *() {
  this.body = 'hello koa';
};
```
Checkout the [examples](https://github.com/zedgu/koa-ovenware/tree/master/examples).

Conventions
-----------

####Action Mapping
```
route           http method    function of ctrl
:resource       get            index
:resource       post           create
:resource/:id   get            get
:resource/:id   put            update
:resource/:id   del            del
```
All routes can be customized by setting, see [Default values](#default-values); and also can be changed by controller api singly, see [APIs - Routes](#routes).

####Resource
Resource name will be the file name of the controller, if there is no alias set for the controller, see [APIs - Alias](#alias).

APIs
----
####Options
```js
kow(app[, options])
```
`options` see [Default values](#default-values)

####Controller APIs
#####Alias
Set alias for the controller.

```js
exports.alias = 'name_you_want';
```

#####Routes
Set routes for the controller.

```js
exports.routes = {
  entry: {
    method: 'get',
    path: '/index'
  }
};
```

#####Model
Get model object.

```js
/**
 * get model object by given controller file name
 *
 * @param   {String}   modelName   optional, undefined for the model has
 *                                 the the same name as this controller
 * @return  {Object}               model object
 */
this.model([modelName])
exports.model([modelName])
```

for exmample:

```js
exports.get = function *() {
  this.model('abc');
};
// or
exports.todo = function() {
  this.model(); // this === exports
};
```

#####Ctrl
Get controller object.

```js
/**
 * get ctrl object by given controller file name
 *
 * @param   {String}   ctrlName   optional, undefined for self
 * @return  {Object}              ctrl object
 */
this.ctrl([ctrlName])
exports.ctrl([ctrlName])
```

for exmample:

```js
exports.get = function *() {
  this.ctrl(); // => return this exports
};
// or
exports.todo = function() {
  exports.ctrl('abc');
};
```

Global configuration
--------------------
####Default values
```js
{
  root: './lib',        // root dir
  ctrl: 'controllers',  // controllers dir
  model: 'models'       // model dir
  format: 'json',       // format by default
  prefix: '/',          // String or RegExp
  aliases: {
    'index': ''
  },
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
      method: 'del',
      path: '/:id'
    }
  }
}
```

License
-------
MIT

[npm-image]: https://img.shields.io/npm/v/koa-ovenware.svg?style=flat-square
[npm-url]: https://npmjs.org/package/koa-ovenware
[travis-image]: https://img.shields.io/travis/zedgu/koa-ovenware.svg?style=flat-square
[travis-url]: https://travis-ci.org/zedgu/koa-ovenware
[coveralls-image]: https://img.shields.io/coveralls/zedgu/koa-ovenware.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/zedgu/koa-ovenware?branch=master
[david-image]: http://img.shields.io/david/zedgu/koa-ovenware.svg?style=flat-square
[david-url]: https://david-dm.org/zedgu/koa-ovenware
[npm-status]: https://nodei.co/npm/koa-ovenware.png?downloads=true
[npm-status-url]: https://nodei.co/npm/koa-ovenware/
[license-image]: http://img.shields.io/npm/l/koa-ovenware.svg?style=flat-square
[license-url]: https://github.com/zedgu/koa-ovenware/blob/master/LICENSE
[npm-download]: http://img.shields.io/npm/dm/koa-ovenware.svg?style=flat-square
[tips-image]: http://img.shields.io/gittip/zedgu.svg?style=flat-square
[tips-url]: https://www.gittip.com/zedgu/