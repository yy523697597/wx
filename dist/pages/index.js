'use strict';

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
      navigationBarTitleText: '巧克力梦工厂'
    }, _this.data = {
      userPhone: null,
      userVali: null,
      valiNum: 123456,
      valiText: '获取验证码',
      validating: false,
      valiTime: 60,
      valiColor: '#337ab7',
      loginShow: false,
      indexImages: []
    }, _this.computed = {}, _this.methods = {
      showIndex: function showIndex() {
        this.loginShow = false;
      },
      showLogin: function showLogin() {
        this.loginShow = true;
      },

      // 登录
      tryLogin: function tryLogin() {
        if (this.userPhone.length !== 11) {
          wx.showToast({
            title: '手机号错误',
            image: './img/fail.png',
            duration: 1000
          });
          return;
        }
        if (this.userVali.length == 6) {
          var openid = wx.getStorageSync('openid');
          // 获取验证码`
          wx.request({
            url: 'https://back.yuiyu.cn/wx/login/verify',
            data: {
              phone: this.userPhone,
              code: this.userVali,
              openid: openid
            },
            method: 'POST',
            success: function success(res) {
              console.log(res.data);
              if (res.data.ok) {
                console.log('成功请求登录接口');
                wx.showToast({
                  title: '登录成功',
                  icon: 'success',
                  duration: 1000
                });
                var students = res.data.students;
                if (students.length === 1) {
                  setTimeout(function () {
                    wx.setStorageSync('student', students[0]);
                    wx.switchTab({
                      url: './center'
                    });
                  }, 1000);
                } else {
                  setTimeout(function () {
                    wx.setStorageSync('studentList', students);
                    wx.redirectTo({
                      url: './selectStudent?students=' + JSON.stringify(students)
                    });
                  }, 1000);
                }
              } else {
                wx.showToast({
                  title: '登录失败',
                  image: './img/fail.png',
                  duration: 1000
                });
              }
            }
          });
        } else {
          wx.showToast({
            title: '验证码错误',
            image: './img/fail.png',
            duration: 1000
          });
        }
      },
      // 获取验证码
      getVali: function getVali() {
        if (!this.userPhone || this.userPhone.length !== 11) {
          wx.showToast({
            title: '手机号错误',
            image: './img/fail.png',
            duration: 1000
          });
        } else {
          var that = this;
          that.valiColor = '#ccc';
          that.valiText = '已发送';
          wx.request({
            url: 'https://back.yuiyu.cn/wx/login/code',
            data: {
              phone: that.userPhone
            },
            method: 'POST',
            success: function success(res) {
              console.log(res.data);
              if (!res.data.ok) {
                wx.showModal({
                  title: '提示',
                  content: res.data.errorMsg,
                  showCancel: false,
                  success: function success(res) {
                    that.setData({
                      valiColor: '#337ab7',
                      valiText: '获取验证码'
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
    key: 'onLoad',
    value: function onLoad() {
      // 请求首页图片
      var that = this;
      wx.request({
        url: 'https://back.yuiyu.cn/wx/home/pics',
        data: null,
        success: function success(res) {
          console.log(res.data);
          if (res.data.ok) {
            console.log('成功请求首页图片');
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1c2VyUGhvbmUiLCJ1c2VyVmFsaSIsInZhbGlOdW0iLCJ2YWxpVGV4dCIsInZhbGlkYXRpbmciLCJ2YWxpVGltZSIsInZhbGlDb2xvciIsImxvZ2luU2hvdyIsImluZGV4SW1hZ2VzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwic2hvd0luZGV4Iiwic2hvd0xvZ2luIiwidHJ5TG9naW4iLCJsZW5ndGgiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwiaW1hZ2UiLCJkdXJhdGlvbiIsIm9wZW5pZCIsImdldFN0b3JhZ2VTeW5jIiwicmVxdWVzdCIsInVybCIsInBob25lIiwiY29kZSIsIm1ldGhvZCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwib2siLCJpY29uIiwic3R1ZGVudHMiLCJzZXRUaW1lb3V0Iiwic2V0U3RvcmFnZVN5bmMiLCJzd2l0Y2hUYWIiLCJyZWRpcmVjdFRvIiwiSlNPTiIsInN0cmluZ2lmeSIsImdldFZhbGkiLCJ0aGF0Iiwic2hvd01vZGFsIiwiY29udGVudCIsImVycm9yTXNnIiwic2hvd0NhbmNlbCIsInNldERhdGEiLCJnZXRVc2VyUGhvbmUiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCIkcGFyZW50IiwiY3VzdG9tRGF0YSIsImdldFVzZXJWYWxpIiwicGljcyIsIiRhcHBseSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVRDLEksR0FBTztBQUNMQyxpQkFBVyxJQUROO0FBRUxDLGdCQUFVLElBRkw7QUFHTEMsZUFBUyxNQUhKO0FBSUxDLGdCQUFVLE9BSkw7QUFLTEMsa0JBQVksS0FMUDtBQU1MQyxnQkFBVSxFQU5MO0FBT0xDLGlCQUFXLFNBUE47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bUJvQixJQUFJN0IsSUFBSixDQUFTdUQsSUFBNUI7QUFDQWIsaUJBQUtjLE1BQUw7QUFDRDtBQUNGO0FBVlEsT0FBWDtBQVlBLFdBQUtoRCxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsV0FBS2dELE1BQUw7QUFDRDs7OztFQW5DZ0MsZUFBS0MsSTs7a0JBQW5CNUQsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflt6flhYvlipvmoqblt6XljoInXHJcbiAgfTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIHVzZXJQaG9uZTogbnVsbCxcclxuICAgIHVzZXJWYWxpOiBudWxsLFxyXG4gICAgdmFsaU51bTogMTIzNDU2LFxyXG4gICAgdmFsaVRleHQ6ICfojrflj5bpqozor4HnoIEnLFxyXG4gICAgdmFsaWRhdGluZzogZmFsc2UsXHJcbiAgICB2YWxpVGltZTogNjAsXHJcbiAgICB2YWxpQ29sb3I6ICcjMzM3YWI3JyxcclxuICAgIGxvZ2luU2hvdzogZmFsc2UsXHJcbiAgICBpbmRleEltYWdlczogW11cclxuICB9O1xyXG5cclxuICBjb21wdXRlZCA9IHt9O1xyXG4gIG9uTG9hZCgpIHtcclxuICAgIC8vIOivt+axgummlumhteWbvueJh1xyXG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiAnaHR0cHM6Ly9iYWNrLnl1aXl1LmNuL3d4L2hvbWUvcGljcycsXHJcbiAgICAgIGRhdGE6IG51bGwsXHJcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcclxuICAgICAgICBpZiAocmVzLmRhdGEub2spIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCfmiJDlip/or7fmsYLpppbpobXlm77niYcnKTtcclxuICAgICAgICAgIHRoYXQuaW5kZXhJbWFnZXMgPSByZXMuZGF0YS5waWNzO1xyXG4gICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5sb2dpblNob3cgPSBmYWxzZTtcclxuICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgfVxyXG5cclxuICBtZXRob2RzID0ge1xyXG4gICAgc2hvd0luZGV4KCkge1xyXG4gICAgICB0aGlzLmxvZ2luU2hvdyA9IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIHNob3dMb2dpbigpIHtcclxuICAgICAgdGhpcy5sb2dpblNob3cgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIC8vIOeZu+W9lVxyXG4gICAgdHJ5TG9naW46IGZ1bmN0aW9uKCkge1xyXG4gICAgICBpZiAodGhpcy51c2VyUGhvbmUubGVuZ3RoICE9PSAxMSkge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+aJi+acuuWPt+mUmeivrycsXHJcbiAgICAgICAgICBpbWFnZTogJy4vaW1nL2ZhaWwucG5nJyxcclxuICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLnVzZXJWYWxpLmxlbmd0aCA9PSA2KSB7XHJcbiAgICAgICAgY29uc3Qgb3BlbmlkID0gd3guZ2V0U3RvcmFnZVN5bmMoJ29wZW5pZCcpO1xyXG4gICAgICAgIC8vIOiOt+WPlumqjOivgeeggWBcclxuICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgIHVybDogJ2h0dHBzOi8vYmFjay55dWl5dS5jbi93eC9sb2dpbi92ZXJpZnknLFxyXG4gICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBwaG9uZTogdGhpcy51c2VyUGhvbmUsXHJcbiAgICAgICAgICAgIGNvZGU6IHRoaXMudXNlclZhbGksXHJcbiAgICAgICAgICAgIG9wZW5pZDogb3BlbmlkXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xyXG4gICAgICAgICAgICBpZiAocmVzLmRhdGEub2spIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5oiQ5Yqf6K+35rGC55m75b2V5o6l5Y+jJyk7XHJcbiAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn55m75b2V5oiQ5YqfJyxcclxuICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgY29uc3Qgc3R1ZGVudHMgPSByZXMuZGF0YS5zdHVkZW50cztcclxuICAgICAgICAgICAgICBpZiAoc3R1ZGVudHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3N0dWRlbnQnLCBzdHVkZW50c1swXSk7XHJcbiAgICAgICAgICAgICAgICAgIHd4LnN3aXRjaFRhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnLi9jZW50ZXInXHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnc3R1ZGVudExpc3QnLCBzdHVkZW50cyk7XHJcbiAgICAgICAgICAgICAgICAgIHd4LnJlZGlyZWN0VG8oe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogYC4vc2VsZWN0U3R1ZGVudD9zdHVkZW50cz0ke0pTT04uc3RyaW5naWZ5KHN0dWRlbnRzKX1gXHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+eZu+W9leWksei0pScsXHJcbiAgICAgICAgICAgICAgICBpbWFnZTogJy4vaW1nL2ZhaWwucG5nJyxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfpqozor4HnoIHplJnor68nLFxyXG4gICAgICAgICAgaW1hZ2U6ICcuL2ltZy9mYWlsLnBuZycsXHJcbiAgICAgICAgICBkdXJhdGlvbjogMTAwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8g6I635Y+W6aqM6K+B56CBXHJcbiAgICBnZXRWYWxpKCkge1xyXG4gICAgICBpZiAoIXRoaXMudXNlclBob25lIHx8IHRoaXMudXNlclBob25lLmxlbmd0aCAhPT0gMTEpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfmiYvmnLrlj7fplJnor68nLFxyXG4gICAgICAgICAgaW1hZ2U6ICcuL2ltZy9mYWlsLnBuZycsXHJcbiAgICAgICAgICBkdXJhdGlvbjogMTAwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHRoYXQudmFsaUNvbG9yID0gJyNjY2MnO1xyXG4gICAgICAgIHRoYXQudmFsaVRleHQgPSAn5bey5Y+R6YCBJztcclxuICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgIHVybDogJ2h0dHBzOi8vYmFjay55dWl5dS5jbi93eC9sb2dpbi9jb2RlJyxcclxuICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgcGhvbmU6IHRoYXQudXNlclBob25lXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoIXJlcy5kYXRhLm9rKSB7XHJcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHJlcy5kYXRhLmVycm9yTXNnLFxyXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgdGhhdC5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICB2YWxpQ29sb3I6ICcjMzM3YWI3JyxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpVGV4dDogJ+iOt+WPlumqjOivgeeggSdcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdldFVzZXJQaG9uZShlKSB7XHJcbiAgICAgIHRoaXMudXNlclBob25lID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgIHRoaXMuJHBhcmVudC5jdXN0b21EYXRhLnBob25lID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICB9LFxyXG4gICAgZ2V0VXNlclZhbGkoZSkge1xyXG4gICAgICB0aGlzLnVzZXJWYWxpID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG4iXX0=