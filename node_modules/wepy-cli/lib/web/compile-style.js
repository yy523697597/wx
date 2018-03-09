'use strict';

exports.__esModule = true;

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

var _loader = require('../loader');

var _loader2 = _interopRequireDefault(_loader);

var _rpxConvert = require('../style-compiler/rpx-convert');

var _rpxConvert2 = _interopRequireDefault(_rpxConvert);

var _scoped = require('../style-compiler/scoped');

var _scoped2 = _interopRequireDefault(_scoped);

var _modulemap = require('./modulemap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    compile: function compile(wpy) {
        var mmap = (0, _modulemap.getInstance)();
        var config = _util2.default.getConfig();

        var allPromises = [];
        wpy.style.forEach(function (style, i) {
            var lang = style.type || 'css';
            var content = style.code;
            var scoped = style.scoped;

            if (lang === 'scss') lang = 'sass';

            var compiler = _loader2.default.loadCompiler(lang);

            if (!compiler) {
                throw '\u672A\u53D1\u73B0\u76F8\u5173 ' + lang + ' \u7F16\u8BD1\u5668\u914D\u7F6E\uFF0C\u8BF7\u68C0\u67E5wepy.config.js\u6587\u4EF6\u3002';
            }

            allPromises.push(compiler(content, config.compilers[lang] || {}, style.src).then(function (css) {
                if (scoped) {
                    return (0, _scoped2.default)(wpy.moduleId, css).then(function (cssContent) {
                        var styleId = mmap.add(style.src + '-style', {
                            type: 'style',
                            source: wpy
                        });
                        wpy.style.id = styleId;
                        style.code = (0, _rpxConvert2.default)(cssContent);
                    });
                } else {
                    var styleId = mmap.add(style.src + '-style', {
                        type: 'style',
                        source: wpy
                    });
                    wpy.style.id = styleId;
                    style.code = (0, _rpxConvert2.default)(css);
                }
            }));
        });

        return Promise.all(allPromises);
    }
};