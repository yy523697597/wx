'use strict';

exports.__esModule = true;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

var _loader = require('./loader');

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    compile: function compile(config, opath) {
        var src = _cache2.default.getSrc();
        var dist = _cache2.default.getDist();
        var wepyrc = _cache2.default.getConfig();
        if (wepyrc.output === 'ant' && config.navigationBarTitleText && !config.defaultTitle) {
            config.defaultTitle = config.navigationBarTitleText;
        }
        var target = _util2.default.getDistPath(opath, 'json', src, dist);
        var plg = new _loader2.default.PluginHelper(wepyrc.plugins, {
            type: 'config',
            code: JSON.stringify(config),
            file: target,
            output: function output(p) {
                _util2.default.output(p.action, p.file);
            },
            done: function done(result) {
                _util2.default.output('写入', result.file);
                _util2.default.writeFile(target, result.code);
            }
        });
    }
};