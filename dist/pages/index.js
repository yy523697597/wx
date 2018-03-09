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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1c2VyUGhvbmUiLCJ1c2VyVmFsaSIsInZhbGlOdW0iLCJ2YWxpVGV4dCIsInZhbGlkYXRpbmciLCJ2YWxpVGltZSIsInZhbGlDb2xvciIsImxvZ2luU2hvdyIsImluZGV4SW1hZ2VzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwic2hvd0luZGV4Iiwic2hvd0xvZ2luIiwidHJ5TG9naW4iLCJsZW5ndGgiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwiaW1hZ2UiLCJkdXJhdGlvbiIsIm9wZW5pZCIsImdldFN0b3JhZ2VTeW5jIiwicmVxdWVzdCIsInVybCIsInBob25lIiwiY29kZSIsIm1ldGhvZCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwib2siLCJpY29uIiwic3R1ZGVudHMiLCJzZXRUaW1lb3V0Iiwic2V0U3RvcmFnZVN5bmMiLCJzd2l0Y2hUYWIiLCJyZWRpcmVjdFRvIiwiSlNPTiIsInN0cmluZ2lmeSIsImdldFZhbGkiLCJ0aGF0Iiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJzZXREYXRhIiwiZ2V0VXNlclBob25lIiwiZSIsImRldGFpbCIsInZhbHVlIiwiJHBhcmVudCIsImN1c3RvbURhdGEiLCJnZXRVc2VyVmFsaSIsInBpY3MiLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUlUQyxJLEdBQU87QUFDSEMsdUJBQVcsSUFEUjtBQUVIQyxzQkFBVSxJQUZQO0FBR0hDLHFCQUFTLE1BSE47QUFJSEMsc0JBQVUsT0FKUDtBQUtIQyx3QkFBWSxLQUxUO0FBTUhDLHNCQUFVLEVBTlA7QUFPSEMsdUJBQVcsU0FQUjtBQVFIQyx1QkFB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Q0FBU3NELElBQTVCO0FBQ0FaLDZCQUFLYSxNQUFMO0FBQ0g7QUFDSjtBQVZNLGFBQVg7QUFZQSxpQkFBSy9DLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxpQkFBSytDLE1BQUw7QUFDSDs7OztFQW5DOEIsZUFBS0MsSTs7a0JBQW5CM0QsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflt6flhYvlipvmoqblt6XljoInXHJcbiAgICB9O1xyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgdXNlclBob25lOiBudWxsLFxyXG4gICAgICAgIHVzZXJWYWxpOiBudWxsLFxyXG4gICAgICAgIHZhbGlOdW06IDEyMzQ1NixcclxuICAgICAgICB2YWxpVGV4dDogJ+iOt+WPlumqjOivgeeggScsXHJcbiAgICAgICAgdmFsaWRhdGluZzogZmFsc2UsXHJcbiAgICAgICAgdmFsaVRpbWU6IDYwLFxyXG4gICAgICAgIHZhbGlDb2xvcjogJyMzMzdhYjcnLFxyXG4gICAgICAgIGxvZ2luU2hvdzogZmFsc2UsXHJcbiAgICAgICAgaW5kZXhJbWFnZXM6IFtdXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbXB1dGVkID0ge307XHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgLy8g6K+35rGC6aaW6aG15Zu+54mHXHJcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vYmFjay55dWl5dS5jbi93eC9ob21lL3BpY3MnLFxyXG4gICAgICAgICAgICBkYXRhOiBudWxsLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5vaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmiJDlip/or7fmsYLpppbpobXlm77niYcnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmluZGV4SW1hZ2VzID0gcmVzLmRhdGEucGljcztcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5sb2dpblNob3cgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgc2hvd0luZGV4KCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2luU2hvdyA9IGZhbHNlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2hvd0xvZ2luKCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2luU2hvdyA9IHRydWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyDnmbvlvZVcclxuICAgICAgICB0cnlMb2dpbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnVzZXJQaG9uZS5sZW5ndGggIT09IDExKSB7XHJcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5omL5py65Y+36ZSZ6K+vJyxcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZTogJy4vaW1nL2ZhaWwucG5nJyxcclxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMudXNlclZhbGkubGVuZ3RoID09IDYpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9wZW5pZCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdvcGVuaWQnKTtcclxuICAgICAgICAgICAgICAgIC8vIOiOt+WPlumqjOivgeeggWBcclxuICAgICAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vYmFjay55dWl5dS5jbi93eC9sb2dpbi92ZXJpZnknLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGhvbmU6IHRoaXMudXNlclBob25lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiB0aGlzLnVzZXJWYWxpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuaWQ6IG9wZW5pZFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5oiQ5Yqf6K+35rGC55m75b2V5o6l5Y+jJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn55m75b2V5oiQ5YqfJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3R1ZGVudHMgPSByZXMuZGF0YS5zdHVkZW50cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHVkZW50cy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3N0dWRlbnQnLCBzdHVkZW50c1swXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnN3aXRjaFRhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcuL2NlbnRlcidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnc3R1ZGVudExpc3QnLCBzdHVkZW50cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnJlZGlyZWN0VG8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBgLi9zZWxlY3RTdHVkZW50P3N0dWRlbnRzPSR7SlNPTi5zdHJpbmdpZnkoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R1ZGVudHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfnmbvlvZXlpLHotKUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOiAnLi9pbWcvZmFpbC5wbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+mqjOivgeeggemUmeivrycsXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6ICcuL2ltZy9mYWlsLnBuZycsXHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyDojrflj5bpqozor4HnoIFcclxuICAgICAgICBnZXRWYWxpKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy51c2VyUGhvbmUubGVuZ3RoICE9PSAxMSkge1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aJi+acuuWPt+mUmeivrycsXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6ICcuL2ltZy9mYWlsLnBuZycsXHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnZhbGlDb2xvciA9ICcjY2NjJztcclxuICAgICAgICAgICAgICAgIHRoYXQudmFsaVRleHQgPSAn6I635Y+W5LitLi4uJztcclxuICAgICAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vYmFjay55dWl5dS5jbi93eC9sb2dpbi9jb2RlJyxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBob25lOiB0aGF0LnVzZXJQaG9uZVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXMuZGF0YS5vaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogJ+aCqOi/mOS4jeaYr+S8muWRmOWTpu+8jOS4jeiDveeZu+W9lScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpQ29sb3I6ICcjMzM3YWI3JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlUZXh0OiAn6I635Y+W6aqM6K+B56CBJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRVc2VyUGhvbmUoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnVzZXJQaG9uZSA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuY3VzdG9tRGF0YS5waG9uZSA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0VXNlclZhbGkoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnVzZXJWYWxpID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG4iXX0=