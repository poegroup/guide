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

var quotes;

server.get('/', function(req, res, next) {
  res.redirect('/index.jade');
});

// parse and load quotes
server.use(function(req, res, next) {
  if (typeof quotes === 'object') return next();
  fs.readFile('./quotes.yaml', 'utf8', function(err, res) {
    if (err) return console.error(err);
    parse(yaml.safeLoad(res), null, function(err, output) {
      if (err) console.error(err);
      quotes = output;
      next();
    });
  })
});

// get one random quote
function q(){return quotes[Math.floor(Math.random()*quotes.length)]};

// get a random quote
server.use(function(req, res, next) {
  res.locals.quotes = [q()];
  next();
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
      str = fn({
        quotes: res.locals.quotes,
        'app.js': require('./raw/app.js')(),
        '.env': require('./raw/.env')(),
        '.foreman': require('./raw/.foreman')(),
        'Makefile': require('./raw/Makefile')(),
        'Procfile.dev': require('./raw/Procfile.dev')(),
        'index.js': require('./raw/public/javascripts/index.js')(),
        'routes.js': require('./raw/public/javascripts/routes.js')(),
        'header.jade': require('./raw/public/partials/header.jade')(),
        'index.jade': require('./raw/public/partials/index.jade')(),
        'index.styl': require('./raw/public/stylesheets/index.styl')(),
        'ie-fixes.jade': require('./raw/build/ie-fixes.jade')(),
        'package.json': JSON.stringify(require('./raw/package.json'), null, '  '),
        'component.json': JSON.stringify(require('./raw/component.json'), null, '  ')
      });
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

function parse(obj, opts, fn) {
  return fn(null, obj);
}
