'use strict';

exports.__esModule = true;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _xmldom = require('xmldom');

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

var _cache = require('../cache');

var _cache2 = _interopRequireDefault(_cache);

var _loader = require('../loader');

var _loader2 = _interopRequireDefault(_loader);

var _resolve = require('../resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _modulemap = require('./modulemap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mmap = void 0,
    libCompoents = void 0;

var currentPath = _util2.default.currentDir;
var src = _cache2.default.getSrc();
var dist = _cache2.default.getDist();
var srcPath = _path2.default.join(currentPath, src);

var WEAPP_TAGS = ['view', 'text', 'navigator', 'image'];

var makeMap = function makeMap(arr) {
    var rst = {};
    arr.split(',').forEach(function (v) {
        return rst[v] = 1;
    });
    return rst;
};
var HTML_TAGS = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template');

var SVG_TAGS = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view');

var TAGS_MAP = {
    'block': 'div',
    'view': 'div',
    'text': 'span',
    'navigator': 'a',
    'image': 'img'
};

var ATTRS_MAP = {
    'bindtap': '@click',
    'catchtap': '@click.stop'
};

exports.default = {
    isReservedTag: function isReservedTag(tag) {
        return HTML_TAGS[tag] || SVG_TAGS[tag];
    },
    getTemplate: function getTemplate(content) {
        content = '<template>' + content + '</template>';
        var doc = new _xmldom.DOMImplementation().createDocument();
        var node = new _xmldom.DOMParser().parseFromString(content);
        var template = [].slice.call(node.childNodes || []).filter(function (n) {
            return n.nodeName === 'template';
        });

        [].slice.call(template[0].childNodes || []).forEach(function (n) {
            doc.appendChild(n);
        });

        if (doc.documentElement === null && doc.nodeType === 9) {
            doc.nodeType = 11;
        }
        return doc;
    },
    getFunctionInfo: function getFunctionInfo(str) {
        var rst = { name: '', params: [] },
            char = '',
            tmp = '',
            stack = [];
        for (var i = 0, len = str.length; i < len; i++) {
            char = str[i];
            if (!rst.name) {
                if (char === '(') {
                    rst.name = tmp;
                    tmp = '';
                    continue;
                }
            }
            if ((char === ',' || char === ')') && stack.length === 0) {
                var p = tmp.replace(/^\s*/ig, '').replace(/\s*$/ig, '');
                if (p && (p[0] === '"' || p[0] === '\'') && p[0] === p[p.length - 1]) {
                    p = p.substring(1, p.length - 1);
                }
                rst.params.push(p);
                tmp = '';
                continue;
            }
            if (char === '\'' || char === '"') {
                if (stack.length && stack[stack.length - 1] === char) stack.pop();else stack.push(char);
            }
            tmp += char;
        }
        if (!rst.name) rst.name = tmp;
        return rst;
    },
    changeExp: function changeExp(str) {
        var c = void 0,
            i = 0,
            l = str.length,
            flag = [],
            normalWord = '',
            expWord = '',
            rst = [];

        for (i = 0; i < l; i++) {
            c = str[i];
            if (c === '{' && i < l - 1 && str[i + 1] === '{') {
                if (flag.length === 0) {
                    flag.push('{}');
                    i++;
                    if (normalWord) {
                        rst.push('\'' + normalWord + '\'');
                        normalWord = '';
                    }
                    continue;
                }
            } else if (c === '}' && i < l - 1 && str[i + 1] === '}') {
                if (flag.length) {
                    if (flag[flag.length - 1] === '{}') {
                        flag.pop();
                        i++;
                        if (expWord) {
                            rst.push('(' + expWord + ')');
                            expWord = '';
                        }
                        continue;
                    }
                }
            } else if (c === '\'' || c === '"') {
                if (flag.length) {
                    if (flag[flag.length - 1] === c) {
                        flag.pop();
                    } else {
                        flag.push(c);
                    }
                }
            }
            if (flag.length) {
                expWord += c;
            } else {
                normalWord += c;
            }
        }

        if (normalWord) {
            rst.push('\'' + normalWord + '\'');
        }
        if (expWord) {
            rst.push('(' + expWord + ')');
        }
        return rst.join(' + ');
    },
    replaceWXML: function replaceWXML(content, file) {
        var _this = this;

        var node = typeof content === 'string' ? this.getTemplate(content) : content;

        var config = _util2.default.getConfig();
        var webConfig = config.build ? config.build.web : {};
        var components = webConfig.components || [];

        if (!node || !node.childNodes || node.childNodes.length === 0) return;else {
            [].slice.call(node.childNodes || []).forEach(function (child) {
                if (child.nodeName === '#text') {} else {
                    if (components.indexOf(child.tagName) !== -1) {
                        if (_path2.default.relative(libCompoents, file)[0] === '.') {
                            child.tagName = 'wepy-' + child.tagName;
                        }
                    } else if (TAGS_MAP[child.tagName]) {
                        child.tagName = TAGS_MAP[child.tagName];
                    }

                    if (child.tagName === 'repeat') {
                        var vfor = _this.changeExp(child.getAttribute('for'));
                        var vkey = child.getAttribute('key') || 'key';
                        var vitem = child.getAttribute('item') || 'item';
                        var vindex = child.getAttribute('index') || 'index';
                        child.tagName = 'div';
                        child.removeAttribute('for');
                        child.removeAttribute('item');
                        child.removeAttribute('index');

                        child.setAttribute('v-for', '(' + vindex + ', ' + vitem + ') in ' + vfor);
                    }
                    [].slice.call(child.attributes || []).forEach(function (attr) {
                        if (attr.name.indexOf('xmlns:') === 0) {
                            child.removeAttribute(attr.name);
                        } else if (/^(@|bind|catch)/.test(attr.name)) {
                            var func = _this.getFunctionInfo(attr.value);
                            attr.value = func.name + '(';

                            func.params = func.params.map(function (p) {
                                var exp = _this.changeExp(p);
                                return exp.indexOf('(') !== -1 ? exp : p;
                            }).concat('$event');

                            attr.value = func.name + '(' + func.params.join(',') + ')';
                            if (ATTRS_MAP[attr.name]) {
                                attr.name = ATTRS_MAP[attr.name];
                            } else {
                                attr.name = attr.name.replace('bind', '@').replace('catch', '@');
                            }
                        } else if (attr.name === 'hidden') {
                            child.setAttribute('v-show', '!(' + _this.changeExp(attr.value) + ')');
                            child.removeAttribute(attr.name);
                        } else if (attr.name === 'wx:if') {
                            child.setAttribute('v-if', _this.changeExp(attr.value));
                            child.removeAttribute(attr.name);
                        } else if (attr.name === 'wx:for' || attr.name === 'wx:for-items') {
                            var _vfor = _this.changeExp(attr.value);
                            var _vkey = child.getAttribute('wx:key') || 'key';
                            var _vitem = child.getAttribute('wx:for-item') || 'item';
                            var _vindex = child.getAttribute('wx:for-index') || 'index';
                            child.removeAttribute('wx:key');
                            child.removeAttribute('wx:for-item');
                            child.removeAttribute('wx:for-index');
                            child.removeAttribute(attr.name);

                            child.setAttribute('v-for', '(' + _vindex + ', ' + _vitem + ') in ' + _vfor);
                        } else if (attr.value.indexOf('{{') > -1 && attr.value.indexOf('}}') > -1) {
                            child.setAttribute(':' + attr.name, _this.changeExp(attr.value));
                            child.removeAttribute(attr.name);
                        }

                        if (attr.name === 'src') {
                            var exp = _this.changeExp(attr.value);
                            var attrName = attr.name,
                                attrValue = attr.value;

                            if (/^\'http(s)?/.test(exp) || /^\'\/\/?/.test(exp)) {} else if (exp[0] === '\'') {
                                var _src = _path2.default.join(_path2.default.parse(file).dir, attr.value);
                                attrValue = _path2.default.relative(srcPath, _src).replace(/\\/ig, '/');
                            }

                            if (child.tagName === 'img' && exp.indexOf('(') !== -1) {
                                attrName = ':src';
                            }

                            child.removeAttribute(attr.name);
                            child.setAttribute(attrName, attrName[0] === ':' ? _this.changeExp(attrValue) : attrValue);
                        }
                    });
                }
                _this.replaceWXML(child, file);
            });
        }
    },
    compile: function compile(wpy) {
        var _this2 = this;

        var config = _util2.default.getConfig();
        var compiler = _loader2.default.loadCompiler(wpy.template.type);

        if (!compiler) {
            return;
        }

        mmap = (0, _modulemap.getInstance)();

        libCompoents = _path2.default.join(_resolve2.default.getPkg('wepy-web').dir, 'lib');

        return compiler(wpy.template.code, config.compilers[wpy.template.type] || {}).then(function (rst) {

            var node = _this2.getTemplate(rst);
            _this2.replaceWXML(node, wpy.template.src);

            wpy.template.code = node.toString(true).replace(/xmlns[^\s]*/ig, '');
            var templateId = mmap.add(wpy.template.src + '-template', {
                type: 'template',
                source: wpy
            });
            wpy.template.id = templateId;
        });
    }
};