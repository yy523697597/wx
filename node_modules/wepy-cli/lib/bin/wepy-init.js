'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _tildify = require('tildify');

var _tildify2 = _interopRequireDefault(_tildify);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _userHome = require('user-home');

var _userHome2 = _interopRequireDefault(_userHome);

var _rimraf = require('rimraf');

var _download = require('../cli/download');

var _download2 = _interopRequireDefault(_download);

var _localPath = require('../cli/local-path');

var _localPath2 = _interopRequireDefault(_localPath);

var _checkVersion = require('../cli/check-version');

var _checkVersion2 = _interopRequireDefault(_checkVersion);

var _generate = require('../cli/generate');

var _generate2 = _interopRequireDefault(_generate);

var _logger = require('../cli/logger');

var logger = _interopRequireWildcard(_logger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports = module.exports = function (template, rawName, program) {
    function gen(templatePath) {
        (0, _generate2.default)(name, templatePath, to, function (err) {
            if (err) logger.fatal(err);
            console.log();
            logger.success('Generated "%s".', name);
        });
    }

    function run() {
        if (_localPath2.default.isLocalPath(template)) {
            var templatePath = _localPath2.default.getTemplatePath(template);
            if (_fs2.default.existsSync(templatePath)) {
                gen(templatePath);
            } else {
                logger.fatal('Local template "%s" not found.', template);
            }
        } else {
            (0, _checkVersion2.default)(function () {
                downloadAndGenerate(template);
            });
        }
    }

    function downloadAndGenerate(template) {
        var spinner = (0, _ora2.default)('downloading template');
        spinner.start();

        if (_fs2.default.existsSync(tmp)) {
            (0, _rimraf.sync)(tmp);
        }

        if (!hasSlash) {
            _download2.default.downloadOfficialZip(template, tmp, { extract: true }).then(function () {
                spinner.stop();
                gen(tmp);
            }).catch(function (e) {
                if (e.statusCode === 404) {
                    logger.fatal('Unrecongnized template: "' + template + '". Try "wepy list" to show all available templates ');
                } else if (e) {
                    logger.fatal('Failed to download repo ' + template + ': ' + e.message.trim());
                }
            });
        } else {
            _download2.default.downloadRepo(template, tmp, { clone: clone }, function (err) {
                spinner.stop();
                if (err) logger.fatal('Failed to download repo ' + template + ': ' + err.message.trim());
                gen(tmp);
            });
        }
    }

    var hasSlash = template.indexOf('/') > -1;
    var inPlace = !rawName || rawName === '.';
    var name = inPlace ? _path2.default.relative('../', process.cwd()) : rawName;
    var to = _path2.default.resolve(rawName || '.');
    var clone = program.clone || false;
    var offline = program.offline || false;
    var tmp = _path2.default.join(_userHome2.default, '.wepy_templates', template.replace(/\//g, '-'));

    if (offline) {
        console.log('> Use cached template at ' + _chalk2.default.yellow((0, _tildify2.default)(tmp)));
        template = tmp;
    }

    if (_fs2.default.existsSync(to)) {
        _inquirer2.default.prompt([{
            type: 'confirm',
            message: inPlace ? 'Generate project in current directory?' : 'Target directory exists. Continue?',
            name: 'ok'
        }]).then(function (answers) {
            if (answers.ok) {
                run();
            }
        }).catch();
    } else {
        run();
    }
};