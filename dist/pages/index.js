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
                            if (res.data.ok) {
                                console.log('成功请求登录接口');
                                wx.showToast({
                                    title: '登录成功',
                                    icon: 'success',
                                    duration: 1000
                                });
                                wx.setStorageSync('sessionId', res.header['Set-Cookie']);
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
                            if (!res.data.ok && res.data.errorCode == 10002) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1c2VyUGhvbmUiLCJ1c2VyVmFsaSIsInZhbGlOdW0iLCJ2YWxpVGV4dCIsInZhbGlkYXRpbmciLCJ2YWxpVGltZSIsInZhbGlDb2xvciIsImxvZ2luU2hvdyIsImluZGV4SW1hZ2VzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwic2hvd0luZGV4Iiwic2hvd0xvZ2luIiwidHJ5TG9naW4iLCJsZW5ndGgiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwiaW1hZ2UiLCJkdXJhdGlvbiIsIm9wZW5pZCIsImdldFN0b3JhZ2VTeW5jIiwicmVxdWVzdCIsInVybCIsInBob25lIiwiY29kZSIsIm1ldGhvZCIsInN1Y2Nlc3MiLCJyZXMiLCJvayIsImNvbnNvbGUiLCJsb2ciLCJpY29uIiwic2V0U3RvcmFnZVN5bmMiLCJoZWFkZXIiLCJzdHVkZW50cyIsInNldFRpbWVvdXQiLCJzd2l0Y2hUYWIiLCJyZWRpcmVjdFRvIiwiSlNPTiIsInN0cmluZ2lmeSIsImdldFZhbGkiLCJ0aGF0IiwiZXJyb3JDb2RlIiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJzZXREYXRhIiwiZ2V0VXNlclBob25lIiwiZSIsImRldGFpbCIsInZhbHVlIiwiJHBhcmVudCIsImN1c3RvbURhdGEiLCJnZXRVc2VyVmFsaSIsInBpY3MiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUlUQyxJLEdBQU87QUFDSEMsdUJBQVcsSUFEUjtBQUVIQyxzQkFBVSxJQUZQO0FBR0hDLHFCQUFTLE1BSE47QUFJSEMsc0JBQVUsT0FKUDtBQUtIQyx3QkFBWSxLQUxUO0FBTUhDLHNCQUFVLEVBTlA7QUFPSEMsdUJBQVcsU0FQ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QixFQUFiLEVBQWlCO0FBQ2JDLGdDQUFRQyxHQUFSLENBQVksVUFBWjtBQUNBVyw2QkFBS2xDLFdBQUwsR0FBbUJvQixJQUFJN0IsSUFBSixDQUFTd0QsSUFBNUI7QUFDSDtBQUNKO0FBVE0sYUFBWDtBQVdIOzs7O0VBaEM4QixlQUFLQyxJOztrQkFBbkI1RCxLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflt6flhYvlipvmoqblt6XljoInXG4gICAgfTtcblxuICAgIGRhdGEgPSB7XG4gICAgICAgIHVzZXJQaG9uZTogbnVsbCxcbiAgICAgICAgdXNlclZhbGk6IG51bGwsXG4gICAgICAgIHZhbGlOdW06IDEyMzQ1NixcbiAgICAgICAgdmFsaVRleHQ6ICfojrflj5bpqozor4HnoIEnLFxuICAgICAgICB2YWxpZGF0aW5nOiBmYWxzZSxcbiAgICAgICAgdmFsaVRpbWU6IDYwLFxuICAgICAgICB2YWxpQ29sb3I6ICcjMzM3YWI3JyxcbiAgICAgICAgbG9naW5TaG93OiBmYWxzZSxcbiAgICAgICAgaW5kZXhJbWFnZXM6IFtdXG4gICAgfTtcblxuICAgIGNvbXB1dGVkID0ge307XG4gICAgb25Mb2FkKCkge1xuICAgICAgICAvLyDor7fmsYLpppbpobXlm77niYdcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9iYWNrLnl1aXl1LmNuL3d4L2hvbWUvcGljcycsXG4gICAgICAgICAgICBkYXRhOiBudWxsLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5vaykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5oiQ5Yqf6K+35rGC6aaW6aG15Zu+54mHJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaW5kZXhJbWFnZXMgPSByZXMuZGF0YS5waWNzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIHNob3dJbmRleCgpIHtcbiAgICAgICAgICAgIHRoaXMubG9naW5TaG93ID0gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIHNob3dMb2dpbigpIHtcbiAgICAgICAgICAgIHRoaXMubG9naW5TaG93ID0gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgLy8g55m75b2VXG4gICAgICAgIHRyeUxvZ2luOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnVzZXJQaG9uZS5sZW5ndGggIT09IDExKSB7XG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmiYvmnLrlj7fplJnor68nLFxuICAgICAgICAgICAgICAgICAgICBpbWFnZTogJy4vaW1nL2ZhaWwucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy51c2VyVmFsaS5sZW5ndGggPT0gNikge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wZW5pZCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdvcGVuaWQnKTtcbiAgICAgICAgICAgICAgICAvLyDojrflj5bpqozor4HnoIFgXG4gICAgICAgICAgICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vYmFjay55dWl5dS5jbi93eC9sb2dpbi92ZXJpZnknLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwaG9uZTogdGhpcy51c2VyUGhvbmUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiB0aGlzLnVzZXJWYWxpLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmlkOiBvcGVuaWRcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+aIkOWKn+ivt+axgueZu+W9leaOpeWPoycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn55m75b2V5oiQ5YqfJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc2Vzc2lvbklkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLmhlYWRlclsnU2V0LUNvb2tpZSddXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdHVkZW50cyA9IHJlcy5kYXRhLnN0dWRlbnRzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHVkZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnc3R1ZGVudCcsIHN0dWRlbnRzWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnLi9jZW50ZXInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnc3R1ZGVudExpc3QnLCBzdHVkZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IGAuL3NlbGVjdFN0dWRlbnQ/c3R1ZGVudHM9JHtKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R1ZGVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfWBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn55m75b2V5aSx6LSlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2U6ICcuL2ltZy9mYWlsLnBuZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfpqozor4HnoIHplJnor68nLFxuICAgICAgICAgICAgICAgICAgICBpbWFnZTogJy4vaW1nL2ZhaWwucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLy8g6I635Y+W6aqM6K+B56CBXG4gICAgICAgIGdldFZhbGkoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy51c2VyUGhvbmUubGVuZ3RoICE9PSAxMSkge1xuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5omL5py65Y+36ZSZ6K+vJyxcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6ICcuL2ltZy9mYWlsLnBuZycsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgICAgIHRoYXQudmFsaUNvbG9yID0gJyNjY2MnO1xuICAgICAgICAgICAgICAgIHRoYXQudmFsaVRleHQgPSAn6I635Y+W5LitLi4uJztcbiAgICAgICAgICAgICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9iYWNrLnl1aXl1LmNuL3d4L2xvZ2luL2NvZGUnLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwaG9uZTogdGhhdC51c2VyUGhvbmVcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXMuZGF0YS5vayAmJiByZXMuZGF0YS5lcnJvckNvZGUgPT0gMTAwMDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfmgqjov5jkuI3mmK/kvJrlkZjlk6bvvIzkuI3og73nmbvlvZUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlDb2xvcjogJyMzMzdhYjcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlUZXh0OiAn6I635Y+W6aqM6K+B56CBJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBnZXRVc2VyUGhvbmUoZSkge1xuICAgICAgICAgICAgdGhpcy51c2VyUGhvbmUgPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5jdXN0b21EYXRhLnBob25lID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFVzZXJWYWxpKGUpIHtcbiAgICAgICAgICAgIHRoaXMudXNlclZhbGkgPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgICAgfVxuICAgIH07XG59XG4iXX0=