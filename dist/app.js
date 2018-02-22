'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


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

    return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJsaXN0IiwicGFnZVBhdGgiLCJ0ZXh0IiwiaWNvblBhdGgiLCJzZWxlY3RlZEljb25QYXRoIiwiY3VzdG9tRGF0YSIsInBob25lIiwidXNlck5hbWUiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OExBR0lBLE0sR0FBUztBQUNMQyxtQkFBTyxDQUNILGFBREcsRUFFSCxxQkFGRyxFQUdILGdCQUhHLEVBSUgsYUFKRyxFQUtILGdCQUxHLEVBTUgsY0FORyxFQU9ILGNBUEcsQ0FERjtBQVVMQyxvQkFBUTtBQUNKQyxxQ0FBcUIsT0FEakI7QUFFSkMsOENBQThCLE1BRjFCO0FBR0pDLHdDQUF3QixRQUhwQjtBQUlKQyx3Q0FBd0I7QUFKcEIsYUFWSDtBQWdCTEMsb0JBQVE7QUFDSkMsc0JBQU0sQ0FDRjtBQUNJQyw4QkFBVSxjQURkO0FBRUlDLDBCQUFNLElBRlY7QUFHSUMsOEJBQVUsaUJBSGQ7QUFJSUMsc0NBQWtCO0FBSnRCLGlCQURFLEVBT0Y7QUFDSUgsOEJBQVUsYUFEZDtBQUVJQywwQkFBTSxJQUZWO0FBR0lDLDhCQUFVLGlCQUhkO0FBSUlDLHNDQUFrQjtBQUp0QixpQkFQRSxFQWFGO0FBQ0lILDhCQUFVLGdCQURkO0FBRUlDLDBCQUFNLElBRlY7QUFHSUMsOEJBQVUsaUJBSGQ7QUFJSUMsc0NBQWtCO0FBSnRCLGlCQWJFO0FBREY7QUFoQkgsUyxRQXVDVEMsVSxHQUFhO0FBQ1RDLG1CQUFPLFdBREU7QUFFVEMsc0JBQVU7QUFGRCxTOzs7O0VBeENZLGVBQUtDLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgcGFnZXM6IFtcclxuICAgICAgICAgICAgJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgICAgJ3BhZ2VzL3NlbGVjdFN0dWRlbnQnLFxyXG4gICAgICAgICAgICAncGFnZXMvZmVlZGJhY2snLFxyXG4gICAgICAgICAgICAncGFnZXMvY2xhc3MnLFxyXG4gICAgICAgICAgICAncGFnZXMvY2FsZW5kYXInLFxyXG4gICAgICAgICAgICAncGFnZXMvY2VudGVyJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2RldGFpbCdcclxuICAgICAgICBdLFxyXG4gICAgICAgIHdpbmRvdzoge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdXZUNoYXQnLFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnYmxhY2snXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0YWJCYXI6IHtcclxuICAgICAgICAgICAgbGlzdDogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn57uf6K6hJyxcclxuICAgICAgICAgICAgICAgICAgICBpY29uUGF0aDogJ3BhZ2VzL2ltZy90LnBuZycsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ3BhZ2VzL2ltZy90aGwucG5nJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2NsYXNzJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn6K++56iLJyxcclxuICAgICAgICAgICAgICAgICAgICBpY29uUGF0aDogJ3BhZ2VzL2ltZy9jLnBuZycsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ3BhZ2VzL2ltZy9jaGwucG5nJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2ZlZWRiYWNrJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn5Y+N6aaIJyxcclxuICAgICAgICAgICAgICAgICAgICBpY29uUGF0aDogJ3BhZ2VzL2ltZy9mLnBuZycsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ3BhZ2VzL2ltZy9maGwucG5nJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGN1c3RvbURhdGEgPSB7XHJcbiAgICAgICAgcGhvbmU6IDExMTExMTExMTExLFxyXG4gICAgICAgIHVzZXJOYW1lOiAnWXVpJ1xyXG4gICAgfTtcclxufVxyXG4iXX0=