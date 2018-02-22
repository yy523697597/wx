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
            phone: 11111111111,
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
                var _this2 = this;

                if (this.userVali.length == 6 && this.userVali == this.valiNum) {
                    wx.showToast({
                        title: '登录成功',
                        icon: 'success',
                        duration: 2000
                    });
                    setTimeout(function () {
                        wx.switchTab({
                            url: './center?userPhone=' + _this2.userPhone
                        });
                    }, 2000);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1c2VyUGhvbmUiLCJ1c2VyVmFsaSIsInBob25lIiwidmFsaU51bSIsInZhbGlUZXh0IiwidmFsaWRhdGluZyIsInZhbGlUaW1lIiwidmFsaUNvbG9yIiwibG9naW5TaG93IiwiaW5kZXhJbWFnZXMiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJzaG93SW5kZXgiLCJzaG93TG9naW4iLCJ0cnlMb2dpbiIsImxlbmd0aCIsInd4Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZHVyYXRpb24iLCJzZXRUaW1lb3V0Iiwic3dpdGNoVGFiIiwidXJsIiwiaW1hZ2UiLCJnZXRWYWxpIiwic2hvd01vZGFsIiwiY29udGVudCIsImdldFVzZXJQaG9uZSIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRwYXJlbnQiLCJjdXN0b21EYXRhIiwiZ2V0VXNlclZhbGkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFJVEMsSSxHQUFPO0FBQ0hDLHVCQUFXLElBRFI7QUFFSEMsc0JBQVUsSUFGUDtBQUdIQyxtQkFBTyxXQUhKO0FBSUhDLHFCQUFTLE1BSk47QUFLSEMsc0JBQVUsT0FMUDtBQU1IQyx3QkFBWSxLQU5UO0FBT0hDLHNCQUFVLEVBUFA7QUFRSEMsdUJBQVcsU0FSUjtBQVNIQyx1QkFBVyxLQVRSO0FBVUhDLHlCQUFhLENBQ1QsZ0JBRFMsRUFFVCxnQkFGUyxFQUdULGdCQUhTLEVBSVQsZ0JBSlMsRUFLVCxnQkFMUyxFQU1ULGdCQU5TO0FBVlYsUyxRQW9CUEMsUSxHQUFXLEUsUUFFWEMsTyxHQUFVO0FBQ05DLHFCQURNLHVCQUNNO0FBQ1IscUJBQUtKLFNBQUwsR0FBaUIsS0FBakI7QUFDSCxhQUhLO0FBSU5LLHFCQUpNLHVCQUlNO0FBQ1IscUJBQUtMLFNBQUwsR0FBaUIsSUFBakI7QUFDSCxhQU5LOztBQU9OTSxzQkFBVSxvQkFBVztBQUFBOztBQUNqQixvQkFBSSxLQUFLYixRQUFMLENBQWNjLE1BQWQsSUFBd0IsQ0FBeEIsSUFBNkIsS0FBS2QsUUFBTCxJQUFpQixLQUFLRSxPQUF2RCxFQUFnRTtBQUM1RGEsdUJBQUdDLFNBQUgsQ0FBYTtBQUNUQywrQkFBTyxNQURFO0FBRVRDLDhCQUFNLFNBRkc7QUFHVEMsa0NBQVU7QUFIRCxxQkFBYjtBQUtBQywrQkFBVyxZQUFNO0FBQ2JMLDJCQUFHTSxTQUFILENBQWE7QUFDVEMseURBQTJCLE9BQUt2QjtBQUR2Qix5QkFBYjtBQUdILHFCQUpELEVBSUcsSUFKSDtBQUtILGlCQVhELE1BV087QUFDSGdCLHVCQUFHQyxTQUFILENBQWE7QUFDVEMsK0JBQU8sT0FERTtBQUVUTSwrQkFBTyxnQkFGRTtBQUdUSixrQ0FBVTtBQUhELHFCQUFiO0FBS0g7QUFDSixhQTFCSztBQTJCTksscUJBQVMsbUJBQVc7QUFDaEIsb0JBQUksQ0FBQyxLQUFLcEIsVUFBVixFQUFzQjtBQUNsQix3QkFBSSxLQUFLTCxTQUFMLENBQWVlLE1BQWYsS0FBMEIsRUFBOUIsRUFBa0M7QUFDOUJDLDJCQUFHQyxTQUFILENBQWE7QUFDVEMsbUNBQU8sT0FERTs7QUFHVE0sbUNBQU8sZ0JBSEU7QUFJVEosc0NBQVU7QUFKRCx5QkFBYjtBQU1ILHFCQVBELE1BT087QUFDSCw0QkFBSSxLQUFLbEIsS0FBTCxJQUFjLEtBQUtGLFNBQXZCLEVBQWtDO0FBQzlCLGlDQUFLSyxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsaUNBQUtFLFNBQUwsR0FBaUIsTUFBakI7QUFDQSxpQ0FBS0gsUUFBTCxHQUFnQixRQUFoQjtBQUNILHlCQUpELE1BSU87QUFDSFksK0JBQUdVLFNBQUgsQ0FBYTtBQUNUUix1Q0FBTyxJQURFO0FBRVRTLHlDQUFTO0FBRkEsNkJBQWI7QUFJSDtBQUNKO0FBQ0o7QUFDSixhQWpESztBQWtETkMsd0JBbERNLHdCQWtET0MsQ0FsRFAsRUFrRFU7QUFDWixxQkFBSzdCLFNBQUwsR0FBaUI2QixFQUFFQyxNQUFGLENBQVNDLEtBQTFCO0FBQ0EscUJBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3Qi9CLEtBQXhCLEdBQWdDMkIsRUFBRUMsTUFBRixDQUFTQyxLQUF6QztBQUNILGFBckRLO0FBc0RORyx1QkF0RE0sdUJBc0RNTCxDQXRETixFQXNEUztBQUNYLHFCQUFLNUIsUUFBTCxHQUFnQjRCLEVBQUVDLE1BQUYsQ0FBU0MsS0FBekI7QUFDSDtBQXhESyxTOzs7O0VBM0JxQixlQUFLSSxJOztrQkFBbkJ2QyxLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflt6flhYvlipvmoqblt6XljoInXG4gICAgfTtcblxuICAgIGRhdGEgPSB7XG4gICAgICAgIHVzZXJQaG9uZTogbnVsbCxcbiAgICAgICAgdXNlclZhbGk6IG51bGwsXG4gICAgICAgIHBob25lOiAxMTExMTExMTExMSxcbiAgICAgICAgdmFsaU51bTogMTIzNDU2LFxuICAgICAgICB2YWxpVGV4dDogJ+iOt+WPlumqjOivgeeggScsXG4gICAgICAgIHZhbGlkYXRpbmc6IGZhbHNlLFxuICAgICAgICB2YWxpVGltZTogNjAsXG4gICAgICAgIHZhbGlDb2xvcjogJyMzMzdhYjcnLFxuICAgICAgICBsb2dpblNob3c6IGZhbHNlLFxuICAgICAgICBpbmRleEltYWdlczogW1xuICAgICAgICAgICAgJy4vaW1nL2xvZ28uanBnJyxcbiAgICAgICAgICAgICcuL2ltZy9sb2dvLmpwZycsXG4gICAgICAgICAgICAnLi9pbWcvbG9nby5qcGcnLFxuICAgICAgICAgICAgJy4vaW1nL2xvZ28uanBnJyxcbiAgICAgICAgICAgICcuL2ltZy9sb2dvLmpwZycsXG4gICAgICAgICAgICAnLi9pbWcvbG9nby5qcGcnXG4gICAgICAgIF1cbiAgICB9O1xuXG4gICAgY29tcHV0ZWQgPSB7fTtcblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIHNob3dJbmRleCgpIHtcbiAgICAgICAgICAgIHRoaXMubG9naW5TaG93ID0gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIHNob3dMb2dpbigpIHtcbiAgICAgICAgICAgIHRoaXMubG9naW5TaG93ID0gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgdHJ5TG9naW46IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMudXNlclZhbGkubGVuZ3RoID09IDYgJiYgdGhpcy51c2VyVmFsaSA9PSB0aGlzLnZhbGlOdW0pIHtcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+eZu+W9leaIkOWKnycsXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgd3guc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogYC4vY2VudGVyP3VzZXJQaG9uZT0ke3RoaXMudXNlclBob25lfWBcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn6aqM6K+B56CB6ZSZ6K+vJyxcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6ICcuL2ltZy9mYWlsLnBuZycsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGdldFZhbGk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRpbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy51c2VyUGhvbmUubGVuZ3RoICE9PSAxMSkge1xuICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmiYvmnLrlj7fplJnor68nLFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZTogJy4vaW1nL2ZhaWwucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBob25lID09IHRoaXMudXNlclBob25lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52YWxpQ29sb3IgPSAnI2NjYyc7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbGlUZXh0ID0gJ+iOt+WPluS4rS4uLic7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAn5oKo6L+Y5LiN5piv5oiR5Lus55qE5Lya5ZGYJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGdldFVzZXJQaG9uZShlKSB7XG4gICAgICAgICAgICB0aGlzLnVzZXJQaG9uZSA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgICAgICAgdGhpcy4kcGFyZW50LmN1c3RvbURhdGEucGhvbmUgPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0VXNlclZhbGkoZSkge1xuICAgICAgICAgICAgdGhpcy51c2VyVmFsaSA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9XG4gICAgfTtcbn1cbiJdfQ==