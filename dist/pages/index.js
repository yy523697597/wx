"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: "巧克力梦工厂"
    }, _this.data = {
      userPhone: null,
      userVali: null,
      valiNum: 123456,
      valiText: "获取验证码",
      validating: false,
      valiTime: 60,
      valiColor: "#337ab7",
      loginShow: false,
      indexImages: []
    }, _this.computed = {}, _this.methods = {
      showIndex: function showIndex() {
        this.loginShow = false;
      },
      showLogin: function showLogin() {
        this.loginShow = true;
        this.getLogin();
      },

      // 登录
      tryLogin: function tryLogin() {
        if (this.userPhone.length !== 11) {
          wx.showToast({
            title: "手机号错误",
            image: "./img/fail.png",
            duration: 1000
          });
          return;
        }
        if (this.userVali.length == 6) {
          var openid = wx.getStorageSync("openid");
          console.log(openid);
          // 获取验证码`
          wx.request({
            url: "https://back.yuiyu.cn/wx/login/verify",
            data: {
              phone: this.userPhone,
              code: this.userVali,
              openid: openid
            },
            method: "POST",
            success: function success(res) {
              console.log(res.data);
              if (res.data.ok) {
                console.log("成功请求登录接口");
                wx.showToast({
                  title: "登录成功",
                  icon: "success",
                  duration: 1000
                });
                var students = res.data.students;
                if (students.length === 1) {
                  setTimeout(function () {
                    wx.setStorageSync("student", students[0]);
                    wx.switchTab({
                      url: "./center"
                    });
                  }, 1000);
                } else {
                  setTimeout(function () {
                    wx.setStorageSync("studentList", students);
                    wx.redirectTo({
                      url: "./selectStudent?students=" + JSON.stringify(students)
                    });
                  }, 1000);
                }
              } else {
                wx.showToast({
                  title: "登录失败",
                  image: "./img/fail.png",
                  duration: 1000
                });
              }
            }
          });
        } else {
          wx.showToast({
            title: "验证码错误",
            image: "./img/fail.png",
            duration: 1000
          });
        }
      },
      // 获取验证码
      getVali: function getVali() {
        if (!this.userPhone || this.userPhone.length !== 11) {
          wx.showToast({
            title: "手机号错误",
            image: "./img/fail.png",
            duration: 1000
          });
        } else {
          var that = this;
          that.valiColor = "#ccc";
          that.valiText = "已发送";
          wx.request({
            url: "https://back.yuiyu.cn/wx/login/code",
            data: {
              phone: that.userPhone
            },
            method: "POST",
            success: function success(res) {
              console.log(res.data);
              if (!res.data.ok) {
                wx.showModal({
                  title: "提示",
                  content: res.data.errorMsg,
                  showCancel: false,
                  success: function success(res) {
                    that.setData({
                      valiColor: "#337ab7",
                      valiText: "获取验证码"
                    });
                  }
                });
              }
            }
          });
        }
      },
      getUserPhone: function getUserPhone(e) {
        this.userPhone = e.detail.value;
        this.$parent.customData.phone = e.detail.value;
      },
      getUserVali: function getUserVali(e) {
        this.userVali = e.detail.value;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "getLogin",
    value: function getLogin() {
      var that = this;
      var openid = wx.getStorageSync("openid");
      wx.request({
        url: "https://back.yuiyu.cn/wx/login/islogin",
        data: {
          openid: openid
        },
        success: function success(res) {
          if (res.data.ok) {
            console.log("成功请求isLogin");
            var students = res.data.students;
            if (students.length === 1) {
              wx.setStorageSync("student", students[0]);
              wx.switchTab({
                url: "./center"
              });
            } else if (students.length > 1) {
              wx.setStorageSync("studentList", students);
              wx.redirectTo({
                url: "./selectStudent?students=" + JSON.stringify(students)
              });
            }
          }
        }
      });
    }
  }, {
    key: "onLoad",
    value: function onLoad() {
      // 请求首页图片
      var that = this;
      wx.request({
        url: "https://back.yuiyu.cn/wx/home/pics",
        data: null,
        success: function success(res) {
          console.log(res.data);
          if (res.data.ok) {
            console.log("成功请求首页图片");
            that.indexImages = res.data.pics;
            that.$apply();
          }
        }
      });
      this.loginShow = false;
      this.$apply();
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1c2VyUGhvbmUiLCJ1c2VyVmFsaSIsInZhbGlOdW0iLCJ2YWxpVGV4dCIsInZhbGlkYXRpbmciLCJ2YWxpVGltZSIsInZhbGlDb2xvciIsImxvZ2luU2hvdyIsImluZGV4SW1hZ2VzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwic2hvd0luZGV4Iiwic2hvd0xvZ2luIiwiZ2V0TG9naW4iLCJ0cnlMb2dpbiIsImxlbmd0aCIsInd4Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpbWFnZSIsImR1cmF0aW9uIiwib3BlbmlkIiwiZ2V0U3RvcmFnZVN5bmMiLCJjb25zb2xlIiwibG9nIiwicmVxdWVzdCIsInVybCIsInBob25lIiwiY29kZSIsIm1ldGhvZCIsInN1Y2Nlc3MiLCJyZXMiLCJvayIsImljb24iLCJzdHVkZW50cyIsInNldFRpbWVvdXQiLCJzZXRTdG9yYWdlU3luYyIsInN3aXRjaFRhYiIsInJlZGlyZWN0VG8iLCJKU09OIiwic3RyaW5naWZ5IiwiZ2V0VmFsaSIsInRoYXQiLCJzaG93TW9kYWwiLCJjb250ZW50IiwiZXJyb3JNc2ciLCJzaG93Q2FuY2VsIiwic2V0RGF0YSIsImdldFVzZXJQaG9uZSIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRwYXJlbnQiLCJjdXN0b21EYXRhIiwiZ2V0VXNlclZhbGkiLCJwaWNzIiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFJVEMsSSxHQUFPO0FBQ0xDLGlCQUFXLElBRE47QUFFTEMsZ0JBQVUsSUFGTDtBQUdMQyxlQUFTLE1BSEo7QUFJTEMsZ0JBQVUsT0FKTDtBQUtMQyxrQkFBWSxLQUxQO0FBTUxDLGdCQUFVLEVBTkw7QUFPTEMs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d2VweVwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogXCLlt6flhYvlipvmoqblt6XljoJcIlxuICB9O1xuXG4gIGRhdGEgPSB7XG4gICAgdXNlclBob25lOiBudWxsLFxuICAgIHVzZXJWYWxpOiBudWxsLFxuICAgIHZhbGlOdW06IDEyMzQ1NixcbiAgICB2YWxpVGV4dDogXCLojrflj5bpqozor4HnoIFcIixcbiAgICB2YWxpZGF0aW5nOiBmYWxzZSxcbiAgICB2YWxpVGltZTogNjAsXG4gICAgdmFsaUNvbG9yOiBcIiMzMzdhYjdcIixcbiAgICBsb2dpblNob3c6IGZhbHNlLFxuICAgIGluZGV4SW1hZ2VzOiBbXVxuICB9O1xuXG4gIGNvbXB1dGVkID0ge307XG4gIGdldExvZ2luKCkge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgIGNvbnN0IG9wZW5pZCA9IHd4LmdldFN0b3JhZ2VTeW5jKFwib3BlbmlkXCIpO1xuICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgdXJsOiBcImh0dHBzOi8vYmFjay55dWl5dS5jbi93eC9sb2dpbi9pc2xvZ2luXCIsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIG9wZW5pZDogb3BlbmlkXG4gICAgICB9LFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5vaykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwi5oiQ5Yqf6K+35rGCaXNMb2dpblwiKTtcbiAgICAgICAgICBjb25zdCBzdHVkZW50cyA9IHJlcy5kYXRhLnN0dWRlbnRzO1xuICAgICAgICAgIGlmIChzdHVkZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKFwic3R1ZGVudFwiLCBzdHVkZW50c1swXSk7XG4gICAgICAgICAgICB3eC5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICB1cmw6IFwiLi9jZW50ZXJcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzdHVkZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYyhcInN0dWRlbnRMaXN0XCIsIHN0dWRlbnRzKTtcbiAgICAgICAgICAgIHd4LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgICB1cmw6IGAuL3NlbGVjdFN0dWRlbnQ/c3R1ZGVudHM9JHtKU09OLnN0cmluZ2lmeShzdHVkZW50cyl9YFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgb25Mb2FkKCkge1xuICAgIC8vIOivt+axgummlumhteWbvueJh1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgdXJsOiBcImh0dHBzOi8vYmFjay55dWl5dS5jbi93eC9ob21lL3BpY3NcIixcbiAgICAgIGRhdGE6IG51bGwsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAgICAgICBpZiAocmVzLmRhdGEub2spIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIuaIkOWKn+ivt+axgummlumhteWbvueJh1wiKTtcbiAgICAgICAgICB0aGF0LmluZGV4SW1hZ2VzID0gcmVzLmRhdGEucGljcztcbiAgICAgICAgICB0aGF0LiRhcHBseSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5sb2dpblNob3cgPSBmYWxzZTtcbiAgICB0aGlzLiRhcHBseSgpO1xuICB9XG5cbiAgbWV0aG9kcyA9IHtcbiAgICBzaG93SW5kZXgoKSB7XG4gICAgICB0aGlzLmxvZ2luU2hvdyA9IGZhbHNlO1xuICAgIH0sXG4gICAgc2hvd0xvZ2luKCkge1xuICAgICAgdGhpcy5sb2dpblNob3cgPSB0cnVlO1xuICAgICAgdGhpcy5nZXRMb2dpbigpO1xuICAgIH0sXG4gICAgLy8g55m75b2VXG4gICAgdHJ5TG9naW46IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMudXNlclBob25lLmxlbmd0aCAhPT0gMTEpIHtcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogXCLmiYvmnLrlj7fplJnor69cIixcbiAgICAgICAgICBpbWFnZTogXCIuL2ltZy9mYWlsLnBuZ1wiLFxuICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAodGhpcy51c2VyVmFsaS5sZW5ndGggPT0gNikge1xuICAgICAgICBjb25zdCBvcGVuaWQgPSB3eC5nZXRTdG9yYWdlU3luYyhcIm9wZW5pZFwiKTtcbiAgICAgICAgY29uc29sZS5sb2cob3BlbmlkKTtcbiAgICAgICAgLy8g6I635Y+W6aqM6K+B56CBYFxuICAgICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6IFwiaHR0cHM6Ly9iYWNrLnl1aXl1LmNuL3d4L2xvZ2luL3ZlcmlmeVwiLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHBob25lOiB0aGlzLnVzZXJQaG9uZSxcbiAgICAgICAgICAgIGNvZGU6IHRoaXMudXNlclZhbGksXG4gICAgICAgICAgICBvcGVuaWQ6IG9wZW5pZFxuICAgICAgICAgIH0sXG4gICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5vaykge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaIkOWKn+ivt+axgueZu+W9leaOpeWPo1wiKTtcbiAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLnmbvlvZXmiJDlip9cIixcbiAgICAgICAgICAgICAgICBpY29uOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgY29uc3Qgc3R1ZGVudHMgPSByZXMuZGF0YS5zdHVkZW50cztcbiAgICAgICAgICAgICAgaWYgKHN0dWRlbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoXCJzdHVkZW50XCIsIHN0dWRlbnRzWzBdKTtcbiAgICAgICAgICAgICAgICAgIHd4LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAgICAgICAgIHVybDogXCIuL2NlbnRlclwiXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKFwic3R1ZGVudExpc3RcIiwgc3R1ZGVudHMpO1xuICAgICAgICAgICAgICAgICAgd3gucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogYC4vc2VsZWN0U3R1ZGVudD9zdHVkZW50cz0ke0pTT04uc3RyaW5naWZ5KHN0dWRlbnRzKX1gXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLnmbvlvZXlpLHotKVcIixcbiAgICAgICAgICAgICAgICBpbWFnZTogXCIuL2ltZy9mYWlsLnBuZ1wiLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgIHRpdGxlOiBcIumqjOivgeeggemUmeivr1wiLFxuICAgICAgICAgIGltYWdlOiBcIi4vaW1nL2ZhaWwucG5nXCIsXG4gICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICAvLyDojrflj5bpqozor4HnoIFcbiAgICBnZXRWYWxpKCkge1xuICAgICAgaWYgKCF0aGlzLnVzZXJQaG9uZSB8fCB0aGlzLnVzZXJQaG9uZS5sZW5ndGggIT09IDExKSB7XG4gICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6IFwi5omL5py65Y+36ZSZ6K+vXCIsXG4gICAgICAgICAgaW1hZ2U6IFwiLi9pbWcvZmFpbC5wbmdcIixcbiAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgICAgICB0aGF0LnZhbGlDb2xvciA9IFwiI2NjY1wiO1xuICAgICAgICB0aGF0LnZhbGlUZXh0ID0gXCLlt7Llj5HpgIFcIjtcbiAgICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiBcImh0dHBzOi8vYmFjay55dWl5dS5jbi93eC9sb2dpbi9jb2RlXCIsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgcGhvbmU6IHRoYXQudXNlclBob25lXG4gICAgICAgICAgfSxcbiAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAgICAgICAgICAgaWYgKCFyZXMuZGF0YS5vaykge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIuaPkOekulwiLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHJlcy5kYXRhLmVycm9yTXNnLFxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgdmFsaUNvbG9yOiBcIiMzMzdhYjdcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsaVRleHQ6IFwi6I635Y+W6aqM6K+B56CBXCJcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGdldFVzZXJQaG9uZShlKSB7XG4gICAgICB0aGlzLnVzZXJQaG9uZSA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgdGhpcy4kcGFyZW50LmN1c3RvbURhdGEucGhvbmUgPSBlLmRldGFpbC52YWx1ZTtcbiAgICB9LFxuICAgIGdldFVzZXJWYWxpKGUpIHtcbiAgICAgIHRoaXMudXNlclZhbGkgPSBlLmRldGFpbC52YWx1ZTtcbiAgICB9XG4gIH07XG59XG4iXX0=