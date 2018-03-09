'use strict';

exports.__esModule = true;
exports.default = scopedHandler;

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _scopeId = require('./scope-id');

var _scopeId2 = _interopRequireDefault(_scopeId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scopedHandler(id, content) {
  return (0, _postcss2.default)([(0, _scopeId2.default)(id)]).process(content).then(function (result) {
    return result.css;
  }).catch(function (e) {
    return Promise.reject(e);
  });
}