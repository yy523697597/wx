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
            pages: ['pages/feedback', 'pages/class', 'pages/index', 'pages/center', 'pages/selectStudent', 'pages/calendar', 'pages/detail'],
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
            wx.login({
                success: function success(res) {
                    if (res.code) {
                        wx.request({
                            url: 'https://back.yuiyu.cn/wx/login/getOpenid',
                            data: {
                                code: res.code
                            },
                            success: function success(res) {
                                console.log('成功获取openId');
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJsaXN0IiwicGFnZVBhdGgiLCJ0ZXh0IiwiaWNvblBhdGgiLCJzZWxlY3RlZEljb25QYXRoIiwiY3VzdG9tRGF0YSIsInBob25lIiwidXNlck5hbWUiLCJ3eCIsImxvZ2luIiwic3VjY2VzcyIsInJlcyIsImNvZGUiLCJyZXF1ZXN0IiwidXJsIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJvayIsInNldFN0b3JhZ2VTeW5jIiwib3BlbmlkIiwiZXJyTXNnIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OExBR0lBLE0sR0FBUztBQUNMQyxtQkFBTyxDQUNILGdCQURHLEVBRUgsYUFGRyxFQUdILGFBSEcsRUFJSCxjQUpHLEVBS0gscUJBTEcsRUFNSCxnQkFORyxFQU9ILGNBUEcsQ0FERjtBQVVMQyxvQkFBUTtBQUNKQyxxQ0FBcUIsT0FEakI7QUFFSkMsOENBQThCLE1BRjFCO0FBR0pDLHdDQUF3QixRQUhwQjtBQUlKQyx3Q0FBd0I7QUFKcEIsYUFWSDtBQWdCTEMsb0JBQVE7QUFDSkMsc0JBQU0sQ0FDRjtBQUNJQyw4QkFBVSxjQURkO0FBRUlDLDBCQUFNLElBRlY7QUFHSUMsOEJBQVUsaUJBSGQ7QUFJSUMsc0NBQWtCO0FBSnRCLGlCQURFLEVBT0Y7QUFDSUgsOEJBQVUsYUFEZDtBQUVJQywwQkFBTSxJQUZWO0FBR0lDLDhCQUFVLGlCQUhkO0FBSUlDLHNDQUFrQjtBQUp0QixpQkFQRSxFQWFGO0FBQ0lILDhCQUFVLGdCQURkO0FBRUlDLDBCQUFNLElBRlY7QUFHSUMsOEJBQVUsaUJBSGQ7QUFJSUMsc0NBQWtCO0FBSnRCLGlCQWJFO0FBREY7QUFoQkgsUyxRQXVDVEMsVSxHQUFhO0FBQ1RDLG1CQUFPLFdBREU7QUFFVEMsc0JBQVU7QUFGRCxTOzs7OzttQ0FJRjtBQUNQQyxlQUFHQyxLQUFILENBQVM7QUFDTEMseUJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNuQix3QkFBSUEsSUFBSUMsSUFBUixFQUFjO0FBQ1ZKLDJCQUFHSyxPQUFILENBQVc7QUFDUEMsaUNBQUssMENBREU7QUFFUEMsa0NBQU07QUFDRkgsc0NBQU1ELElBQUlDO0FBRFIsNkJBRkM7QUFLUEYscUNBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNuQkssd0NBQVFDLEdBQVIsQ0FBWSxZQUFaO0FBQ0Esb0NBQUlOLElBQUlJLElBQUosQ0FBU0csRUFBYixFQUFpQjtBQUNiVix1Q0FBR1csY0FBSCxDQUFrQixRQUFsQixFQUE0QlIsSUFBSUksSUFBSixDQUFTSyxNQUFyQztBQUNIO0FBQ0o7QUFWTSx5QkFBWDtBQVlILHFCQWJELE1BYU87QUFDSEosZ0NBQVFDLEdBQVIsQ0FBWSxlQUFlTixJQUFJVSxNQUEvQjtBQUNIO0FBQ0o7QUFsQkksYUFBVDtBQW9CSDs7OztFQWpFd0IsZUFBS0MsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBwYWdlczogW1xyXG4gICAgICAgICAgICAncGFnZXMvZmVlZGJhY2snLFxyXG4gICAgICAgICAgICAncGFnZXMvY2xhc3MnLFxyXG4gICAgICAgICAgICAncGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgICAncGFnZXMvY2VudGVyJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL3NlbGVjdFN0dWRlbnQnLFxyXG4gICAgICAgICAgICAncGFnZXMvY2FsZW5kYXInLFxyXG4gICAgICAgICAgICAncGFnZXMvZGV0YWlsJ1xyXG4gICAgICAgIF0sXHJcbiAgICAgICAgd2luZG93OiB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCcsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1dlQ2hhdCcsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRhYkJhcjoge1xyXG4gICAgICAgICAgICBsaXN0OiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9jZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICfnu5/orqEnLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb25QYXRoOiAncGFnZXMvaW1nL3QucG5nJyxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAncGFnZXMvaW1nL3RobC5wbmcnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvY2xhc3MnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICfor77nqIsnLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb25QYXRoOiAncGFnZXMvaW1nL2MucG5nJyxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAncGFnZXMvaW1nL2NobC5wbmcnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvZmVlZGJhY2snLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICflj43ppognLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb25QYXRoOiAncGFnZXMvaW1nL2YucG5nJyxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAncGFnZXMvaW1nL2ZobC5wbmcnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgY3VzdG9tRGF0YSA9IHtcclxuICAgICAgICBwaG9uZTogMTExMTExMTExMTEsXHJcbiAgICAgICAgdXNlck5hbWU6ICdZdWknXHJcbiAgICB9O1xyXG4gICAgb25MYXVuY2goKSB7XHJcbiAgICAgICAgd3gubG9naW4oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdodHRwczovL2JhY2sueXVpeXUuY24vd3gvbG9naW4vZ2V0T3BlbmlkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogcmVzLmNvZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5oiQ5Yqf6I635Y+Wb3BlbklkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEub2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnb3BlbmlkJywgcmVzLmRhdGEub3BlbmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn6I635Y+W55So5oi355m75b2V5oCB5aSx6LSl77yBJyArIHJlcy5lcnJNc2cpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19