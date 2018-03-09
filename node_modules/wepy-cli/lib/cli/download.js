'use strict';

exports.__esModule = true;

var _download = require('download');

var _download2 = _interopRequireDefault(_download);

var _downloadGitRepo = require('download-git-repo');

var _downloadGitRepo2 = _interopRequireDefault(_downloadGitRepo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    downloadOfficialZip: function downloadOfficialZip(template, dist, options) {
        var templateName = template.split('#')[0];
        var branch = template.split('#')[1] || 'master';
        return (0, _download2.default)('https://raw.githubusercontent.com/wepyjs/wepy_templates/' + branch + '/zips/' + templateName + '.zip', dist, options);
    },
    downloadRepo: function downloadRepo() {
        return _downloadGitRepo2.default.apply(undefined, arguments);
    }
};