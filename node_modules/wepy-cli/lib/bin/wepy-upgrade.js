'use strict';

var _child_process = require('child_process');

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function upgradeCLI(cb) {
    var cmd = 'npm install wepy-cli -g';
    _util2.default.log('升级中，可能需要几分钟, 请耐心等待...', '信息');
    _util2.default.log('执行命令: ' + cmd, '执行');
    var fcmd = (0, _child_process.exec)(cmd, function () {
        _util2.default.log('完成安装最新版本wepy-cli', '完成');
        cb && cb();
    });
    fcmd.stdout.on('data', function (d) {
        console.log(d.substring(d, d.length - 1));
    });
}

function upgradeWepy(cb) {
    var cmd = 'npm install wepy --save';
    _util2.default.log('升级中，可能需要几分钟, 请耐心等待...', '信息');
    _util2.default.log('执行命令: ' + cmd, '执行');
    var fcmd = (0, _child_process.exec)(cmd, function () {
        _util2.default.log('完成安装最新版本wepy', '完成');

        var cmd = 'wepy build --no-cache';
        _util2.default.log('执行命令: ' + cmd, '执行');

        var fcmd3 = (0, _child_process.exec)(cmd, function () {
            _util2.default.log('完成升级', '完成');
            cb && cb();
        });
        fcmd3.stdout.on('data', function (d) {
            console.log(d.substring(d, d.length - 1));
        });
    });
    fcmd.stdout.on('data', function (d) {
        console.log(d.substring(d, d.length - 1));
    });
}

exports = module.exports = function (program) {
    if (program.cli) {
        upgradeCLI();
    } else {
        upgradeWepy();
    }
};