'use strict';

exports.__esModule = true;

var _xmldom = require('xmldom');

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PREFIX = '$';
var JOIN = '$';

var BOOLEAN_ATTRS = ['a:else', 'wx:else', 'show-info', 'active', 'controls', 'danmu-btn', 'enable-danmu', 'autoplay', 'disabled', 'show-value', 'checked', 'scroll-x', 'scroll-y', 'auto-focus', 'focus', 'auto-height', 'password', 'indicator-dots', 'report-submit', 'hidden', 'plain', 'loading', 'redirect', 'loop', 'controls'];

exports.default = {
    comPrefix: {},
    comCount: 0,
    getPrefix: function getPrefix(prefix) {
        if (!this.comPrefix[prefix]) {
            this.comPrefix[prefix] = _util2.default.camelize(prefix || '');;
        }
        return this.comPrefix[prefix];
    },
    getTemplate: function getTemplate(content) {
        content = '<template>' + content + '</template>';
        content = _util2.default.attrReplace(content);
        var doc = new _xmldom.DOMImplementation().createDocument();
        var node = _compileWpy2.default.createParser().parseFromString(content);
        var template = [].slice.call(node.childNodes || []).filter(function (n) {
            return n.nodeName === 'template';
        });

        [].slice.call(template[0].childNodes || []).forEach(function (n) {
            doc.appendChild(n);
        });
        return doc;
    },
    isInQuote: function isInQuote(str, n) {
        var firstIndex = str.search(/"|'/);
        if (firstIndex === -1 || firstIndex > n) return false;
        var char = '';
        var last = '';
        for (var i = 0; i < n; i++) {
            var c = str[i];
            if (c === '"' || c === '\'') {
                if (!char) {
                    char = c;
                } else if (char === c && last !== '\\') {
                    char = '';
                }
            }
            last = c;
        }
        return char !== '';
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
        return rst;
    },
    replaceBooleanAttr: function replaceBooleanAttr(code) {
        var reg = void 0;
        BOOLEAN_ATTRS.forEach(function (v) {
            reg = new RegExp(v + '=[\'"]' + v + '[\'"]', 'ig');
            code = code.replace(reg, v);
        });
        return code;
    },
    parseExp: function parseExp(content, prefix, ignores, mapping) {
        var _this = this;

        if (!prefix) return content;

        return content.replace(/\{\{([^}]+)\}\}/ig, function (matchs, words) {
            return matchs.replace(/[^\.\w'"](\.{0}|\.{3})([a-z_\$][\w\d\._\$]*)/ig, function (match, expand, word, n) {
                var char = match[0];
                var tmp = word.match(/^([\w\$]+)(.*)/);
                var w = tmp[1];
                var rest = tmp[2];
                if (ignores[w] || _this.isInQuote(matchs, n)) {
                    return match;
                } else {
                    if (mapping.items && mapping.items[w] && mapping.items[w].bind) {
                        var upper = prefix.split(PREFIX);
                        upper.pop();
                        upper = upper.join(PREFIX);
                        upper = upper ? '' + PREFIX + upper + JOIN : '';
                        return '' + char + expand + upper + mapping.items[w].mapping + rest;
                    }
                    return '' + char + expand + PREFIX + prefix + JOIN + word;
                }
            });
        });
    },
    parseClassExp: function parseClassExp(exp) {
        exp = exp.replace(/^\s/ig, '').replace(/\s$/ig, '');
        if (exp[0] === '{' && exp[exp.length - 1] === '}') {
            exp = exp.substring(1, exp.length - 1);
            var i = 0,
                len = exp.length;
            var flagStack = [],
                flag = 'start';
            var classNames = [],
                result = {},
                str = '';
            for (i = 0; i < len; i++) {
                if (exp[i] === '\'' || exp[i] === '"') {
                    if (flagStack.length && flagStack[0] === exp[i]) {
                        flagStack.pop();
                        if (flag === 'class') {
                            flag = ':';
                            continue;
                        } else if (flag === 'expression') {
                            str += exp[i];
                            continue;
                        }
                    } else {
                        if (flagStack.length === 0) {
                            flagStack.push(exp[i]);
                            if (flag === 'start') {
                                flag = 'class';
                                continue;
                            } else if (flag === 'expression') {
                                str += exp[i];
                                continue;
                            }
                        }
                    }
                }

                if (exp[i] === ':' && (flag === ':' || flag === 'class') && flagStack.length === 0) {
                    flag = 'expression';
                    classNames.push(str);
                    str = '';
                    continue;
                }
                if (exp[i] === ',' && flag === 'expression' && flagStack.length === 0) {
                    result[classNames[classNames.length - 1]] = str.replace(/^\s/ig, '').replace(/\s$/ig, '');;
                    str = '';
                    flag = 'start';
                    continue;
                }

                if (!str.length && exp[i] === ' ') continue;

                if (flag === 'start') {
                    flag = 'class';
                }

                if (flag === 'class' || flag === 'expression') {
                    str += exp[i];
                }
            }
            if (str.length) {
                result[classNames[classNames.length - 1]] = str.replace(/^\s/ig, '').replace(/\s$/ig, '');
            }
            return result;
        } else {
            throw ':class expression is not correct, it has to be {\'className\': mycondition}';
        }
    },
    getMappingIndex: function getMappingIndex(mapping, arr) {
        if (!arr) arr = [];

        if (mapping === null) return arr.reverse();

        var val = mapping.prefix ? '' + PREFIX + mapping.prefix + JOIN + mapping.for.index : mapping.for.index;
        arr.push('{{' + val + '}}');
        return this.getMappingIndex(mapping.parent, arr);
    },
    fixRelativePath: function fixRelativePath(node, template, parentTemplate) {
        if ((node.nodeName === 'wxs' || node.nodeName === 'image') && parentTemplate) {
            var src = node.getAttribute('src');
            if (src[0] === '.') {
                var realpath = _path2.default.join(_path2.default.parse(template.src).dir, node.getAttribute('src'));
                var fixedpath = _path2.default.relative(_path2.default.parse(parentTemplate.src).dir, realpath);
                fixedpath = fixedpath.replace(/\\/g, '/');
                node.setAttribute('src', fixedpath);
            }
        }
        return node;
    },
    updateBind: function updateBind(node, template, parentTemplate, prefix) {
        var _this2 = this;

        var ignores = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
        var mapping = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};


        var config = _cache2.default.getConfig();
        var tagprefix = config.output === 'ant' ? 'a' : 'wx';

        node = this.fixRelativePath(node, template, parentTemplate);

        if (template.wxs) {
            for (var k in template.wxs) {
                ignores[k] = true;
            }
        }

        if (node.nodeName === '#text' && prefix) {
            if (node.data && node.data.indexOf('{{') > -1) {
                node.replaceData(0, node.data.length, this.parseExp(node.data, prefix, ignores, mapping));
            }
        } else {
            [].slice.call(node.attributes || []).forEach(function (attr) {
                if (attr.name === 'v-bind:class.once') {
                    var classObject = _this2.parseClassExp(attr.value);
                    var classArray = (node.getAttribute('class') || '').split(' ').map(function (v) {
                        return v.replace(/^\s/ig, '').replace(/\s$/ig, '');
                    });
                    if (classArray.length === 1 && classArray[0] === '') classArray = [];
                    for (var _k in classObject) {
                        var exp = classObject[_k].replace(/\'/ig, '\\\'').replace(/\"/ig, '\\"');
                        var name = _k.replace(/\'/ig, '\\\'').replace(/\"/ig, '\\"');
                        var index = classArray.indexOf(name);
                        if (index !== -1) {
                            classArray.splice(index, 1);
                        }
                        exp = '{{' + exp + ' ? \'' + name + '\' : \'\'}}';
                        classArray.push(_this2.parseExp(exp, prefix, ignores, mapping));
                    }
                    node.setAttribute('class', classArray.join(' '));
                    node.removeAttribute(attr.name);
                }
                if (prefix) {
                    if (attr.value.indexOf('{{') > -1) {
                        attr.value = _this2.parseExp(attr.value, prefix, ignores, mapping);
                    }
                    if (attr.name === tagprefix + ':for' || attr.name === tagprefix + ':for-items') {
                        var _index = node.getAttribute(tagprefix + ':for-index') || 'index';
                        var item = node.getAttribute(tagprefix + ':for-item') || 'item';
                        ignores[_index] = true;
                        ignores[item] = true;
                    }
                }

                if (config.output !== 'ant' && (attr.name.indexOf('bind') === 0 || attr.name.indexOf('catch') === 0) || config.output === 'ant' && (attr.name.indexOf('on') === 0 || attr.name.indexOf('catch') === 0)) {
                    if (mapping.items && mapping.items.length > 0) {
                        var upper = prefix.split(PREFIX);
                        upper.pop();
                        upper = upper.join(PREFIX);
                        upper = upper ? '' + PREFIX + upper + JOIN : '';
                        var comIndex = _this2.getMappingIndex(mapping);
                        node.setAttribute('data-com-index', comIndex.join('-'));
                    }
                    if (attr.value.indexOf('(') > 0) {
                        var funcInfo = _this2.getFunctionInfo(attr.value);
                        attr.value = funcInfo.name;
                        funcInfo.params.forEach(function (p, i) {
                            var paramAttr = 'data-wpy' + funcInfo.name.toLowerCase() + '-' + String.fromCharCode(97 + i);
                            if (paramAttr.length > 31) {
                                _util2.default.warning('Function name is too long, it may cause an Error. "' + funcInfo.name + '"');
                            }
                            node.setAttribute(paramAttr, p);
                        });
                    }
                    if (prefix) attr.value = '' + PREFIX + prefix + JOIN + attr.value;
                }
                if (attr.name === 'a:for-items' && config.output === 'ant') {
                    node.setAttribute('a:for', attr.value);
                    node.removeAttribute(attr.name);
                }
            });
            [].slice.call(node.childNodes || []).forEach(function (child) {
                _this2.updateBind(child, template, parentTemplate, prefix, ignores, mapping);
            });
        }
        return node;
    },
    updateSlot: function updateSlot(node, childNodes) {
        var slots = {},
            has = void 0;
        if (!childNodes || childNodes.length === 0) slots = {};else {
            [].slice.call(childNodes || []).forEach(function (child) {
                var name = child.nodeName === '#text' || child.nodeName === '#comment' ? '' : child.getAttribute('slot');

                if (!name) {
                    name = '$$default';
                }
                if (slots[name]) slots[name].push(child);else slots[name] = [child];
            });
        }

        var slotsElems = _util2.default.elemToArray(node.getElementsByTagName('slot'));

        slotsElems.forEach(function (slot) {
            var name = slot.getAttribute('name');
            if (!name) name = '$$default';

            var replacements = slots[name] && slots[name].length > 0 ? slots[name] : [].slice.call(slot.childNodes || []);

            var doc = new _xmldom.DOMImplementation().createDocument();
            replacements.forEach(function (n) {
                if (name !== '$$default' && n.nodeName !== '#text' && n.nodeName !== '#comment') n.removeAttribute('slot');
                doc.appendChild(n);
            });

            node.replaceChild(doc, slot);
        });
        return node;
    },
    compileXML: function compileXML(node, template, parentTemplate, prefix, childNodes) {
        var _this3 = this;

        var comAppendAttribute = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
        var propsMapping = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};


        var config = _cache2.default.getConfig();
        var tagprefix = config.output === 'ant' ? 'a' : 'wx';
        this.updateSlot(node, childNodes);

        this.updateBind(node, template, parentTemplate, prefix, {}, propsMapping);

        if (node && node.documentElement) {
            var topNode = node.documentElement;

            while (topNode && (topNode.tagName === 'wxs' || !topNode.tagName)) {
                topNode = topNode.nextSibling;
            }Object.keys(comAppendAttribute).forEach(function (key) {
                if (key === 'class') {
                    var classNames = topNode.getAttribute('class');
                    if (classNames) {
                        classNames = classNames.split(' ').concat(comAppendAttribute[key].split(' ')).join(' ');
                    } else {
                        classNames = comAppendAttribute[key];
                    }
                    topNode.setAttribute('class', classNames);
                } else {
                    topNode.setAttribute(key, comAppendAttribute[key]);
                }
            });
        }

        var repeats = _util2.default.elemToArray(node.getElementsByTagName('repeat'));

        var forDetail = {};
        template.props = {};
        repeats.forEach(function (repeat) {
            var repeatComs = [];

            repeat.tagName = 'block';
            var val = repeat.getAttribute('for');
            if (val) {
                repeat.setAttribute(tagprefix + ':for', val);
                repeat.removeAttribute('for');
                ['index', 'item', 'key'].forEach(function (attr) {
                    var val = repeat.getAttribute(attr);
                    var tag = attr === 'key' ? tagprefix + ':key' : tagprefix + ':for-' + attr;
                    val = val || attr;
                    forDetail[attr] = val;
                    if (prefix) {
                        repeat.setAttribute(tag, '' + PREFIX + prefix + JOIN + val);
                    } else {
                        repeat.setAttribute(tag, val);
                    }
                    repeat.removeAttribute(attr);
                });
            }
            Object.keys(template.components).forEach(function (com) {
                repeatComs = repeatComs.concat(_util2.default.elemToArray(repeat.getElementsByTagName(com)));
            });
            repeatComs.forEach(function (com) {
                var comAttributes = {};
                template.props[com.tagName] = {
                    items: { length: 0 },
                    for: forDetail,
                    prefix: prefix,
                    parent: propsMapping.for ? propsMapping : null
                };
                [].slice.call(com.attributes || []).forEach(function (attr) {

                    if (['hidden', 'wx:if', 'wx:elif', 'wx:else', 'class', 'a:if', 'a:elif', 'a:else'].indexOf(attr.name) > -1) {
                        comAttributes[attr.name] = attr.value;
                    }
                    var name = attr.name;

                    var prop = template.props[com.tagName],
                        tmp = {};

                    if (name.indexOf('v-bind') === 0) {
                        tmp.bind = true;
                        name = name.replace(/^v\-bind\:/, '');
                    }

                    if (name.indexOf('.once') === name.length - 5) {
                        name = name.replace(/\.once$/, '');
                        tmp.type = 'once';
                    } else if (name.indexOf('.sync') === name.length - 5) {
                        tmp.type = 'sync';
                        name = name.replace(/\.sync$/, '');
                    }
                    tmp.mapping = attr.value;

                    prop.items[name] = tmp;
                    prop.items.length++;
                });

                var comid = _util2.default.getComId(com);
                var src = _util2.default.findComponentInTemplate(com, template);
                if (!src) {
                    _util2.default.error('找不到组件：' + com.tagName, '\n请尝试使用 npm install ' + com.tagName + ' 安装', '错误');
                } else {
                    var comWpy = _compileWpy2.default.resolveWpy(src);
                    var newnode = _this3.compileXML(_this3.getTemplate(comWpy.template.code), comWpy.template, template, _this3.getPrefix(prefix ? prefix + '$' + comid : '' + comid), com.childNodes, comAttributes, template.props[comid]);
                    node.replaceChild(newnode, com);
                }
            });
        });

        var componentElements = _util2.default.elemToArray(node.getElementsByTagName('component'));
        var customElements = [];
        Object.keys(template.components).forEach(function (com) {
            customElements = customElements.concat(_util2.default.elemToArray(node.getElementsByTagName(com)));
        });

        componentElements = componentElements.concat(customElements);

        componentElements.forEach(function (com) {
            var comid = void 0,
                definePath = void 0,
                isCustom = false,
                comAttributes = {};
            [].slice.call(com.attributes || []).forEach(function (attr) {
                if (['hidden', tagprefix + ':if', tagprefix + ':elif', tagprefix + ':else', 'class'].indexOf(attr.name) > -1) {
                    comAttributes[attr.name] = attr.value;
                }
            });
            if (com.nodeName === 'component') {
                comid = _util2.default.getComId(com);
                definePath = _util2.default.getComPath(com);
                if (!comid) throw new Error('Unknow component id');
            } else {
                isCustom = true;
                comid = _util2.default.getComId(com);
                definePath = template.components[comid];
                definePath = definePath.indexOf('.') === -1 ? definePath : _path2.default.resolve(template.src, '..' + _path2.default.sep + template.components[comid]);
            }

            var src = _util2.default.findComponent(definePath, isCustom);
            if (!src) {
                _util2.default.error('找不到组件：' + definePath, '\n请尝试使用 npm install ' + definePath + ' 安装', '错误');
            } else {
                var comWpy = _compileWpy2.default.resolveWpy(src);
                var newnode = _this3.compileXML(_this3.getTemplate(comWpy.template.code), comWpy.template, template, _this3.getPrefix(prefix ? prefix + '$' + comid : '' + comid), com.childNodes, comAttributes);

                node.replaceChild(newnode, com);
            }
        });
        return node;
    },
    compile: function compile(template) {
        var _this4 = this;

        var lang = template.type;
        var content = _util2.default.attrReplace(template.code);

        var config = _util2.default.getConfig();
        var src = _cache2.default.getSrc();
        var dist = _cache2.default.getDist();
        var self = this;

        var compiler = _loader2.default.loadCompiler(lang);

        if (!compiler) {
            return;
        }

        if (lang === 'pug') {
            var indent = _util2.default.getIndent(content);
            if (indent.firstLineIndent) {
                content = _util2.default.fixIndent(content, indent.firstLineIndent * -1, indent.char);
            }
        }

        compiler(content, config.compilers[lang] || {}).then(function (content) {
            var opath = _path2.default.parse(template.src);
            var node = _compileWpy2.default.createParser(opath).parseFromString(content);
            node = _this4.compileXML(node, template);
            opath.npm = template.npm;
            var target = _util2.default.getDistPath(opath, config.output === 'ant' ? 'axml' : 'wxml', src, dist);

            if (node.childNodes.length === 0) {
                node = '';
            } else {
                if (node.documentElement === null && node.nodeType === 9) {
                    node.nodeType = 11;
                }

                node = node.toString().replace(/xmlns[^\s>]*/g, '');
            }

            var plg = new _loader2.default.PluginHelper(config.plugins, {
                type: 'wxml',
                code: _util2.default.decode(node.toString()),
                file: target,
                output: function output(p) {
                    _util2.default.output(p.action, p.file);
                },
                done: function done(rst) {
                    _util2.default.output('写入', rst.file);
                    rst.code = self.replaceBooleanAttr(rst.code);
                    _util2.default.writeFile(target, rst.code);
                }
            });
        }).catch(function (e) {
            console.log(e);
        });
    }
};