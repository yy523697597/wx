'use strict';

exports.__esModule = true;

exports.default = function (filepath) {
    var config = _util2.default.getConfig();

    if (config.eslint) {
        var compiler = _loader2.default.load('wepy-eslint');

        if (!compiler) {
            _util2.default.warning('未安装wepy-eslint，执行npm install wepy-eslint --save-dev 或者在wepy.config.js中关闭eslint选项');
            return;
        }

        var esConfig = Object.assign({
            useEslintrc: true,
            extensions: ['.js', config.wpyExt || '.wpy']
        }, config.eslint === true ? {} : config.eslint);
        esConfig.output = false;
        var rst = compiler(esConfig, filepath);
        if (rst) {
            _util2.default.writeLog({ stack: rst }, 'error');
            console.log(rst);
        }
    }
};

var _loader = require('./loader');

var _loader2 = _interopRequireDefault(_loader);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;