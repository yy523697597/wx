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
            valiColor: '#337ab7'
        }, _this.computed = {}, _this.methods = {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1c2VyUGhvbmUiLCJ1c2VyVmFsaSIsInBob25lIiwidmFsaU51bSIsInZhbGlUZXh0IiwidmFsaWRhdGluZyIsInZhbGlUaW1lIiwidmFsaUNvbG9yIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwidHJ5TG9naW4iLCJsZW5ndGgiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwic2V0VGltZW91dCIsInN3aXRjaFRhYiIsInVybCIsImltYWdlIiwiZ2V0VmFsaSIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJnZXRVc2VyUGhvbmUiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCIkcGFyZW50IiwiY3VzdG9tRGF0YSIsImdldFVzZXJWYWxpIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBSVRDLEksR0FBTztBQUNIQyx1QkFBVyxJQURSO0FBRUhDLHNCQUFVLElBRlA7QUFHSEMsbUJBQU8sV0FISjtBQUlIQyxxQkFBUyxNQUpOO0FBS0hDLHNCQUFVLE9BTFA7QUFNSEMsd0JBQVksS0FOVDtBQU9IQyxzQkFBVSxFQVBQO0FBUUhDLHVCQUFXO0FBUlIsUyxRQVdQQyxRLEdBQVcsRSxRQUVYQyxPLEdBQVU7QUFDTkMsc0JBQVUsb0JBQVc7QUFBQTs7QUFDakIsb0JBQUksS0FBS1QsUUFBTCxDQUFjVSxNQUFkLElBQXdCLENBQXhCLElBQTZCLEtBQUtWLFFBQUwsSUFBaUIsS0FBS0UsT0FBdkQsRUFBZ0U7QUFDNURTLHVCQUFHQyxTQUFILENBQWE7QUFDVEMsK0JBQU8sTUFERTtBQUVUQyw4QkFBTSxTQUZHO0FBR1RDLGtDQUFVO0FBSEQscUJBQWI7QUFLQUMsK0JBQVcsWUFBTTtBQUNiTCwyQkFBR00sU0FBSCxDQUFhO0FBQ1RDLHlEQUEyQixPQUFLbkI7QUFEdkIseUJBQWI7QUFHSCxxQkFKRCxFQUlHLElBSkg7QUFLSCxpQkFYRCxNQVdPO0FBQ0hZLHVCQUFHQyxTQUFILENBQWE7QUFDVEMsK0JBQU8sT0FERTtBQUVUTSwrQkFBTyxnQkFGRTtBQUdUSixrQ0FBVTtBQUhELHFCQUFiO0FBS0g7QUFDSixhQXBCSztBQXFCTksscUJBQVMsbUJBQVc7QUFDaEIsb0JBQUksQ0FBQyxLQUFLaEIsVUFBVixFQUFzQjtBQUNsQix3QkFBSSxLQUFLTCxTQUFMLENBQWVXLE1BQWYsS0FBMEIsRUFBOUIsRUFBa0M7QUFDOUJDLDJCQUFHQyxTQUFILENBQWE7QUFDVEMsbUNBQU8sT0FERTs7QUFHVE0sbUNBQU8sZ0JBSEU7QUFJVEosc0NBQVU7QUFKRCx5QkFBYjtBQU1ILHFCQVBELE1BT087QUFDSCw0QkFBSSxLQUFLZCxLQUFMLElBQWMsS0FBS0YsU0FBdkIsRUFBa0M7QUFDOUIsaUNBQUtLLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxpQ0FBS0UsU0FBTCxHQUFpQixNQUFqQjtBQUNBLGlDQUFLSCxRQUFMLEdBQWdCLFFBQWhCO0FBQ0gseUJBSkQsTUFJTztBQUNIUSwrQkFBR1UsU0FBSCxDQUFhO0FBQ1RSLHVDQUFPLElBREU7QUFFVFMseUNBQVM7QUFGQSw2QkFBYjtBQUlIO0FBQ0o7QUFDSjtBQUNKLGFBM0NLO0FBNENOQyx3QkE1Q00sd0JBNENPQyxDQTVDUCxFQTRDVTtBQUNaLHFCQUFLekIsU0FBTCxHQUFpQnlCLEVBQUVDLE1BQUYsQ0FBU0MsS0FBMUI7QUFDQSxxQkFBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCM0IsS0FBeEIsR0FBZ0N1QixFQUFFQyxNQUFGLENBQVNDLEtBQXpDO0FBQ0gsYUEvQ0s7QUFnRE5HLHVCQWhETSx1QkFnRE1MLENBaEROLEVBZ0RTO0FBQ1gscUJBQUt4QixRQUFMLEdBQWdCd0IsRUFBRUMsTUFBRixDQUFTQyxLQUF6QjtBQUNIO0FBbERLLFM7Ozs7RUFsQnFCLGVBQUtJLEk7O2tCQUFuQm5DLEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+W3p+WFi+WKm+aipuW3peWOgidcbiAgICB9O1xuXG4gICAgZGF0YSA9IHtcbiAgICAgICAgdXNlclBob25lOiBudWxsLFxuICAgICAgICB1c2VyVmFsaTogbnVsbCxcbiAgICAgICAgcGhvbmU6IDExMTExMTExMTExLFxuICAgICAgICB2YWxpTnVtOiAxMjM0NTYsXG4gICAgICAgIHZhbGlUZXh0OiAn6I635Y+W6aqM6K+B56CBJyxcbiAgICAgICAgdmFsaWRhdGluZzogZmFsc2UsXG4gICAgICAgIHZhbGlUaW1lOiA2MCxcbiAgICAgICAgdmFsaUNvbG9yOiAnIzMzN2FiNydcbiAgICB9O1xuXG4gICAgY29tcHV0ZWQgPSB7fTtcblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIHRyeUxvZ2luOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnVzZXJWYWxpLmxlbmd0aCA9PSA2ICYmIHRoaXMudXNlclZhbGkgPT0gdGhpcy52YWxpTnVtKSB7XG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfnmbvlvZXmiJDlip8nLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHd4LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IGAuL2NlbnRlcj91c2VyUGhvbmU9JHt0aGlzLnVzZXJQaG9uZX1gXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+mqjOivgeeggemUmeivrycsXG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiAnLi9pbWcvZmFpbC5wbmcnLFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBnZXRWYWxpOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy52YWxpZGF0aW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudXNlclBob25lLmxlbmd0aCAhPT0gMTEpIHtcbiAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5omL5py65Y+36ZSZ6K+vJyxcblxuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2U6ICcuL2ltZy9mYWlsLnBuZycsXG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5waG9uZSA9PSB0aGlzLnVzZXJQaG9uZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmFsaUNvbG9yID0gJyNjY2MnO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52YWxpVGV4dCA9ICfojrflj5bkuK0uLi4nO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogJ+aCqOi/mOS4jeaYr+aIkeS7rOeahOS8muWRmCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBnZXRVc2VyUGhvbmUoZSkge1xuICAgICAgICAgICAgdGhpcy51c2VyUGhvbmUgPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5jdXN0b21EYXRhLnBob25lID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFVzZXJWYWxpKGUpIHtcbiAgICAgICAgICAgIHRoaXMudXNlclZhbGkgPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgICAgfVxuICAgIH07XG59XG4iXX0=