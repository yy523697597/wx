'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
    _inherits(_default, _wepy$app);

    function _default() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, _default);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _default.__proto__ || Object.getPrototypeOf(_default)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            pages: ['pages/index', 'pages/selectStudent', 'pages/feedback', 'pages/class', 'pages/calendar', 'pages/center', 'pages/detail'],
            window: {
                backgroundTextStyle: 'light',
                navigationBarBackgroundColor: '#fff',
                navigationBarTitleText: 'WeChat',
                navigationBarTextStyle: 'black'
            },
            tabBar: {
                list: [{
                    pagePath: 'pages/center',
                    text: '统计',
                    iconPath: 'pages/img/t.png',
                    selectedIconPath: 'pages/img/thl.png'
                }, {
                    pagePath: 'pages/class',
                    text: '课程',
                    iconPath: 'pages/img/c.png',
                    selectedIconPath: 'pages/img/chl.png'
                }, {
                    pagePath: 'pages/feedback',
                    text: '反馈',
                    iconPath: 'pages/img/f.png',
                    selectedIconPath: 'pages/img/fhl.png'
                }]
            }
        }, _this.customData = {
            phone: 11111111111,
            userName: 'Yui'
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(_default, [{
        key: 'onLaunch',
        value: function onLaunch() {
            console.log(156);
            wx.login({
                success: function success(res) {
                    if (res.code) {
                        wx.request({
                            url: 'https://back.yuiyu.cn/wx/login/getOpenid',
                            data: {
                                code: res.code
                            },
                            success: function success(res) {
                                console.log(res.data);
                                if (res.data.ok) {
                                    wx.setStorageSync('openid', res.data.openid);
                                }
                            }
                        });
                    } else {
                        console.log('获取用户登录态失败！' + res.errMsg);
                    }
                }
            });
        }
    }]);

    return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJsaXN0IiwicGFnZVBhdGgiLCJ0ZXh0IiwiaWNvblBhdGgiLCJzZWxlY3RlZEljb25QYXRoIiwiY3VzdG9tRGF0YSIsInBob25lIiwidXNlck5hbWUiLCJjb25zb2xlIiwibG9nIiwid3giLCJsb2dpbiIsInN1Y2Nlc3MiLCJyZXMiLCJjb2RlIiwicmVxdWVzdCIsInVybCIsImRhdGEiLCJvayIsInNldFN0b3JhZ2VTeW5jIiwib3BlbmlkIiwiZXJyTXNnIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OExBR0lBLE0sR0FBUztBQUNMQyxtQkFBTyxDQUNILGFBREcsRUFFSCxxQkFGRyxFQUdILGdCQUhHLEVBSUgsYUFKRyxFQUtILGdCQUxHLEVBTUgsY0FORyxFQU9ILGNBUEcsQ0FERjtBQVVMQyxvQkFBUTtBQUNKQyxxQ0FBcUIsT0FEakI7QUFFSkMsOENBQThCLE1BRjFCO0FBR0pDLHdDQUF3QixRQUhwQjtBQUlKQyx3Q0FBd0I7QUFKcEIsYUFWSDtBQWdCTEMsb0JBQVE7QUFDSkMsc0JBQU0sQ0FDRjtBQUNJQyw4QkFBVSxjQURkO0FBRUlDLDBCQUFNLElBRlY7QUFHSUMsOEJBQVUsaUJBSGQ7QUFJSUMsc0NBQWtCO0FBSnRCLGlCQURFLEVBT0Y7QUFDSUgsOEJBQVUsYUFEZDtBQUVJQywwQkFBTSxJQUZWO0FBR0lDLDhCQUFVLGlCQUhkO0FBSUlDLHNDQUFrQjtBQUp0QixpQkFQRSxFQWFGO0FBQ0lILDhCQUFVLGdCQURkO0FBRUlDLDBCQUFNLElBRlY7QUFHSUMsOEJBQVUsaUJBSGQ7QUFJSUMsc0NBQWtCO0FBSnRCLGlCQWJFO0FBREY7QUFoQkgsUyxRQXVDVEMsVSxHQUFhO0FBQ1RDLG1CQUFPLFdBREU7QUFFVEMsc0JBQVU7QUFGRCxTOzs7OzttQ0FJRjtBQUNQQyxvQkFBUUMsR0FBUixDQUFZLEdBQVo7QUFDQUMsZUFBR0MsS0FBSCxDQUFTO0FBQ0xDLHlCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDbkIsd0JBQUlBLElBQUlDLElBQVIsRUFBYztBQUNWSiwyQkFBR0ssT0FBSCxDQUFXO0FBQ1BDLGlDQUFLLDBDQURFO0FBRVBDLGtDQUFNO0FBQ0ZILHNDQUFNRCxJQUFJQztBQURSLDZCQUZDO0FBS1BGLHFDQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDbkJMLHdDQUFRQyxHQUFSLENBQVlJLElBQUlJLElBQWhCO0FBQ0Esb0NBQUlKLElBQUlJLElBQUosQ0FBU0MsRUFBYixFQUFpQjtBQUNiUix1Q0FBR1MsY0FBSCxDQUFrQixRQUFsQixFQUE0Qk4sSUFBSUksSUFBSixDQUFTRyxNQUFyQztBQUNIO0FBQ0o7QUFWTSx5QkFBWDtBQVlILHFCQWJELE1BYU87QUFDSFosZ0NBQVFDLEdBQVIsQ0FBWSxlQUFlSSxJQUFJUSxNQUEvQjtBQUNIO0FBQ0o7QUFsQkksYUFBVDtBQW9CSDs7OztFQWxFd0IsZUFBS0MsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBwYWdlczogW1xyXG4gICAgICAgICAgICAncGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgICAncGFnZXMvc2VsZWN0U3R1ZGVudCcsXHJcbiAgICAgICAgICAgICdwYWdlcy9mZWVkYmFjaycsXHJcbiAgICAgICAgICAgICdwYWdlcy9jbGFzcycsXHJcbiAgICAgICAgICAgICdwYWdlcy9jYWxlbmRhcicsXHJcbiAgICAgICAgICAgICdwYWdlcy9jZW50ZXInLFxyXG4gICAgICAgICAgICAncGFnZXMvZGV0YWlsJ1xyXG4gICAgICAgIF0sXHJcbiAgICAgICAgd2luZG93OiB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCcsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1dlQ2hhdCcsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRhYkJhcjoge1xyXG4gICAgICAgICAgICBsaXN0OiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9jZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICfnu5/orqEnLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb25QYXRoOiAncGFnZXMvaW1nL3QucG5nJyxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAncGFnZXMvaW1nL3RobC5wbmcnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvY2xhc3MnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICfor77nqIsnLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb25QYXRoOiAncGFnZXMvaW1nL2MucG5nJyxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAncGFnZXMvaW1nL2NobC5wbmcnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvZmVlZGJhY2snLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICflj43ppognLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb25QYXRoOiAncGFnZXMvaW1nL2YucG5nJyxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAncGFnZXMvaW1nL2ZobC5wbmcnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgY3VzdG9tRGF0YSA9IHtcclxuICAgICAgICBwaG9uZTogMTExMTExMTExMTEsXHJcbiAgICAgICAgdXNlck5hbWU6ICdZdWknXHJcbiAgICB9O1xyXG4gICAgb25MYXVuY2goKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coMTU2KTtcclxuICAgICAgICB3eC5sb2dpbih7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vYmFjay55dWl5dS5jbi93eC9sb2dpbi9nZXRPcGVuaWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiByZXMuY29kZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5vaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdvcGVuaWQnLCByZXMuZGF0YS5vcGVuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfojrflj5bnlKjmiLfnmbvlvZXmgIHlpLHotKXvvIEnICsgcmVzLmVyck1zZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=