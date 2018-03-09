'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _child_process = require('child_process');

var _hashSum = require('hash-sum');

var _hashSum2 = _interopRequireDefault(_hashSum);

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

var _resolve = require('./resolve');

var _resolve2 = _interopRequireDefault(_resolve);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_safe2.default.enabled = true;

_safe2.default.setTheme({
    'info': 'grey',
    '变更': 'bgYellow',
    '删除': 'bgMagenta',
    '执行': 'blue',
    '压缩': 'blue',
    '信息': 'grey',
    '完成': 'green',
    '创建': 'green',
    '监听': 'magenta',
    '错误': 'red',
    '测试': 'red',
    '拷贝': 'yellow',
    '编译': 'blue',
    '写入': 'green'
});

var ID_CACHE = {};
var utils = {
    seqPromise: function seqPromise(promises) {
        return new Promise(function (resolve, reject) {

            var count = 0;
            var results = [];

            var iterateeFunc = function iterateeFunc(previousPromise, currentPromise) {
                return previousPromise.then(function (result) {
                    if (count++ !== 0) results = results.concat(result);
                    return currentPromise(result, results, count);
                }).catch(function (err) {
                    return reject(err);
                });
            };

            promises = promises.concat(function () {
                return Promise.resolve();
            });

            promises.reduce(iterateeFunc, Promise.resolve(false)).then(function (res) {
                resolve(results);
            });
        });
    },
    exec: function exec(cmd, quite) {
        return new Promise(function (resolve, reject) {
            var fcmd = (0, _child_process.exec)(cmd, function (err, stdout, stderr) {
                if (err) {
                    reject(err);
                } else {
                    resolve(stdout, stderr);
                }
            });
            fcmd.stdout.on('data', function (chunk) {
                !quite && process.stdout.write(chunk);
            });
            fcmd.stderr.on('data', function (chunk) {
                !quite && process.stdout.write(chunk);
            });
        });
    },
    timeoutExec: function timeoutExec(sec, cmd, quite) {
        var timeout = new Promise(function (resolve, reject) {
            setTimeout(function () {
                reject('timeout');
            }, sec * 1000);
        });
        var task = this.exec(cmd, quite);
        return Promise.race([timeout, task]);
    },
    elemToArray: function elemToArray(elems) {
        var rst = [];
        for (var i = 0, len = elems.$$length; i < len; i++) {
            rst.push(elems[i]);
        }
        return rst;
    },
    getComId: function getComId(elem) {
        var tagName = elem.nodeName;
        var path = elem.getAttribute('path');
        var id = elem.getAttribute('id');
        if (tagName !== 'component') return tagName;
        if (id) return id;
        if (path && !id) return path;
    },
    getComPath: function getComPath(elem) {
        return elem.getAttribute('path') || this.getComId(elem);
    },
    findComponentInTemplate: function findComponentInTemplate(com, template) {
        if (typeof com !== 'string') {
            com = this.getComId(com);
        }
        var definePath = template.components[com];
        definePath = definePath.indexOf('.') === -1 ? definePath : _path2.default.resolve(template.src, '..' + _path2.default.sep + definePath);
        return this.findComponent(definePath, true);
    },
    findComponent: function findComponent(com) {
        var wpyExt = _cache2.default.getExt();

        var src = '';
        if (com.indexOf(_path2.default.sep) !== -1 && com.indexOf('@') === -1) {
            if (this.isFile(com + wpyExt)) {
                src = com + wpyExt;
                return src;
            }
        }
        var lib = com,
            main = null;
        if (com[0] !== '@' && com.indexOf(_path2.default.sep) > 0) {
            var sepIndex = com.indexOf(_path2.default.sep);
            lib = com.substring(0, sepIndex);
            main = com.substring(sepIndex + 1, com.length);
        }
        var o = _resolve2.default.getMainFile(lib);
        if (o) {
            if (main) {
                src = _path2.default.join(o.dir, main);
            } else {
                src = _path2.default.join(o.dir, o.file);
            }
            if (_path2.default.extname(src) === '') {
                src += wpyExt;
            }
        } else {
            var comPath = _resolve2.default.resolveAlias(com);
            if (this.isFile(comPath + wpyExt)) {
                src = comPath + wpyExt;
            } else if (this.isFile(comPath + '/index' + wpyExt)) {
                src = comPath + '/index' + wpyExt;
            } else if (this.isFile(comPath + '/' + com + wpyExt)) {
                src = comPath + '/' + com + wpyExt;
            }
        }
        return src;
    },


    currentDir: process.cwd(),
    cliDir: __dirname,

    isFunction: function isFunction(fn) {
        return typeof fn === 'function';
    },
    isString: function isString(obj) {
        return toString.call(obj) === '[object String]';
    },
    isObject: function isObject(obj) {
        return toString.call(obj) === '[object Object]';
    },
    isNumber: function isNumber(obj) {
        return toString.call(obj) === '[object Number]';
    },
    isBoolean: function isBoolean(obj) {
        return toString.call(obj) === '[object Boolean]';
    },
    isArray: function isArray(obj) {
        return Array.isArray(obj);
    },
    isFile: function isFile(p) {
        p = (typeof p === 'undefined' ? 'undefined' : _typeof(p)) === 'object' ? _path2.default.join(p.dir, p.base) : p;
        if (!_fs2.default.existsSync(p)) {
            return false;
        }
        return _fs2.default.statSync(p).isFile();
    },
    isDir: function isDir(p) {
        if (!_fs2.default.existsSync(p)) {
            return false;
        }
        return _fs2.default.statSync(p).isDirectory();
    },
    hyphenate: function hyphenate(str) {
        return str.replace(/([^-])([A-Z])/g, '$1-$2').replace(/([^-])([A-Z])/g, '$1-$2').toLowerCase();
    },
    camelize: function camelize(str) {
        return str.replace(/-(\w)/g, function (_, c) {
            return c ? c.toUpperCase() : '';
        });
    },
    decode: function decode(content) {
        var pmap = ['<', '&', '"'];
        var amap = ['&lt;', '&amp;', '&quot;'];
        var reg = new RegExp('(' + amap[0] + '|' + amap[1] + '|' + amap[2] + ')', 'ig');
        return content.replace(reg, function (match, m) {
            return pmap[amap.indexOf(m)];
        });
    },
    encode: function encode(content, start, end) {
        start = start || 0;
        end = end || content.length;

        var buffer = [];
        var pmap = ['<', '&', '"'];
        var amap = ['&lt;', '&amp;', '&quot;'];

        var i = 0,
            c = void 0;
        for (var _i = 0, len = content.length; _i < len; _i++) {
            if (_i < start || _i > end) {
                buffer.push(content[_i]);
            } else {
                c = pmap.indexOf(content[_i]);
                buffer.push(c === -1 ? content[_i] : amap[c]);
            }
        }
        return buffer.join('');
    },
    attrReplace: function attrReplace(content) {
        var config = utils.getConfig();
        var knownTags = ['view', 'scroll-view', 'swiper', 'swiper-item', 'icon', 'text', 'progress', 'button', 'checkbox-group', 'checkbox', 'form', 'input', 'label', 'picker', 'picker-view', 'picker-view-column', 'radio-group', 'radio', 'slider', 'switch', 'textarea', 'navigator', 'audio', 'image', 'video', 'map', 'canvas', 'contact-button'];
        var configTags = config.knownTags;
        if (configTags && Array.isArray(configTags)) {
            knownTags.push.apply(knownTags, configTags);
        }

        if (config.output === 'ant') {
            content = content.replace(/\s+wx\:(\w+)/ig, function (match, name) {
                return ' a:' + name;
            });
        }
        return content.replace(/<([\w-]+)\s*[\s\S]*?(\/|<\/[\w-]+)>/ig, function (tag, tagName) {
            tagName = tagName.toLowerCase();
            return tag.replace(/\s+:([\w-_]*)([\.\w]*)\s*=/ig, function (attr, name, type) {
                if (type === '.once' || type === '.sync') {} else type = '.once';
                return ' v-bind:' + name + type + '=';
            }).replace(/\s+\@([\w-_]*)([\.\w]*)\s*=/ig, function (attr, name, type) {
                var prefix = type !== '.user' ? type.indexOf('.stop') === type.length - 5 ? 'catch' : 'bind' : 'v-on:';
                if (type.indexOf('.capture') === 0) {
                    prefix = 'capture-' + prefix + ':';
                }
                if (config.output === 'ant' && prefix === 'bind') {
                    prefix = 'on';
                    name = name[0].toUpperCase() + name.substring(1);
                }
                return ' ' + prefix + name + '=';
            });
        });
    },
    getIndent: function getIndent(str) {
        var arr = str.split('\n');
        while (arr.length && !/\w/.test(arr[0])) {
            arr.shift();
        }
        var indent = { firstLineIndent: 0, indent: 0, char: '' };
        var s = arr[0],
            i = 0;
        if (s.charCodeAt(0) === 32 || s.charCodeAt(0) === 9) {
            indent.char = s[0];
        }
        while (s[i] === indent.char) {
            i++;
        }
        indent.firstLineIndent = i;
        if (!arr[1]) return indent;
        s = arr[1], i = 0;
        if (!indent.char) {
            if (s.charCodeAt(0) === 32 || s.charCodeAt(0) === 9) {
                indent.char = s[0];
            }
        }
        while (s[i] === indent.char) {
            i++;
        }
        indent.indent = i - indent.firstLineIndent;
        return indent;
    },
    fixIndent: function fixIndent(str, num, char) {
        if (char === undefined) {
            var indent = getIndent(str);
            char = indent.char;
        }
        var arr = str.split('\n');
        if (num > 0) {
            arr.forEach(function (v, i) {
                var p = 0;
                while (p++ < num) {
                    arr[i] = char + arr[i];
                }
            });
        } else {
            arr.forEach(function (v, i) {
                arr[i] = arr[i].substr(-1 * num);
            });
        }
        return arr.join('\n');
    },
    unique: function unique(arr) {
        var tmp = {},
            out = [];
        arr.forEach(function (v) {
            if (!tmp[v]) {
                tmp[v] = 1;
                out.push(v);
            }
        });
        return out;
    },
    unlink: function unlink(p) {
        var rst = '';
        p = (typeof p === 'undefined' ? 'undefined' : _typeof(p)) === 'object' ? _path2.default.join(p.dir, p.base) : p;
        try {
            rst = _fs2.default.unlinkSync(p);
        } catch (e) {
            rst = null;
        }
        return rst;
    },
    readFile: function readFile(p) {
        var rst = '';
        p = (typeof p === 'undefined' ? 'undefined' : _typeof(p)) === 'object' ? _path2.default.join(p.dir, p.base) : p;
        try {
            rst = _fs2.default.readFileSync(p, 'utf-8');
        } catch (e) {
            rst = null;
        }
        return rst;
    },
    mkdir: function mkdir(name) {
        var rst = true;
        try {
            _fs2.default.mkdirSync(name);
        } catch (e) {
            rst = e;
        }
        return rst;
    },
    writeFile: function writeFile(p, data) {
        var opath = this.isString(p) ? _path2.default.parse(p) : p;
        if (!this.isDir(opath.dir)) {
            _mkdirp2.default.sync(opath.dir);
        }
        _fs2.default.writeFileSync(p, data);
    },
    copy: function copy(opath, ext, src, dist) {
        var target = this.getDistPath(opath, ext, src, dist);
        this.writeFile(target, this.readFile(_path2.default.join(opath.dir, opath.base)));
        var readable = _fs2.default.createReadStream(_path2.default.join(opath.dir, opath.base));
        var writable = _fs2.default.createWriteStream(target);
        readable.pipe(writable);
    },
    getRelative: function getRelative(opath) {
        return _path2.default.relative(this.currentDir, _path2.default.join(opath.dir, opath.base));
    },
    getDistPath: function getDistPath(opath, ext, src, dist) {
        var relative = void 0;
        src = src || _cache2.default.getSrc();
        dist = dist || _cache2.default.getDist();
        if (typeof opath === 'string') opath = _path2.default.parse(opath);
        ext = ext ? ext[0] === '.' ? ext : '.' + ext : opath.ext;

        if (opath.npm) {
            relative = _path2.default.relative(opath.npm.modulePath, opath.npm.dir);
            relative = _path2.default.join('npm', relative);
        } else {
            relative = _path2.default.relative(_path2.default.join(this.currentDir, src), opath.dir);
        }
        return _path2.default.join(this.currentDir, dist, relative, opath.name + ext);
    },
    getModifiedTime: function getModifiedTime(p) {
        return this.isFile(p) ? +_fs2.default.statSync(p).mtime : false;
    },
    getConfig: function getConfig() {
        var config = _cache2.default.getConfig();
        if (config) return config;

        var configFile = _path2.default.join(this.currentDir, _path2.default.sep, 'wepy.config.js');
        var configType = 'js';

        if (!this.isFile(configFile)) {
            configFile = _path2.default.join(this.currentDir, _path2.default.sep, '.wepyrc');

            config = this.readFile(configFile);
            try {
                config = JSON.parse(config);
            } catch (e) {
                config = null;
            }
        } else {
            config = require(configFile);
        }

        _cache2.default.setConfig(config);
        return config;
    },
    getIgnore: function getIgnore() {
        var ignoreFile = _path2.default.join(this.currentDir, _path2.default.sep, '.wepyignore');
        return this.isFile(ignoreFile) ? this.readFile(ignoreFile) : '';
    },
    getFiles: function getFiles() {
        var _this = this;

        var dir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : process.cwd();
        var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        var cfiles = _cache2.default.getFileList(dir);
        if (cfiles) return cfiles;
        dir = _path2.default.normalize(dir);
        if (!_fs2.default.existsSync(dir)) {
            return [];
        }
        var files = _fs2.default.readdirSync(dir);
        var rst = [];
        files.forEach(function (item) {
            var filepath = dir + _path2.default.sep + item;
            var stat = _fs2.default.statSync(filepath);
            if (stat.isFile()) {
                rst.push(prefix + item);
            } else if (stat.isDirectory()) {
                rst = rst.concat(_this.getFiles(_path2.default.normalize(dir + _path2.default.sep + item), _path2.default.normalize(prefix + item + _path2.default.sep)));
            }
        });

        _cache2.default.setFileList(dir, rst);
        return rst;
    },
    getVersion: function getVersion() {
        var filepath = _path2.default.resolve(__dirname, '../package.json');
        var version = JSON.parse(this.readFile(filepath)).version;
        return version;
    },
    datetime: function datetime() {
        var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
        var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'HH:mm:ss';

        var fn = function fn(d) {
            return ('0' + d).slice(-2);
        };
        if (date && this.isString(date)) {
            date = new Date(Date.parse(date));
        }
        var formats = {
            YYYY: date.getFullYear(),
            MM: fn(date.getMonth() + 1),
            DD: fn(date.getDate()),
            HH: fn(date.getHours()),
            mm: fn(date.getMinutes()),
            ss: fn(date.getSeconds())
        };
        return format.replace(/([a-z])\1+/ig, function (a) {
            return formats[a] || a;
        });
    },
    error: function error(msg) {
        this.writeLog(msg, 'error');
        this.log(msg, 'error', false);
        if (!this.isWatch) {
            process.exit(0);
        }
    },
    warning: function warning(msg) {
        this.writeLog(msg, 'warn');
        this.log(msg, 'warning', false);
    },
    log: function log(msg, type) {
        var showTime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        var dateTime = showTime ? _safe2.default.gray('[' + this.datetime() + '] ') : '';
        if (this.isObject(msg) || this.isArray(msg)) {
            msg = JSON.stringify(msg);
        }
        if (type && this.isString(type)) {
            type = type.toUpperCase();
            if (type === 'ERROR') {
                if (msg instanceof Error) {
                    console.error(_safe2.default.red('[Error] ' + msg.stack));
                } else {
                    console.error(_safe2.default.red('[Error] ' + msg));
                }
            } else if (type === 'WARNING') {
                console.error(_safe2.default.yellow('[WARNING] ' + msg));
            } else {
                var fn = _safe2.default[type] ? _safe2.default[type] : _safe2.default['info'];
                console.log(dateTime + fn('[' + type + ']') + ' ' + msg);
            }
        } else {
            console.log(dateTime + msg);
        }
    },
    removeLog: function removeLog() {
        var dist = dist || _cache2.default.getDist();
        var file = _path2.default.join(this.currentDir, dist, '_wepylogs.js');
        this.unlink(file);
    },
    clearLog: function clearLog() {
        var dist = dist || _cache2.default.getDist();
        var file = _path2.default.join(this.currentDir, dist, '_wepylogs.js');
        this.writeFile(file, 'console.log(\'WePY\u5F00\u542F\u9519\u8BEF\u76D1\u63A7\');\r\n');
    },
    writeLog: function writeLog(msg, type) {
        if (!this.cliLogs) return;
        var dist = dist || _cache2.default.getDist();
        var file = _path2.default.join(this.currentDir, dist, '_wepylogs.js');
        if (msg.stack) {
            msg = msg.stack;
            msg = msg.replace(/\\/g, '\\\\');
            msg = msg.replace(/\u001b/g, '');
            msg = msg.replace(/\[\d+m/g, '');
        }
        try {
            _fs2.default.appendFileSync(file, 'console.' + type + '(`CLI\u62A5\u9519\uFF1A' + msg + '`);\r\n');
        } catch (e) {
            console.log(e);
        }
    },
    output: function output(type, file, flag) {
        if (!flag) {
            flag = file.substr(file.lastIndexOf('.') + 1).toUpperCase();
            if (flag.length < 4) {
                var i = 4 - flag.length;
                while (i--) {
                    flag += ' ';
                }
            }
        }
        this.log(flag + ': ' + _path2.default.relative(this.currentDir, file), type);
    },
    genId: function genId(filepath) {
        if (!ID_CACHE[filepath]) {
            ID_CACHE[filepath] = '_' + (0, _hashSum2.default)(filepath).slice(1, 8);
        }
        return ID_CACHE[filepath];
    }
};
exports.default = utils;