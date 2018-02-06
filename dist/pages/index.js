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
      },
      getUserVali: function getUserVali(e) {
        this.userVali = e.detail.value;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1c2VyUGhvbmUiLCJ1c2VyVmFsaSIsInBob25lIiwidmFsaU51bSIsInZhbGlUZXh0IiwidmFsaWRhdGluZyIsInZhbGlUaW1lIiwidmFsaUNvbG9yIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwidHJ5TG9naW4iLCJsZW5ndGgiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwic2V0VGltZW91dCIsInN3aXRjaFRhYiIsInVybCIsImltYWdlIiwiZ2V0VmFsaSIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJnZXRVc2VyUGhvbmUiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJnZXRVc2VyVmFsaSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUlUQyxJLEdBQU87QUFDTEMsaUJBQVcsSUFETjtBQUVMQyxnQkFBVSxJQUZMO0FBR0xDLGFBQU8sV0FIRjtBQUlMQyxlQUFTLE1BSko7QUFLTEMsZ0JBQVUsT0FMTDtBQU1MQyxrQkFBWSxLQU5QO0FBT0xDLGdCQUFVLEVBUEw7QUFRTEMsaUJBQVc7QUFSTixLLFFBV1BDLFEsR0FBVyxFLFFBRVhDLE8sR0FBVTtBQUNSQyxnQkFBVSxvQkFBVztBQUFBOztBQUNuQixZQUFJLEtBQUtULFFBQUwsQ0FBY1UsTUFBZCxJQUF3QixDQUF4QixJQUE2QixLQUFLVixRQUFMLElBQWlCLEtBQUtFLE9BQXZELEVBQWdFO0FBQzlEUyxhQUFHQyxTQUFILENBQWE7QUFDWEMsbUJBQU8sTUFESTtBQUVYQyxrQkFBTSxTQUZLO0FBR1hDLHNCQUFVO0FBSEMsV0FBYjtBQUtBQyxxQkFBVyxZQUFNO0FBQ2ZMLGVBQUdNLFNBQUgsQ0FBYTtBQUNYQywyQ0FBMkIsT0FBS25CO0FBRHJCLGFBQWI7QUFHRCxXQUpELEVBSUcsSUFKSDtBQUtELFNBWEQsTUFXTztBQUNMWSxhQUFHQyxTQUFILENBQWE7QUFDWEMsbUJBQU8sT0FESTtBQUVYTSxtQkFBTyxnQkFGSTtBQUdYSixzQkFBVTtBQUhDLFdBQWI7QUFLRDtBQUNGLE9BcEJPO0FBcUJSSyxlQUFTLG1CQUFXO0FBQ2xCLFlBQUksQ0FBQyxLQUFLaEIsVUFBVixFQUFzQjtBQUNwQixjQUFJLEtBQUtMLFNBQUwsQ0FBZVcsTUFBZixLQUEwQixFQUE5QixFQUFrQztBQUNoQ0MsZUFBR0MsU0FBSCxDQUFhO0FBQ1hDLHFCQUFPLE9BREk7QUFFWE0scUJBQU8sZ0JBRkk7QUFHWEosd0JBQVU7QUFIQyxhQUFiO0FBS0QsV0FORCxNQU1PO0FBQ0wsZ0JBQUksS0FBS2QsS0FBTCxJQUFjLEtBQUtGLFNBQXZCLEVBQWtDO0FBQ2hDLG1CQUFLSyxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsbUJBQUtFLFNBQUwsR0FBaUIsTUFBakI7QUFDQSxtQkFBS0gsUUFBTCxHQUFnQixRQUFoQjtBQUNELGFBSkQsTUFJTztBQUNMUSxpQkFBR1UsU0FBSCxDQUFhO0FBQ1hSLHVCQUFPLElBREk7QUFFWFMseUJBQVM7QUFGRSxlQUFiO0FBSUQ7QUFDRjtBQUNGO0FBQ0YsT0ExQ087QUEyQ1JDLGtCQTNDUSx3QkEyQ0tDLENBM0NMLEVBMkNRO0FBQ2QsYUFBS3pCLFNBQUwsR0FBaUJ5QixFQUFFQyxNQUFGLENBQVNDLEtBQTFCO0FBQ0QsT0E3Q087QUE4Q1JDLGlCQTlDUSx1QkE4Q0lILENBOUNKLEVBOENPO0FBQ2IsYUFBS3hCLFFBQUwsR0FBZ0J3QixFQUFFQyxNQUFGLENBQVNDLEtBQXpCO0FBQ0Q7QUFoRE8sSzs7OztFQWxCdUIsZUFBS0UsSTs7a0JBQW5CakMsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ben5YWL5Yqb5qKm5bel5Y6CJ1xuICB9O1xuXG4gIGRhdGEgPSB7XG4gICAgdXNlclBob25lOiBudWxsLFxuICAgIHVzZXJWYWxpOiBudWxsLFxuICAgIHBob25lOiAxODUwMjgxMDg4MSxcbiAgICB2YWxpTnVtOiAxMjM0NTYsXG4gICAgdmFsaVRleHQ6ICfojrflj5bpqozor4HnoIEnLFxuICAgIHZhbGlkYXRpbmc6IGZhbHNlLFxuICAgIHZhbGlUaW1lOiA2MCxcbiAgICB2YWxpQ29sb3I6ICcjMzM3YWI3J1xuICB9O1xuXG4gIGNvbXB1dGVkID0ge307XG5cbiAgbWV0aG9kcyA9IHtcbiAgICB0cnlMb2dpbjogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy51c2VyVmFsaS5sZW5ndGggPT0gNiAmJiB0aGlzLnVzZXJWYWxpID09IHRoaXMudmFsaU51bSkge1xuICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgIHRpdGxlOiAn55m75b2V5oiQ5YqfJyxcbiAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgfSk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHd4LnN3aXRjaFRhYih7XG4gICAgICAgICAgICB1cmw6IGAuL2NlbnRlcj91c2VyUGhvbmU9JHt0aGlzLnVzZXJQaG9uZX1gXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sIDIwMDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogJ+mqjOivgeeggemUmeivrycsXG4gICAgICAgICAgaW1hZ2U6ICcuL2ltZy9mYWlsLnBuZycsXG4gICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBnZXRWYWxpOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghdGhpcy52YWxpZGF0aW5nKSB7XG4gICAgICAgIGlmICh0aGlzLnVzZXJQaG9uZS5sZW5ndGggIT09IDExKSB7XG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn5omL5py65Y+36ZSZ6K+vJyxcbiAgICAgICAgICAgIGltYWdlOiAnLi9pbWcvZmFpbC5wbmcnLFxuICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGhpcy5waG9uZSA9PSB0aGlzLnVzZXJQaG9uZSkge1xuICAgICAgICAgICAgdGhpcy52YWxpZGF0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMudmFsaUNvbG9yID0gJyNjY2MnO1xuICAgICAgICAgICAgdGhpcy52YWxpVGV4dCA9ICfojrflj5bkuK0uLi4nO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6ICfmgqjov5jkuI3mmK/miJHku6znmoTkvJrlkZgnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGdldFVzZXJQaG9uZShlKSB7XG4gICAgICB0aGlzLnVzZXJQaG9uZSA9IGUuZGV0YWlsLnZhbHVlO1xuICAgIH0sXG4gICAgZ2V0VXNlclZhbGkoZSkge1xuICAgICAgdGhpcy51c2VyVmFsaSA9IGUuZGV0YWlsLnZhbHVlO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==