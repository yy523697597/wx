'use strict';

exports.__esModule = true;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

var _compareVersions = require('compare-versions');

var _compareVersions2 = _interopRequireDefault(_compareVersions);

var _ignore = require('ignore');

var _ignore2 = _interopRequireDefault(_ignore);

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _compileWpy = require('./compile-wpy');

var _compileWpy2 = _interopRequireDefault(_compileWpy);

var _compileStyle = require('./compile-style');

var _compileStyle2 = _interopRequireDefault(_compileStyle);

var _compileScript = require('./compile-script');

var _compileScript2 = _interopRequireDefault(_compileScript);

var _loader = require('./loader');

var _loader2 = _interopRequireDefault(_loader);

var _resolve = require('./resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _index = require('./web/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var watchReady = false;
var preventDup = {};

exports.default = {
    findParents: function findParents(file) {
        var _this = this;

        var src = _cache2.default.getSrc();
        var files = _util2.default.getFiles(src);
        var ext = _cache2.default.getExt();

        var parents = [];

        var reg = new RegExp('\\.(' + ext.substr(1) + '|js)$');

        files = files.filter(function (v) {
            return reg.test(v);
        });

        files.forEach(function (f) {
            var opath = _path2.default.parse(_path2.default.join(_util2.default.currentDir, src, f));
            var content = _util2.default.readFile(opath);
            content && content.replace(/import\s*([{\w\d-_}]*)\s*from\s*['"](.*)['"]/ig, function (match, name, importpath) {
                var resolved = _resolve2.default.resolveAlias(importpath, opath);
                if (_path2.default.extname(resolved) === '') resolved += ext;
                var compath = void 0;
                if (_path2.default.isAbsolute(resolved)) {
                    compath = _path2.default.resolve(resolved);
                } else {
                    compath = _path2.default.join(opath.dir, resolved);
                }
                if (compath === _path2.default.join(_util2.default.currentDir, src, file)) {
                    if (!reg.test(f)) {
                        parents = parents.concat(_this.findReference(f));
                    } else {
                        if (f.indexOf('components') !== -1) {
                            parents = parents.concat(_this.findParents(f));
                        } else parents.push(f);
                    }
                }
            });
        });
        return _util2.default.unique(parents).filter(function (v) {
            return v.indexOf('components') === -1;
        });
    },

    _cacheReferences: null,
    findReference: function findReference(file) {
        var _this2 = this;

        var src = _cache2.default.getSrc();
        var files = _util2.default.getFiles(src);
        var ext = _cache2.default.getExt();

        var refs = [];
        var filepath = _path2.default.join(_util2.default.currentDir, src, file);

        if (this._cacheReferences === null) {
            this._cacheReferences = {};
            var reg = new RegExp('\\' + ext + '$');

            files = files.filter(function (v) {
                return reg.test(v);
            });

            files.forEach(function (f) {
                var opath = _path2.default.parse(_path2.default.join(_util2.default.currentDir, src, f));
                var content = _util2.default.readFile(opath);

                var wpy = _compileWpy2.default.resolveWpy(opath);
                var links = {};

                ['script', 'template', 'style'].forEach(function (t) {
                    if (wpy[t]) {
                        if (wpy[t].link === true) {
                            _this2._cacheReferences[wpy[t].src] = _this2._cacheReferences[wpy[t].src] || [];
                            _this2._cacheReferences[wpy[t].src].push(f);
                        } else if (wpy[t].link === undefined && wpy[t].length) {
                            wpy[t].forEach(function (s) {
                                if (s.link) {
                                    _this2._cacheReferences[s.src] = _this2._cacheReferences[s.src] || [];
                                    _this2._cacheReferences[s.src].push(f);
                                }
                            });
                        }
                    }
                });
            });
        }
        return this._cacheReferences[filepath] || [];
    },
    watch: function watch(cmd) {
        var _this3 = this;

        cmd.watch = false;

        var wepyrc = _util2.default.getConfig();
        var src = cmd.source || wepyrc.src || 'src';
        var dist = cmd.target || wepyrc.target || 'dist';
        _chokidar2.default.watch('.' + _path2.default.sep + src, wepyrc.watchOption || {}).on('all', function (evt, filepath) {
            if ((evt === 'change' || evt === 'add') && watchReady && !preventDup[filepath]) {
                preventDup[filepath] = evt;
                cmd.file = _path2.default.relative(src, filepath);
                _util2.default.log('文件: ' + filepath, '变更');
                _this3.build(cmd);
                setTimeout(function () {
                    preventDup[filepath] = false;
                }, 500);
            }
        }).on('ready', function () {
            watchReady = true;
            _util2.default.log('开始监听文件改动。', '信息');
        });
    },
    checkCompiler: function checkCompiler(compilers) {
        if (compilers === undefined) {
            _util2.default.log('检测到老版本config文件，请先更新配置文件版本，参考链接：https://github.com/wepyjs/wepy#wepyconfigjs-配置文件说明', '错误');
            return false;
        }
        var k = void 0,
            exsit = true;
        for (k in compilers) {
            if (!_loader2.default.loadCompiler(k)) {
                return false;
            }
        }
        return true;
    },
    checkPlugin: function checkPlugin() {
        var plugins = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        return _loader2.default.loadPlugin(plugins);
    },
    wepyUpdate: function wepyUpdate() {
        var required = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '1.7.0';

        var o = _resolve2.default.getPkg('wepy') || {};
        var pkg = o.pkg || { version: '0.0.0' };
        return (0, _compareVersions2.default)(required, pkg.version) === 1;
    },
    init: function init(config) {
        var _this4 = this;

        var wepyrc = _util2.default.getConfig();
        if (!wepyrc) {
            _util2.default.error('没有检测到wepy.config.js文件, 请执行`wepy new demo`创建');
            return false;
        }

        _resolve2.default.init(wepyrc.resolve || {});
        _loader2.default.attach(_resolve2.default);

        if (this.wepyUpdate()) {
            _util2.default.log('检测到wepy版本不符合要求，正在尝试更新，请稍等。', '信息');
            _util2.default.exec('npm install wepy --save').then(function (d) {
                _util2.default.log('\u5DF2\u5B8C\u6210\u66F4\u65B0\uFF0C\u91CD\u65B0\u542F\u52A8\u7F16\u8BD1\u3002', '完成');
                config.cache = false;
                _this4.build(config);
            }).catch(function (e) {
                _util2.default.log('\u5B89\u88C5wepy\u5931\u8D25\uFF0C\u8BF7\u5C1D\u8BD5\u8FD0\u884C\u547D\u4EE4 "npm install wepy --save" \u8FDB\u884C\u5B89\u88C5\u3002', '错误');
                console.log(e);
            });
            return false;
        }

        if (!this.checkCompiler(wepyrc.compilers) || !this.checkPlugin(wepyrc.plugins)) {
            _util2.default.exec('npm info ' + _loader2.default.missingNPM, true).then(function (d) {
                _util2.default.log('检测到有效NPM包资源，正在尝试安装，请稍等。', '信息');
                _util2.default.exec('npm install ' + _loader2.default.missingNPM + ' --save-dev').then(function (d) {
                    _util2.default.log('\u5DF2\u5B8C\u6210\u5B89\u88C5 ' + _loader2.default.missingNPM + '\uFF0C\u91CD\u65B0\u542F\u52A8\u7F16\u8BD1\u3002', '完成');
                    _this4.build(config);
                }).catch(function (e) {
                    _util2.default.log('\u5B89\u88C5\u63D2\u4EF6\u5931\u8D25\uFF1A' + _loader2.default.missingNPM + '\uFF0C\u8BF7\u5C1D\u8BD5\u8FD0\u884C\u547D\u4EE4 "npm install ' + _loader2.default.missingNPM + ' --save-dev" \u8FDB\u884C\u5B89\u88C5\u3002', '错误');
                    console.log(e);
                });
            }).catch(function (e) {
                _util2.default.log('\u4E0D\u5B58\u5728\u63D2\u4EF6\uFF1A' + _loader2.default.missingNPM + '\uFF0C\u8BF7\u68C0\u6D4B\u662F\u5426\u62FC\u5199\u9519\u8BEF\u3002', '错误');
                console.log(e);
            });
            return false;
        }

        if (config.output === 'web') {
            wepyrc.build = wepyrc.build || {};
            wepyrc.build.web = wepyrc.build.web || {};
            wepyrc.build.web.dist = wepyrc.build.web.dist || 'web';
            wepyrc.build.web.src = wepyrc.build.web.src || 'src';
            if (wepyrc.build.web.resolve) wepyrc.resolve = Object.assign({}, wepyrc.resolve, wepyrc.build.web.resolve);
            wepyrc.output = 'web';

            _resolve2.default.init(wepyrc.resolve || {});
            _loader2.default.attach(_resolve2.default);

            if (!_resolve2.default.getPkg('wepy-web')) {
                _util2.default.log('正在尝试安装缺失资源 wepy-web，请稍等。', '信息');
                _util2.default.exec('npm install wepy-web --save').then(function (d) {
                    _util2.default.log('\u5DF2\u5B8C\u6210\u5B89\u88C5 wepy-web\uFF0C\u91CD\u65B0\u542F\u52A8\u7F16\u8BD1\u3002', '完成');
                    _this4.build(config);
                }).catch(function (e) {
                    _util2.default.log('\u5B89\u88C5\u63D2\u4EF6\u5931\u8D25\uFF1Awepy-web\uFF0C\u8BF7\u5C1D\u8BD5\u8FD0\u884C\u547D\u4EE4 "npm install wepy-web --save" \u8FDB\u884C\u5B89\u88C5\u3002', '错误');
                    console.log(e);
                });
                return false;
            }
        } else if (config.output === 'ant') {
            wepyrc.build = wepyrc.build || {};
            wepyrc.build.ant = wepyrc.build.ant || {};
            wepyrc.build.ant.dist = wepyrc.build.ant.dist || 'ant';
            wepyrc.build.ant.src = wepyrc.build.ant.src || 'src';
            if (wepyrc.build.ant.resolve) wepyrc.resolve = Object.assign({}, wepyrc.resolve, wepyrc.build.ant.resolve);
            wepyrc.output = 'ant';

            _resolve2.default.init(wepyrc.resolve || {});
            _loader2.default.attach(_resolve2.default);

            if (!_resolve2.default.getPkg('wepy-ant')) {
                _util2.default.log('正在尝试安装缺失资源 wepy-ant，请稍等。', '信息');
                _util2.default.exec('npm install wepy-ant --save').then(function (d) {
                    _util2.default.log('\u5DF2\u5B8C\u6210\u5B89\u88C5 wepy-ant\uFF0C\u91CD\u65B0\u542F\u52A8\u7F16\u8BD1\u3002', '完成');
                    _this4.build(config);
                }).catch(function (e) {
                    _util2.default.log('\u5B89\u88C5\u63D2\u4EF6\u5931\u8D25\uFF1Awepy-ant\uFF0C\u8BF7\u5C1D\u8BD5\u8FD0\u884C\u547D\u4EE4 "npm install wepy-ant --save" \u8FDB\u884C\u5B89\u88C5\u3002', '错误');
                    console.log(e);
                });
                return false;
            }
        }

        return true;
    },
    build: function build(cmd) {
        var _this5 = this;

        var wepyrc = _util2.default.getConfig();

        var src = cmd.source || wepyrc.src;
        var dist = cmd.target || wepyrc.target;
        var ext = cmd.wpyExt || wepyrc.wpyExt;

        if (src === undefined) src = 'src';
        if (dist === undefined) dist = 'dist';
        if (ext === undefined) ext = '.wpy';

        cmd.source = src;
        cmd.dist = dist;
        cmd.wpyExt = ext;

        if (ext.indexOf('.') === -1) ext = '.' + ext;

        var file = cmd.output !== 'web' ? cmd.file : '';

        var current = process.cwd();
        var files = file ? [file] : _util2.default.getFiles(src);

        _cache2.default.setParams(cmd);
        _cache2.default.setSrc(src);
        _cache2.default.setDist(dist);
        _cache2.default.setExt(ext);

        if (!_util2.default.isDir(_path2.default.join(_util2.default.currentDir, dist, 'npm', 'wepy'))) {
            cmd.cache = false;
        }
        if (!cmd.cache) {
            _cache2.default.clearBuildCache();
        }

        if (file) {
            if (file.indexOf(ext) === -1) {
                var refs = this.findReference(file);
                if (refs.length === 0) {
                    files = [file];
                } else {
                    files = refs;
                }
            } else if (file.indexOf('components') !== -1) {
                var parents = this.findParents(file);
                files = parents.concat([file]);
            }
        }

        if (files.some(function (v) {
            return v === 'app' + ext;
        })) {
            if (_util2.default.isFile(_path2.default.join(current, src, 'app' + ext))) {
                var newFiles = ['app' + ext].concat(files.filter(function (v) {
                    return v !== 'app' + ext;
                }));
                files = newFiles;
            } else {
                _util2.default.error('根目录不存在app' + ext);
            }
        }

        var igfiles = _util2.default.getIgnore();
        if (igfiles) {
            var ig = (0, _ignore2.default)().add(igfiles);
            files = ig.filter(files);
        }
        if (wepyrc.cliLogs) {
            _util2.default.cliLogs = true;
            _util2.default.clearLog();
        } else {
            _util2.default.removeLog();
        }

        if (cmd.output === 'web') {
            files.forEach(function (f, i) {
                if (i === 0) {
                    _index2.default.toWeb(f, cmd.platform || 'browser');
                } else {
                    _index2.default.copy(_path2.default.join(_util2.default.currentDir, src, f));
                }
            });
        } else {
            files.forEach(function (f) {
                var opath = _path2.default.parse(_path2.default.join(current, src, f));
                if (file) {
                    _this5.compile(opath);
                } else {
                    var _refs = _this5.findReference(f);
                    if (!_refs.length) _this5.compile(opath);
                }
            });
        }
        if (cmd.watch) {
            _util2.default.isWatch = true;
            this.watch(cmd);
        }
    },
    compile: function compile(opath) {
        var src = _cache2.default.getSrc();
        var dist = _cache2.default.getDist();
        var ext = _cache2.default.getExt();
        var config = _util2.default.getConfig();

        if (!_util2.default.isFile(opath)) {
            _util2.default.error('文件不存在：' + _util2.default.getRelative(opath));
            return;
        }

        switch (opath.ext) {
            case ext:
                _compileWpy2.default.compile(opath);
                break;
            case '.less':
                _compileStyle2.default.compile('less', opath);
                break;
            case '.sass':
                _compileStyle2.default.compile('sass', opath);
                break;
            case '.scss':
                _compileStyle2.default.compile('scss', opath);
                break;
            case '.js':
                _compileScript2.default.compile('babel', null, 'js', opath);
                break;
            case '.ts':
                _compileScript2.default.compile('typescript', null, 'ts', opath);
                break;
            default:
                _util2.default.output('拷贝', _path2.default.join(opath.dir, opath.base));

                var plg = new _loader2.default.PluginHelper(config.plugins, {
                    type: opath.ext.substr(1),
                    code: null,
                    file: _path2.default.join(opath.dir, opath.base),
                    output: function output(p) {
                        _util2.default.output(p.action, p.file);
                    },
                    done: function done(rst) {
                        if (rst.code) {
                            var target = _util2.default.getDistPath(_path2.default.parse(rst.file));
                            _util2.default.writeFile(target, rst.code);
                        } else {
                            _util2.default.copy(_path2.default.parse(rst.file));
                        }
                    },
                    error: function error(rst) {
                        _util2.default.warning(rst.err);
                        _util2.default.copy(_path2.default.parse(rst.file));
                    }
                });
        }
    }
};