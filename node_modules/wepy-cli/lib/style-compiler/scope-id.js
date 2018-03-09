'use strict';

exports.__esModule = true;

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssSelectorParser = require('postcss-selector-parser');

var _postcssSelectorParser2 = _interopRequireDefault(_postcssSelectorParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _postcss2.default.plugin('add-id', function (id) {
    return function (root) {
        root.each(function rewriteSelector(node) {
            if (!node.selector) {
                if (node.type === 'atrule' && node.name === 'media') {
                    node.each(rewriteSelector);
                }
                return;
            }
            node.selector = (0, _postcssSelectorParser2.default)(function (selectors) {
                selectors.each(function (selector) {
                    var node = null;
                    selector.each(function (n) {
                        if (n.type !== 'pseudo') node = n;
                    });
                    selector.insertAfter(node, _postcssSelectorParser2.default.className({
                        value: id
                    }));
                });
            }).process(node.selector).result;
        });
    };
});