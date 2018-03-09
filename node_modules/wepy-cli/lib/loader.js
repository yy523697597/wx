'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _module = require('module');

var _module2 = _interopRequireDefault(_module);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var relativeModules = {};
var requiredModules = {};

var loadedPlugins = [];

var PluginHelper = function () {
    function PluginHelper(plugins, op) {
        _classCallCheck(this, PluginHelper);

        this.applyPlugin(0, op);
        return true;
    }

    PluginHelper.prototype.applyPlugin = function applyPlugin(index, op) {
        var _this = this;

        var plg = loadedPlugins[index];

        if (!plg) {
            op.done && op.done(op);
        } else {
            op.next = function () {
                _this.applyPlugin(index + 1, op);
            };
            op.catch = function () {
                op.error && op.error(op);
            };
            if (plg) plg.apply(op);
        }
    };

    return PluginHelper;
}();

exports.default = {
    attach: function attach(resolve) {
        this.resolve = resolve;
    },
    loadCompiler: function loadCompiler(lang) {
        if (['wxml', 'xml', 'css', 'js'].indexOf(lang) > -1) {
            return function (c) {
                return Promise.resolve(c);
            };
        }

        var name = 'wepy-compiler-' + lang;
        var compiler = this.load(name);

        if (!compiler) {
            this.missingNPM = name;
            _util2.default.log('\u627E\u4E0D\u5230\u7F16\u8BD1\u5668\uFF1A' + name + '\u3002', 'warning');
        }
        return compiler;
    },
    getNodeModulePath: function getNodeModulePath(loc, relative) {
        relative = relative || _util2.default.currentDir;
        if ((typeof _module2.default === 'undefined' ? 'undefined' : _typeof(_module2.default)) === 'object') return null;

        var relativeMod = relativeModules[relative];
        var paths = [];

        if (!relativeMod) {
            relativeMod = new _module2.default();

            var filename = _path2.default.join(relative, './');
            relativeMod.id = filename;
            relativeMod.filename = filename;
            relativeMod.paths = [].concat(this.resolve.modulePaths);

            paths = _module2.default._nodeModulePaths(relative);
            relativeModules[relative] = relativeMod;
        }
        paths.forEach(function (v) {
            if (relativeMod.paths.indexOf(v) === -1) {
                relativeMod.paths.push(v);
            }
        });
        try {
            return _module2.default._resolveFilename(loc, relativeMod);
        } catch (err) {
            return null;
        }
    },
    load: function load(loc, relative) {

        if (requiredModules[loc]) return requiredModules[loc];

        var modulePath = this.getNodeModulePath(loc, relative);
        var m = null;
        try {
            m = require(modulePath);
        } catch (e) {
            if (e.message !== 'missing path') console.log(e);
        }
        if (m) {
            m = m.default ? m.default : m;
            requiredModules[loc] = m;
        }
        return m;
    },
    loadPlugin: function loadPlugin(plugins, op) {
        var plg = void 0,
            plgkey = void 0,
            setting = void 0,
            config = void 0;
        for (plgkey in plugins) {
            var name = 'wepy-plugin-' + plgkey;
            setting = plugins[plgkey];
            plg = this.load(name);

            if (!plg) {
                this.missingNPM = name;
                _util2.default.log('\u627E\u4E0D\u5230\u63D2\u4EF6\uFF1A' + name + '\u3002', 'warning');
                return false;
            }
            loadedPlugins.push(new plg(setting));
        }
        return true;
    },

    PluginHelper: PluginHelper
};