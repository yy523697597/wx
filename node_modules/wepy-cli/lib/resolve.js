'use strict';

exports.__esModule = true;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_MODULES = ['node_modules'];
var DEFAULT_ALIASFIELDS = ['wepy', 'weapp', 'browser'];
var DEFAULT_MAINFIELDS = ['wepy', 'weapp', 'browser', 'main'];

exports.default = {
    init: function init(config) {
        var _this = this;

        this.alias = config.alias;
        this.modules = config.modules || DEFAULT_MODULES;
        this.aliasFields = config.aliasFields || DEFAULT_ALIASFIELDS;
        this.mainFields = config.mainFields || DEFAULT_MAINFIELDS;

        ['modules', 'aliasFields', 'mainFields'].forEach(function (opt) {
            typeof _this[opt] === 'string' && (_this[opt] = [].concat(_this[opt]));
        });

        var pkgOption = this.getPkg();
        var pkg = pkgOption.pkg;
        var cwd = pkgOption.dir;
        var ext = _cache2.default.getExt();

        this.aliasFields.forEach(function (fields) {
            _util2.default.isObject(pkg[fields]) && Object.keys(pkg[fields] || {}).forEach(function (key) {
                if (key.indexOf('.') === -1) {
                    var _Object$assign;

                    var value = void 0;
                    if (!pkg[fields][key]) {
                        value = 'false';
                    } else {
                        value = _path2.default.resolve(cwd, pkg[fields][key]);
                    }

                    if (_path2.default.extname(value) === ext) value = value.replace(ext, '');

                    _this.alias = Object.assign({}, (_Object$assign = {}, _Object$assign[key] = value, _Object$assign), _this.alias || {});
                } else if (!_path2.default.isAbsolute(key)) {
                    var _Object$assign2;

                    var _value = _path2.default.resolve(cwd, pkg[fields][key]);
                    key = _path2.default.resolve(cwd, key);

                    if (_path2.default.extname(key) === ext) key = key.replace(ext, '');

                    if (_path2.default.extname(_value) === ext) _value = _value.replace(ext, '');

                    _this.fieldsAlias = Object.assign({}, (_Object$assign2 = {}, _Object$assign2[key] = _value, _Object$assign2), _this.fieldsAlias || {});
                }
            });
        });

        this.modulePaths = this.modules.map(function (v) {
            if (_path2.default.isAbsolute(v)) {
                return v;
            } else {
                return _path2.default.join(cwd, v);
            }
        });
        this._cacheModules = {};
        this._cacheAlias = {};
    },
    walk: function walk(file) {
        if (this._cacheModules[file]) {
            return this._cacheModules[file];
        }

        var f = null,
            ext = _path2.default.extname(file),
            dir = void 0,
            modulePath = void 0,
            filename = void 0;
        for (var i = 0, l = this.modulePaths.length; i < l; i++) {
            modulePath = this.modulePaths[i];
            filename = _path2.default.join(modulePath, file);
            var tmp = filename;
            if (ext) {
                f = _util2.default.isFile(tmp);
            } else {
                f = _util2.default.isFile(filename + '.js');
            }
            if (!f && _util2.default.isDir(tmp)) {
                tmp = _path2.default.join(filename, 'index.js');
                f = _util2.default.isFile(tmp);
            }
            if (f) {
                filename = tmp;
                break;
            }
        }
        if (!f) {
            return null;
        }
        this._cacheModules[file] = {
            modulePath: modulePath,
            file: filename
        };
        return this._cacheModules[file];
    },
    getPkg: function getPkg(lib) {
        var pkg = null,
            dir = null,
            o = null;
        if (lib) {
            o = this.walk(lib + _path2.default.sep + 'package.json');
        } else {
            var filename = _path2.default.join(_util2.default.currentDir, 'package.json');
            if (_util2.default.isFile(filename)) {
                o = {
                    modulePath: _util2.default.currentDir,
                    file: filename
                };
            }
        }
        if (!o) return null;

        pkg = _util2.default.readFile(o.file);
        if (pkg) {
            try {
                pkg = JSON.parse(pkg);
            } catch (e) {
                pkg = null;
            }
        }
        if (!pkg) return null;

        if (lib) {
            pkg._activeFields = [];
            this.aliasFields.forEach(function (field) {
                if (pkg[field]) {
                    pkg._activeFields.push(field);
                }
            });
        }
        return {
            pkg: pkg,
            modulePath: o.modulePath,
            dir: _path2.default.join(o.modulePath, lib ? lib : '')
        };
    },
    getMainFile: function getMainFile(lib) {
        var o = this.getPkg(lib);
        if (!o) {
            return null;
        }

        var mainField = void 0,
            main = void 0;
        for (var i = 0, l = this.mainFields.length; i < l; i++) {
            mainField = this.mainFields[i];
            if (o.pkg[mainField] && typeof o.pkg[mainField] === 'string') {
                main = o.pkg[mainField];
                break;
            }
        }

        main = main || 'index.js';

        return {
            file: main,
            modulePath: o.modulePath,
            pkg: o.pkg,
            dir: o.dir
        };
    },
    resolveSelfFields: function resolveSelfFields(dir, pkg, lib) {
        for (var i = 0, l = pkg._activeFields.length; i < l; i++) {
            var field = pkg[pkg._activeFields[i]];
            if (field) {
                for (var k in field) {
                    var matchPath = _path2.default.join(dir, k);
                    var requirePath = _path2.default.join(dir, lib);
                    if (matchPath === requirePath || matchPath === requirePath + _path2.default.extname(matchPath)) {
                        return field[k];
                    }
                }
            }
        }
        return null;
    },
    resolveFieldsAlias: function resolveFieldsAlias(lib) {
        return lib && this.fieldsAlias && this.fieldsAlias[lib] ? this.fieldsAlias[lib] : lib;
    },
    replaceFieldsAlias: function replaceFieldsAlias(currentAlias, opath) {
        var absolutePath = void 0;

        if (_path2.default.isAbsolute(currentAlias)) {
            absolutePath = currentAlias;

            currentAlias = this.resolveFieldsAlias(absolutePath) !== absolutePath ? this.resolveFieldsAlias(absolutePath) : currentAlias;
        } else if (currentAlias[0] === '.') {
            absolutePath = _path2.default.join(opath.dir, currentAlias);

            currentAlias = this.resolveFieldsAlias(absolutePath) !== absolutePath ? this.resolveFieldsAlias(absolutePath) : currentAlias;
        } else if (currentAlias.indexOf('/') === -1 || currentAlias.indexOf('/') === currentAlias.length - 1 || currentAlias[0] === '@' && currentAlias.indexOf('/') !== -1 && currentAlias.lastIndexOf('/') === currentAlias.indexOf('/')) {
                var mainFile = this.getMainFile(currentAlias);

                if (mainFile) {
                    absolutePath = _path2.default.join(mainFile.dir, mainFile.file);
                    currentAlias = this.resolveFieldsAlias(absolutePath) !== absolutePath ? this.resolveFieldsAlias(absolutePath) : currentAlias;
                }
            }
        return currentAlias;
    },
    resolveAlias: function resolveAlias(lib, opath) {
        if (!this.alias) return lib;
        if (this._cacheAlias[lib]) {
            return this._cacheAlias[lib];
        }
        var rst = lib;
        var ext = _cache2.default.getExt();

        for (var k in this.alias) {
            var alias = this.alias[k];
            if (k[k.length - 1] === '$') {
                k = k.substring(0, k.length - 1);
                if (k === lib) {
                    if (_path2.default.extname(alias) === '') {
                        this._cacheAlias[lib] = _path2.default.join(alias, 'index.js');
                    } else {
                        this._cacheAlias[lib] = alias;
                    }
                }
            } else {
                if (lib.indexOf(k) === 0 && lib === k || lib !== k && lib.indexOf(k + '/') === 0) {
                    this._cacheAlias[lib] = lib.replace(k, alias);
                    if (this._cacheAlias[lib] !== 'false') {
                        this._cacheAlias[lib] = _path2.default.resolve(this._cacheAlias[lib]);
                    }
                }
            }
        }
        if (!this._cacheAlias[lib]) {
            this._cacheAlias[lib] = lib;
        }

        this._cacheAlias[lib] = this.replaceFieldsAlias(this._cacheAlias[lib], opath);
        return this._cacheAlias[lib];
    }
};