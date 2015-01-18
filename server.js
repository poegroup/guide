/**
 * Module dependencies.
 */

var path = require('path');
var stylus = require('stylus');
var jade = require('jade');
var fs = require('fs');
var url = require('url');
var ecstatic = require('ecstatic');
var yaml = require('js-yaml');
var utils = require('./lib/utils');
var md = require('marked');
var is = require('is');

var server = require('express')();

var locals;
var pending = 0;

var renderers = {
  markdown: md,
  text: function(a, fn) { fn(null, a) }
}

function parse(obj, opts, fn) {
  return fn(null, obj);
}


server.use(function(req, res, next) {
  if (typeof locals === 'object') return next();
  fs.readFile('./locals.yaml', 'utf8', function(err, res) {
    if (err) return console.error(err);
    parse(yaml.safeLoad(res), null, function(err, output) {
      if (err) console.error(err);
      locals = output;
      console.log(JSON.stringify(locals, null, '  '));
      next();
    });
  })
});

// stylus
server.use(function(req, res, next){
  req.url = req.url.replace(/\.styl$/, '.css');
  next();
});

// jade
server.use(function(req, res, next){
  if (!req.url.match(/\.jade$/)) return next();
  var file = path.join(__dirname, url.parse(req.url).pathname);
  fs.readFile(file, 'utf8', function(err, str){
    if (err) return next(err);
    try {
      var fn = jade.compile(str, { filename: file, pretty: true });
      str = fn(locals);
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('Content-Length', Buffer.byteLength(str));
      res.end(str);
    } catch (err) {
      next(err);
    }
  });
});

// stylus
server.use(stylus.middleware({ src: __dirname }));

// CORS access for files
server.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept, x-csrf-token, origin');
  if ('OPTIONS' == req.method) return res.end();
  next();
});

// static files
server.use(ecstatic({root: __dirname}));

// start the server
var port = process.env.PORT || 3000;
server.listen(port, function () {
  console.log('\033[90mserving \033[36m%s\033[90m on port \033[96m%d\033[0m', __dirname, port);
});
