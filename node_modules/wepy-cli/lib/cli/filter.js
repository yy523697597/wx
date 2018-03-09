'use strict';

exports.__esModule = true;
exports.default = filter;

var _minimatch = require('minimatch');

var _minimatch2 = _interopRequireDefault(_minimatch);

var _eval = require('./eval');

var _eval2 = _interopRequireDefault(_eval);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filter(files, filters, data, done) {
    if (!filters) {
        return done();
    }
    var fileNames = Object.keys(files);
    Object.keys(filters).forEach(function (glob) {
        fileNames.forEach(function (file) {
            if ((0, _minimatch2.default)(file, glob, { dot: true })) {
                var condition = filters[glob];
                if (!(0, _eval2.default)(condition, data)) {
                    delete files[file];
                }
            }
        });
    });
    done();
}