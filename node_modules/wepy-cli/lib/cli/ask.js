'use strict';

exports.__esModule = true;
exports.default = ask;

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _eval = require('./eval');

var _eval2 = _interopRequireDefault(_eval);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var promptMapping = {
    string: 'input',
    boolean: 'confirm'
};

function ask(prompts, data, done) {
    _async2.default.eachSeries(Object.keys(prompts), function (key, next) {
        prompt(data, key, prompts[key], next);
    }, done);
}

function prompt(data, key, prompt, done) {
    if (prompt.when && !(0, _eval2.default)(prompt.when, data)) {
        return done();
    }

    var promptDefault = prompt.default;
    if (typeof prompt.default === 'function') {
        promptDefault = function promptDefault() {
            return prompt.default.bind(this)(data);
        };
    }

    _inquirer2.default.prompt([{
        type: promptMapping[prompt.type] || prompt.type,
        name: key,
        message: prompt.message || prompt.label || key,
        default: promptDefault,
        choices: prompt.choices || [],
        validate: prompt.validate || function () {
            return true;
        }
    }]).then(function (answers) {
        if (Array.isArray(answers[key])) {
            data[key] = {};
            answers[key].forEach(function (multiChoiceAnswer) {
                data[key][multiChoiceAnswer] = true;
            });
        } else if (typeof answers[key] === 'string') {
            data[key] = answers[key].replace(/"/g, '\\"');
        } else {
            data[key] = answers[key];
        }
        done();
    }).catch(done);
}