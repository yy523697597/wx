'use strict';

exports.__esModule = true;
exports.default = evaluate;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function evaluate(exp, data) {
    var fn = new Function('data', 'with (data) { return ' + exp + '}');
    try {
        return fn(data);
    } catch (e) {
        console.error(_chalk2.default.red('Error when evaluating filter condition: ' + exp));
    }
}