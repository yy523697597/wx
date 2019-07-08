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
              url: "https://chocolate.wuxin.ren/wx/login/getOpenid",
              data: {
                code: res.code
              },
              success: function success(res) {
                console.log("成功获取openId");
                console.log(res.data);

                if (res.data.ok) {
                  wx.setStorageSync("openid", res.data.openid);

                  var openid = wx.getStorageSync("openid");
                  console.log(openid);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJsaXN0IiwicGFnZVBhdGgiLCJ0ZXh0IiwiaWNvblBhdGgiLCJzZWxlY3RlZEljb25QYXRoIiwiY3VzdG9tRGF0YSIsInBob25lIiwidXNlck5hbWUiLCJ3eCIsImxvZ2luIiwic3VjY2VzcyIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJjb2RlIiwicmVxdWVzdCIsInVybCIsImRhdGEiLCJvayIsInNldFN0b3JhZ2VTeW5jIiwib3BlbmlkIiwiZ2V0U3RvcmFnZVN5bmMiLCJlcnJNc2ciLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswTEFHRUEsTSxHQUFTO0FBQ1BDLGFBQU8sQ0FDTCxhQURLLEVBRUwsYUFGSyxFQUdMLGdCQUhLLEVBSUwsY0FKSyxFQUtMLHFCQUxLLEVBTUwsZ0JBTkssRUFPTCxjQVBLLENBREE7QUFVUEMsY0FBUTtBQUNOQyw2QkFBcUIsT0FEZjtBQUVOQyxzQ0FBOEIsTUFGeEI7QUFHTkMsZ0NBQXdCLFFBSGxCO0FBSU5DLGdDQUF3QjtBQUpsQixPQVZEO0FBZ0JQQyxjQUFRO0FBQ05DLGNBQU0sQ0FDSjtBQUNFQyxvQkFBVSxjQURaO0FBRUVDLGdCQUFNLElBRlI7QUFHRUMsb0JBQVUsaUJBSFo7QUFJRUMsNEJBQWtCO0FBSnBCLFNBREksRUFPSjtBQUNFSCxvQkFBVSxhQURaO0FBRUVDLGdCQUFNLElBRlI7QUFHRUMsb0JBQVUsaUJBSFo7QUFJRUMsNEJBQWtCO0FBSnBCLFNBUEksRUFhSjtBQUNFSCxvQkFBVSxnQkFEWjtBQUVFQyxnQkFBTSxJQUZSO0FBR0VDLG9CQUFVLGlCQUhaO0FBSUVDLDRCQUFrQjtBQUpwQixTQWJJO0FBREE7QUFoQkQsSyxRQXVDVEMsVSxHQUFhO0FBQ1hDLGFBQU8sV0FESTtBQUVYQyxnQkFBVTtBQUZDLEs7Ozs7OytCQUlGO0FBQ1RDLFNBQUdDLEtBQUgsQ0FBUztBQUNQQyxpQkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCQyxrQkFBUUMsR0FBUixDQUFZRixHQUFaOztBQUVBLGNBQUlBLElBQUlHLElBQVIsRUFBYztBQUNaTixlQUFHTyxPQUFILENBQVc7QUFDVEMsbUJBQUssZ0RBREk7QUFFVEMsb0JBQU07QUFDSkgsc0JBQU1ILElBQUlHO0FBRE4sZUFGRztBQUtUSix1QkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCQyx3QkFBUUMsR0FBUixDQUFZLFlBQVo7QUFDQUQsd0JBQVFDLEdBQVIsQ0FBWUYsSUFBSU0sSUFBaEI7O0FBRUEsb0JBQUlOLElBQUlNLElBQUosQ0FBU0MsRUFBYixFQUFpQjtBQUNmVixxQkFBR1csY0FBSCxDQUFrQixRQUFsQixFQUE0QlIsSUFBSU0sSUFBSixDQUFTRyxNQUFyQzs7QUFFQSxzQkFBTUEsU0FBU1osR0FBR2EsY0FBSCxDQUFrQixRQUFsQixDQUFmO0FBQ0FULDBCQUFRQyxHQUFSLENBQVlPLE1BQVo7QUFDRDtBQUNGO0FBZlEsYUFBWDtBQWlCRCxXQWxCRCxNQWtCTztBQUNMUixvQkFBUUMsR0FBUixDQUFZLGVBQWVGLElBQUlXLE1BQS9CO0FBQ0Q7QUFDRjtBQXpCTSxPQUFUO0FBMkJEOzs7O0VBeEUwQixlQUFLQyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tIFwid2VweVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgcGFnZXM6IFtcclxuICAgICAgXCJwYWdlcy9pbmRleFwiLFxyXG4gICAgICBcInBhZ2VzL2NsYXNzXCIsXHJcbiAgICAgIFwicGFnZXMvZmVlZGJhY2tcIixcclxuICAgICAgXCJwYWdlcy9jZW50ZXJcIixcclxuICAgICAgXCJwYWdlcy9zZWxlY3RTdHVkZW50XCIsXHJcbiAgICAgIFwicGFnZXMvY2FsZW5kYXJcIixcclxuICAgICAgXCJwYWdlcy9kZXRhaWxcIlxyXG4gICAgXSxcclxuICAgIHdpbmRvdzoge1xyXG4gICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiBcImxpZ2h0XCIsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6IFwiI2ZmZlwiLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiBcIldlQ2hhdFwiLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiBcImJsYWNrXCJcclxuICAgIH0sXHJcbiAgICB0YWJCYXI6IHtcclxuICAgICAgbGlzdDogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHBhZ2VQYXRoOiBcInBhZ2VzL2NlbnRlclwiLFxyXG4gICAgICAgICAgdGV4dDogXCLnu5/orqFcIixcclxuICAgICAgICAgIGljb25QYXRoOiBcInBhZ2VzL2ltZy90LnBuZ1wiLFxyXG4gICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogXCJwYWdlcy9pbWcvdGhsLnBuZ1wiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwYWdlUGF0aDogXCJwYWdlcy9jbGFzc1wiLFxyXG4gICAgICAgICAgdGV4dDogXCLor77nqItcIixcclxuICAgICAgICAgIGljb25QYXRoOiBcInBhZ2VzL2ltZy9jLnBuZ1wiLFxyXG4gICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogXCJwYWdlcy9pbWcvY2hsLnBuZ1wiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwYWdlUGF0aDogXCJwYWdlcy9mZWVkYmFja1wiLFxyXG4gICAgICAgICAgdGV4dDogXCLlj43ppohcIixcclxuICAgICAgICAgIGljb25QYXRoOiBcInBhZ2VzL2ltZy9mLnBuZ1wiLFxyXG4gICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogXCJwYWdlcy9pbWcvZmhsLnBuZ1wiXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgfTtcclxuICBjdXN0b21EYXRhID0ge1xyXG4gICAgcGhvbmU6IDExMTExMTExMTExLFxyXG4gICAgdXNlck5hbWU6IFwiWXVpXCJcclxuICB9O1xyXG4gIG9uTGF1bmNoKCkge1xyXG4gICAgd3gubG9naW4oe1xyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG5cclxuICAgICAgICBpZiAocmVzLmNvZGUpIHtcclxuICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jaG9jb2xhdGUud3V4aW4ucmVuL3d4L2xvZ2luL2dldE9wZW5pZFwiLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgY29kZTogcmVzLmNvZGVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmiJDlip/ojrflj5ZvcGVuSWRcIik7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICBpZiAocmVzLmRhdGEub2spIHtcclxuICAgICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKFwib3BlbmlkXCIsIHJlcy5kYXRhLm9wZW5pZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3BlbmlkID0gd3guZ2V0U3RvcmFnZVN5bmMoXCJvcGVuaWRcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhvcGVuaWQpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwi6I635Y+W55So5oi355m75b2V5oCB5aSx6LSl77yBXCIgKyByZXMuZXJyTXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=