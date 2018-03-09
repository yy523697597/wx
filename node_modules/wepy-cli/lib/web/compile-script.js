'use strict';

exports.__esModule = true;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

var _loader = require('../loader');

var _loader2 = _interopRequireDefault(_loader);

var _resolve = require('../resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _cache = require('../cache');

var _cache2 = _interopRequireDefault(_cache);

var _modulemap = require('./modulemap');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var currentPath = _util2.default.currentDir;
var src = _cache2.default.getSrc();
var dist = _cache2.default.getDist();
var npmPath = _path2.default.join(currentPath, dist, 'npm' + _path2.default.sep);

var mmap = void 0;

exports.default = {
    resolveMap: function resolveMap(wpy) {

        var opath = _path2.default.parse(wpy.script.src);

        var id = mmap.add(wpy.script.src, { type: 'script', source: wpy });
        wpy.script.id = id;

        var params = _cache2.default.getParams();
        var wpyExt = params.wpyExt;

        var depences = [];

        wpy.script.code = wpy.script.code.replace(/require\(['"]([\w\d_\-\.\/@]+)['"]\)/ig, function (match, lib) {
            if (lib === 'wepy') lib = 'wepy-web';

            var resolved = lib;

            var source = '';

            var dep = {},
                npmInfo = void 0;

            lib = _resolve2.default.resolveAlias(lib, opath);

            if (lib === 'false') {
                return '{}';
            } else if (_path2.default.isAbsolute(lib)) {
                source = lib;
            } else if (lib[0] === '.') {
                var resolvedLib = void 0;
                if (wpy.npm && wpy.npm.pkg._activeFields.length) {
                    resolvedLib = _resolve2.default.resolveSelfFields(wpy.npm.dir, wpy.npm.pkg, _path2.default.join(_path2.default.relative(wpy.npm.dir, opath.dir), lib));
                }
                if (resolvedLib) {
                    source = _path2.default.join(wpy.npm.dir, resolvedLib);
                    lib = _path2.default.relative(opath.dir, source);
                    if (lib[0] !== '.') {
                        lib = './' + lib;
                    }
                } else {
                    source = _path2.default.join(opath.dir, lib);
                }
                npmInfo = wpy.npm;
            } else if (lib.indexOf('/') === -1 || lib.indexOf('/') === lib.length - 1) {
                if (wpy.npm && wpy.npm.pkg._activeFields.length) {
                    var _resolvedLib = _resolve2.default.resolveSelfFields(wpy.npm.dir, wpy.npm.pkg, lib);
                    lib = _resolvedLib ? _resolvedLib : lib;
                }

                var o = _resolve2.default.getMainFile(lib);
                if (!o) {
                    var relative = _path2.default.relative(_util2.default.currentDir, wpy.script.src);
                    throw Error('\u6587\u4EF6' + relative + '\u4E2D\uFF0C\u627E\u4E0D\u5230\u6A21\u5757: ' + lib);
                }
                var pkg = o.pkg;
                var _main = pkg.main || 'index.js';

                var resolvedFile = void 0;
                if (o.pkg && o.pkg._activeFields.length) {
                    resolvedFile = _resolve2.default.resolveSelfFields(o.dir, o.pkg, o.file);
                }
                resolvedFile = resolvedFile ? resolvedFile : o.file;

                if (lib === 'axios') {
                    resolvedFile = _path2.default.join('dist', 'axios.js');
                } else if (lib === 'vue') {
                    resolvedFile = _path2.default.join('dist', 'vue.js');
                }
                if (pkg.browser && typeof pkg.browser === 'string') {
                    resolvedFile = pkg.browser;
                }
                source = _path2.default.join(o.dir, resolvedFile);
                lib += _path2.default.sep + resolvedFile;
                npmInfo = o;
            } else {
                source = _path2.default.join(wpy.npm.modulePath, lib);
                npmInfo = wpy.npm;
            }

            if (_path2.default.extname(source)) {
                if (_util2.default.isFile(source)) {} else if (_util2.default.isDir(source) && _util2.default.isFile(source + _path2.default.sep + 'index.js')) {
                    source = source + _path2.default.sep + 'index.js';
                } else {
                    source = null;
                }
            } else {
                if (_util2.default.isFile(source + wpyExt)) {
                    source += wpyExt;
                } else if (_util2.default.isFile(source + '.js')) {
                    source += '.js';
                } else if (_util2.default.isFile(source + '.ts')) {
                    source += '.js';
                } else if (_util2.default.isDir(source) && _util2.default.isFile(source + _path2.default.sep + 'index.js')) {
                    source += _path2.default.sep + 'index.js';
                } else {
                    source = null;
                }
            }

            if (!source) {
                throw '找不到文件: ' + source;
            }

            mmap.add(source);

            var wepyRequireId = mmap.get(source);
            dep.path = source;
            if (npmInfo) {
                dep.npm = npmInfo;
            }
            dep.id = wepyRequireId;
            depences.push(dep);
            return '__wepy_require(' + wepyRequireId + ')';
        });
        return depences;
    },
    compile: function compile(wpy) {
        var _this = this;

        mmap = (0, _modulemap.getInstance)();
        var config = _util2.default.getConfig();
        var compiler = _loader2.default.loadCompiler(wpy.script.type);
        if (!compiler) {
            return;
        }
        mmap.setPending(wpy.script.src);
        if (wpy.script.type === 'js') {
            _util2.default.output('依赖', wpy.script.src);
        } else {
            _util2.default.output('编译', wpy.script.src);
        }
        return compiler(wpy.script.code, config.compilers[wpy.script.type] || {}).then(function (rst) {
            if (rst.code) {
                wpy.script.code = rst.code;
                wpy.script.map = rst.map;
            } else {
                wpy.script.code = rst;
            }

            var matchs = wpy.script.code.match(/exports\.default\s*=\s*(((?!undefined).)*);/i),
                defaultExport = void 0;


            if (matchs && matchs.length) {
                defaultExport = matchs[1];

                if (wpy.type === 'page') {
                    _index2.default.addPage(wpy.path, wpy);
                } else if (wpy.type === 'app') {
                    if (matchs) {
                        wpy.script.code = wpy.script.code.replace(/exports\.default\s*=\s*(\w+);/i, '');
                        wpy.script.code += '\nrequire(\'wepy\').default.$createApp(' + defaultExport + ', $$WEPY_APP_PARAMS_PLACEHOLDER$$);\n';
                    }
                }
            }
            return wpy;
        }).then(function (wpy) {
            var depences = _this.resolveMap(wpy);
            var newTasks = [];
            depences.forEach(function (dep) {
                newTasks.push(_index2.default.compile(dep));
            });
            return Promise.all(newTasks);
        });
    }
};