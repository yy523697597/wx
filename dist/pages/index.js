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
                  content: '您还不是会员哦，不能登录',
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1c2VyUGhvbmUiLCJ1c2VyVmFsaSIsInZhbGlOdW0iLCJ2YWxpVGV4dCIsInZhbGlkYXRpbmciLCJ2YWxpVGltZSIsInZhbGlDb2xvciIsImxvZ2luU2hvdyIsImluZGV4SW1hZ2VzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwic2hvd0luZGV4Iiwic2hvd0xvZ2luIiwidHJ5TG9naW4iLCJsZW5ndGgiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwiaW1hZ2UiLCJkdXJhdGlvbiIsIm9wZW5pZCIsImdldFN0b3JhZ2VTeW5jIiwicmVxdWVzdCIsInVybCIsInBob25lIiwiY29kZSIsIm1ldGhvZCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwib2siLCJpY29uIiwic3R1ZGVudHMiLCJzZXRUaW1lb3V0Iiwic2V0U3RvcmFnZVN5bmMiLCJzd2l0Y2hUYWIiLCJyZWRpcmVjdFRvIiwiSlNPTiIsInN0cmluZ2lmeSIsImdldFZhbGkiLCJ0aGF0Iiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJzZXREYXRhIiwiZ2V0VXNlclBob25lIiwiZSIsImRldGFpbCIsInZhbHVlIiwiJHBhcmVudCIsImN1c3RvbURhdGEiLCJnZXRVc2VyVmFsaSIsInBpY3MiLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUlUQyxJLEdBQU87QUFDTEMsaUJBQVcsSUFETjtBQUVMQyxnQkFBVSxJQUZMO0FBR0xDLGVBQVMsTUFISjtBQUlMQyxnQkFBVSxPQUpMO0FBS0xDLGtCQUFZLEtBTFA7QUFNTEMsZ0JBQVUsRUFOTDtBQU9MQyxpQkFBVyxTQVBOO0FBUUxDLGlCQUFX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QUNBWixpQkFBS2EsTUFBTDtBQUNEO0FBQ0Y7QUFWUSxPQUFYO0FBWUEsV0FBSy9DLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxXQUFLK0MsTUFBTDtBQUNEOzs7O0VBbkNnQyxlQUFLQyxJOztrQkFBbkIzRCxLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+W3p+WFi+WKm+aipuW3peWOgidcclxuICB9O1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgdXNlclBob25lOiBudWxsLFxyXG4gICAgdXNlclZhbGk6IG51bGwsXHJcbiAgICB2YWxpTnVtOiAxMjM0NTYsXHJcbiAgICB2YWxpVGV4dDogJ+iOt+WPlumqjOivgeeggScsXHJcbiAgICB2YWxpZGF0aW5nOiBmYWxzZSxcclxuICAgIHZhbGlUaW1lOiA2MCxcclxuICAgIHZhbGlDb2xvcjogJyMzMzdhYjcnLFxyXG4gICAgbG9naW5TaG93OiBmYWxzZSxcclxuICAgIGluZGV4SW1hZ2VzOiBbXVxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcbiAgb25Mb2FkKCkge1xyXG4gICAgLy8g6K+35rGC6aaW6aG15Zu+54mHXHJcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6ICdodHRwczovL2JhY2sueXVpeXUuY24vd3gvaG9tZS9waWNzJyxcclxuICAgICAgZGF0YTogbnVsbCxcclxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xyXG4gICAgICAgIGlmIChyZXMuZGF0YS5vaykge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ+aIkOWKn+ivt+axgummlumhteWbvueJhycpO1xyXG4gICAgICAgICAgdGhhdC5pbmRleEltYWdlcyA9IHJlcy5kYXRhLnBpY3M7XHJcbiAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmxvZ2luU2hvdyA9IGZhbHNlO1xyXG4gICAgdGhpcy4kYXBwbHkoKTtcclxuICB9XHJcblxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBzaG93SW5kZXgoKSB7XHJcbiAgICAgIHRoaXMubG9naW5TaG93ID0gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgc2hvd0xvZ2luKCkge1xyXG4gICAgICB0aGlzLmxvZ2luU2hvdyA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgLy8g55m75b2VXHJcbiAgICB0cnlMb2dpbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmICh0aGlzLnVzZXJQaG9uZS5sZW5ndGggIT09IDExKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn5omL5py65Y+36ZSZ6K+vJyxcclxuICAgICAgICAgIGltYWdlOiAnLi9pbWcvZmFpbC5wbmcnLFxyXG4gICAgICAgICAgZHVyYXRpb246IDEwMDBcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMudXNlclZhbGkubGVuZ3RoID09IDYpIHtcclxuICAgICAgICBjb25zdCBvcGVuaWQgPSB3eC5nZXRTdG9yYWdlU3luYygnb3BlbmlkJyk7XHJcbiAgICAgICAgLy8g6I635Y+W6aqM6K+B56CBYFxyXG4gICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgdXJsOiAnaHR0cHM6Ly9iYWNrLnl1aXl1LmNuL3d4L2xvZ2luL3ZlcmlmeScsXHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIHBob25lOiB0aGlzLnVzZXJQaG9uZSxcclxuICAgICAgICAgICAgY29kZTogdGhpcy51c2VyVmFsaSxcclxuICAgICAgICAgICAgb3BlbmlkOiBvcGVuaWRcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5vaykge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmiJDlip/or7fmsYLnmbvlvZXmjqXlj6MnKTtcclxuICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfnmbvlvZXmiJDlip8nLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICBjb25zdCBzdHVkZW50cyA9IHJlcy5kYXRhLnN0dWRlbnRzO1xyXG4gICAgICAgICAgICAgIGlmIChzdHVkZW50cy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnc3R1ZGVudCcsIHN0dWRlbnRzWzBdKTtcclxuICAgICAgICAgICAgICAgICAgd3guc3dpdGNoVGFiKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcuL2NlbnRlcidcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdzdHVkZW50TGlzdCcsIHN0dWRlbnRzKTtcclxuICAgICAgICAgICAgICAgICAgd3gucmVkaXJlY3RUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBgLi9zZWxlY3RTdHVkZW50P3N0dWRlbnRzPSR7SlNPTi5zdHJpbmdpZnkoc3R1ZGVudHMpfWBcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn55m75b2V5aSx6LSlJyxcclxuICAgICAgICAgICAgICAgIGltYWdlOiAnLi9pbWcvZmFpbC5wbmcnLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+mqjOivgeeggemUmeivrycsXHJcbiAgICAgICAgICBpbWFnZTogJy4vaW1nL2ZhaWwucG5nJyxcclxuICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyDojrflj5bpqozor4HnoIFcclxuICAgIGdldFZhbGkoKSB7XHJcbiAgICAgIGlmICghdGhpcy51c2VyUGhvbmUgfHwgdGhpcy51c2VyUGhvbmUubGVuZ3RoICE9PSAxMSkge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+aJi+acuuWPt+mUmeivrycsXHJcbiAgICAgICAgICBpbWFnZTogJy4vaW1nL2ZhaWwucG5nJyxcclxuICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgdGhhdC52YWxpQ29sb3IgPSAnI2NjYyc7XHJcbiAgICAgICAgdGhhdC52YWxpVGV4dCA9ICflt7Llj5HpgIEnO1xyXG4gICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgdXJsOiAnaHR0cHM6Ly9iYWNrLnl1aXl1LmNuL3d4L2xvZ2luL2NvZGUnLFxyXG4gICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBwaG9uZTogdGhhdC51c2VyUGhvbmVcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XHJcbiAgICAgICAgICAgIGlmICghcmVzLmRhdGEub2spIHtcclxuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogJ+aCqOi/mOS4jeaYr+S8muWRmOWTpu+8jOS4jeiDveeZu+W9lScsXHJcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICB0aGF0LnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlDb2xvcjogJyMzMzdhYjcnLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlUZXh0OiAn6I635Y+W6aqM6K+B56CBJ1xyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ2V0VXNlclBob25lKGUpIHtcclxuICAgICAgdGhpcy51c2VyUGhvbmUgPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgdGhpcy4kcGFyZW50LmN1c3RvbURhdGEucGhvbmUgPSBlLmRldGFpbC52YWx1ZTtcclxuICAgIH0sXHJcbiAgICBnZXRVc2VyVmFsaShlKSB7XHJcbiAgICAgIHRoaXMudXNlclZhbGkgPSBlLmRldGFpbC52YWx1ZTtcclxuICAgIH1cclxuICB9O1xyXG59XHJcbiJdfQ==