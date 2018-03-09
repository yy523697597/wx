'use strict';

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version(require('../../package.json').version, '-v, --version').usage('<command> [options]');

_commander2.default.command('init <template-name> [project-name]').description('generate a new project from a template').action(require('./wepy-init')).usage('<template-name> [project-name]').option('-c --clone', 'use git clone').option('--offline', 'use cached template').on('--help', function () {
    console.log();
    console.log('  Example:');
    console.log();
    console.log(_chalk2.default.gray('   # create a new project with an official template'));
    console.log('  $ wepy init standard my-project');
    console.log();
    console.log(_chalk2.default.gray('   # create a new project straight from a github template'));
    console.log('  $ wepy init username/repo my-project');
    console.log();
});

_commander2.default.command('build').description('build your project').action(require('./wepy-build')).option('-f, --file <file>', '待编译wpy文件').option('-s, --source <source>', '源码目录').option('-t, --target <target>', '生成代码目录').option('-o, --output <type>', '编译类型：web，weapp。默认为weapp').option('-p, --platform <type>', '编译平台：browser, wechat，qq。默认为browser').option('-w, --watch', '监听文件改动').option('--no-cache', '对于引用到的文件，即使无改动也会再次编译');

_commander2.default.command('list').description('list available official templates').action(require('./wepy-list')).option('-g, --github', 'list all registered github projects');

_commander2.default.command('upgrade').description('upgrade to the latest version').action(require('./wepy-upgrade')).option('--cli', 'upgrade wepy-cli').option('--wepy', 'upgrade wepy');

_commander2.default.command('new').description('deprecated command, use "wepy init <template-name> <project-name>" instead').action(require('./wepy-new'));

_commander2.default.parse(process.argv);