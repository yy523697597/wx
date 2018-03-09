'use strict';

exports.__esModule = true;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

var _compileWpy = require('./compile-wpy');

var _compileWpy2 = _interopRequireDefault(_compileWpy);

var _loader = require('./loader');

var _loader2 = _interopRequireDefault(_loader);

var _resolve = require('./resolve');

var _resolve2 = _interopRequireDefault(_resolve);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var currentPath = _util2.default.currentDir;

var appPath = void 0,
    npmPath = void 0,
    src = void 0,
    dist = void 0;

exports.default = {
    resolveDeps: function resolveDeps(code, type, opath) {
        var _this = this;

        var params = _cache2.default.getParams();
        var config = _cache2.default.getConfig();
        var wpyExt = params.wpyExt;

        return code.replace(/require\(['"]([\w\d_\-\.\/@]+)['"]\)/ig, function (match, lib) {
            var npmInfo = opath.npm;

            if (lib === './_wepylogs.js') {
                return match;
            }
            var resolved = lib;

            var target = '',
                source = '',
                ext = '',
                needCopy = false;

            if (config.output === 'ant' && lib === 'wepy') {
                lib = 'wepy-ant';
            }
            lib = _resolve2.default.resolveAlias(lib, opath);
            if (lib === 'false') {
                return '{}';
            } else if (_path2.default.isAbsolute(lib)) {
                source = lib;
                target = _util2.default.getDistPath(source);
            } else if (lib[0] === '.') {
                var resolvedLib = void 0;
                if (npmInfo && npmInfo.pkg._activeFields.length) {
                    resolvedLib = _resolve2.default.resolveSelfFields(npmInfo.dir, npmInfo.pkg, _path2.default.join(_path2.default.relative(npmInfo.dir, opath.dir), lib));
                }
                if (resolvedLib) {
                    source = _path2.default.join(npmInfo.dir, resolvedLib);
                    lib = _path2.default.relative(opath.dir, source);
                    if (lib[0] !== '.') {
                        lib = './' + lib;
                    }
                } else {
                    source = _path2.default.join(opath.dir, lib);
                }
                if (type === 'npm') {
                    target = _path2.default.join(npmPath, _path2.default.relative(npmInfo.modulePath, source));
                    needCopy = true;
                } else {
                    target = _util2.default.getDistPath(source);
                    needCopy = false;
                }
            } else if (lib.indexOf('/') === -1 || lib.indexOf('/') === lib.length - 1 || lib[0] === '@' && lib.indexOf('/') !== -1 && lib.lastIndexOf('/') === lib.indexOf('/')) {
                    if (npmInfo && npmInfo.pkg._activeFields.length) {
                        var _resolvedLib = _resolve2.default.resolveSelfFields(npmInfo.dir, npmInfo.pkg, lib);
                        lib = _resolvedLib ? _resolvedLib : lib;
                    }

                    var mainFile = _resolve2.default.getMainFile(lib);

                    if (!mainFile) {
                        throw Error('找不到模块: ' + lib + '\n被依赖于: ' + _path2.default.join(opath.dir, opath.base) + '。\n请尝试手动执行 npm install ' + lib + ' 进行安装。');
                    }
                    npmInfo = {
                        lib: lib,
                        dir: mainFile.dir,
                        modulePath: mainFile.modulePath,
                        file: mainFile.file,
                        pkg: mainFile.pkg
                    };

                    var resolvedFile = void 0;
                    if (mainFile.pkg && mainFile.pkg._activeFields.length) {
                        resolvedFile = _resolve2.default.resolveSelfFields(mainFile.dir, mainFile.pkg, mainFile.file);
                    }
                    resolvedFile = resolvedFile ? resolvedFile : mainFile.file;
                    source = _path2.default.join(mainFile.dir, resolvedFile);
                    target = _path2.default.join(npmPath, lib, resolvedFile);

                    lib += _path2.default.sep + resolvedFile;
                    ext = '';
                    needCopy = true;
                } else {
                var requieInfo = lib.split('/');
                var _mainFile = _resolve2.default.getMainFile(requieInfo[0]);

                if (!_mainFile) {
                    throw Error('找不到模块: ' + lib + '\n被依赖于: ' + _path2.default.join(opath.dir, opath.base) + '。\n请尝试手动执行 npm install ' + lib + ' 进行安装。');
                }
                npmInfo = {
                    lib: requieInfo[0],
                    dir: _mainFile.dir,
                    modulePath: _mainFile.modulePath,
                    file: _mainFile.file,
                    pkg: _mainFile.pkg
                };
                requieInfo.shift();

                source = _path2.default.join(_mainFile.dir, requieInfo.join('/'));
                target = _path2.default.join(npmPath, npmInfo.lib, requieInfo.join('/'));
                ext = '';
                needCopy = true;

                if (_path2.default.extname(_mainFile.file) === '.wpy') {
                    source += '.wpy';
                }
            }

            if (_util2.default.isFile(source + wpyExt)) {
                ext = '.js';
            } else if (_util2.default.isFile(source + '.js')) {
                ext = '.js';
            } else if (_util2.default.isFile(source + '.ts')) {
                ext = '.ts';
            } else if (_util2.default.isDir(source) && _util2.default.isFile(source + _path2.default.sep + 'index.js')) {
                ext = _path2.default.sep + 'index.js';
            } else if (_util2.default.isFile(source)) {
                ext = '';
            } else {
                throw '找不到文件: ' + source;
            }
            source += ext;
            target += ext;
            lib += ext;
            resolved = lib;

            if (ext === '.ts') {
                target = target.replace(/\.ts$/, '') + '.js';
            }

            if (/\.wpy$/.test(resolved)) {
                target = target.replace(/\.wpy$/, '') + '.js';
                resolved = resolved.replace(/\.wpy$/, '') + '.js';
                lib = resolved;
            }

            if (needCopy) {
                if (!_cache2.default.checkBuildCache(source)) {
                    _cache2.default.setBuildCache(source);
                    _util2.default.log('依赖: ' + _path2.default.relative(process.cwd(), target), '拷贝');
                    var newOpath = _path2.default.parse(source);
                    newOpath.npm = npmInfo;
                    _this.compile('js', null, 'npm', newOpath);
                }
            }
            if (type === 'npm') {
                if (lib[0] !== '.') {
                    resolved = _path2.default.join('..' + _path2.default.sep, _path2.default.relative(opath.dir, npmInfo.modulePath), lib);
                } else {
                    if (lib[0] === '.' && lib[1] === '.') resolved = './' + resolved;
                }
            } else {
                resolved = _path2.default.relative(_util2.default.getDistPath(opath, opath.ext, src, dist), target);
            }
            resolved = resolved.replace(/\\/g, '/').replace(/^\.\.\//, './');
            return 'require(\'' + resolved + '\')';
        });
    },
    npmHack: function npmHack(opath, code) {
        code = code.replace(/process\.env\.NODE_ENV/g, JSON.stringify(process.env.NODE_ENV));
        switch (opath.base) {
            case 'lodash.js':
            case '_global.js':
                code = code.replace('Function(\'return this\')()', 'this');
                break;
            case '_html.js':
                code = 'module.exports = false;';
                break;
            case '_microtask.js':
                code = code.replace('if(Observer)', 'if(false && Observer)');

                code = code.replace('Promise && Promise.resolve', 'false && Promise && Promise.resolve');
                break;
            case '_freeGlobal.js':
                code = code.replace('module.exports = freeGlobal;', 'module.exports = freeGlobal || this;');
        }
        var config = _util2.default.getConfig();
        if (config.output === 'ant' && opath.dir.substr(-19) === 'wepy-async-function') {
            code = '';
        }
        return code;
    },
    compile: function compile(lang, code, type, opath) {
        var _this2 = this;

        var config = _util2.default.getConfig();
        src = _cache2.default.getSrc();
        dist = _cache2.default.getDist();
        npmPath = _path2.default.join(currentPath, dist, 'npm' + _path2.default.sep);

        if (!code) {
            code = _util2.default.readFile(_path2.default.join(opath.dir, opath.base));
            if (code === null) {
                throw '打开文件失败: ' + _path2.default.join(opath.dir, opath.base);
            }
        }

        var compiler = _loader2.default.loadCompiler(lang);

        if (!compiler) {
            return;
        }

        compiler(code, config.compilers[lang] || {}).then(function (compileResult) {
            var sourceMap = void 0;
            if (typeof compileResult === 'string') {
                code = compileResult;
            } else {
                sourceMap = compileResult.map;
                code = compileResult.code;
            }
            if (type !== 'npm') {
                if (type === 'page' || type === 'app') {
                    code = code.replace(/exports\.default\s*=\s*(\w+);/ig, function (m, defaultExport) {
                        if (defaultExport === 'undefined') {
                            return '';
                        }
                        if (type === 'page') {
                            var pagePath = _path2.default.join(_path2.default.relative(appPath.dir, opath.dir), opath.name).replace(/\\/ig, '/');
                            return '\nPage(require(\'wepy\').default.$createPage(' + defaultExport + ' , \'' + pagePath + '\'));\n';
                        } else {
                            appPath = opath;
                            var appConfig = JSON.stringify(config.appConfig || {});
                            var appCode = '\nApp(require(\'wepy\').default.$createApp(' + defaultExport + ', ' + appConfig + '));\n';
                            if (config.cliLogs) {
                                appCode += 'require(\'./_wepylogs.js\')\n';
                            }
                            return appCode;
                        }
                    });
                }
            }

            code = _this2.resolveDeps(code, type, opath);

            if (type === 'npm' && opath.ext === '.wpy') {
                _compileWpy2.default.compile(opath);
                return;
            }

            var target = void 0;
            if (type !== 'npm') {
                target = _util2.default.getDistPath(opath, 'js');
            } else {
                code = _this2.npmHack(opath, code);
                target = _path2.default.join(npmPath, _path2.default.relative(opath.npm.modulePath, _path2.default.join(opath.dir, opath.base)));
            }

            if (sourceMap) {
                sourceMap.sources = [opath.name + '.js'];
                sourceMap.file = opath.name + '.js';
                var Base64 = require('js-base64').Base64;
                code += '\r\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,' + Base64.encode(JSON.stringify(sourceMap));
            }

            var plg = new _loader2.default.PluginHelper(config.plugins, {
                type: type,
                code: code,
                file: target,
                output: function output(p) {
                    _util2.default.output(p.action, p.file);
                },
                done: function done(result) {
                    _util2.default.output('写入', result.file);
                    _util2.default.writeFile(target, result.code);
                }
            });

            _cache2.default.saveBuildCache();
        }).catch(function (e) {
            _util2.default.error(e);
        });
    }
};