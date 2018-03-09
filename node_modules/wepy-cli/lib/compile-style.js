'use strict';

exports.__esModule = true;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

var _loader = require('./loader');

var _loader2 = _interopRequireDefault(_loader);

var _resolve = require('./resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _scoped = require('./style-compiler/scoped');

var _scoped2 = _interopRequireDefault(_scoped);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LANG_MAP = {
    'less': '.less',
    'sass': '.sass;.scss'
};

exports.default = {
    compile: function compile(styles, requires, opath, moduleId) {
        var config = _util2.default.getConfig();
        var src = _cache2.default.getSrc();
        var dist = _cache2.default.getDist();
        var ext = _cache2.default.getExt();
        var isNPM = false;

        var outputExt = config.output === 'ant' ? 'acss' : 'wxss';

        if (typeof styles === 'string') {
            opath = requires;
            requires = [];
            moduleId = '';
            styles = [{
                type: styles,
                scoped: false,
                code: _util2.default.readFile(_path2.default.join(opath.dir, opath.base)) || ''
            }];
        }
        var allPromises = [];

        styles.forEach(function (style) {
            var lang = style.type || 'css';
            var content = style.code;
            var scoped = style.scoped;
            var filepath = style.src ? style.src : _path2.default.join(opath.dir, opath.base);

            var options = Object.assign({}, config.compilers[lang] || {});

            if (lang === 'sass' || lang === 'scss') {
                var indentedSyntax = false;
                options = Object.assign({}, config.compilers.sass || {});

                if (lang === 'sass') {
                    indentedSyntax = true;

                    var indent = _util2.default.getIndent(content);
                    if (indent.firstLineIndent) {
                        content = _util2.default.fixIndent(content, indent.firstLineIndent * -1, indent.char);
                    }
                    console.log(content);
                }
                if (options.indentedSyntax === undefined) {
                    options.indentedSyntax = indentedSyntax;
                }
                lang = 'sass';
            }

            var compiler = _loader2.default.loadCompiler(lang);

            if (!compiler) {
                throw '\u672A\u53D1\u73B0\u76F8\u5173 ' + lang + ' \u7F16\u8BD1\u5668\u914D\u7F6E\uFF0C\u8BF7\u68C0\u67E5wepy.config.js\u6587\u4EF6\u3002';
            }

            var p = compiler(content, options || {}, filepath).then(function (css) {
                if (scoped) {
                    return (0, _scoped2.default)(moduleId, css).then(function (cssContent) {
                        return cssContent;
                    });
                } else {
                    return css;
                }
            });

            allPromises.push(p);
        });

        if (requires.length > 0 && styles.length === 0) {
            allPromises = [Promise.resolve('')];
        }
        Promise.all(allPromises).then(function (rets) {
            var allContent = rets.join('');
            if (requires && requires.length) {
                var requirePath = {};
                requires.forEach(function (r) {
                    var comsrc = null;
                    isNPM = false;
                    var lib = _resolve2.default.resolveAlias(r, opath);

                    if (_path2.default.isAbsolute(lib)) {
                        if (_path2.default.extname(lib) === '' && _util2.default.isFile(lib + ext)) {
                            comsrc = lib + ext;
                        }
                    } else {
                        if (_path2.default.isAbsolute(lib)) {
                            comsrc = lib;
                        } else {
                            var mainFile = null;
                            var sepIndex = lib.indexOf(_path2.default.sep);
                            if (lib[0] !== '@' && sepIndex > 0) {
                                var tmp = lib;
                                lib = tmp.substring(0, sepIndex);
                                mainFile = tmp.substring(sepIndex + 1, tmp.length);
                            }
                            var o = _resolve2.default.getMainFile(lib);
                            if (mainFile) {
                                comsrc = _path2.default.join(o.dir, mainFile);
                            } else {
                                comsrc = _path2.default.join(o.dir, o.file);
                            }
                            var newOpath = _path2.default.parse(comsrc);
                            newOpath.npm = {
                                lib: lib,
                                dir: o.dir,
                                file: o.file,
                                modulePath: o.modulePath
                            };
                            comsrc = _util2.default.getDistPath(newOpath);
                            isNPM = true;
                        }
                    }
                    if (!comsrc) {
                        _util2.default.error('找不到组件：' + r + ('\n\u8BF7\u5C1D\u8BD5\u4F7F\u7528 npm install ' + r + ' \u5B89\u88C5'), '错误');
                    } else {
                        if (_path2.default.extname(comsrc) === '') {
                            comsrc += ext;
                        }
                        var relative = _path2.default.relative(opath.dir + _path2.default.sep + opath.base, comsrc);
                        var code = _util2.default.readFile(comsrc);
                        if (isNPM || /<style/.test(code)) {
                            if (isNPM) {
                                var srcRelative = _path2.default.relative(opath.dir + _path2.default.sep + opath.base, _path2.default.join(_util2.default.currentDir, src));
                                var distFile = _path2.default.relative(_path2.default.join(_util2.default.currentDir, dist), comsrc);
                                relative = _path2.default.join(srcRelative, distFile);
                            }
                            if (/\.wpy$/.test(relative)) {
                                relative = relative.replace(/\.wpy$/, '.' + outputExt);
                            }
                            relative = relative.replace(ext, '.' + outputExt).replace(/\\/ig, '/').replace('../', './');
                            if (!requirePath[relative]) allContent = '@import "' + relative + '";\n' + allContent;
                            requirePath[relative] = 1;
                        }
                    }
                });
            }
            var target = _util2.default.getDistPath(opath, outputExt, src, dist);

            var plg = new _loader2.default.PluginHelper(config.plugins, {
                type: 'css',
                code: allContent,
                file: target,
                output: function output(p) {
                    _util2.default.output(p.action, p.file);
                },
                done: function done(rst) {
                    _util2.default.output('写入', rst.file);
                    _util2.default.writeFile(target, rst.code);
                }
            });
        }).catch(function (e) {
            _util2.default.error(e);
        });
    }
};