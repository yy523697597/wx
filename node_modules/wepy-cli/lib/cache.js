'use strict';

exports.__esModule = true;

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cachePath = '.wepycache';
var _buildCache = null;
var _cacheChanged = false;
var _filelistCache = {};

exports.default = {
    setParams: function setParams(v) {
        this._params = v;
    },
    getParams: function getParams() {
        return this._params;
    },
    setExt: function setExt(v) {
        this._ext = v;
    },
    getExt: function getExt() {
        return this._ext || '.wpy';
    },
    getSrc: function getSrc() {
        return this._src || 'src';
    },
    setSrc: function setSrc() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'src';

        this._src = v;
    },
    getDist: function getDist() {
        return this._dist || 'dist';
    },
    setDist: function setDist() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'dist';

        this._dist = v;
    },
    setPages: function setPages() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        this._pages = v;
    },
    getPages: function getPages() {
        return this._pages || [];
    },
    getConfig: function getConfig() {
        return this._config || null;
    },
    setConfig: function setConfig() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        this._config = v;
    },
    setFileList: function setFileList(key, v) {
        _filelistCache[key] = v;
    },
    getFileList: function getFileList(key) {
        return _filelistCache[key] || null;
    },
    getBuildCache: function getBuildCache(file) {
        if (_buildCache) return _buildCache;

        if (_util2.default.isFile(cachePath)) {
            _buildCache = _util2.default.readFile(cachePath);
            try {
                _buildCache = JSON.parse(_buildCache);
            } catch (e) {
                _buildCache = null;
            }
        }

        return _buildCache || {};
    },
    setBuildCache: function setBuildCache(file) {
        var cache = this.getBuildCache();
        cache[file] = _util2.default.getModifiedTime(file);
        _buildCache = cache;
        _cacheChanged = true;
    },
    clearBuildCache: function clearBuildCache() {
        _util2.default.unlink(cachePath);
    },
    saveBuildCache: function saveBuildCache() {
        if (_cacheChanged) {
            _util2.default.writeFile(cachePath, JSON.stringify(_buildCache));
            _cacheChanged = false;
        }
    },
    checkBuildCache: function checkBuildCache(file) {
        var cache = this.getBuildCache();
        return cache[file] && cache[file] === _util2.default.getModifiedTime(file);
    }
};