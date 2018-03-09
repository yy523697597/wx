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
      pages: ['pages/index', 'pages/class', 'pages/feedback', 'pages/center', 'pages/selectStudent', 'pages/calendar', 'pages/detail'],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJsaXN0IiwicGFnZVBhdGgiLCJ0ZXh0IiwiaWNvblBhdGgiLCJzZWxlY3RlZEljb25QYXRoIiwiY3VzdG9tRGF0YSIsInBob25lIiwidXNlck5hbWUiLCJ3eCIsImxvZ2luIiwic3VjY2VzcyIsInJlcyIsImNvZGUiLCJyZXF1ZXN0IiwidXJsIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJvayIsInNldFN0b3JhZ2VTeW5jIiwib3BlbmlkIiwiZXJyTXNnIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MExBR0VBLE0sR0FBUztBQUNQQyxhQUFPLENBQ0wsYUFESyxFQUVMLGFBRkssRUFHTCxnQkFISyxFQUlMLGNBSkssRUFLTCxxQkFMSyxFQU1MLGdCQU5LLEVBT0wsY0FQSyxDQURBO0FBVVBDLGNBQVE7QUFDTkMsNkJBQXFCLE9BRGY7QUFFTkMsc0NBQThCLE1BRnhCO0FBR05DLGdDQUF3QixRQUhsQjtBQUlOQyxnQ0FBd0I7QUFKbEIsT0FWRDtBQWdCUEMsY0FBUTtBQUNOQyxjQUFNLENBQ0o7QUFDRUMsb0JBQVUsY0FEWjtBQUVFQyxnQkFBTSxJQUZSO0FBR0VDLG9CQUFVLGlCQUhaO0FBSUVDLDRCQUFrQjtBQUpwQixTQURJLEVBT0o7QUFDRUgsb0JBQVUsYUFEWjtBQUVFQyxnQkFBTSxJQUZSO0FBR0VDLG9CQUFVLGlCQUhaO0FBSUVDLDRCQUFrQjtBQUpwQixTQVBJLEVBYUo7QUFDRUgsb0JBQVUsZ0JBRFo7QUFFRUMsZ0JBQU0sSUFGUjtBQUdFQyxvQkFBVSxpQkFIWjtBQUlFQyw0QkFBa0I7QUFKcEIsU0FiSTtBQURBO0FBaEJELEssUUF1Q1RDLFUsR0FBYTtBQUNYQyxhQUFPLFdBREk7QUFFWEMsZ0JBQVU7QUFGQyxLOzs7OzsrQkFJRjtBQUNUQyxTQUFHQyxLQUFILENBQVM7QUFDUEMsaUJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNyQixjQUFJQSxJQUFJQyxJQUFSLEVBQWM7QUFDWkosZUFBR0ssT0FBSCxDQUFXO0FBQ1RDLG1CQUFLLDBDQURJO0FBRVRDLG9CQUFNO0FBQ0pILHNCQUFNRCxJQUFJQztBQUROLGVBRkc7QUFLVEYsdUJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNyQkssd0JBQVFDLEdBQVIsQ0FBWSxZQUFaO0FBQ0Esb0JBQUlOLElBQUlJLElBQUosQ0FBU0csRUFBYixFQUFpQjtBQUNmVixxQkFBR1csY0FBSCxDQUFrQixRQUFsQixFQUE0QlIsSUFBSUksSUFBSixDQUFTSyxNQUFyQztBQUNEO0FBQ0Y7QUFWUSxhQUFYO0FBWUQsV0FiRCxNQWFPO0FBQ0xKLG9CQUFRQyxHQUFSLENBQVksZUFBZU4sSUFBSVUsTUFBL0I7QUFDRDtBQUNGO0FBbEJNLE9BQVQ7QUFvQkQ7Ozs7RUFqRTBCLGVBQUtDLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgcGFnZXM6IFtcclxuICAgICAgJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgJ3BhZ2VzL2NsYXNzJyxcclxuICAgICAgJ3BhZ2VzL2ZlZWRiYWNrJyxcclxuICAgICAgJ3BhZ2VzL2NlbnRlcicsXHJcbiAgICAgICdwYWdlcy9zZWxlY3RTdHVkZW50JyxcclxuICAgICAgJ3BhZ2VzL2NhbGVuZGFyJyxcclxuICAgICAgJ3BhZ2VzL2RldGFpbCdcclxuICAgIF0sXHJcbiAgICB3aW5kb3c6IHtcclxuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcclxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnV2VDaGF0JyxcclxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJ1xyXG4gICAgfSxcclxuICAgIHRhYkJhcjoge1xyXG4gICAgICBsaXN0OiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9jZW50ZXInLFxyXG4gICAgICAgICAgdGV4dDogJ+e7n+iuoScsXHJcbiAgICAgICAgICBpY29uUGF0aDogJ3BhZ2VzL2ltZy90LnBuZycsXHJcbiAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAncGFnZXMvaW1nL3RobC5wbmcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2NsYXNzJyxcclxuICAgICAgICAgIHRleHQ6ICfor77nqIsnLFxyXG4gICAgICAgICAgaWNvblBhdGg6ICdwYWdlcy9pbWcvYy5wbmcnLFxyXG4gICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ3BhZ2VzL2ltZy9jaGwucG5nJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9mZWVkYmFjaycsXHJcbiAgICAgICAgICB0ZXh0OiAn5Y+N6aaIJyxcclxuICAgICAgICAgIGljb25QYXRoOiAncGFnZXMvaW1nL2YucG5nJyxcclxuICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdwYWdlcy9pbWcvZmhsLnBuZydcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH1cclxuICB9O1xyXG4gIGN1c3RvbURhdGEgPSB7XHJcbiAgICBwaG9uZTogMTExMTExMTExMTEsXHJcbiAgICB1c2VyTmFtZTogJ1l1aSdcclxuICB9O1xyXG4gIG9uTGF1bmNoKCkge1xyXG4gICAgd3gubG9naW4oe1xyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICBpZiAocmVzLmNvZGUpIHtcclxuICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6ICdodHRwczovL2JhY2sueXVpeXUuY24vd3gvbG9naW4vZ2V0T3BlbmlkJyxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgIGNvZGU6IHJlcy5jb2RlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmiJDlip/ojrflj5ZvcGVuSWQnKTtcclxuICAgICAgICAgICAgICBpZiAocmVzLmRhdGEub2spIHtcclxuICAgICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdvcGVuaWQnLCByZXMuZGF0YS5vcGVuaWQpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCfojrflj5bnlKjmiLfnmbvlvZXmgIHlpLHotKXvvIEnICsgcmVzLmVyck1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19