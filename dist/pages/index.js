"use strict";

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
      navigationBarTitleText: "巧克力梦工厂"
    }, _this.data = {
      userPhone: null,
      userVali: null,
      valiNum: 123456,
      valiText: "获取验证码",
      validating: false,
      valiTime: 60,
      valiColor: "#337ab7",
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
            title: "手机号错误",
            image: "./img/fail.png",
            duration: 1000
          });
          return;
        }
        if (this.userVali.length == 6) {
          var openid = wx.getStorageSync("openid");
          console.log(openid);
          // 获取验证码`
          wx.request({
            url: "https://chocolate.wuxin.ren/wx/login/verify",
            data: {
              phone: this.userPhone,
              code: this.userVali,
              openid: openid
            },
            method: "POST",
            success: function success(res) {
              console.log(res.data);
              if (res.data.ok) {
                console.log("成功请求登录接口");
                wx.showToast({
                  title: "登录成功",
                  icon: "success",
                  duration: 1000
                });
                var students = res.data.students;
                if (students.length === 1) {
                  setTimeout(function () {
                    wx.setStorageSync("student", students[0]);
                    wx.switchTab({
                      url: "./center"
                    });
                  }, 1000);
                } else {
                  setTimeout(function () {
                    wx.setStorageSync("studentList", students);
                    wx.redirectTo({
                      url: "./selectStudent?students=" + JSON.stringify(students)
                    });
                  }, 1000);
                }
              } else {
                wx.showToast({
                  title: "登录失败",
                  image: "./img/fail.png",
                  duration: 1000
                });
              }
            }
          });
        } else {
          wx.showToast({
            title: "验证码错误",
            image: "./img/fail.png",
            duration: 1000
          });
        }
      },
      // 获取验证码
      getVali: function getVali() {
        if (!this.userPhone || this.userPhone.length !== 11) {
          wx.showToast({
            title: "手机号错误",
            image: "./img/fail.png",
            duration: 1000
          });
        } else {
          var that = this;
          that.valiColor = "#ccc";
          that.valiText = "已发送";
          wx.request({
            url: "https://chocolate.wuxin.ren/wx/login/code",
            data: {
              phone: that.userPhone
            },
            method: "POST",
            success: function success(res) {
              console.log(res.data);
              if (!res.data.ok) {
                wx.showModal({
                  title: "提示",
                  content: res.data.errorMsg,
                  showCancel: false,
                  success: function success(res) {
                    that.setData({
                      valiColor: "#337ab7",
                      valiText: "获取验证码"
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
    key: "getLogin",
    value: function getLogin() {
      var that = this;
      var openid = wx.getStorageSync("openid");
      console.log(openid);

      wx.request({
        url: "https://chocolate.wuxin.ren/wx/login/islogin",
        data: {
          openid: openid
        },
        success: function success(res) {
          if (res.data.ok) {
            console.log("成功请求isLogin");
            var students = res.data.students;
            if (students.length === 1) {
              wx.setStorageSync("student", students[0]);
              wx.switchTab({
                url: "./center"
              });
            } else if (students.length > 1) {
              wx.setStorageSync("studentList", students);
              wx.redirectTo({
                url: "./selectStudent?students=" + JSON.stringify(students)
              });
            }
          }
        }
      });
    }
  }, {
    key: "onLoad",
    value: function onLoad() {
      // 请求首页图片
      var that = this;
      wx.request({
        url: "https://chocolate.wuxin.ren/wx/home/pics",
        data: null,
        success: function success(res) {
          console.log(res.data);
          if (res.data.ok) {
            console.log("成功请求首页图片");
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1c2VyUGhvbmUiLCJ1c2VyVmFsaSIsInZhbGlOdW0iLCJ2YWxpVGV4dCIsInZhbGlkYXRpbmciLCJ2YWxpVGltZSIsInZhbGlDb2xvciIsImxvZ2luU2hvdyIsImluZGV4SW1hZ2VzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwic2hvd0luZGV4Iiwic2hvd0xvZ2luIiwiZ2V0TG9naW4iLCJ0cnlMb2dpbiIsImxlbmd0aCIsInd4Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpbWFnZSIsImR1cmF0aW9uIiwib3BlbmlkIiwiZ2V0U3RvcmFnZVN5bmMiLCJjb25zb2xlIiwibG9nIiwicmVxdWVzdCIsInVybCIsInBob25lIiwiY29kZSIsIm1ldGhvZCIsInN1Y2Nlc3MiLCJyZXMiLCJvayIsImljb24iLCJzdHVkZW50cyIsInNldFRpbWVvdXQiLCJzZXRTdG9yYWdlU3luYyIsInN3aXRjaFRhYiIsInJlZGlyZWN0VG8iLCJKU09OIiwic3RyaW5naWZ5IiwiZ2V0VmFsaSIsInRoYXQiLCJzaG93TW9kYWwiLCJjb250ZW50IiwiZXJyb3JNc2ciLCJzaG93Q2FuY2VsIiwic2V0RGF0YSIsImdldFVzZXJQaG9uZSIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRwYXJlbnQiLCJjdXN0b21EYXRhIiwiZ2V0VXNlclZhbGkiLCJwaWNzIiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFJVEMsSSxHQUFPO0FBQ0xDLGlCQUFXLElBRE47QUFFTEMsZ0JBQVUsSUFGTDtBQUdMQyxlQUFTLE1BSEo7QUFJTEMsZ0JBQVUsT0FKTDtBQUtMQyxrQkFBWSxLQUxQO0FBTUxDLGdCQUFVLEVBTkw7QUFPTEMsaUJBQVcsU0FQTjtBQVFMQyxpQkFBVyxLQVJOO0FBU0xDLG1CQUFhO0FBVFIsSyxRQVlQQyxRLEdBQVcsRSxRQWlEWEMsTyxHQUFVO0FBQ1JDLGVBRFEsdUJBQ0k7QUFDVixhQUFLSixTQUFMLEdBQWlCLEtBQWpCO0FBQ0QsT0FITztBQUlSSyxlQUpRLHVCQUlJO0FBQ1YsYUFBS0wsU0FBTCxHQUFpQixJQUFqQjtBQUNBLGFBQUtNLFFBQUw7QUFDRCxPQVBPOztBQVFSO0FBQ0FDLGdCQUFVLG9CQUFXO0FBQ25CLFlBQUksS0FBS2QsU0FBTCxDQUFlZSxNQUFmLEtBQTBCLEVBQTlCLEVBQWtDO0FBQ2hDQyxhQUFHQyxTQUFILENBQWE7QUFDWEMsbUJBQU8sT0FESTtBQUVYQyxtQkFBTyxnQkFGSTtBQUdYQyxzQkFBVTtBQUhDLFdBQWI7QUFLQTtBQUNEO0FBQ0QsWUFBSSxLQUFLbkIsUUFBTCxDQUFjYyxNQUFkLElBQXdCLENBQTVCLEVBQStCO0FBQzdCLGNBQU1NLFNBQVNMLEdBQUdNLGNBQUgsQ0FBa0IsUUFBbEIsQ0FBZjtBQUNBQyxrQkFBUUMsR0FBUixDQUFZSCxNQUFaO0FBQ0E7QUFDQUwsYUFBR1MsT0FBSCxDQUFXO0FBQ1RDLGlCQUFLLDZDQURJO0FBRVQzQixrQkFBTTtBQUNKNEIscUJBQU8sS0FBSzNCLFNBRFI7QUFFSjRCLG9CQUFNLEtBQUszQixRQUZQO0FBR0pvQixzQkFBUUE7QUFISixhQUZHO0FBT1RRLG9CQUFRLE1BUEM7QUFRVEMscUJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNyQlIsc0JBQVFDLEdBQVIsQ0FBWU8sSUFBSWhDLElBQWhCO0FBQ0Esa0JBQUlnQyxJQUFJaEMsSUFBSixDQUFTaUMsRUFBYixFQUFpQjtBQUNmVCx3QkFBUUMsR0FBUixDQUFZLFVBQVo7QUFDQVIsbUJBQUdDLFNBQUgsQ0FBYTtBQUNYQyx5QkFBTyxNQURJO0FBRVhlLHdCQUFNLFNBRks7QUFHWGIsNEJBQVU7QUFIQyxpQkFBYjtBQUtBLG9CQUFNYyxXQUFXSCxJQUFJaEMsSUFBSixDQUFTbUMsUUFBMUI7QUFDQSxvQkFBSUEsU0FBU25CLE1BQVQsS0FBb0IsQ0FBeEIsRUFBMkI7QUFDekJvQiw2QkFBVyxZQUFNO0FBQ2ZuQix1QkFBR29CLGNBQUgsQ0FBa0IsU0FBbEIsRUFBNkJGLFNBQVMsQ0FBVCxDQUE3QjtBQUNBbEIsdUJBQUdxQixTQUFILENBQWE7QUFDWFgsMkJBQUs7QUFETSxxQkFBYjtBQUdELG1CQUxELEVBS0csSUFMSDtBQU1ELGlCQVBELE1BT087QUFDTFMsNkJBQVcsWUFBTTtBQUNmbkIsdUJBQUdvQixjQUFILENBQWtCLGFBQWxCLEVBQWlDRixRQUFqQztBQUNBbEIsdUJBQUdzQixVQUFILENBQWM7QUFDWloseURBQWlDYSxLQUFLQyxTQUFMLENBQWVOLFFBQWY7QUFEckIscUJBQWQ7QUFHRCxtQkFMRCxFQUtHLElBTEg7QUFNRDtBQUNGLGVBdkJELE1BdUJPO0FBQ0xsQixtQkFBR0MsU0FBSCxDQUFhO0FBQ1hDLHlCQUFPLE1BREk7QUFFWEMseUJBQU8sZ0JBRkk7QUFHWEMsNEJBQVU7QUFIQyxpQkFBYjtBQUtEO0FBQ0Y7QUF4Q1EsV0FBWDtBQTBDRCxTQTlDRCxNQThDTztBQUNMSixhQUFHQyxTQUFILENBQWE7QUFDWEMsbUJBQU8sT0FESTtBQUVYQyxtQkFBTyxnQkFGSTtBQUdYQyxzQkFBVTtBQUhDLFdBQWI7QUFLRDtBQUNGLE9BdkVPO0FBd0VSO0FBQ0FxQixhQXpFUSxxQkF5RUU7QUFDUixZQUFJLENBQUMsS0FBS3pDLFNBQU4sSUFBbUIsS0FBS0EsU0FBTCxDQUFlZSxNQUFmLEtBQTBCLEVBQWpELEVBQXFEO0FBQ25EQyxhQUFHQyxTQUFILENBQWE7QUFDWEMsbUJBQU8sT0FESTtBQUVYQyxtQkFBTyxnQkFGSTtBQUdYQyxzQkFBVTtBQUhDLFdBQWI7QUFLRCxTQU5ELE1BTU87QUFDTCxjQUFNc0IsT0FBTyxJQUFiO0FBQ0FBLGVBQUtwQyxTQUFMLEdBQWlCLE1BQWpCO0FBQ0FvQyxlQUFLdkMsUUFBTCxHQUFnQixLQUFoQjtBQUNBYSxhQUFHUyxPQUFILENBQVc7QUFDVEMsaUJBQUssMkNBREk7QUFFVDNCLGtCQUFNO0FBQ0o0QixxQkFBT2UsS0FBSzFDO0FBRFIsYUFGRztBQUtUNkIsb0JBQVEsTUFMQztBQU1UQyxxQkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCUixzQkFBUUMsR0FBUixDQUFZTyxJQUFJaEMsSUFBaEI7QUFDQSxrQkFBSSxDQUFDZ0MsSUFBSWhDLElBQUosQ0FBU2lDLEVBQWQsRUFBa0I7QUFDaEJoQixtQkFBRzJCLFNBQUgsQ0FBYTtBQUNYekIseUJBQU8sSUFESTtBQUVYMEIsMkJBQVNiLElBQUloQyxJQUFKLENBQVM4QyxRQUZQO0FBR1hDLDhCQUFZLEtBSEQ7QUFJWGhCLDJCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckJXLHlCQUFLSyxPQUFMLENBQWE7QUFDWHpDLGlDQUFXLFNBREE7QUFFWEgsZ0NBQVU7QUFGQyxxQkFBYjtBQUlEO0FBVFUsaUJBQWI7QUFXRDtBQUNGO0FBckJRLFdBQVg7QUF1QkQ7QUFDRixPQTVHTztBQTZHUjZDLGtCQTdHUSx3QkE2R0tDLENBN0dMLEVBNkdRO0FBQ2QsYUFBS2pELFNBQUwsR0FBaUJpRCxFQUFFQyxNQUFGLENBQVNDLEtBQTFCO0FBQ0EsYUFBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCMUIsS0FBeEIsR0FBZ0NzQixFQUFFQyxNQUFGLENBQVNDLEtBQXpDO0FBQ0QsT0FoSE87QUFpSFJHLGlCQWpIUSx1QkFpSElMLENBakhKLEVBaUhPO0FBQ2IsYUFBS2hELFFBQUwsR0FBZ0JnRCxFQUFFQyxNQUFGLENBQVNDLEtBQXpCO0FBQ0Q7QUFuSE8sSzs7Ozs7K0JBaERDO0FBQ1QsVUFBTVQsT0FBTyxJQUFiO0FBQ0EsVUFBTXJCLFNBQVNMLEdBQUdNLGNBQUgsQ0FBa0IsUUFBbEIsQ0FBZjtBQUNBQyxjQUFRQyxHQUFSLENBQVlILE1BQVo7O0FBRUFMLFNBQUdTLE9BQUgsQ0FBVztBQUNUQyxhQUFLLDhDQURJO0FBRVQzQixjQUFNO0FBQ0pzQixrQkFBUUE7QUFESixTQUZHO0FBS1RTLGlCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckIsY0FBSUEsSUFBSWhDLElBQUosQ0FBU2lDLEVBQWIsRUFBaUI7QUFDZlQsb0JBQVFDLEdBQVIsQ0FBWSxhQUFaO0FBQ0EsZ0JBQU1VLFdBQVdILElBQUloQyxJQUFKLENBQVNtQyxRQUExQjtBQUNBLGdCQUFJQSxTQUFTbkIsTUFBVCxLQUFvQixDQUF4QixFQUEyQjtBQUN6QkMsaUJBQUdvQixjQUFILENBQWtCLFNBQWxCLEVBQTZCRixTQUFTLENBQVQsQ0FBN0I7QUFDQWxCLGlCQUFHcUIsU0FBSCxDQUFhO0FBQ1hYLHFCQUFLO0FBRE0sZUFBYjtBQUdELGFBTEQsTUFLTyxJQUFJUSxTQUFTbkIsTUFBVCxHQUFrQixDQUF0QixFQUF5QjtBQUM5QkMsaUJBQUdvQixjQUFILENBQWtCLGFBQWxCLEVBQWlDRixRQUFqQztBQUNBbEIsaUJBQUdzQixVQUFILENBQWM7QUFDWlosbURBQWlDYSxLQUFLQyxTQUFMLENBQWVOLFFBQWY7QUFEckIsZUFBZDtBQUdEO0FBQ0Y7QUFDRjtBQXJCUSxPQUFYO0FBdUJEOzs7NkJBQ1E7QUFDUDtBQUNBLFVBQU1RLE9BQU8sSUFBYjtBQUNBMUIsU0FBR1MsT0FBSCxDQUFXO0FBQ1RDLGFBQUssMENBREk7QUFFVDNCLGNBQU0sSUFGRztBQUdUK0IsaUJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNyQlIsa0JBQVFDLEdBQVIsQ0FBWU8sSUFBSWhDLElBQWhCO0FBQ0EsY0FBSWdDLElBQUloQyxJQUFKLENBQVNpQyxFQUFiLEVBQWlCO0FBQ2ZULG9CQUFRQyxHQUFSLENBQVksVUFBWjtBQUNBa0IsaUJBQUtsQyxXQUFMLEdBQW1CdUIsSUFBSWhDLElBQUosQ0FBU3dELElBQTVCO0FBQ0FiLGlCQUFLYyxNQUFMO0FBQ0Q7QUFDRjtBQVZRLE9BQVg7QUFZQSxXQUFLakQsU0FBTCxHQUFpQixLQUFqQjtBQUNBLFdBQUtpRCxNQUFMO0FBQ0Q7Ozs7RUFoRWdDLGVBQUtDLEk7O2tCQUFuQjdELEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gXCJ3ZXB5XCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiBcIuW3p+WFi+WKm+aipuW3peWOglwiXG4gIH07XG5cbiAgZGF0YSA9IHtcbiAgICB1c2VyUGhvbmU6IG51bGwsXG4gICAgdXNlclZhbGk6IG51bGwsXG4gICAgdmFsaU51bTogMTIzNDU2LFxuICAgIHZhbGlUZXh0OiBcIuiOt+WPlumqjOivgeeggVwiLFxuICAgIHZhbGlkYXRpbmc6IGZhbHNlLFxuICAgIHZhbGlUaW1lOiA2MCxcbiAgICB2YWxpQ29sb3I6IFwiIzMzN2FiN1wiLFxuICAgIGxvZ2luU2hvdzogZmFsc2UsXG4gICAgaW5kZXhJbWFnZXM6IFtdXG4gIH07XG5cbiAgY29tcHV0ZWQgPSB7fTtcbiAgZ2V0TG9naW4oKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgY29uc3Qgb3BlbmlkID0gd3guZ2V0U3RvcmFnZVN5bmMoXCJvcGVuaWRcIik7XG4gICAgY29uc29sZS5sb2cob3BlbmlkKTtcbiAgICBcbiAgICB3eC5yZXF1ZXN0KHtcbiAgICAgIHVybDogXCJodHRwczovL2Nob2NvbGF0ZS53dXhpbi5yZW4vd3gvbG9naW4vaXNsb2dpblwiLFxuICAgICAgZGF0YToge1xuICAgICAgICBvcGVuaWQ6IG9wZW5pZFxuICAgICAgfSxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICBpZiAocmVzLmRhdGEub2spIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIuaIkOWKn+ivt+axgmlzTG9naW5cIik7XG4gICAgICAgICAgY29uc3Qgc3R1ZGVudHMgPSByZXMuZGF0YS5zdHVkZW50cztcbiAgICAgICAgICBpZiAoc3R1ZGVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYyhcInN0dWRlbnRcIiwgc3R1ZGVudHNbMF0pO1xuICAgICAgICAgICAgd3guc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgdXJsOiBcIi4vY2VudGVyXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc3R1ZGVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoXCJzdHVkZW50TGlzdFwiLCBzdHVkZW50cyk7XG4gICAgICAgICAgICB3eC5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgICAgdXJsOiBgLi9zZWxlY3RTdHVkZW50P3N0dWRlbnRzPSR7SlNPTi5zdHJpbmdpZnkoc3R1ZGVudHMpfWBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIG9uTG9hZCgpIHtcbiAgICAvLyDor7fmsYLpppbpobXlm77niYdcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICB3eC5yZXF1ZXN0KHtcbiAgICAgIHVybDogXCJodHRwczovL2Nob2NvbGF0ZS53dXhpbi5yZW4vd3gvaG9tZS9waWNzXCIsXG4gICAgICBkYXRhOiBudWxsLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbiAgICAgICAgaWYgKHJlcy5kYXRhLm9rKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCLmiJDlip/or7fmsYLpppbpobXlm77niYdcIik7XG4gICAgICAgICAgdGhhdC5pbmRleEltYWdlcyA9IHJlcy5kYXRhLnBpY3M7XG4gICAgICAgICAgdGhhdC4kYXBwbHkoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMubG9naW5TaG93ID0gZmFsc2U7XG4gICAgdGhpcy4kYXBwbHkoKTtcbiAgfVxuXG4gIG1ldGhvZHMgPSB7XG4gICAgc2hvd0luZGV4KCkge1xuICAgICAgdGhpcy5sb2dpblNob3cgPSBmYWxzZTtcbiAgICB9LFxuICAgIHNob3dMb2dpbigpIHtcbiAgICAgIHRoaXMubG9naW5TaG93ID0gdHJ1ZTtcbiAgICAgIHRoaXMuZ2V0TG9naW4oKTtcbiAgICB9LFxuICAgIC8vIOeZu+W9lVxuICAgIHRyeUxvZ2luOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLnVzZXJQaG9uZS5sZW5ndGggIT09IDExKSB7XG4gICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6IFwi5omL5py65Y+36ZSZ6K+vXCIsXG4gICAgICAgICAgaW1hZ2U6IFwiLi9pbWcvZmFpbC5wbmdcIixcbiAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMudXNlclZhbGkubGVuZ3RoID09IDYpIHtcbiAgICAgICAgY29uc3Qgb3BlbmlkID0gd3guZ2V0U3RvcmFnZVN5bmMoXCJvcGVuaWRcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKG9wZW5pZCk7XG4gICAgICAgIC8vIOiOt+WPlumqjOivgeeggWBcbiAgICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiBcImh0dHBzOi8vY2hvY29sYXRlLnd1eGluLnJlbi93eC9sb2dpbi92ZXJpZnlcIixcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBwaG9uZTogdGhpcy51c2VyUGhvbmUsXG4gICAgICAgICAgICBjb2RlOiB0aGlzLnVzZXJWYWxpLFxuICAgICAgICAgICAgb3BlbmlkOiBvcGVuaWRcbiAgICAgICAgICB9LFxuICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG4gICAgICAgICAgICBpZiAocmVzLmRhdGEub2spIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmiJDlip/or7fmsYLnmbvlvZXmjqXlj6NcIik7XG4gICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi55m75b2V5oiQ5YqfXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGNvbnN0IHN0dWRlbnRzID0gcmVzLmRhdGEuc3R1ZGVudHM7XG4gICAgICAgICAgICAgIGlmIChzdHVkZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKFwic3R1ZGVudFwiLCBzdHVkZW50c1swXSk7XG4gICAgICAgICAgICAgICAgICB3eC5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IFwiLi9jZW50ZXJcIlxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYyhcInN0dWRlbnRMaXN0XCIsIHN0dWRlbnRzKTtcbiAgICAgICAgICAgICAgICAgIHd4LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IGAuL3NlbGVjdFN0dWRlbnQ/c3R1ZGVudHM9JHtKU09OLnN0cmluZ2lmeShzdHVkZW50cyl9YFxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi55m75b2V5aSx6LSlXCIsXG4gICAgICAgICAgICAgICAgaW1hZ2U6IFwiLi9pbWcvZmFpbC5wbmdcIixcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogXCLpqozor4HnoIHplJnor69cIixcbiAgICAgICAgICBpbWFnZTogXCIuL2ltZy9mYWlsLnBuZ1wiLFxuICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgLy8g6I635Y+W6aqM6K+B56CBXG4gICAgZ2V0VmFsaSgpIHtcbiAgICAgIGlmICghdGhpcy51c2VyUGhvbmUgfHwgdGhpcy51c2VyUGhvbmUubGVuZ3RoICE9PSAxMSkge1xuICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgIHRpdGxlOiBcIuaJi+acuuWPt+mUmeivr1wiLFxuICAgICAgICAgIGltYWdlOiBcIi4vaW1nL2ZhaWwucG5nXCIsXG4gICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAgICAgdGhhdC52YWxpQ29sb3IgPSBcIiNjY2NcIjtcbiAgICAgICAgdGhhdC52YWxpVGV4dCA9IFwi5bey5Y+R6YCBXCI7XG4gICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogXCJodHRwczovL2Nob2NvbGF0ZS53dXhpbi5yZW4vd3gvbG9naW4vY29kZVwiLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHBob25lOiB0aGF0LnVzZXJQaG9uZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIGlmICghcmVzLmRhdGEub2spIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLmj5DnpLpcIixcbiAgICAgICAgICAgICAgICBjb250ZW50OiByZXMuZGF0YS5lcnJvck1zZyxcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlDb2xvcjogXCIjMzM3YWI3XCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlUZXh0OiBcIuiOt+WPlumqjOivgeeggVwiXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBnZXRVc2VyUGhvbmUoZSkge1xuICAgICAgdGhpcy51c2VyUGhvbmUgPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgIHRoaXMuJHBhcmVudC5jdXN0b21EYXRhLnBob25lID0gZS5kZXRhaWwudmFsdWU7XG4gICAgfSxcbiAgICBnZXRVc2VyVmFsaShlKSB7XG4gICAgICB0aGlzLnVzZXJWYWxpID0gZS5kZXRhaWwudmFsdWU7XG4gICAgfVxuICB9O1xufVxuIl19