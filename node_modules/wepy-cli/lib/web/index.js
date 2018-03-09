'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

var _cache = require('../cache');

var _cache2 = _interopRequireDefault(_cache);

var _compileWpy = require('../compile-wpy');

var _compileWpy2 = _interopRequireDefault(_compileWpy);

var _compileScript = require('./compile-script');

var _compileScript2 = _interopRequireDefault(_compileScript);

var _compileTemplate = require('./compile-template');

var _compileTemplate2 = _interopRequireDefault(_compileTemplate);

var _compileStyle = require('./compile-style');

var _compileStyle2 = _interopRequireDefault(_compileStyle);

var _xmldom = require('xmldom');

var _loader = require('../loader');

var _loader2 = _interopRequireDefault(_loader);

var _resolve = require('../resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _modulemap = require('./modulemap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var currentPath = _util2.default.currentDir;
var src = _cache2.default.getSrc();
var dist = _cache2.default.getDist();
var npmPath = _path2.default.join(currentPath, dist, 'npm' + _path2.default.sep);

var appPath = void 0;

var pages = {};

var mmap = void 0;

exports.default = {
    addPage: function addPage(k, v) {
        pages[k] = v;
    },
    replaceParams: function replaceParams(str, params) {
        var k = void 0,
            reg = void 0;
        for (k in params) {
            reg = new RegExp('{{' + k + '}}', 'g');
            str = str.replace(reg, params[k]);
        }
        return str;
    },
    injectScript: function injectScript(html, scripts) {

        if (!scripts || !scripts.length) return;

        var head = html.getElementsByTagName('head')[0];
        var body = html.getElementsByTagName('body')[0];
        var doc = new _xmldom.DOMImplementation().createDocument();
        scripts.forEach(function (v) {
            var script = doc.createElement('script');
            if (v.src) {
                script.setAttribute('src', v.src);
            } else if (v.js) {
                script.appendChild(doc.createTextNode(v.js));
            }

            if (v.pos === 'body') {
                body.appendChild(script);
            } else {
                head.appendChild(script);
            }
        });
    },
    buildHtml: function buildHtml(webConfig, platform) {
        var config = _util2.default.getConfig();

        if (webConfig.htmlTemplate) {
            var template = _util2.default.readFile(webConfig.htmlTemplate);
            if (!template) {
                _util2.default.error('找不到文件：' + webConfig.htmlTemplate);
                return;
            }

            var domParser = new _xmldom.DOMParser({ errorHandler: {
                    warning: function warning(x) {
                        if (x.indexOf(' unclosed xml attribute') > -1) {} else {
                            _util2.default.warning('WARNING IN : ' + webConfig.htmlTemplate + '\n' + x);
                        }
                    },
                    error: function error(x) {
                        _util2.default.warning('ERROR IN : ' + webConfig.htmlTemplate + '\n' + x);
                    }
                } });

            var node = domParser.parseFromString(template, '/html');

            var target = this.replaceParams(webConfig.htmlOutput, { platform: platform });

            var scripts = [];

            if (platform === 'qq') {
                scripts.push({
                    pos: 'head',
                    src: '//i.gtimg.cn/channel/lib/components/adapt/adapt-3.0.js?_bid=2106&max_age=86400000'
                });
                scripts.push({
                    pos: 'head',
                    src: '//open.mobile.qq.com/sdk/qqapi.js?_bid=152'
                });
            } else if (platform === 'wechat') {
                scripts.push({
                    pos: 'head',
                    src: '//res.wx.qq.com/open/js/jweixin-1.2.0.js'
                });
            }

            scripts.push({
                pos: 'body',
                src: this.replaceParams(_path2.default.relative(_path2.default.parse(target).dir, webConfig.jsOutput), { platform: platform })
            });
            this.injectScript(node, scripts);

            _util2.default.output('写入', target);
            _util2.default.writeFile(target, node.toString(true));
        }
    },
    toWeb: function toWeb(file, platform) {
        var _this = this;

        var src = _cache2.default.getSrc();
        var ext = _cache2.default.getExt();
        var config = _util2.default.getConfig();
        var appWpy = void 0,
            apppath = void 0,
            platformId = void 0;

        var webConfig = config.build ? config.build.web : null;
        if (!webConfig) {
            _util2.default.error('请检查 build.web 的配置');
            return;
        }

        mmap = (0, _modulemap.createInstance)();

        _util2.default.log('编译 WEB');

        this.buildHtml(webConfig, platform);

        _util2.default.log('入口: ' + file, '编译');
        if ((typeof file === 'undefined' ? 'undefined' : _typeof(file)) === 'object') {
            appWpy = file;
            apppath = appWpy.script.src;
        } else {
            apppath = _path2.default.parse(_path2.default.join(_util2.default.currentDir, src, file));
            appWpy = _compileWpy2.default.resolveWpy(apppath);
        }
        var wpypages = [];

        this.app = appWpy;
        if (appWpy.config.pages && appWpy.config.pages.length) {
            appWpy.config.pages.forEach(function (v) {
                var wpypage = _compileWpy2.default.resolveWpy(_path2.default.parse(_path2.default.join(_util2.default.currentDir, src, v + ext)));
                wpypage.path = v;
                wpypages.push(wpypage);
            });
        } else {
            _util2.default.error('未检测到配置的页面文件。请检查' + _util2.default.getRelative(apppath));
            return;
        }

        var tasks = [],
            components = {},
            apis = {};

        tasks.push(this.compile([appWpy].concat(wpypages)));

        var wepyWebPkg = _resolve2.default.getPkg('wepy-web');

        if (platform !== 'browser') {
            if (['wechat', 'qq'].indexOf(platform) > -1) {
                var platformFile = _path2.default.join(wepyWebPkg.dir, 'lib', 'platform', platform + '.js');
                platformId = mmap.add(platformFile);
                tasks.push(this.compile({
                    id: platformId,
                    path: platformFile,
                    npm: wepyWebPkg
                }));
            } else {
                _util2.default.warning('platform参数目前只支持 wechat 和 qq');
            }
        }

        if (webConfig.components && webConfig.components.length) {
            webConfig.components.forEach(function (k) {
                var componentFile = _path2.default.join(wepyWebPkg.dir, 'lib', 'components', k + '.vue');
                components[k] = mmap.add(componentFile);
                tasks.push(_this.compile({
                    id: components[k],
                    path: componentFile,
                    npm: wepyWebPkg
                }));
            });
        }

        if (webConfig.apis && webConfig.apis.length) {
            webConfig.apis.forEach(function (k) {
                var apiFile = _path2.default.join(wepyWebPkg.dir, 'lib', 'apis', k);
                if (_util2.default.isFile(apiFile + '.vue')) {
                    apiFile = apiFile + '.vue';
                } else {
                    apiFile = apiFile + '.js';
                }
                apis[k] = mmap.add(apiFile);
                tasks.push(_this.compile(apiFile));
            });
        }

        Promise.all(tasks).then(function (rst) {
            var mapArr = mmap.getArray();
            var code = '';

            var styleList = [];
            mapArr.forEach(function (v, i) {
                var p = _path2.default.relative(_util2.default.currentDir, v.source.script.src);

                code += '/***** module ' + i + ' start *****/\n';
                code += '/***** ' + p + ' *****/\n';
                code += 'function(module, exports, __wepy_require) {';
                if (v.type === 'script') {
                    code += v.source.script.code + '\n';
                    if (v.source.template && v.source.template.id !== undefined) {
                        code += '\nexports.default.template=__wepy_require(' + v.source.template.id + ');\n';
                    }
                } else if (v.type === 'template') {
                    code += 'module.exports = "' + v.source.template.code.replace(/\\/ig, '\\\\').replace(/\r/ig, '').replace(/\n/ig, '\\n').replace(/"/ig, '\\"') + '"';
                } else if (v.type === 'style') {
                    var styleCode = '';
                    v.source.style.forEach(function (s) {
                        styleCode += s.code + '\r\n';
                    });
                    styleList.push(v.source.style.id);
                    code += 'module.exports = "' + styleCode.replace(/\\/ig, '\\\\').replace(/\r/ig, '').replace(/\n/ig, '\\n').replace(/"/ig, '\\"') + '"';
                }
                code += '}';
                if (i !== mapArr.length - 1) {
                    code += ',';
                }
                code += '/***** module ' + i + ' end *****/\n\n\n';
            });

            code = '\n(function(modules) { \n   // The module cache\n   var installedModules = {};\n   // The require function\n   function __webpack_require__(moduleId) {\n       // Check if module is in cache\n       if(installedModules[moduleId])\n           return installedModules[moduleId].exports;\n       // Create a new module (and put it into the cache)\n       var module = installedModules[moduleId] = {\n           exports: {},\n           id: moduleId,\n           loaded: false\n       };\n       // Execute the module function\n       modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n       // Flag the module as loaded\n       module.loaded = true;\n       // Return the exports of the module\n       return module.exports;\n   }\n   // expose the modules object (__webpack_modules__)\n   __webpack_require__.m = modules;\n   // expose the module cache\n   __webpack_require__.c = installedModules;\n   // __webpack_public_path__\n   __webpack_require__.p = "/";\n   // Load entry module and return exports\n   $$WEPY_APP_PLATFORM_PLACEHOLDER$$\n   return __webpack_require__(' + appWpy.script.id + ');\n})([\n' + code + '\n]);\n';
            var config = {},
                routes = {},
                k = void 0;

            for (k in pages) {
                routes[k] = mmap.get(pages[k].script.src);
            }

            config.routes = routes;
            config.style = styleList;
            config.components = components;
            config.apis = apis;

            if (platformId !== undefined) {
                code = code.replace('$$WEPY_APP_PLATFORM_PLACEHOLDER$$', '__webpack_require__(' + platformId + ')');
            } else {
                code = code.replace('$$WEPY_APP_PLATFORM_PLACEHOLDER$$', '');
            }
            code = code.replace('$$WEPY_APP_PARAMS_PLACEHOLDER$$', JSON.stringify(config));

            webConfig.jsOutput = webConfig.jsOutput || _path2.default.join(dist, 'dist.js');
            var target = _this.replaceParams(_path2.default.join(_util2.default.currentDir, webConfig.jsOutput), { platform: platform });
            var plg = new _loader2.default.PluginHelper(config.plugins, {
                type: 'dist',
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
        }).catch(function (e) {
            console.error(e);
        });
    },
    compile: function compile(wpys) {

        var config = _util2.default.getConfig();
        var params = _cache2.default.getParams();
        var wpyExt = params.wpyExt;
        var tasks = [];

        var singleFile = false;

        if (wpys.path) {
            if (mmap.getPending(wpys.path)) return Promise.resolve(0);

            var wpy = mmap.getObject(wpys.path);
            if (wpy) {
                return Promise.resolve(wpy);
            }

            var opath = _path2.default.parse(wpys.path);

            if (opath.ext === wpyExt || opath.ext === '.vue') {
                var _wpy = _compileWpy2.default.resolveWpy(wpys.path);
                if (!_wpy) {
                    _util2.default.error('\u68C0\u6D4B\u5230\u4E0D\u5B58\u5728\u7EC4\u4EF6 ' + opath.name);
                    return;
                }
                wpys = [_wpy];
            } else {
                var compileType = 'babel';

                if (opath.ext !== wpyExt && wpys.npm) {
                    compileType = 'js';
                }
                wpys = [{
                    script: {
                        code: _util2.default.readFile(wpys.path),
                        src: wpys.path,
                        type: compileType
                    },
                    npm: wpys.npm
                }];
            }
            singleFile = true;
        }
        wpys.forEach(function (wpy, i) {
            var tmp = void 0;
            wpy.type = singleFile ? 'require' : i === 0 ? 'app' : 'page';

            tmp = _compileScript2.default.compile(wpy);

            if (!tmp) {
                throw 'error';
            }

            tasks.push(tmp);

            if (wpy.template && wpy.template.code && !wpy.template.id) {
                tmp = _compileTemplate2.default.compile(wpy);

                if (!tmp) {
                    throw 'error';
                }

                tasks.push(tmp);
            }

            if (wpy.style && wpy.style.length) {
                tmp = _compileStyle2.default.compile(wpy);

                if (!tmp) {
                    throw 'error';
                }
                tasks.push(tmp);
            }
        });

        return Promise.all(tasks);
    },
    copy: function copy(file) {
        var src = _cache2.default.getSrc();
        var dist = _cache2.default.getDist();
        var ext = _cache2.default.getExt();
        var config = _util2.default.getConfig();

        var opath = _path2.default.parse(file);

        switch (opath.ext) {
            case ext:
                break;
            case '.js':
                break;
            case '.html':
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
                        _util2.default.copy(_path2.default.parse(rst.file));
                    },
                    error: function error(rst) {
                        _util2.default.warning(rst.err);
                        _util2.default.copy(_path2.default.parse(rst.file));
                    }
                });

        }
    }
};