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
                    that.valiText = '获取中...';
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
                    }
                }
            });
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1c2VyUGhvbmUiLCJ1c2VyVmFsaSIsInZhbGlOdW0iLCJ2YWxpVGV4dCIsInZhbGlkYXRpbmciLCJ2YWxpVGltZSIsInZhbGlDb2xvciIsImxvZ2luU2hvdyIsImluZGV4SW1hZ2VzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwic2hvd0luZGV4Iiwic2hvd0xvZ2luIiwidHJ5TG9naW4iLCJsZW5ndGgiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwiaW1hZ2UiLCJkdXJhdGlvbiIsIm9wZW5pZCIsImdldFN0b3JhZ2VTeW5jIiwicmVxdWVzdCIsInVybCIsInBob25lIiwiY29kZSIsIm1ldGhvZCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwib2siLCJpY29uIiwic3R1ZGVudHMiLCJzZXRUaW1lb3V0Iiwic2V0U3RvcmFnZVN5bmMiLCJzd2l0Y2hUYWIiLCJyZWRpcmVjdFRvIiwiSlNPTiIsInN0cmluZ2lmeSIsImdldFZhbGkiLCJ0aGF0Iiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJzZXREYXRhIiwiZ2V0VXNlclBob25lIiwiZSIsImRldGFpbCIsInZhbHVlIiwiJHBhcmVudCIsImN1c3RvbURhdGEiLCJnZXRVc2VyVmFsaSIsInBpY3MiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUlUQyxJLEdBQU87QUFDSEMsdUJBQVcsSUFEUjtBQUVIQyxzQkFBVSxJQUZQO0FBR0hDLHFCQUFTLE1BSE47QUFJSEMsc0JBQVUsT0FKUDtBQUtIQyx3QkFBWSxLQUxUO0FBTUhDLHNCQUFVLEVBTlA7QUFPSEMsdUJBQVcsU0FQUjtBQVFIQyx1QkFBVyxLQVJSO0FB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NUI7QUFDSDtBQUNKO0FBVE0sYUFBWDtBQVdIOzs7O0VBaEM4QixlQUFLQyxJOztrQkFBbkIxRCxLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflt6flhYvlipvmoqblt6XljoInXG4gICAgfTtcblxuICAgIGRhdGEgPSB7XG4gICAgICAgIHVzZXJQaG9uZTogbnVsbCxcbiAgICAgICAgdXNlclZhbGk6IG51bGwsXG4gICAgICAgIHZhbGlOdW06IDEyMzQ1NixcbiAgICAgICAgdmFsaVRleHQ6ICfojrflj5bpqozor4HnoIEnLFxuICAgICAgICB2YWxpZGF0aW5nOiBmYWxzZSxcbiAgICAgICAgdmFsaVRpbWU6IDYwLFxuICAgICAgICB2YWxpQ29sb3I6ICcjMzM3YWI3JyxcbiAgICAgICAgbG9naW5TaG93OiBmYWxzZSxcbiAgICAgICAgaW5kZXhJbWFnZXM6IFtdXG4gICAgfTtcblxuICAgIGNvbXB1dGVkID0ge307XG4gICAgb25Mb2FkKCkge1xuICAgICAgICAvLyDor7fmsYLpppbpobXlm77niYdcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9iYWNrLnl1aXl1LmNuL3d4L2hvbWUvcGljcycsXG4gICAgICAgICAgICBkYXRhOiBudWxsLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5vaykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5oiQ5Yqf6K+35rGC6aaW6aG15Zu+54mHJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaW5kZXhJbWFnZXMgPSByZXMuZGF0YS5waWNzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIHNob3dJbmRleCgpIHtcbiAgICAgICAgICAgIHRoaXMubG9naW5TaG93ID0gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIHNob3dMb2dpbigpIHtcbiAgICAgICAgICAgIHRoaXMubG9naW5TaG93ID0gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgLy8g55m75b2VXG4gICAgICAgIHRyeUxvZ2luOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnVzZXJQaG9uZS5sZW5ndGggIT09IDExKSB7XG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmiYvmnLrlj7fplJnor68nLFxuICAgICAgICAgICAgICAgICAgICBpbWFnZTogJy4vaW1nL2ZhaWwucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy51c2VyVmFsaS5sZW5ndGggPT0gNikge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wZW5pZCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdvcGVuaWQnKTtcbiAgICAgICAgICAgICAgICAvLyDojrflj5bpqozor4HnoIFgXG4gICAgICAgICAgICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vYmFjay55dWl5dS5jbi93eC9sb2dpbi92ZXJpZnknLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwaG9uZTogdGhpcy51c2VyUGhvbmUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiB0aGlzLnVzZXJWYWxpLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmlkOiBvcGVuaWRcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+aIkOWKn+ivt+axgueZu+W9leaOpeWPoycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn55m75b2V5oiQ5YqfJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0dWRlbnRzID0gcmVzLmRhdGEuc3R1ZGVudHM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0dWRlbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdzdHVkZW50Jywgc3R1ZGVudHNbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3guc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcuL2NlbnRlcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdzdHVkZW50TGlzdCcsIHN0dWRlbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogYC4vc2VsZWN0U3R1ZGVudD9zdHVkZW50cz0ke0pTT04uc3RyaW5naWZ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHVkZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9YFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfnmbvlvZXlpLHotKUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZTogJy4vaW1nL2ZhaWwucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+mqjOivgeeggemUmeivrycsXG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiAnLi9pbWcvZmFpbC5wbmcnLFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAvLyDojrflj5bpqozor4HnoIFcbiAgICAgICAgZ2V0VmFsaSgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnVzZXJQaG9uZS5sZW5ndGggIT09IDExKSB7XG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmiYvmnLrlj7fplJnor68nLFxuICAgICAgICAgICAgICAgICAgICBpbWFnZTogJy4vaW1nL2ZhaWwucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgdGhhdC52YWxpQ29sb3IgPSAnI2NjYyc7XG4gICAgICAgICAgICAgICAgdGhhdC52YWxpVGV4dCA9ICfojrflj5bkuK0uLi4nO1xuICAgICAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6ICdodHRwczovL2JhY2sueXVpeXUuY24vd3gvbG9naW4vY29kZScsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBob25lOiB0aGF0LnVzZXJQaG9uZVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlcy5kYXRhLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAn5oKo6L+Y5LiN5piv5Lya5ZGY5ZOm77yM5LiN6IO955m75b2VJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpQ29sb3I6ICcjMzM3YWI3JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpVGV4dDogJ+iOt+WPlumqjOivgeeggSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ2V0VXNlclBob25lKGUpIHtcbiAgICAgICAgICAgIHRoaXMudXNlclBob25lID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuY3VzdG9tRGF0YS5waG9uZSA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBnZXRVc2VyVmFsaShlKSB7XG4gICAgICAgICAgICB0aGlzLnVzZXJWYWxpID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICAgIH1cbiAgICB9O1xufVxuIl19