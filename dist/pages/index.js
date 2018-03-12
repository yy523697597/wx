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
                this.getLogin();
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
        key: 'getLogin',
        value: function getLogin() {
            var that = this;
            var openid = wx.getStorageSync('openid');
            wx.request({
                url: 'https://back.yuiyu.cn/wx/login/islogin',
                data: {
                    openid: openid
                },
                success: function success(res) {
                    if (res.data.ok) {
                        console.log('成功请求isLogin');
                        var students = res.data.students;
                        if (students.length === 1) {
                            wx.setStorageSync('student', students[0]);
                            wx.switchTab({
                                url: './center'
                            });
                        } else if (students.length > 1) {
                            wx.setStorageSync('studentList', students);
                            wx.redirectTo({
                                url: './selectStudent?students=' + JSON.stringify(students)
                            });
                        }
                    }
                }
            });
        }
    }, {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1c2VyUGhvbmUiLCJ1c2VyVmFsaSIsInZhbGlOdW0iLCJ2YWxpVGV4dCIsInZhbGlkYXRpbmciLCJ2YWxpVGltZSIsInZhbGlDb2xvciIsImxvZ2luU2hvdyIsImluZGV4SW1hZ2VzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwic2hvd0luZGV4Iiwic2hvd0xvZ2luIiwiZ2V0TG9naW4iLCJ0cnlMb2dpbiIsImxlbmd0aCIsInd4Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpbWFnZSIsImR1cmF0aW9uIiwib3BlbmlkIiwiZ2V0U3RvcmFnZVN5bmMiLCJyZXF1ZXN0IiwidXJsIiwicGhvbmUiLCJjb2RlIiwibWV0aG9kIiwic3VjY2VzcyIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJvayIsImljb24iLCJzdHVkZW50cyIsInNldFRpbWVvdXQiLCJzZXRTdG9yYWdlU3luYyIsInN3aXRjaFRhYiIsInJlZGlyZWN0VG8iLCJKU09OIiwic3RyaW5naWZ5IiwiZ2V0VmFsaSIsInRoYXQiLCJzaG93TW9kYWwiLCJjb250ZW50IiwiZXJyb3JNc2ciLCJzaG93Q2FuY2VsIiwic2V0RGF0YSIsImdldFVzZXJQaG9uZSIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRwYXJlbnQiLCJjdXN0b21EYXRhIiwiZ2V0VXNlclZhbGkiLCJwaWNzIiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFJVEMsSSxHQUFPO0FBQ0hDLHVCQUFXLElBRFI7QUFFSEMsc0JBQVUsSUFGUDtBQUdIQyxxQkFBUyxNQUhOO0FBSUhDLHNCQUFVLE9BSlA7QUFLSEMsd0JBQVksS0FMVDtBQU1IQyxzQkFBVSxFQU5QO0FBT0hD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XG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflt6flhYvlipvmoqblt6XljoInXG4gICAgfTtcblxuICAgIGRhdGEgPSB7XG4gICAgICAgIHVzZXJQaG9uZTogbnVsbCxcbiAgICAgICAgdXNlclZhbGk6IG51bGwsXG4gICAgICAgIHZhbGlOdW06IDEyMzQ1NixcbiAgICAgICAgdmFsaVRleHQ6ICfojrflj5bpqozor4HnoIEnLFxuICAgICAgICB2YWxpZGF0aW5nOiBmYWxzZSxcbiAgICAgICAgdmFsaVRpbWU6IDYwLFxuICAgICAgICB2YWxpQ29sb3I6ICcjMzM3YWI3JyxcbiAgICAgICAgbG9naW5TaG93OiBmYWxzZSxcbiAgICAgICAgaW5kZXhJbWFnZXM6IFtdXG4gICAgfTtcblxuICAgIGNvbXB1dGVkID0ge307XG4gICAgZ2V0TG9naW4oKSB7XG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgICAgICBjb25zdCBvcGVuaWQgPSB3eC5nZXRTdG9yYWdlU3luYygnb3BlbmlkJyk7XG4gICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9iYWNrLnl1aXl1LmNuL3d4L2xvZ2luL2lzbG9naW4nLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIG9wZW5pZDogb3BlbmlkXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmiJDlip/or7fmsYJpc0xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0dWRlbnRzID0gcmVzLmRhdGEuc3R1ZGVudHM7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHVkZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdzdHVkZW50Jywgc3R1ZGVudHNbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgd3guc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcuL2NlbnRlcidcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0dWRlbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdzdHVkZW50TGlzdCcsIHN0dWRlbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHd4LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogYC4vc2VsZWN0U3R1ZGVudD9zdHVkZW50cz0ke0pTT04uc3RyaW5naWZ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHVkZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9YFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIC8vIOivt+axgummlumhteWbvueJh1xuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6ICdodHRwczovL2JhY2sueXVpeXUuY24vd3gvaG9tZS9waWNzJyxcbiAgICAgICAgICAgIGRhdGE6IG51bGwsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmiJDlip/or7fmsYLpppbpobXlm77niYcnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pbmRleEltYWdlcyA9IHJlcy5kYXRhLnBpY3M7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5sb2dpblNob3cgPSBmYWxzZTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgICBzaG93SW5kZXgoKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2luU2hvdyA9IGZhbHNlO1xuICAgICAgICB9LFxuICAgICAgICBzaG93TG9naW4oKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2luU2hvdyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmdldExvZ2luKCk7XG4gICAgICAgIH0sXG4gICAgICAgIC8vIOeZu+W9lVxuICAgICAgICB0cnlMb2dpbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAodGhpcy51c2VyUGhvbmUubGVuZ3RoICE9PSAxMSkge1xuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5omL5py65Y+36ZSZ6K+vJyxcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6ICcuL2ltZy9mYWlsLnBuZycsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudXNlclZhbGkubGVuZ3RoID09IDYpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcGVuaWQgPSB3eC5nZXRTdG9yYWdlU3luYygnb3BlbmlkJyk7XG4gICAgICAgICAgICAgICAgLy8g6I635Y+W6aqM6K+B56CBYFxuICAgICAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6ICdodHRwczovL2JhY2sueXVpeXUuY24vd3gvbG9naW4vdmVyaWZ5JyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGhvbmU6IHRoaXMudXNlclBob25lLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogdGhpcy51c2VyVmFsaSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5pZDogb3BlbmlkXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5vaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmiJDlip/or7fmsYLnmbvlvZXmjqXlj6MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+eZu+W9leaIkOWKnycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdHVkZW50cyA9IHJlcy5kYXRhLnN0dWRlbnRzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHVkZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnc3R1ZGVudCcsIHN0dWRlbnRzWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnLi9jZW50ZXInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnc3R1ZGVudExpc3QnLCBzdHVkZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IGAuL3NlbGVjdFN0dWRlbnQ/c3R1ZGVudHM9JHtKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R1ZGVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfWBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn55m75b2V5aSx6LSlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2U6ICcuL2ltZy9mYWlsLnBuZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfpqozor4HnoIHplJnor68nLFxuICAgICAgICAgICAgICAgICAgICBpbWFnZTogJy4vaW1nL2ZhaWwucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLy8g6I635Y+W6aqM6K+B56CBXG4gICAgICAgIGdldFZhbGkoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMudXNlclBob25lIHx8IHRoaXMudXNlclBob25lLmxlbmd0aCAhPT0gMTEpIHtcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aJi+acuuWPt+mUmeivrycsXG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiAnLi9pbWcvZmFpbC5wbmcnLFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgICAgICB0aGF0LnZhbGlDb2xvciA9ICcjY2NjJztcbiAgICAgICAgICAgICAgICB0aGF0LnZhbGlUZXh0ID0gJ+W3suWPkemAgSc7XG4gICAgICAgICAgICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vYmFjay55dWl5dS5jbi93eC9sb2dpbi9jb2RlJyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGhvbmU6IHRoYXQudXNlclBob25lXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzLmRhdGEub2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHJlcy5kYXRhLmVycm9yTXNnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlDb2xvcjogJyMzMzdhYjcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlUZXh0OiAn6I635Y+W6aqM6K+B56CBJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBnZXRVc2VyUGhvbmUoZSkge1xuICAgICAgICAgICAgdGhpcy51c2VyUGhvbmUgPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5jdXN0b21EYXRhLnBob25lID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFVzZXJWYWxpKGUpIHtcbiAgICAgICAgICAgIHRoaXMudXNlclZhbGkgPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgICAgfVxuICAgIH07XG59XG4iXX0=