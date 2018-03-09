'use strict';

exports.__esModule = true;
exports.default = generate;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _metalsmith = require('metalsmith');

var _metalsmith2 = _interopRequireDefault(_metalsmith);

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _ncp = require('ncp');

var _ncp2 = _interopRequireDefault(_ncp);

var _consolidate = require('consolidate');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _multimatch = require('multimatch');

var _multimatch2 = _interopRequireDefault(_multimatch);

var _options = require('./options');

var _options2 = _interopRequireDefault(_options);

var _ask = require('./ask');

var _ask2 = _interopRequireDefault(_ask);

var _filter = require('./filter');

var _filter2 = _interopRequireDefault(_filter);

var _logger = require('./logger');

var logger = _interopRequireWildcard(_logger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_handlebars2.default.registerHelper('if_eq', function (a, b, opts) {
    return a === b ? opts.fn(this) : opts.inverse(this);
});

_handlebars2.default.registerHelper('unless_eq', function (a, b, opts) {
    return a === b ? opts.inverse(this) : opts.fn(this);
});

function generate(name, src, dest, done) {
    var opts = (0, _options2.default)(name, src);

    if (opts.status === false) {
        _ncp2.default.ncp(src, dest, function (err) {
            done(err);
        });
        return {};
    }
    var metalsmith = (0, _metalsmith2.default)(_path2.default.join(src, 'template'));
    var data = Object.assign(metalsmith.metadata(), {
        destDirName: name,
        inPlace: dest === process.cwd(),
        noEscape: true
    });
    opts.helpers && Object.keys(opts.helpers).map(function (key) {
        _handlebars2.default.registerHelper(key, opts.helpers[key]);
    });

    var helpers = { chalk: _chalk2.default, logger: logger };

    if (opts.metalsmith && typeof opts.metalsmith.before === 'function') {
        opts.metalsmith.before(metalsmith, opts, helpers);
    }

    metalsmith.use(askQuestions(opts.prompts)).use(filterFiles(opts.filters)).use(renderTemplateFiles(opts.skipInterpolation));

    if (typeof opts.metalsmith === 'function') {
        opts.metalsmith(metalsmith, opts, helpers);
    } else if (opts.metalsmith && typeof opts.metalsmith.after === 'function') {
        opts.metalsmith.after(metalsmith, opts, helpers);
    }

    metalsmith.clean(false).source('.').destination(dest).build(function (err, files) {
        done(err);
        if (typeof opts.complete === 'function') {
            var _helpers = { chalk: _chalk2.default, logger: logger, files: files };
            opts.complete(data, _helpers);
        } else {
            logMessage(opts.completeMessage, data);
        }
    });

    return data;
}

function askQuestions(prompts) {
    return function (files, metalsmith, done) {
        (0, _ask2.default)(prompts, metalsmith.metadata(), done);
    };
}

function filterFiles(filters) {
    return function (files, metalsmith, done) {
        (0, _filter2.default)(files, filters, metalsmith.metadata(), done);
    };
}

function renderTemplateFiles(skipInterpolation) {
    skipInterpolation = typeof skipInterpolation === 'string' ? [skipInterpolation] : skipInterpolation;
    return function (files, metalsmith, done) {
        var keys = Object.keys(files);
        var metalsmithMetadata = metalsmith.metadata();
        _async2.default.each(keys, function (file, next) {
            if (skipInterpolation && (0, _multimatch2.default)([file], skipInterpolation, { dot: true }).length) {
                return next();
            }
            var str = files[file].contents.toString();

            if (!/{{([^{}]+)}}/g.test(str)) {
                return next();
            }
            _consolidate.handlebars.render(str, metalsmithMetadata, function (err, res) {
                if (err) {
                    err.message = '[' + file + '] ' + err.message;
                    return next(err);
                }
                files[file].contents = new Buffer(res);
                next();
            });
        }, done);
    };
}

function logMessage(message, data) {
    if (!message) return;
    _consolidate.handlebars.render(message, data, function (err, res) {
        if (err) {
            console.error('\n   Error when rendering template complete message: ' + err.message.trim());
        } else {
            console.log('\n' + res.split(/\r?\n/g).map(function (line) {
                return '   ' + line;
            }).join('\n'));
        }
    });
}