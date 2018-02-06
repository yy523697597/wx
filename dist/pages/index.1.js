'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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
              url: '../center/center?userPhone=' + _this2.userPhone
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

exports.default = Index;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LjEuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInVzZXJQaG9uZSIsInVzZXJWYWxpIiwicGhvbmUiLCJ2YWxpTnVtIiwidmFsaVRleHQiLCJ2YWxpZGF0aW5nIiwidmFsaVRpbWUiLCJ2YWxpQ29sb3IiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJ0cnlMb2dpbiIsImxlbmd0aCIsInd4Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZHVyYXRpb24iLCJzZXRUaW1lb3V0Iiwic3dpdGNoVGFiIiwidXJsIiwiaW1hZ2UiLCJnZXRWYWxpIiwic2hvd01vZGFsIiwiY29udGVudCIsImdldFVzZXJQaG9uZSIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsImdldFVzZXJWYWxpIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVRDLEksR0FBTztBQUNMQyxpQkFBVyxJQUROO0FBRUxDLGdCQUFVLElBRkw7QUFHTEMsYUFBTyxXQUhGO0FBSUxDLGVBQVMsTUFKSjtBQUtMQyxnQkFBVSxPQUxMO0FBTUxDLGtCQUFZLEtBTlA7QUFPTEMsZ0JBQVUsRUFQTDtBQVFMQyxpQkFBVztBQVJOLEssUUFXUEMsUSxHQUFXLEUsUUFFWEMsTyxHQUFVO0FBQ1JDLGdCQUFVLG9CQUFXO0FBQUE7O0FBQ25CLFlBQUksS0FBS1QsUUFBTCxDQUFjVSxNQUFkLElBQXdCLENBQXhCLElBQTZCLEtBQUtWLFFBQUwsSUFBaUIsS0FBS0UsT0FBdkQsRUFBZ0U7QUFDOURTLGFBQUdDLFNBQUgsQ0FBYTtBQUNYQyxtQkFBTyxNQURJO0FBRVhDLGtCQUFNLFNBRks7QUFHWEMsc0JBQVU7QUFIQyxXQUFiO0FBS0FDLHFCQUFXLFlBQU07QUFDZkwsZUFBR00sU0FBSCxDQUFhO0FBQ1hDLG1EQUFtQyxPQUFLbkI7QUFEN0IsYUFBYjtBQUdELFdBSkQsRUFJRyxJQUpIO0FBS0QsU0FYRCxNQVdPO0FBQ0xZLGFBQUdDLFNBQUgsQ0FBYTtBQUNYQyxtQkFBTyxPQURJO0FBRVhNLG1CQUFPLGdCQUZJO0FBR1hKLHNCQUFVO0FBSEMsV0FBYjtBQUtEO0FBQ0YsT0FwQk87QUFxQlJLLGVBQVMsbUJBQVc7QUFDbEIsWUFBSSxDQUFDLEtBQUtoQixVQUFWLEVBQXNCO0FBQ3BCLGNBQUksS0FBS0wsU0FBTCxDQUFlVyxNQUFmLEtBQTBCLEVBQTlCLEVBQWtDO0FBQ2hDQyxlQUFHQyxTQUFILENBQWE7QUFDWEMscUJBQU8sT0FESTtBQUVYTSxxQkFBTyxnQkFGSTtBQUdYSix3QkFBVTtBQUhDLGFBQWI7QUFLRCxXQU5ELE1BTU87QUFDTCxnQkFBSSxLQUFLZCxLQUFMLElBQWMsS0FBS0YsU0FBdkIsRUFBa0M7QUFDaEMsbUJBQUtLLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxtQkFBS0UsU0FBTCxHQUFpQixNQUFqQjtBQUNBLG1CQUFLSCxRQUFMLEdBQWdCLFFBQWhCO0FBQ0QsYUFKRCxNQUlPO0FBQ0xRLGlCQUFHVSxTQUFILENBQWE7QUFDWFIsdUJBQU8sSUFESTtBQUVYUyx5QkFBUztBQUZFLGVBQWI7QUFJRDtBQUNGO0FBQ0Y7QUFDRixPQTFDTztBQTJDUkMsa0JBM0NRLHdCQTJDS0MsQ0EzQ0wsRUEyQ1E7QUFDZCxhQUFLekIsU0FBTCxHQUFpQnlCLEVBQUVDLE1BQUYsQ0FBU0MsS0FBMUI7QUFDRCxPQTdDTztBQThDUkMsaUJBOUNRLHVCQThDSUgsQ0E5Q0osRUE4Q087QUFDYixhQUFLeEIsUUFBTCxHQUFnQndCLEVBQUVDLE1BQUYsQ0FBU0MsS0FBekI7QUFDRDtBQWhETyxLOzs7O0VBbEJ1QixlQUFLRSxJOztrQkFBbkJqQyxLIiwiZmlsZSI6ImluZGV4LjEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+W3p+WFi+WKm+aipuW3peWOgidcbiAgfTtcblxuICBkYXRhID0ge1xuICAgIHVzZXJQaG9uZTogbnVsbCxcbiAgICB1c2VyVmFsaTogbnVsbCxcbiAgICBwaG9uZTogMTg1MDI4MTA4ODEsXG4gICAgdmFsaU51bTogMTIzNDU2LFxuICAgIHZhbGlUZXh0OiAn6I635Y+W6aqM6K+B56CBJyxcbiAgICB2YWxpZGF0aW5nOiBmYWxzZSxcbiAgICB2YWxpVGltZTogNjAsXG4gICAgdmFsaUNvbG9yOiAnIzMzN2FiNydcbiAgfTtcblxuICBjb21wdXRlZCA9IHt9O1xuXG4gIG1ldGhvZHMgPSB7XG4gICAgdHJ5TG9naW46IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMudXNlclZhbGkubGVuZ3RoID09IDYgJiYgdGhpcy51c2VyVmFsaSA9PSB0aGlzLnZhbGlOdW0pIHtcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogJ+eZu+W9leaIkOWKnycsXG4gICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgIH0pO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB3eC5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgdXJsOiBgLi4vY2VudGVyL2NlbnRlcj91c2VyUGhvbmU9JHt0aGlzLnVzZXJQaG9uZX1gXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sIDIwMDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogJ+mqjOivgeeggemUmeivrycsXG4gICAgICAgICAgaW1hZ2U6ICcuL2ltZy9mYWlsLnBuZycsXG4gICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBnZXRWYWxpOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghdGhpcy52YWxpZGF0aW5nKSB7XG4gICAgICAgIGlmICh0aGlzLnVzZXJQaG9uZS5sZW5ndGggIT09IDExKSB7XG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn5omL5py65Y+36ZSZ6K+vJyxcbiAgICAgICAgICAgIGltYWdlOiAnLi9pbWcvZmFpbC5wbmcnLFxuICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGhpcy5waG9uZSA9PSB0aGlzLnVzZXJQaG9uZSkge1xuICAgICAgICAgICAgdGhpcy52YWxpZGF0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMudmFsaUNvbG9yID0gJyNjY2MnO1xuICAgICAgICAgICAgdGhpcy52YWxpVGV4dCA9ICfojrflj5bkuK0uLi4nO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6ICfmgqjov5jkuI3mmK/miJHku6znmoTkvJrlkZgnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGdldFVzZXJQaG9uZShlKSB7XG4gICAgICB0aGlzLnVzZXJQaG9uZSA9IGUuZGV0YWlsLnZhbHVlO1xuICAgIH0sXG4gICAgZ2V0VXNlclZhbGkoZSkge1xuICAgICAgdGhpcy51c2VyVmFsaSA9IGUuZGV0YWlsLnZhbHVlO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==