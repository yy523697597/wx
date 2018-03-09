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

var Feedback = function (_wepy$page) {
  _inherits(Feedback, _wepy$page);

  function Feedback() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Feedback);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Feedback.__proto__ || Object.getPrototypeOf(Feedback)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '家长反馈'
    }, _this.data = {
      userName: null,
      classDetail: null,
      info: '',
      noteMaxLen: 7000,
      history: []
    }, _this.computed = {}, _this.methods = {
      bindTextAreaChange: function bindTextAreaChange(e) {
        this.info = e.detail.value;
      },
      bindFormSubmit: function bindFormSubmit(e) {
        var that = this;
        if (!this.info) {
          wx.showModal({
            title: '提示',
            content: '反馈不能为空哟',
            success: function success(res) {
              if (res.confirm) {} else if (res.cancel) {}
            }
          });
        } else {
          wx.showModal({
            title: '提示',
            content: '是否要提交您的反馈',
            success: function success(res) {
              if (res.confirm) {
                var openid = wx.getStorageSync('openid');
                wx.request({
                  url: 'https://back.yuiyu.cn/wx/feedback/add',
                  data: {
                    studentId: wx.getStorageSync('student').id, //学生id
                    content: that.info, //反馈内容,
                    openid: openid
                  },
                  method: 'POST',
                  success: function success(res) {
                    console.log(res.data);
                    that.info = '';
                    that.$apply();
                    wx.showToast({
                      title: '成功',
                      icon: 'success',
                      duration: 2000
                    });
                    that.getFeed();
                  }
                });
              } else if (res.cancel) {}
            }
          });
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Feedback, [{
    key: 'onShow',
    value: function onShow() {
      this.getFeed();
    }
  }, {
    key: 'getFeed',
    value: function getFeed() {
      var openid = wx.getStorageSync('openid');
      var student = wx.getStorageSync('student');
      var that = this;
      wx.request({
        url: 'https://back.yuiyu.cn/wx/feedback/index',
        data: {
          openid: openid,
          // openid: 'o2fPa4rbL1j8Gp0QlqBDzl3R40vA',
          studentId: student.id
        },
        method: 'POST',
        success: function success(res) {
          console.log(res.data);
          if (res.data.ok) {
            console.log('成功请求反馈历史记录');
            that.history = res.data.list;
            that.$apply();
            console.log(that.history);
          }
        }
      });
    }
  }]);

  return Feedback;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Feedback , 'pages/feedback'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlZWRiYWNrLmpzIl0sIm5hbWVzIjpbIkZlZWRiYWNrIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1c2VyTmFtZSIsImNsYXNzRGV0YWlsIiwiaW5mbyIsIm5vdGVNYXhMZW4iLCJoaXN0b3J5IiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiYmluZFRleHRBcmVhQ2hhbmdlIiwiZSIsImRldGFpbCIsInZhbHVlIiwiYmluZEZvcm1TdWJtaXQiLCJ0aGF0Iiwid3giLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImNhbmNlbCIsIm9wZW5pZCIsImdldFN0b3JhZ2VTeW5jIiwicmVxdWVzdCIsInVybCIsInN0dWRlbnRJZCIsImlkIiwibWV0aG9kIiwiY29uc29sZSIsImxvZyIsIiRhcHBseSIsInNob3dUb2FzdCIsImljb24iLCJkdXJhdGlvbiIsImdldEZlZWQiLCJzdHVkZW50Iiwib2siLCJsaXN0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7Ozs7MExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFJVEMsSSxHQUFPO0FBQ0xDLGdCQUFVLElBREw7QUFFTEMsbUJBQWEsSUFGUjtBQUdMQyxZQUFNLEVBSEQ7QUFJTEMsa0JBQVksSUFKUDtBQUtMQyxlQUFTO0FBTEosSyxRQWlDUEMsUSxHQUFXLEUsUUFFWEMsTyxHQUFVO0FBQ1JDLHdCQURRLDhCQUNXQyxDQURYLEVBQ2M7QUFDcEIsYUFBS04sSUFBTCxHQUFZTSxFQUFFQyxNQUFGLENBQVNDLEtBQXJCO0FBQ0QsT0FITztBQUlSQyxvQkFKUSwwQkFJT0gsQ0FKUCxFQUlVO0FBQ2hCLFlBQU1JLE9BQU8sSUFBYjtBQUNBLFlBQUksQ0FBQyxLQUFLVixJQUFWLEVBQWdCO0FBQ2RXLGFBQUdDLFNBQUgsQ0FBYTtBQUNYQyxtQkFBTyxJQURJO0FBRVhDLHFCQUFTLFNBRkU7QUFHWEMsbUJBSFcsbUJBR0hDLEdBSEcsRUFHRTtBQUNYLGtCQUFJQSxJQUFJQyxPQUFSLEVBQWlCLENBQ2hCLENBREQsTUFDTyxJQUFJRCxJQUFJRSxNQUFSLEVBQWdCLENBQ3RCO0FBQ0Y7QUFQVSxXQUFiO0FBU0QsU0FWRCxNQVVPO0FBQ0xQLGFBQUdDLFNBQUgsQ0FBYTtBQUNYQyxtQkFBTyxJQURJO0FBRVhDLHFCQUFTLFdBRkU7QUFHWEMsbUJBSFcsbUJBR0hDLEdBSEcsRUFHRTtBQUNYLGtCQUFJQSxJQUFJQyxPQUFSLEVBQWlCO0FBQ2Ysb0JBQU1FLFNBQVNSLEdBQUdTLGNBQUgsQ0FBa0IsUUFBbEIsQ0FBZjtBQUNBVCxtQkFBR1UsT0FBSCxDQUFXO0FBQ1RDLHVCQUFLLHVDQURJO0FBRVR6Qix3QkFBTTtBQUNKMEIsK0JBQVdaLEdBQUdTLGNBQUgsQ0FBa0IsU0FBbEIsRUFBNkJJLEVBRHBDLEVBQ3dDO0FBQzVDViw2QkFBU0osS0FBS1YsSUFGVixFQUVnQjtBQUNwQm1CLDRCQUFRQTtBQUhKLG1CQUZHO0FBT1RNLDBCQUFRLE1BUEM7QUFRVFYsMkJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNyQlUsNEJBQVFDLEdBQVIsQ0FBWVgsSUFBSW5CLElBQWhCO0FBQ0FhLHlCQUFLVixJQUFMLEdBQVksRUFBWjtBQUNBVSx5QkFBS2tCLE1BQUw7QUFDQWpCLHVCQUFHa0IsU0FBSCxDQUFhO0FBQ1hoQiw2QkFBTyxJQURJO0FBRVhpQiw0QkFBTSxTQUZLO0FBR1hDLGdDQUFVO0FBSEMscUJBQWI7QUFLQXJCLHlCQUFLc0IsT0FBTDtBQUNEO0FBbEJRLGlCQUFYO0FBb0JELGVBdEJELE1Bc0JPLElBQUloQixJQUFJRSxNQUFSLEVBQWdCLENBQ3RCO0FBQ0Y7QUE1QlUsV0FBYjtBQThCRDtBQUNGO0FBaERPLEs7Ozs7OzZCQTVCRDtBQUNQLFdBQUtjLE9BQUw7QUFDRDs7OzhCQUNTO0FBQ1IsVUFBTWIsU0FBU1IsR0FBR1MsY0FBSCxDQUFrQixRQUFsQixDQUFmO0FBQ0EsVUFBTWEsVUFBVXRCLEdBQUdTLGNBQUgsQ0FBa0IsU0FBbEIsQ0FBaEI7QUFDQSxVQUFNVixPQUFPLElBQWI7QUFDQUMsU0FBR1UsT0FBSCxDQUFXO0FBQ1RDLGFBQUsseUNBREk7QUFFVHpCLGNBQU07QUFDSnNCLGtCQUFRQSxNQURKO0FBRUo7QUFDQUkscUJBQVdVLFFBQVFUO0FBSGYsU0FGRztBQU9UQyxnQkFBUSxNQVBDO0FBUVRWLGlCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckJVLGtCQUFRQyxHQUFSLENBQVlYLElBQUluQixJQUFoQjtBQUNBLGNBQUltQixJQUFJbkIsSUFBSixDQUFTcUMsRUFBYixFQUFpQjtBQUNmUixvQkFBUUMsR0FBUixDQUFZLFlBQVo7QUFDQWpCLGlCQUFLUixPQUFMLEdBQWVjLElBQUluQixJQUFKLENBQVNzQyxJQUF4QjtBQUNBekIsaUJBQUtrQixNQUFMO0FBQ0FGLG9CQUFRQyxHQUFSLENBQVlqQixLQUFLUixPQUFqQjtBQUNEO0FBQ0Y7QUFoQlEsT0FBWDtBQWtCRDs7OztFQXJDbUMsZUFBS2tDLEk7O2tCQUF0QjFDLFEiLCJmaWxlIjoiZmVlZGJhY2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGZWVkYmFjayBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WutumVv+WPjemmiCdcclxuICB9O1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgdXNlck5hbWU6IG51bGwsXHJcbiAgICBjbGFzc0RldGFpbDogbnVsbCxcclxuICAgIGluZm86ICcnLFxyXG4gICAgbm90ZU1heExlbjogNzAwMCxcclxuICAgIGhpc3Rvcnk6IFtdXHJcbiAgfTtcclxuICBvblNob3coKSB7XHJcbiAgICB0aGlzLmdldEZlZWQoKTtcclxuICB9XHJcbiAgZ2V0RmVlZCgpIHtcclxuICAgIGNvbnN0IG9wZW5pZCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdvcGVuaWQnKTtcclxuICAgIGNvbnN0IHN0dWRlbnQgPSB3eC5nZXRTdG9yYWdlU3luYygnc3R1ZGVudCcpO1xyXG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiAnaHR0cHM6Ly9iYWNrLnl1aXl1LmNuL3d4L2ZlZWRiYWNrL2luZGV4JyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIG9wZW5pZDogb3BlbmlkLFxyXG4gICAgICAgIC8vIG9wZW5pZDogJ28yZlBhNHJiTDFqOEdwMFFscUJEemwzUjQwdkEnLFxyXG4gICAgICAgIHN0dWRlbnRJZDogc3R1ZGVudC5pZFxyXG4gICAgICB9LFxyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xyXG4gICAgICAgIGlmIChyZXMuZGF0YS5vaykge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ+aIkOWKn+ivt+axguWPjemmiOWOhuWPsuiusOW9lScpO1xyXG4gICAgICAgICAgdGhhdC5oaXN0b3J5ID0gcmVzLmRhdGEubGlzdDtcclxuICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGF0Lmhpc3RvcnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGNvbXB1dGVkID0ge307XHJcblxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBiaW5kVGV4dEFyZWFDaGFuZ2UoZSkge1xyXG4gICAgICB0aGlzLmluZm8gPSBlLmRldGFpbC52YWx1ZTtcclxuICAgIH0sXHJcbiAgICBiaW5kRm9ybVN1Ym1pdChlKSB7XHJcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICBpZiAoIXRoaXMuaW5mbykge1xyXG4gICAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXHJcbiAgICAgICAgICBjb250ZW50OiAn5Y+N6aaI5LiN6IO95Li656m65ZOfJyxcclxuICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXHJcbiAgICAgICAgICBjb250ZW50OiAn5piv5ZCm6KaB5o+Q5Lqk5oKo55qE5Y+N6aaIJyxcclxuICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IG9wZW5pZCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdvcGVuaWQnKTtcclxuICAgICAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vYmFjay55dWl5dS5jbi93eC9mZWVkYmFjay9hZGQnLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICBzdHVkZW50SWQ6IHd4LmdldFN0b3JhZ2VTeW5jKCdzdHVkZW50JykuaWQsIC8v5a2m55SfaWRcclxuICAgICAgICAgICAgICAgICAgY29udGVudDogdGhhdC5pbmZvLCAvL+WPjemmiOWGheWuuSxcclxuICAgICAgICAgICAgICAgICAgb3BlbmlkOiBvcGVuaWRcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgIHRoYXQuaW5mbyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5oiQ5YqfJyxcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgIHRoYXQuZ2V0RmVlZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG4iXX0=