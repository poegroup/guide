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

var app = require('express')();

var quotes;

// load quotes
app.use(function(req, res, next) {
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

// get random quotes
app.use(function(req, res, next) {
  // only one for now
  res.locals.quotes = [q()];
  next();
});

// stylus
// app.use(function(req, res, next){
//   req.url = req.url.replace(/\.styl$/, '.css');
// });

app.use(function(req, res, next){
  app.use(stylus.middleware({ src: __dirname }));
  next();
});

// local files as strings
var locals = {
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
  'package.json': JSON.stringify(require('./raw/package.json'), null, '  '),
  'component.json': JSON.stringify(require('./raw/component.json'), null, '  ')
};

// jade
app.use(function(req, res, next){
  if (req.url !== '/' && !req.url.match(/\.jade$/)) return next();
  var file = path.join(__dirname, 'index.jade');
  fs.readFile(file, 'utf8', function(err, str){
    if (err) return next(err);
    try {
      var fn = jade.compile(str, { filename: file, pretty: true });
      locals.quotes = res.locals.quotes;
      str = fn(locals);
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('Content-Length', Buffer.byteLength(str));
      res.end(str);
    } catch (err) {
      next(err);
    }
  });
});

// static files
app.use(ecstatic({root: __dirname}));

function parse(obj, opts, fn) {
  return fn(null, obj);
}

module.exports = app;
