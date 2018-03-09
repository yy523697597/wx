'use strict';

var _compile = require('../compile');

var _compile2 = _interopRequireDefault(_compile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports = module.exports = function (program) {

	if (_compile2.default.init(program)) {
		_compile2.default.build(program);
	}
};