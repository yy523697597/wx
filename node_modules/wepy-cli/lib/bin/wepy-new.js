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

exports = module.exports = function (proj) {
  if (typeof proj !== 'string') proj = 'myproject';
  console.log('');
  console.log('deprecated command, please use ' + _chalk2.default.blue('wepy init standard ' + proj) + ' instead');
  console.log('');
};