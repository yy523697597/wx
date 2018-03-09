#!/usr/bin/env node
'use strict';

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _ttyTable = require('tty-table');

var _ttyTable2 = _interopRequireDefault(_ttyTable);

var _timeAgo = require('time-ago');

var _timeAgo2 = _interopRequireDefault(_timeAgo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports = module.exports = function (program) {
    (0, _request2.default)({
        url: 'https://raw.githubusercontent.com/wepyjs/wepy-templates/master/meta.json',
        headers: {
            'User-Agent': 'wepy-cli'
        }
    }, function (err, res, body) {
        if (!body) {
            console.error('Something wrong with your network');
            return;
        }
        if (body.message) {
            console.error(body.messge);
            return;
        }
        var official = void 0,
            github = void 0;
        try {
            body = JSON.parse(body);
            official = body.official;
            github = body.github;
        } catch (e) {
            console.error('Something wrong with your network');
        }
        if (!program.github && Array.isArray(official)) {
            console.log('\n  Available official templates:\n');

            var tableHead = [{
                value: 'Name',
                width: 20,
                color: 'blue'
            }, {
                value: 'Description',
                width: 60,
                align: 'left',
                paddingLeft: 2,
                key: 'description'
            }];
            var rows = [];
            official.forEach(function (repo) {
                rows.push([repo.name, repo.description]);
            });

            var offical = (0, _ttyTable2.default)(tableHead, rows, {
                borderStyle: 2
            });
            console.log('     e.g., wepy init ' + rows[0][0] + ' myproject');
            console.log(offical.render());
        }
        if (Array.isArray(github)) {
            console.log('\n  Available github projects:\n');

            var _tableHead = [{
                value: 'Repository',
                width: 30,
                color: 'blue',
                key: 'repo'
            }, {
                value: 'Stars',
                width: 8,
                key: 'star'
            }, {
                value: 'Description',
                width: 60,
                align: 'left',
                paddingLeft: 2,
                key: 'description'
            }, {
                value: 'Last Updated',
                width: 25,
                key: 'last_update',
                formatter: function formatter(v) {
                    var date = new Date(v);
                    if (date.toString() === 'Invalid Date') {
                        return '----';
                    } else {
                        return _timeAgo2.default.ago(v);
                    }
                }
            }];

            var map = _tableHead.map(function (v) {
                return v.key;
            });

            var showItems = [];
            var _rows = [];
            var MAX_COUNT = program.github ? 0 : 5;
            if (MAX_COUNT && github.length > MAX_COUNT) {
                for (var i = 0, l = github.length; i < l; i++) {
                    if (i >= MAX_COUNT) break;
                    showItems.push(github[i]);
                }
            } else {
                showItems = github;
            }
            showItems.forEach(function (repo) {
                var row = [];
                map.forEach(function (title, i) {
                    row.push(repo[title] || '');
                });
                _rows.push(row);
            });
            if (MAX_COUNT && github.length > MAX_COUNT) {
                _rows.push(['....', '..', '....', '....']);
            }

            var githubTable = (0, _ttyTable2.default)(_tableHead, _rows, {
                borderStyle: 2
            });
            console.log('     e.g., wepy init ' + _rows[0][0] + ' myproject');
            console.log(githubTable.render());

            if (MAX_COUNT && github.length > MAX_COUNT) {
                console.log(_chalk2.default.gray('  use \'wepy list --github\' to see all github projects'));
            }
            if (program.github) {
                console.log(_chalk2.default.gray('  You can registe your project from here: https://github.com/wepyjs/wepy_templates'));
            }
            console.log('\n');
        }
    });
};