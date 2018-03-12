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
        that.info = that.info.replace(/^\s+|\s+$/gm, '');
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlZWRiYWNrLmpzIl0sIm5hbWVzIjpbIkZlZWRiYWNrIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1c2VyTmFtZSIsImNsYXNzRGV0YWlsIiwiaW5mbyIsIm5vdGVNYXhMZW4iLCJoaXN0b3J5IiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiYmluZFRleHRBcmVhQ2hhbmdlIiwiZSIsImRldGFpbCIsInZhbHVlIiwiYmluZEZvcm1TdWJtaXQiLCJ0aGF0IiwicmVwbGFjZSIsInd4Iiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJjYW5jZWwiLCJvcGVuaWQiLCJnZXRTdG9yYWdlU3luYyIsInJlcXVlc3QiLCJ1cmwiLCJzdHVkZW50SWQiLCJpZCIsIm1ldGhvZCIsImNvbnNvbGUiLCJsb2ciLCIkYXBwbHkiLCJzaG93VG9hc3QiLCJpY29uIiwiZHVyYXRpb24iLCJnZXRGZWVkIiwic3R1ZGVudCIsIm9rIiwibGlzdCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzBMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVRDLEksR0FBTztBQUNMQyxnQkFBVSxJQURMO0FBRUxDLG1CQUFhLElBRlI7QUFHTEMsWUFBTSxFQUhEO0FBSUxDLGtCQUFZLElBSlA7QUFLTEMsZUFBUztBQUxKLEssUUFpQ1BDLFEsR0FBVyxFLFFBRVhDLE8sR0FBVTtBQUNSQyx3QkFEUSw4QkFDV0MsQ0FEWCxFQUNjO0FBQ3BCLGFBQUtOLElBQUwsR0FBWU0sRUFBRUMsTUFBRixDQUFTQyxLQUFyQjtBQUNELE9BSE87QUFJUkMsb0JBSlEsMEJBSU9ILENBSlAsRUFJVTtBQUNoQixZQUFNSSxPQUFPLElBQWI7QUFDQUEsYUFBS1YsSUFBTCxHQUFZVSxLQUFLVixJQUFMLENBQVVXLE9BQVYsQ0FBa0IsYUFBbEIsRUFBaUMsRUFBakMsQ0FBWjtBQUNBLFlBQUksQ0FBQyxLQUFLWCxJQUFWLEVBQWdCO0FBQ2RZLGFBQUdDLFNBQUgsQ0FBYTtBQUNYQyxtQkFBTyxJQURJO0FBRVhDLHFCQUFTLFNBRkU7QUFHWEMsbUJBSFcsbUJBR0hDLEdBSEcsRUFHRTtBQUNYLGtCQUFJQSxJQUFJQyxPQUFSLEVBQWlCLENBQ2hCLENBREQsTUFDTyxJQUFJRCxJQUFJRSxNQUFSLEVBQWdCLENBQ3RCO0FBQ0Y7QUFQVSxXQUFiO0FBU0QsU0FWRCxNQVVPO0FBQ0xQLGFBQUdDLFNBQUgsQ0FBYTtBQUNYQyxtQkFBTyxJQURJO0FBRVhDLHFCQUFTLFdBRkU7QUFHWEMsbUJBSFcsbUJBR0hDLEdBSEcsRUFHRTtBQUNYLGtCQUFJQSxJQUFJQyxPQUFSLEVBQWlCO0FBQ2Ysb0JBQU1FLFNBQVNSLEdBQUdTLGNBQUgsQ0FBa0IsUUFBbEIsQ0FBZjtBQUNBVCxtQkFBR1UsT0FBSCxDQUFXO0FBQ1RDLHVCQUFLLHVDQURJO0FBRVQxQix3QkFBTTtBQUNKMkIsK0JBQVdaLEdBQUdTLGNBQUgsQ0FBa0IsU0FBbEIsRUFBNkJJLEVBRHBDLEVBQ3dDO0FBQzVDViw2QkFBU0wsS0FBS1YsSUFGVixFQUVnQjtBQUNwQm9CLDRCQUFRQTtBQUhKLG1CQUZHO0FBT1RNLDBCQUFRLE1BUEM7QUFRVFYsMkJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNyQlUsNEJBQVFDLEdBQVIsQ0FBWVgsSUFBSXBCLElBQWhCO0FBQ0FhLHlCQUFLVixJQUFMLEdBQVksRUFBWjtBQUNBVSx5QkFBS21CLE1BQUw7QUFDQWpCLHVCQUFHa0IsU0FBSCxDQUFhO0FBQ1hoQiw2QkFBTyxJQURJO0FBRVhpQiw0QkFBTSxTQUZLO0FBR1hDLGdDQUFVO0FBSEMscUJBQWI7QUFLQXRCLHlCQUFLdUIsT0FBTDtBQUNEO0FBbEJRLGlCQUFYO0FBb0JELGVBdEJELE1Bc0JPLElBQUloQixJQUFJRSxNQUFSLEVBQWdCLENBQ3RCO0FBQ0Y7QUE1QlUsV0FBYjtBQThCRDtBQUNGO0FBakRPLEs7Ozs7OzZCQTVCRDtBQUNQLFdBQUtjLE9BQUw7QUFDRDs7OzhCQUNTO0FBQ1IsVUFBTWIsU0FBU1IsR0FBR1MsY0FBSCxDQUFrQixRQUFsQixDQUFmO0FBQ0EsVUFBTWEsVUFBVXRCLEdBQUdTLGNBQUgsQ0FBa0IsU0FBbEIsQ0FBaEI7QUFDQSxVQUFNWCxPQUFPLElBQWI7QUFDQUUsU0FBR1UsT0FBSCxDQUFXO0FBQ1RDLGFBQUsseUNBREk7QUFFVDFCLGNBQU07QUFDSnVCLGtCQUFRQSxNQURKO0FBRUo7QUFDQUkscUJBQVdVLFFBQVFUO0FBSGYsU0FGRztBQU9UQyxnQkFBUSxNQVBDO0FBUVRWLGlCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckJVLGtCQUFRQyxHQUFSLENBQVlYLElBQUlwQixJQUFoQjtBQUNBLGNBQUlvQixJQUFJcEIsSUFBSixDQUFTc0MsRUFBYixFQUFpQjtBQUNmUixvQkFBUUMsR0FBUixDQUFZLFlBQVo7QUFDQWxCLGlCQUFLUixPQUFMLEdBQWVlLElBQUlwQixJQUFKLENBQVN1QyxJQUF4QjtBQUNBMUIsaUJBQUttQixNQUFMO0FBQ0FGLG9CQUFRQyxHQUFSLENBQVlsQixLQUFLUixPQUFqQjtBQUNEO0FBQ0Y7QUFoQlEsT0FBWDtBQWtCRDs7OztFQXJDbUMsZUFBS21DLEk7O2tCQUF0QjNDLFEiLCJmaWxlIjoiZmVlZGJhY2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGZWVkYmFjayBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5a626ZW/5Y+N6aaIJ1xuICB9O1xuXG4gIGRhdGEgPSB7XG4gICAgdXNlck5hbWU6IG51bGwsXG4gICAgY2xhc3NEZXRhaWw6IG51bGwsXG4gICAgaW5mbzogJycsXG4gICAgbm90ZU1heExlbjogNzAwMCxcbiAgICBoaXN0b3J5OiBbXVxuICB9O1xuICBvblNob3coKSB7XG4gICAgdGhpcy5nZXRGZWVkKCk7XG4gIH1cbiAgZ2V0RmVlZCgpIHtcbiAgICBjb25zdCBvcGVuaWQgPSB3eC5nZXRTdG9yYWdlU3luYygnb3BlbmlkJyk7XG4gICAgY29uc3Qgc3R1ZGVudCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdzdHVkZW50Jyk7XG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgd3gucmVxdWVzdCh7XG4gICAgICB1cmw6ICdodHRwczovL2JhY2sueXVpeXUuY24vd3gvZmVlZGJhY2svaW5kZXgnLFxuICAgICAgZGF0YToge1xuICAgICAgICBvcGVuaWQ6IG9wZW5pZCxcbiAgICAgICAgLy8gb3BlbmlkOiAnbzJmUGE0cmJMMWo4R3AwUWxxQkR6bDNSNDB2QScsXG4gICAgICAgIHN0dWRlbnRJZDogc3R1ZGVudC5pZFxuICAgICAgfSxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbiAgICAgICAgaWYgKHJlcy5kYXRhLm9rKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ+aIkOWKn+ivt+axguWPjemmiOWOhuWPsuiusOW9lScpO1xuICAgICAgICAgIHRoYXQuaGlzdG9yeSA9IHJlcy5kYXRhLmxpc3Q7XG4gICAgICAgICAgdGhhdC4kYXBwbHkoKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGF0Lmhpc3RvcnkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgY29tcHV0ZWQgPSB7fTtcblxuICBtZXRob2RzID0ge1xuICAgIGJpbmRUZXh0QXJlYUNoYW5nZShlKSB7XG4gICAgICB0aGlzLmluZm8gPSBlLmRldGFpbC52YWx1ZTtcbiAgICB9LFxuICAgIGJpbmRGb3JtU3VibWl0KGUpIHtcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5pbmZvID0gdGhhdC5pbmZvLnJlcGxhY2UoL15cXHMrfFxccyskL2dtLCAnJyk7XG4gICAgICBpZiAoIXRoaXMuaW5mbykge1xuICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICBjb250ZW50OiAn5Y+N6aaI5LiN6IO95Li656m65ZOfJyxcbiAgICAgICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgY29udGVudDogJ+aYr+WQpuimgeaPkOS6pOaCqOeahOWPjemmiCcsXG4gICAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICBjb25zdCBvcGVuaWQgPSB3eC5nZXRTdG9yYWdlU3luYygnb3BlbmlkJyk7XG4gICAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vYmFjay55dWl5dS5jbi93eC9mZWVkYmFjay9hZGQnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgIHN0dWRlbnRJZDogd3guZ2V0U3RvcmFnZVN5bmMoJ3N0dWRlbnQnKS5pZCwgLy/lrabnlJ9pZFxuICAgICAgICAgICAgICAgICAgY29udGVudDogdGhhdC5pbmZvLCAvL+WPjemmiOWGheWuuSxcbiAgICAgICAgICAgICAgICAgIG9wZW5pZDogb3BlbmlkXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbiAgICAgICAgICAgICAgICAgIHRoYXQuaW5mbyA9ICcnO1xuICAgICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5oiQ5YqfJyxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB0aGF0LmdldEZlZWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG4iXX0=