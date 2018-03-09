'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _child_process = require('child_process');

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _compile = require('./compile');

var _compile2 = _interopRequireDefault(_compile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var displayVersion = function displayVersion() {
    var version = _util2.default.getVersion();
    var chars = ['   _    _  ____  ____  _  _ ', '( \/\/ )( ___)(  _ \( \/ )', ' )    (  )__)  )___/ \  / ', '(__/\__)(____)(__)   (__) ', '                                         '].join('\n');
    console.log('\n v' + version + '\n');
    console.log(chars);
};

var generateProject = function generateProject(name, config) {

    var inPlace = !name || name === '.';

    if (inPlace) {
        name = process.cwd().split(_path2.default.sep).pop();
        _util2.default.log('使用当前目录：' + name);
    } else {
        _util2.default.log('目录：' + name, '创建');

        if (_util2.default.mkdir(name) !== true) {
            _util2.default.error('创建目录失败。');
            return;
        }

        process.chdir(name);
    }

    _util2.default.currentDir = process.cwd();

    var packagePath = _path2.default.join(_util2.default.currentDir, 'package.json');

    if (_util2.default.isFile(packagePath) || _util2.default.isDir(_path2.default.join(_util2.default.currentDir, 'src'))) {
        _util2.default.error('目录不为空, 请请勿重复初始化', '错误');
        return;
    }

    var tplDir = '../templates/';
    var templateDir = _path2.default.join(_util2.default.cliDir, tplDir + 'template', _path2.default.sep);
    var emptyDir = _path2.default.join(_util2.default.cliDir, tplDir + 'empty', _path2.default.sep);
    var confDir = _path2.default.join(_util2.default.cliDir, tplDir + 'conf', _path2.default.sep);

    var template = config.empty ? emptyDir : templateDir;

    var useRedux = !config.empty && config.redux;

    var pkg = _path2.default.join(template, 'package.json');
    pkg = _util2.default.readFile(pkg);
    pkg = JSON.parse(pkg);
    pkg.name = name;

    var dependencies = ['wepy'];
    var devDependencies = ['wepy-compiler-babel', 'babel-plugin-transform-decorators-legacy', 'babel-plugin-transform-export-extensions', 'babel-plugin-transform-class-properties', 'babel-plugin-transform-object-rest-spread', 'babel-preset-env', 'wepy-compiler-less', 'cross-env'];
    var eslintDeps = ['eslint@3.18.0', 'babel-eslint@7.2.1', 'eslint-config-standard@7.1.0', 'eslint-friendly-formatter@2.0.7', 'eslint-plugin-html@2.0.1', 'eslint-plugin-promise@3.5.0', 'eslint-plugin-standard@2.0.1', 'wepy-eslint'];
    var reduxDeps = ['redux', 'wepy-redux', 'redux-promise', 'redux-actions'];

    if (!config.empty) {
        dependencies.push('wepy-com-toast');
        dependencies.push('wepy-async-function');
    }
    if (useRedux) {
        dependencies = dependencies.concat(reduxDeps);
    }

    if (config.lint) {
        devDependencies = devDependencies.concat(eslintDeps);
    }

    _util2.default.writeFile(packagePath, JSON.stringify(pkg));
    _util2.default.log('配置: ' + 'package.json', '写入');

    var files = _util2.default.getFiles(template).filter(function (file) {
        return file !== 'package.json';
    });

    var copyFn = function copyFn(sourcePath) {
        return function (file) {
            var append = file === 'gitignore' ? '.' : '';
            var target = _path2.default.join(_util2.default.currentDir, append + file);

            if (['.editorconfig', '.eslintignore', '.eslintrc'].indexOf(file) !== -1 && !config.lint) return;

            var unReduxFiles = [_path2.default.join('src', 'app.wpy'), _path2.default.join('src', 'pages', 'index.wpy'), _path2.default.join('src', 'components', 'counter.wpy')];
            var reduxFiles = [_path2.default.join('src', 'app-redux.wpy'), _path2.default.join('src', 'pages', 'index-redux.wpy'), _path2.default.join('src', 'components', 'counter-redux.wpy')];
            var index = reduxFiles.indexOf(file);
            if (useRedux) {
                if (unReduxFiles.indexOf(file) !== -1) {
                    return;
                }

                if (index >= 0) {
                    target = _path2.default.join(_util2.default.currentDir, unReduxFiles[index]);
                }
            } else if (index !== -1 || file.indexOf(_path2.default.join('src', 'store')) === 0) {
                return;
            }

            var fileContent = _util2.default.readFile(_path2.default.join(sourcePath, file));
            if (file === 'wepy.config.js') {
                if (!config.lint) {
                    fileContent = fileContent.replace(/\s*eslint\: true,/ig, '');
                }
            }
            _util2.default.writeFile(target, fileContent);
            _util2.default.log('文件: ' + file, '拷贝');
        };
    };
    files.forEach(copyFn(template));

    var cmd = 'npm install --save ' + dependencies.join(' ');
    var cmdDev = 'npm install --save-dev ' + devDependencies.join(' ');
    _util2.default.log('执行命令: ' + cmd, '执行');
    _util2.default.log('执行命令: ' + cmdDev, '执行');
    _util2.default.log('可能需要几分钟, 请耐心等待...', '信息');

    _util2.default.exec(cmd).then(function (d) {
        return _util2.default.exec(cmdDev);
    }).then(function (d) {
        _util2.default.log('安装依赖完成', '完成');

        var cmd = 'wepy build';
        _util2.default.log('执行命令: ' + cmd, '执行');
        _util2.default.log('可能需要几分钟, 请耐心等待...', '信息');

        _util2.default.exec(cmd).then(function (d) {
            _util2.default.log('代码编译完成', '完成');
            _util2.default.log('项目初始化完成, 可以开始使用小程序。', '完成');
        }).catch(function (e) {
            _util2.default.log('代码编译出错', '错误');
        });
    }).catch(function (e) {
        _util2.default.log('安装依赖出错', '错误');
    });
};

var upgradeCLI = function upgradeCLI(cb) {
    var cmd = 'npm install wepy-cli -g';
    _util2.default.log('升级中，可能需要几分钟, 请耐心等待...', '信息');
    _util2.default.log('执行命令: ' + cmd, '执行');
    var fcmd = (0, _child_process.exec)(cmd, function () {
        _util2.default.log('完成安装最新版本wepy-cli', '完成');
        cb && cb();
    });
    fcmd.stdout.on('data', function (d) {
        console.log(d.substring(d, d.length - 1));
    });
};

var upgradeWepy = function upgradeWepy(cb) {
    var cmd = 'npm install wepy --save';
    _util2.default.log('升级中，可能需要几分钟, 请耐心等待...', '信息');
    _util2.default.log('执行命令: ' + cmd, '执行');
    var fcmd = (0, _child_process.exec)(cmd, function () {
        _util2.default.log('完成安装最新版本wepy', '完成');

        var cmd = 'wepy build --no-cache';
        _util2.default.log('执行命令: ' + cmd, '执行');

        var fcmd3 = (0, _child_process.exec)(cmd, function () {
            _util2.default.log('完成升级', '完成');
            cb && cb();
        });
        fcmd3.stdout.on('data', function (d) {
            console.log(d.substring(d, d.length - 1));
        });
    });
    fcmd.stdout.on('data', function (d) {
        console.log(d.substring(d, d.length - 1));
    });
};

var upgrade = function upgrade(name) {
    upgradeWepy();
};

var checkUpdates = function checkUpdates() {
    _util2.default.timeoutExec(3, 'npm info wepy-cli', true).then(function (d) {
        var last = d.match(/latest\:\s\'([\d\.]*)\'/);
        last = last ? last[1] : undefined;
        var me = _util2.default.getVersion();
        if (last && last !== me) {
            var lastArr = last.split('.');
            var meArr = me.split('.');
            var lastBig = lastArr[0] + '.' + lastArr[1];
            var meBig = meArr[0] + '.' + meArr[1];
            var fixedLast = lastArr[2];
            var fixedMe = meArr[2];

            if (lastBig - meBig > 0) {
                _util2.default.warning('\u5F53\u524D\u7248\u672C' + me + '\uFF0C\u6700\u65B0\u7248\u672C' + last);
                _util2.default.warning('跨版本升级可能不去向下兼容，升级前请查看CHANGLOG了解所有更新。');
            } else {
                if (parseInt(fixedLast) - parseInt(fixedMe) >= 0) {
                    _util2.default.warning('\u5F53\u524D\u7248\u672C' + me + '\uFF0C\u6700\u65B0\u7248\u672C' + last);
                    _util2.default.warning('请关注版本更新日志：https://github.com/wepyjs/wepy/blob/master/CHANGELOG.md');
                    _util2.default.warning('升级命令：npm install wepy-cli -g');
                } else {
                    var tag = fixedMe.replace(/\d/g, '').replace(/-/, '');
                    _util2.default.warning('\u5F53\u524D\u4F7F\u7528\u7684\u662F' + tag + '\u7248\u672C' + me + '\uFF0C\u65E0\u7279\u6B8A\u60C5\u51B5\u5EFA\u8BAE\u4F7F\u7528\u6B63\u5F0F\u7248\u672C' + last);
                    _util2.default.warning('\u5347\u7EA7\u6B63\u5F0F\u7248\u547D\u4EE4\uFF1Anpm install wepy-cli@' + last + ' -g');
                }
            }
        }
    }).catch(function (e) {});
};
checkUpdates();

if (Number(process.version.match(/^v(\d+\.\d+)/)[1]) < 5) {
    _util2.default.error('检测到当前Node.js版本过低，请升级Node.js到5以上版本，NPM升级到3以上版本。');
    process.exit(1);
}

_commander2.default.usage('[command] <options ...>');
_commander2.default.option('-v, --version', '显示版本号', function () {
    displayVersion();
});

_commander2.default.command('build').description('编译项目').option('-f, --file <file>', '待编译wpy文件').option('-s, --source <source>', '源码目录').option('-t, --target <target>', '生成代码目录').option('-o, --output <type>', '编译类型：web，weapp。默认为weapp').option('-p, --platform <type>', '编译平台：browser, wechat，qq。默认为browser').option('-w, --watch', '监听文件改动').option('--no-cache', '对于引用到的文件，即使无改动也会再次编译').action(function (cmd) {
    if (_compile2.default.init(cmd)) {
        _compile2.default.build(cmd);
    }
});

_commander2.default.command('new <projectName>').description('生成项目').option('--empty', '使用new生成项目时，生成空项目内容').option('--no-lint', '使用new生成项目时，禁用eslint').option('--redux', '使用new生成项目时，增加redux相关内容').action(function (name, cmd) {
    generateProject(name || 'temp', cmd);
});

_commander2.default.command('upgrade').description('升级wepyjs版本').action(function (name) {
    upgrade();
});

_commander2.default.parse(process.argv);