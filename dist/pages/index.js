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
        if (this.userPhone.length !== 11) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1c2VyUGhvbmUiLCJ1c2VyVmFsaSIsInZhbGlOdW0iLCJ2YWxpVGV4dCIsInZhbGlkYXRpbmciLCJ2YWxpVGltZSIsInZhbGlDb2xvciIsImxvZ2luU2hvdyIsImluZGV4SW1hZ2VzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwic2hvd0luZGV4Iiwic2hvd0xvZ2luIiwidHJ5TG9naW4iLCJsZW5ndGgiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwiaW1hZ2UiLCJkdXJhdGlvbiIsIm9wZW5pZCIsImdldFN0b3JhZ2VTeW5jIiwicmVxdWVzdCIsInVybCIsInBob25lIiwiY29kZSIsIm1ldGhvZCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwib2siLCJpY29uIiwic3R1ZGVudHMiLCJzZXRUaW1lb3V0Iiwic2V0U3RvcmFnZVN5bmMiLCJzd2l0Y2hUYWIiLCJyZWRpcmVjdFRvIiwiSlNPTiIsInN0cmluZ2lmeSIsImdldFZhbGkiLCJ0aGF0Iiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJzZXREYXRhIiwiZ2V0VXNlclBob25lIiwiZSIsImRldGFpbCIsInZhbHVlIiwiJHBhcmVudCIsImN1c3RvbURhdGEiLCJnZXRVc2VyVmFsaSIsInBpY3MiLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUlUQyxJLEdBQU87QUFDTEMsaUJBQVcsSUFETjtBQUVMQyxnQkFBVSxJQUZMO0FBR0xDLGVBQVMsTUFISjtBQUlMQyxnQkFBVSxPQUpMO0FBS0xDLGtCQUFZLEtBTFA7QUFNTEMsZ0JBQVUsRUFOTDtBQU9MQyxpQkFBVyxTQVBOO0FBUUxDLGlCQUFX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QUFDRjtBQVZRLE9BQVg7QUFZQSxXQUFLL0MsU0FBTCxHQUFpQixLQUFqQjtBQUNBLFdBQUsrQyxNQUFMO0FBQ0Q7Ozs7RUFuQ2dDLGVBQUtDLEk7O2tCQUFuQjNELEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ben5YWL5Yqb5qKm5bel5Y6CJ1xyXG4gIH07XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICB1c2VyUGhvbmU6IG51bGwsXHJcbiAgICB1c2VyVmFsaTogbnVsbCxcclxuICAgIHZhbGlOdW06IDEyMzQ1NixcclxuICAgIHZhbGlUZXh0OiAn6I635Y+W6aqM6K+B56CBJyxcclxuICAgIHZhbGlkYXRpbmc6IGZhbHNlLFxyXG4gICAgdmFsaVRpbWU6IDYwLFxyXG4gICAgdmFsaUNvbG9yOiAnIzMzN2FiNycsXHJcbiAgICBsb2dpblNob3c6IGZhbHNlLFxyXG4gICAgaW5kZXhJbWFnZXM6IFtdXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuICBvbkxvYWQoKSB7XHJcbiAgICAvLyDor7fmsYLpppbpobXlm77niYdcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgd3gucmVxdWVzdCh7XHJcbiAgICAgIHVybDogJ2h0dHBzOi8vYmFjay55dWl5dS5jbi93eC9ob21lL3BpY3MnLFxyXG4gICAgICBkYXRhOiBudWxsLFxyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XHJcbiAgICAgICAgaWYgKHJlcy5kYXRhLm9rKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygn5oiQ5Yqf6K+35rGC6aaW6aG15Zu+54mHJyk7XHJcbiAgICAgICAgICB0aGF0LmluZGV4SW1hZ2VzID0gcmVzLmRhdGEucGljcztcclxuICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMubG9naW5TaG93ID0gZmFsc2U7XHJcbiAgICB0aGlzLiRhcHBseSgpO1xyXG4gIH1cclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIHNob3dJbmRleCgpIHtcclxuICAgICAgdGhpcy5sb2dpblNob3cgPSBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBzaG93TG9naW4oKSB7XHJcbiAgICAgIHRoaXMubG9naW5TaG93ID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICAvLyDnmbvlvZVcclxuICAgIHRyeUxvZ2luOiBmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKHRoaXMudXNlclBob25lLmxlbmd0aCAhPT0gMTEpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfmiYvmnLrlj7fplJnor68nLFxyXG4gICAgICAgICAgaW1hZ2U6ICcuL2ltZy9mYWlsLnBuZycsXHJcbiAgICAgICAgICBkdXJhdGlvbjogMTAwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy51c2VyVmFsaS5sZW5ndGggPT0gNikge1xyXG4gICAgICAgIGNvbnN0IG9wZW5pZCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdvcGVuaWQnKTtcclxuICAgICAgICAvLyDojrflj5bpqozor4HnoIFgXHJcbiAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICB1cmw6ICdodHRwczovL2JhY2sueXVpeXUuY24vd3gvbG9naW4vdmVyaWZ5JyxcclxuICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgcGhvbmU6IHRoaXMudXNlclBob25lLFxyXG4gICAgICAgICAgICBjb2RlOiB0aGlzLnVzZXJWYWxpLFxyXG4gICAgICAgICAgICBvcGVuaWQ6IG9wZW5pZFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcclxuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLm9rKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+aIkOWKn+ivt+axgueZu+W9leaOpeWPoycpO1xyXG4gICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+eZu+W9leaIkOWKnycsXHJcbiAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIGNvbnN0IHN0dWRlbnRzID0gcmVzLmRhdGEuc3R1ZGVudHM7XHJcbiAgICAgICAgICAgICAgaWYgKHN0dWRlbnRzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdzdHVkZW50Jywgc3R1ZGVudHNbMF0pO1xyXG4gICAgICAgICAgICAgICAgICB3eC5zd2l0Y2hUYWIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy4vY2VudGVyJ1xyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3N0dWRlbnRMaXN0Jywgc3R1ZGVudHMpO1xyXG4gICAgICAgICAgICAgICAgICB3eC5yZWRpcmVjdFRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGAuL3NlbGVjdFN0dWRlbnQ/c3R1ZGVudHM9JHtKU09OLnN0cmluZ2lmeShzdHVkZW50cyl9YFxyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfnmbvlvZXlpLHotKUnLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2U6ICcuL2ltZy9mYWlsLnBuZycsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn6aqM6K+B56CB6ZSZ6K+vJyxcclxuICAgICAgICAgIGltYWdlOiAnLi9pbWcvZmFpbC5wbmcnLFxyXG4gICAgICAgICAgZHVyYXRpb246IDEwMDBcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIOiOt+WPlumqjOivgeeggVxyXG4gICAgZ2V0VmFsaSgpIHtcclxuICAgICAgaWYgKHRoaXMudXNlclBob25lLmxlbmd0aCAhPT0gMTEpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfmiYvmnLrlj7fplJnor68nLFxyXG4gICAgICAgICAgaW1hZ2U6ICcuL2ltZy9mYWlsLnBuZycsXHJcbiAgICAgICAgICBkdXJhdGlvbjogMTAwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHRoYXQudmFsaUNvbG9yID0gJyNjY2MnO1xyXG4gICAgICAgIHRoYXQudmFsaVRleHQgPSAn5bey5Y+R6YCBJztcclxuICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgIHVybDogJ2h0dHBzOi8vYmFjay55dWl5dS5jbi93eC9sb2dpbi9jb2RlJyxcclxuICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgcGhvbmU6IHRoYXQudXNlclBob25lXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoIXJlcy5kYXRhLm9rKSB7XHJcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfmgqjov5jkuI3mmK/kvJrlkZjlk6bvvIzkuI3og73nmbvlvZUnLFxyXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgdGhhdC5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICB2YWxpQ29sb3I6ICcjMzM3YWI3JyxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpVGV4dDogJ+iOt+WPlumqjOivgeeggSdcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdldFVzZXJQaG9uZShlKSB7XHJcbiAgICAgIHRoaXMudXNlclBob25lID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgIHRoaXMuJHBhcmVudC5jdXN0b21EYXRhLnBob25lID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICB9LFxyXG4gICAgZ2V0VXNlclZhbGkoZSkge1xyXG4gICAgICB0aGlzLnVzZXJWYWxpID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG4iXX0=