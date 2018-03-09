'use strict';

exports.__esModule = true;
exports.default = checkVersion;

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkVersion(done) {
    if (!_semver2.default.satisfies(process.version, _package2.default.engines.node)) {
        return console.log(_chalk2.default.red('  You must upgrade node to >=' + _package2.default.engines.node + '.x to use wepy-cli'));
    }
    (0, _request2.default)({
        url: 'https://registry.npmjs.org/wepy-cli',
        timeout: 1000
    }, function (err, res, body) {
        if (!err && res.statusCode === 200) {
            var latestVersion = JSON.parse(body)['dist-tags'].latest;
            var localVersion = _package2.default.version;
            if (_semver2.default.lt(localVersion, latestVersion)) {
                console.log(_chalk2.default.yellow('  A newer version of wepy-cli is available.'));
                console.log();
                console.log('  latest:    ' + _chalk2.default.green(latestVersion));
                console.log('  installed: ' + _chalk2.default.red(localVersion));
                console.log();
            }
        }
        done();
    });
}