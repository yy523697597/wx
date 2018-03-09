'use strict';

exports.__esModule = true;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    isLocalPath: function isLocalPath(templatePath) {
        return (/^[./]|(^[a-zA-Z]:)/.test(templatePath)
        );
    },
    getTemplatePath: function getTemplatePath(templatePath) {
        return _path2.default.isAbsolute(templatePath) ? templatePath : _path2.default.normalize(_path2.default.join(process.cwd(), templatePath));
    }
};