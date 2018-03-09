'use strict';

exports.__esModule = true;
exports.default = handler;

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rpxConvert = _postcss2.default.plugin('rpx-convert', function () {
  return function (root) {
    root.walkDecls(function (decl, i) {
      if (decl.parent.selector === 'page') {
        decl.parent.selector = 'body';
      }
      if (decl.value.indexOf('px') === -1) {
        return;
      }
      var value = decl.value.replace(/"[^"]+"|'[^']+'|url\([^\)]+\)|(\d*\.?\d+)rpx/ig, function (m, $1) {
        if (!$1) {
          return m;
        }
        var pixels = parseFloat($1);
        var fixedVal = pixels / 2;
        return fixedVal === 0 ? '0' : fixedVal + 'px';
      });
      decl.value = value;
    });
  };
});

function handler(content, cb) {
  return (0, _postcss2.default)(rpxConvert()).process(content).css;
}