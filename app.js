/**
 * Module dependencies.
 */

var path = require('path');
var stylus = require('stylus');
var jade = require('jade');
var fs = require('fs');
var url = require('url');
var ecstatic = require('ecstatic');
var md = require('marked');

var app = require('express')();

var quotes = require('./pretty.json');

// local files as strings
var locals = {
  // 'quotes': require('./pretty.json'),
  '.env': require('./raw/.env')(),
  '.foreman': require('./raw/.foreman')(),
  'Makefile': require('./raw/Makefile')(),
  'Procfile.dev': require('./raw/Procfile.dev')(),
  'app.js': require('./raw/app.js')(),
  'header.jade': require('./raw/public/partials/header.jade')(),
  'index.jade': require('./raw/public/partials/index.jade')(),
  'index.js': require('./raw/public/javascripts/index.js')(),
  'index.styl': require('./raw/public/stylesheets/index.styl')(),
  'routes.js': require('./raw/public/javascripts/routes.js')(),
  'component.json': JSON.stringify(require('./raw/component.json'), null, '  '),
  'package.json': JSON.stringify(require('./raw/package.json'), null, '  ')
};

// stylus
app.use(function(req, res, next){
  req.url = req.url.replace(/\.styl$/, '.css');
  next();
});

app.use(function(req, res, next){
  app.use(stylus.middleware({ src: __dirname }));
  next();
});

// get random quotes
app.use(function(req, res, next) {
  locals.quotes = res.locals.quotes = randomQuote(100);
  next();
});

var fn;

// jade
app.use(function(req, res, next){
  // if (req.url !== '/' && !req.url.match(/\.jade$/)) return next();
  if (!req.url.match(/\.jade$/)) return next();
  var file = path.join(__dirname, 'index.jade');
  // if (typeof fn === 'function') return finish(res);
  fs.readFile(file, 'utf8', function(err, str){
    if (err) return next(err);
    try {
      fn = jade.compile(str, { filename: file, pretty: false });
      finish(res);
    } catch (err) {
      next(err);
    }
  });
});

// static files
app.use(ecstatic({root: __dirname}));

function finish(res) {
  var str = fn(locals);
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(str));
  res.setHeader('Content-Type', 'text/html');
  res.end(str);
}

function randomQuote(l){
  var arr = [];
  for (var i = 0; i < l; i++) {
    arr[i] = quotes[Math.floor(Math.random()*quotes.length)];
  }
  return arr;
}


module.exports = app;
