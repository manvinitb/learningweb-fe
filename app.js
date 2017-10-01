'use strict';

let express = require('express');

let UTIL = require('util'),
  PATH = require('path'),
  HTTP = require('http'),
  BODYPARSER = require('body-parser'),
  COOKIEPARSER = require('cookie-parser'),
  ROUTES = require('./routes'),
  _ = require('lodash'),
  APP = express(),

  PORT = _.get(process, 'env.PORT', 5000);

_.set(HTTP, 'globalAgent.maxSockets', 1000);

let FAVICON = require('serve-favicon');

//configuring middleware
APP.use(FAVICON(PATH.join(__dirname, 'public', 'favicon.png')));

APP.use(BODYPARSER.json());
APP.use(BODYPARSER.urlencoded({
  extended: false
}));

APP.use(COOKIEPARSER());

let bunyanLogger = require('bunyan').createLogger({
  name: 'myapp'
});

var logger = function (req, res, next) {
  req.log = bunyanLogger;
  next();
};

APP.use(logger);

ROUTES(APP);

APP.listen(PORT, function () {
  console.log('Example app listening on port '+ PORT);
});