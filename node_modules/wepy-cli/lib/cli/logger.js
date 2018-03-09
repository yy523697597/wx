'use strict';

exports.__esModule = true;
exports.success = exports.fatal = exports.log = undefined;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _util = require('util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefix = '   wepy-cli';
var sep = _chalk2.default.gray('·');

var log = exports.log = function log() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var msg = _util.format.apply(_util.format, args);
  console.log(_chalk2.default.white(prefix), sep, msg);
};

var fatal = exports.fatal = function fatal() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  if (args[0] instanceof Error) args[0] = args[0].message.trim();
  var msg = _util.format.apply(_util.format, args);
  console.error(_chalk2.default.red(prefix), sep, msg);
  process.exit(1);
};

var success = exports.success = function success() {
  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  var msg = _util.format.apply(_util.format, args);
  console.log(_chalk2.default.white(prefix), sep, msg);
};