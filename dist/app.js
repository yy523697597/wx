"use strict";

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
      pages: ["pages/index", "pages/class", "pages/feedback", "pages/center", "pages/selectStudent", "pages/calendar", "pages/detail"],
      window: {
        backgroundTextStyle: "light",
        navigationBarBackgroundColor: "#fff",
        navigationBarTitleText: "WeChat",
        navigationBarTextStyle: "black"
      },
      tabBar: {
        list: [{
          pagePath: "pages/center",
          text: "统计",
          iconPath: "pages/img/t.png",
          selectedIconPath: "pages/img/thl.png"
        }, {
          pagePath: "pages/class",
          text: "课程",
          iconPath: "pages/img/c.png",
          selectedIconPath: "pages/img/chl.png"
        }, {
          pagePath: "pages/feedback",
          text: "反馈",
          iconPath: "pages/img/f.png",
          selectedIconPath: "pages/img/fhl.png"
        }]
      }
    }, _this.customData = {
      phone: 11111111111,
      userName: "Yui"
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_default, [{
    key: "onLaunch",
    value: function onLaunch() {
      wx.login({
        success: function success(res) {
          console.log(res);

          if (res.code) {
            wx.request({
              url: "https://back.yuiyu.cn/wx/login/getOpenid",
              data: {
                code: res.code
              },
              success: function success(res) {
                console.log("成功获取openId");
                console.log(res);

                if (res.data.ok) {
                  wx.setStorageSync("openid", res.data.openid);
                }
              }
            });
          } else {
            console.log("获取用户登录态失败！" + res.errMsg);
          }
        }
      });
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJsaXN0IiwicGFnZVBhdGgiLCJ0ZXh0IiwiaWNvblBhdGgiLCJzZWxlY3RlZEljb25QYXRoIiwiY3VzdG9tRGF0YSIsInBob25lIiwidXNlck5hbWUiLCJ3eCIsImxvZ2luIiwic3VjY2VzcyIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJjb2RlIiwicmVxdWVzdCIsInVybCIsImRhdGEiLCJvayIsInNldFN0b3JhZ2VTeW5jIiwib3BlbmlkIiwiZXJyTXNnIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MExBR0VBLE0sR0FBUztBQUNQQyxhQUFPLENBQ0wsYUFESyxFQUVMLGFBRkssRUFHTCxnQkFISyxFQUlMLGNBSkssRUFLTCxxQkFMSyxFQU1MLGdCQU5LLEVBT0wsY0FQSyxDQURBO0FBVVBDLGNBQVE7QUFDTkMsNkJBQXFCLE9BRGY7QUFFTkMsc0NBQThCLE1BRnhCO0FBR05DLGdDQUF3QixRQUhsQjtBQUlOQyxnQ0FBd0I7QUFKbEIsT0FWRDtBQWdCUEMsY0FBUTtBQUNOQyxjQUFNLENBQ0o7QUFDRUMsb0JBQVUsY0FEWjtBQUVFQyxnQkFBTSxJQUZSO0FBR0VDLG9CQUFVLGlCQUhaO0FBSUVDLDRCQUFrQjtBQUpwQixTQURJLEVBT0o7QUFDRUgsb0JBQVUsYUFEWjtBQUVFQyxnQkFBTSxJQUZSO0FBR0VDLG9CQUFVLGlCQUhaO0FBSUVDLDRCQUFrQjtBQUpwQixTQVBJLEVBYUo7QUFDRUgsb0JBQVUsZ0JBRFo7QUFFRUMsZ0JBQU0sSUFGUjtBQUdFQyxvQkFBVSxpQkFIWjtBQUlFQyw0QkFBa0I7QUFKcEIsU0FiSTtBQURBO0FBaEJELEssUUF1Q1RDLFUsR0FBYTtBQUNYQyxhQUFPLFdBREk7QUFFWEMsZ0JBQVU7QUFGQyxLOzs7OzsrQkFJRjtBQUNUQyxTQUFHQyxLQUFILENBQVM7QUFDUEMsaUJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNyQkMsa0JBQVFDLEdBQVIsQ0FBWUYsR0FBWjs7QUFFQSxjQUFJQSxJQUFJRyxJQUFSLEVBQWM7QUFDWk4sZUFBR08sT0FBSCxDQUFXO0FBQ1RDLG1CQUFLLDBDQURJO0FBRVRDLG9CQUFNO0FBQ0pILHNCQUFNSCxJQUFJRztBQUROLGVBRkc7QUFLVEosdUJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNyQkMsd0JBQVFDLEdBQVIsQ0FBWSxZQUFaO0FBQ0FELHdCQUFRQyxHQUFSLENBQVlGLEdBQVo7O0FBRUEsb0JBQUlBLElBQUlNLElBQUosQ0FBU0MsRUFBYixFQUFpQjtBQUNmVixxQkFBR1csY0FBSCxDQUFrQixRQUFsQixFQUE0QlIsSUFBSU0sSUFBSixDQUFTRyxNQUFyQztBQUNEO0FBQ0Y7QUFaUSxhQUFYO0FBY0QsV0FmRCxNQWVPO0FBQ0xSLG9CQUFRQyxHQUFSLENBQVksZUFBZUYsSUFBSVUsTUFBL0I7QUFDRDtBQUNGO0FBdEJNLE9BQVQ7QUF3QkQ7Ozs7RUFyRTBCLGVBQUtDLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gXCJ3ZXB5XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBwYWdlczogW1xyXG4gICAgICBcInBhZ2VzL2luZGV4XCIsXHJcbiAgICAgIFwicGFnZXMvY2xhc3NcIixcclxuICAgICAgXCJwYWdlcy9mZWVkYmFja1wiLFxyXG4gICAgICBcInBhZ2VzL2NlbnRlclwiLFxyXG4gICAgICBcInBhZ2VzL3NlbGVjdFN0dWRlbnRcIixcclxuICAgICAgXCJwYWdlcy9jYWxlbmRhclwiLFxyXG4gICAgICBcInBhZ2VzL2RldGFpbFwiXHJcbiAgICBdLFxyXG4gICAgd2luZG93OiB7XHJcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6IFwibGlnaHRcIixcclxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogXCIjZmZmXCIsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6IFwiV2VDaGF0XCIsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6IFwiYmxhY2tcIlxyXG4gICAgfSxcclxuICAgIHRhYkJhcjoge1xyXG4gICAgICBsaXN0OiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcGFnZVBhdGg6IFwicGFnZXMvY2VudGVyXCIsXHJcbiAgICAgICAgICB0ZXh0OiBcIue7n+iuoVwiLFxyXG4gICAgICAgICAgaWNvblBhdGg6IFwicGFnZXMvaW1nL3QucG5nXCIsXHJcbiAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiBcInBhZ2VzL2ltZy90aGwucG5nXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHBhZ2VQYXRoOiBcInBhZ2VzL2NsYXNzXCIsXHJcbiAgICAgICAgICB0ZXh0OiBcIuivvueoi1wiLFxyXG4gICAgICAgICAgaWNvblBhdGg6IFwicGFnZXMvaW1nL2MucG5nXCIsXHJcbiAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiBcInBhZ2VzL2ltZy9jaGwucG5nXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHBhZ2VQYXRoOiBcInBhZ2VzL2ZlZWRiYWNrXCIsXHJcbiAgICAgICAgICB0ZXh0OiBcIuWPjemmiFwiLFxyXG4gICAgICAgICAgaWNvblBhdGg6IFwicGFnZXMvaW1nL2YucG5nXCIsXHJcbiAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiBcInBhZ2VzL2ltZy9maGwucG5nXCJcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH1cclxuICB9O1xyXG4gIGN1c3RvbURhdGEgPSB7XHJcbiAgICBwaG9uZTogMTExMTExMTExMTEsXHJcbiAgICB1c2VyTmFtZTogXCJZdWlcIlxyXG4gIH07XHJcbiAgb25MYXVuY2goKSB7XHJcbiAgICB3eC5sb2dpbih7XHJcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcblxyXG4gICAgICAgIGlmIChyZXMuY29kZSkge1xyXG4gICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDogXCJodHRwczovL2JhY2sueXVpeXUuY24vd3gvbG9naW4vZ2V0T3BlbmlkXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICBjb2RlOiByZXMuY29kZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaIkOWKn+iOt+WPlm9wZW5JZFwiKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG5cclxuICAgICAgICAgICAgICBpZiAocmVzLmRhdGEub2spIHtcclxuICAgICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKFwib3BlbmlkXCIsIHJlcy5kYXRhLm9wZW5pZCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCLojrflj5bnlKjmiLfnmbvlvZXmgIHlpLHotKXvvIFcIiArIHJlcy5lcnJNc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==