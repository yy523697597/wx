'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


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
            phone: 18502810881,
            valiNum: 123456,
            valiText: '获取验证码',
            validating: false,
            valiTime: 60,
            valiColor: '#337ab7',
            loginShow: false,
            indexImages: ['./img/logo.jpg', './img/logo.jpg', './img/logo.jpg', './img/logo.jpg', './img/logo.jpg', './img/logo.jpg']
        }, _this.computed = {}, _this.methods = {
            showIndex: function showIndex() {
                this.loginShow = false;
            },
            showLogin: function showLogin() {
                this.loginShow = true;
            },

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
                    // 获取验证码
                    wx.request({
                        url: 'https://back.yuiyu.cn/wx/login/verify',
                        data: {
                            phone: this.userPhone,
                            code: this.userVali
                        },
                        method: 'POST',
                        success: function success(res) {
                            console.log(res.data);
                            if (res.data.ok) {
                                wx.showToast({
                                    title: '登录成功',
                                    icon: 'success',
                                    duration: 1000
                                });
                                wx.setStorageSync('sessionId', res.header['Set-Cookie']);
                                var students = res.data.students;
                                if (students.length === 1) {
                                    setTimeout(function () {
                                        wx.setStorageSync('studentId', students[0].id);
                                        wx.switchTab({
                                            url: './center'
                                        });
                                    }, 1000);
                                } else {
                                    setTimeout(function () {
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

                    // wx.showToast({
                    //     title: '登录成功',
                    //     icon: 'success',
                    //     duration: 2000
                    // });
                    // setTimeout(() => {
                    //     wx.switchTab({
                    //         url: `./center?userPhone=${this.userPhone}`
                    //     });
                    // }, 2000);
                } else {
                    wx.showToast({
                        title: '验证码错误',
                        image: './img/fail.png',
                        duration: 1000
                    });
                }
            },
            getVali: function getVali() {
                if (!this.validating) {
                    if (this.userPhone.length !== 11) {
                        wx.showToast({
                            title: '手机号错误',

                            image: './img/fail.png',
                            duration: 1000
                        });
                    } else {
                        if (this.phone == this.userPhone) {
                            this.validating = true;
                            this.valiColor = '#ccc';
                            this.valiText = '获取中...';

                            // 获取验证码
                            wx.request({
                                url: 'https://back.yuiyu.cn/wx/login/code',
                                data: {
                                    phone: this.userPhone
                                },
                                success: function success(res) {
                                    console.log(res.data);
                                }
                            });
                        } else {
                            wx.showModal({
                                title: '提示',
                                content: '您还不是我们的会员'
                            });
                        }
                    }
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

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1c2VyUGhvbmUiLCJ1c2VyVmFsaSIsInBob25lIiwidmFsaU51bSIsInZhbGlUZXh0IiwidmFsaWRhdGluZyIsInZhbGlUaW1lIiwidmFsaUNvbG9yIiwibG9naW5TaG93IiwiaW5kZXhJbWFnZXMiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJzaG93SW5kZXgiLCJzaG93TG9naW4iLCJ0cnlMb2dpbiIsImxlbmd0aCIsInd4Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpbWFnZSIsImR1cmF0aW9uIiwicmVxdWVzdCIsInVybCIsImNvZGUiLCJtZXRob2QiLCJzdWNjZXNzIiwicmVzIiwiY29uc29sZSIsImxvZyIsIm9rIiwiaWNvbiIsInNldFN0b3JhZ2VTeW5jIiwiaGVhZGVyIiwic3R1ZGVudHMiLCJzZXRUaW1lb3V0IiwiaWQiLCJzd2l0Y2hUYWIiLCJyZWRpcmVjdFRvIiwiSlNPTiIsInN0cmluZ2lmeSIsImdldFZhbGkiLCJzaG93TW9kYWwiLCJjb250ZW50IiwiZ2V0VXNlclBob25lIiwiZSIsImRldGFpbCIsInZhbHVlIiwiJHBhcmVudCIsImN1c3RvbURhdGEiLCJnZXRVc2VyVmFsaSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUlUQyxJLEdBQU87QUFDSEMsdUJBQVcsSUFEUjtBQUVIQyxzQkFBVSxJQUZQO0FBR0hDLG1CQUFPLFdBSEo7QUFJSEMscUJBQVMsTUFKTjtBQUtIQyxzQkFBVSxPQUxQO0FBTUhDLHdCQUFZLEtBTlQ7QUFPSEMsc0JBQVUsRUFQUDtBQVFIQyx1QkFBVyxTQVJSO0FBU0hDLHVCQUFXLEtBVFI7QUFVSEMseUJBQWEsQ0FDVCxnQkFEUyxFQUVULGdCQUZTLEVBR1QsZ0JBSFMsRUFJVCxnQkFKUyxFQUtULGdCQUxTLEVBTVQsZ0JBTlM7QUFWVixTLFFBb0JQQyxRLEdBQVcsRSxRQUVYQyxPLEdBQVU7QUFDTkMscUJBRE0sdUJBQ007QUFDUixxQkFBS0osU0FBTCxHQUFpQixLQUFqQjtBQUNILGFBSEs7QUFJTksscUJBSk0sdUJBSU07QUFDUixxQkFBS0wsU0FBTCxHQUFpQixJQUFqQjtBQUNILGFBTks7O0FBT05NLHNCQUFVLG9CQUFXO0FBQ2pCLG9CQUFJLEtBQUtkLFNBQUwsQ0FBZWUsTUFBZixLQUEwQixFQUE5QixFQUFrQztBQUM5QkMsdUJBQUdDLFNBQUgsQ0FBYTtBQUNUQywrQkFBTyxPQURFO0FBRVRDLCtCQUFPLGdCQUZFO0FBR1RDLGtDQUFVO0FBSEQscUJBQWI7QUFLQTtBQUNIO0FBQ0Qsb0JBQUksS0FBS25CLFFBQUwsQ0FBY2MsTUFBZCxJQUF3QixDQUE1QixFQUErQjtBQUMzQjtBQUNBQyx1QkFBR0ssT0FBSCxDQUFXO0FBQ1BDLDZCQUFLLHVDQURFO0FBRVB2Qiw4QkFBTTtBQUNGRyxtQ0FBTyxLQUFLRixTQURWO0FBRUZ1QixrQ0FBTSxLQUFLdEI7QUFGVCx5QkFGQztBQU1QdUIsZ0NBQVEsTUFORDtBQU9QQyxpQ0FBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ25CQyxvQ0FBUUMsR0FBUixDQUFZRixJQUFJM0IsSUFBaEI7QUFDQSxnQ0FBSTJCLElBQUkzQixJQUFKLENBQVM4QixFQUFiLEVBQWlCO0FBQ2JiLG1DQUFHQyxTQUFILENBQWE7QUFDVEMsMkNBQU8sTUFERTtBQUVUWSwwQ0FBTSxTQUZHO0FBR1RWLDhDQUFVO0FBSEQsaUNBQWI7QUFLQUosbUNBQUdlLGNBQUgsQ0FDSSxXQURKLEVBRUlMLElBQUlNLE1BQUosQ0FBVyxZQUFYLENBRko7QUFJQSxvQ0FBTUMsV0FBV1AsSUFBSTNCLElBQUosQ0FBU2tDLFFBQTFCO0FBQ0Esb0NBQUlBLFNBQVNsQixNQUFULEtBQW9CLENBQXhCLEVBQTJCO0FBQ3ZCbUIsK0NBQVcsWUFBTTtBQUNibEIsMkNBQUdlLGNBQUgsQ0FDSSxXQURKLEVBRUlFLFNBQVMsQ0FBVCxFQUFZRSxFQUZoQjtBQUlBbkIsMkNBQUdvQixTQUFILENBQWE7QUFDVGQsaURBQUs7QUFESSx5Q0FBYjtBQUdILHFDQVJELEVBUUcsSUFSSDtBQVNILGlDQVZELE1BVU87QUFDSFksK0NBQVcsWUFBTTtBQUNibEIsMkNBQUdxQixVQUFILENBQWM7QUFDVmYsK0VBQWlDZ0IsS0FBS0MsU0FBTCxDQUM3Qk4sUUFENkI7QUFEdkIseUNBQWQ7QUFLSCxxQ0FORCxFQU1HLElBTkg7QUFPSDtBQUNKLDZCQTlCRCxNQThCTztBQUNIakIsbUNBQUdDLFNBQUgsQ0FBYTtBQUNUQywyQ0FBTyxNQURFO0FBRVRDLDJDQUFPLGdCQUZFO0FBR1RDLDhDQUFVO0FBSEQsaUNBQWI7QUFLSDtBQUNKO0FBOUNNLHFCQUFYOztBQWlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNILGlCQTdERCxNQTZETztBQUNISix1QkFBR0MsU0FBSCxDQUFhO0FBQ1RDLCtCQUFPLE9BREU7QUFFVEMsK0JBQU8sZ0JBRkU7QUFHVEMsa0NBQVU7QUFIRCxxQkFBYjtBQUtIO0FBQ0osYUFwRks7QUFxRk5vQixxQkFBUyxtQkFBVztBQUNoQixvQkFBSSxDQUFDLEtBQUtuQyxVQUFWLEVBQXNCO0FBQ2xCLHdCQUFJLEtBQUtMLFNBQUwsQ0FBZWUsTUFBZixLQUEwQixFQUE5QixFQUFrQztBQUM5QkMsMkJBQUdDLFNBQUgsQ0FBYTtBQUNUQyxtQ0FBTyxPQURFOztBQUdUQyxtQ0FBTyxnQkFIRTtBQUlUQyxzQ0FBVTtBQUpELHlCQUFiO0FBTUgscUJBUEQsTUFPTztBQUNILDRCQUFJLEtBQUtsQixLQUFMLElBQWMsS0FBS0YsU0FBdkIsRUFBa0M7QUFDOUIsaUNBQUtLLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxpQ0FBS0UsU0FBTCxHQUFpQixNQUFqQjtBQUNBLGlDQUFLSCxRQUFMLEdBQWdCLFFBQWhCOztBQUVBO0FBQ0FZLCtCQUFHSyxPQUFILENBQVc7QUFDUEMscUNBQUsscUNBREU7QUFFUHZCLHNDQUFNO0FBQ0ZHLDJDQUFPLEtBQUtGO0FBRFYsaUNBRkM7QUFLUHlCLHlDQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDbkJDLDRDQUFRQyxHQUFSLENBQVlGLElBQUkzQixJQUFoQjtBQUNIO0FBUE0sNkJBQVg7QUFTSCx5QkFmRCxNQWVPO0FBQ0hpQiwrQkFBR3lCLFNBQUgsQ0FBYTtBQUNUdkIsdUNBQU8sSUFERTtBQUVUd0IseUNBQVM7QUFGQSw2QkFBYjtBQUlIO0FBQ0o7QUFDSjtBQUNKLGFBdEhLO0FBdUhOQyx3QkF2SE0sd0JBdUhPQyxDQXZIUCxFQXVIVTtBQUNaLHFCQUFLNUMsU0FBTCxHQUFpQjRDLEVBQUVDLE1BQUYsQ0FBU0MsS0FBMUI7QUFDQSxxQkFBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCOUMsS0FBeEIsR0FBZ0MwQyxFQUFFQyxNQUFGLENBQVNDLEtBQXpDO0FBQ0gsYUExSEs7QUEySE5HLHVCQTNITSx1QkEySE1MLENBM0hOLEVBMkhTO0FBQ1gscUJBQUszQyxRQUFMLEdBQWdCMkMsRUFBRUMsTUFBRixDQUFTQyxLQUF6QjtBQUNIO0FBN0hLLFM7Ozs7RUEzQnFCLGVBQUtJLEk7O2tCQUFuQnRELEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+W3p+WFi+WKm+aipuW3peWOgidcbiAgICB9O1xuXG4gICAgZGF0YSA9IHtcbiAgICAgICAgdXNlclBob25lOiBudWxsLFxuICAgICAgICB1c2VyVmFsaTogbnVsbCxcbiAgICAgICAgcGhvbmU6IDE4NTAyODEwODgxLFxuICAgICAgICB2YWxpTnVtOiAxMjM0NTYsXG4gICAgICAgIHZhbGlUZXh0OiAn6I635Y+W6aqM6K+B56CBJyxcbiAgICAgICAgdmFsaWRhdGluZzogZmFsc2UsXG4gICAgICAgIHZhbGlUaW1lOiA2MCxcbiAgICAgICAgdmFsaUNvbG9yOiAnIzMzN2FiNycsXG4gICAgICAgIGxvZ2luU2hvdzogZmFsc2UsXG4gICAgICAgIGluZGV4SW1hZ2VzOiBbXG4gICAgICAgICAgICAnLi9pbWcvbG9nby5qcGcnLFxuICAgICAgICAgICAgJy4vaW1nL2xvZ28uanBnJyxcbiAgICAgICAgICAgICcuL2ltZy9sb2dvLmpwZycsXG4gICAgICAgICAgICAnLi9pbWcvbG9nby5qcGcnLFxuICAgICAgICAgICAgJy4vaW1nL2xvZ28uanBnJyxcbiAgICAgICAgICAgICcuL2ltZy9sb2dvLmpwZydcbiAgICAgICAgXVxuICAgIH07XG5cbiAgICBjb21wdXRlZCA9IHt9O1xuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgc2hvd0luZGV4KCkge1xuICAgICAgICAgICAgdGhpcy5sb2dpblNob3cgPSBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2hvd0xvZ2luKCkge1xuICAgICAgICAgICAgdGhpcy5sb2dpblNob3cgPSB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICB0cnlMb2dpbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAodGhpcy51c2VyUGhvbmUubGVuZ3RoICE9PSAxMSkge1xuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5omL5py65Y+36ZSZ6K+vJyxcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6ICcuL2ltZy9mYWlsLnBuZycsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudXNlclZhbGkubGVuZ3RoID09IDYpIHtcbiAgICAgICAgICAgICAgICAvLyDojrflj5bpqozor4HnoIFcbiAgICAgICAgICAgICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9iYWNrLnl1aXl1LmNuL3d4L2xvZ2luL3ZlcmlmeScsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBob25lOiB0aGlzLnVzZXJQaG9uZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IHRoaXMudXNlclZhbGlcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfnmbvlvZXmiJDlip8nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzZXNzaW9uSWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuaGVhZGVyWydTZXQtQ29va2llJ11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0dWRlbnRzID0gcmVzLmRhdGEuc3R1ZGVudHM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0dWRlbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzdHVkZW50SWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0dWRlbnRzWzBdLmlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3guc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcuL2NlbnRlcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogYC4vc2VsZWN0U3R1ZGVudD9zdHVkZW50cz0ke0pTT04uc3RyaW5naWZ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHVkZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9YFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfnmbvlvZXlpLHotKUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZTogJy4vaW1nL2ZhaWwucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAvLyAgICAgdGl0bGU6ICfnmbvlvZXmiJDlip8nLFxuICAgICAgICAgICAgICAgIC8vICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgLy8gICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgICAgICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gICAgIHd4LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB1cmw6IGAuL2NlbnRlcj91c2VyUGhvbmU9JHt0aGlzLnVzZXJQaG9uZX1gXG4gICAgICAgICAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIH0sIDIwMDApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+mqjOivgeeggemUmeivrycsXG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiAnLi9pbWcvZmFpbC5wbmcnLFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBnZXRWYWxpOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy52YWxpZGF0aW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudXNlclBob25lLmxlbmd0aCAhPT0gMTEpIHtcbiAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5omL5py65Y+36ZSZ6K+vJyxcblxuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2U6ICcuL2ltZy9mYWlsLnBuZycsXG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5waG9uZSA9PSB0aGlzLnVzZXJQaG9uZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmFsaUNvbG9yID0gJyNjY2MnO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52YWxpVGV4dCA9ICfojrflj5bkuK0uLi4nO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDojrflj5bpqozor4HnoIFcbiAgICAgICAgICAgICAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vYmFjay55dWl5dS5jbi93eC9sb2dpbi9jb2RlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBob25lOiB0aGlzLnVzZXJQaG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfmgqjov5jkuI3mmK/miJHku6znmoTkvJrlkZgnXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ2V0VXNlclBob25lKGUpIHtcbiAgICAgICAgICAgIHRoaXMudXNlclBob25lID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuY3VzdG9tRGF0YS5waG9uZSA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBnZXRVc2VyVmFsaShlKSB7XG4gICAgICAgICAgICB0aGlzLnVzZXJWYWxpID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICAgIH1cbiAgICB9O1xufVxuIl19