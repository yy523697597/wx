'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wxcharts = require('./../lib/wxcharts.js');

var _wxcharts2 = _interopRequireDefault(_wxcharts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Center = function (_wepy$page) {
  _inherits(Center, _wepy$page);

  function Center() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Center);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Center.__proto__ || Object.getPrototypeOf(Center)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '课程总览'
    }, _this.data = {
      userName: null,
      lessons: [],
      expendNum: null,
      restNum: null
    }, _this.computed = {}, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Center, [{
    key: 'onShow',
    value: function onShow(options) {
      this.getInfo();
    }
  }, {
    key: 'getInfo',
    value: function getInfo() {
      var that = this;
      // 获取学生
      var student = wx.getStorageSync('student');
      wx.setNavigationBarTitle({
        title: student.name + '\u540C\u5B66\u8BFE\u7A0B\u603B\u89C8'
      });
      var openid = wx.getStorageSync('openid');

      wx.request({
        url: 'https://back.yuiyu.cn/wx/student/stat',
        data: {
          studentId: student.id,
          openid: openid
          // openid: 'o2fPa4rbL1j8Gp0QlqBDzl3R40vA'
        },
        method: 'POST',
        success: function success(res) {
          that.expendNum = res.data.expendNum;
          that.restNum = res.data.restNum;
          that.lessons = res.data.lessons;
          that.$apply();
          that.drawChart();
        }
      });
    }
    // 绘制饼图

  }, {
    key: 'drawChart',
    value: function drawChart() {
      var that = this;
      new _wxcharts2.default({
        canvasId: 'pie',
        type: 'pie',
        series: [{
          name: '已用课时',
          data: parseInt(that.data.expendNum),
          color: '#bfbfbf',
          format: function format() {
            return '\u5DF2\u7528' + this.data + '\u8BFE\u65F6';
          }
        }, {
          name: '待用课时',
          data: parseInt(that.data.restNum),
          color: '#95de64',
          format: function format() {
            return '\u5F85\u7528' + this.data + '\u8BFE\u65F6';
          }
        }],
        width: 350,
        height: 250,
        dataLabel: true
      });
    }
  }]);

  return Center;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Center , 'pages/center'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlbnRlci5qcyJdLCJuYW1lcyI6WyJDZW50ZXIiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInVzZXJOYW1lIiwibGVzc29ucyIsImV4cGVuZE51bSIsInJlc3ROdW0iLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJvcHRpb25zIiwiZ2V0SW5mbyIsInRoYXQiLCJzdHVkZW50Iiwid3giLCJnZXRTdG9yYWdlU3luYyIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsInRpdGxlIiwibmFtZSIsIm9wZW5pZCIsInJlcXVlc3QiLCJ1cmwiLCJzdHVkZW50SWQiLCJpZCIsIm1ldGhvZCIsInN1Y2Nlc3MiLCJyZXMiLCIkYXBwbHkiLCJkcmF3Q2hhcnQiLCJjYW52YXNJZCIsInR5cGUiLCJzZXJpZXMiLCJwYXJzZUludCIsImNvbG9yIiwiZm9ybWF0Iiwid2lkdGgiLCJoZWlnaHQiLCJkYXRhTGFiZWwiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7O3NMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVRDLEksR0FBTztBQUNMQyxnQkFBVSxJQURMO0FBRUxDLGVBQVMsRUFGSjtBQUdMQyxpQkFBVyxJQUhOO0FBSUxDLGVBQVM7QUFKSixLLFFBZ0VQQyxRLEdBQVcsRSxRQUVYQyxPLEdBQVUsRTs7Ozs7MkJBNURIQyxPLEVBQVM7QUFDZCxXQUFLQyxPQUFMO0FBQ0Q7Ozs4QkFDUztBQUNSLFVBQU1DLE9BQU8sSUFBYjtBQUNBO0FBQ0EsVUFBTUMsVUFBVUMsR0FBR0MsY0FBSCxDQUFrQixTQUFsQixDQUFoQjtBQUNBRCxTQUFHRSxxQkFBSCxDQUF5QjtBQUN2QkMsZUFBVUosUUFBUUssSUFBbEI7QUFEdUIsT0FBekI7QUFHQSxVQUFNQyxTQUFTTCxHQUFHQyxjQUFILENBQWtCLFFBQWxCLENBQWY7O0FBRUFELFNBQUdNLE9BQUgsQ0FBVztBQUNUQyxhQUFLLHVDQURJO0FBRVRsQixjQUFNO0FBQ0ptQixxQkFBV1QsUUFBUVUsRUFEZjtBQUVKSixrQkFBUUE7QUFDUjtBQUhJLFNBRkc7QUFPVEssZ0JBQVEsTUFQQztBQVFUQyxpQkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCZCxlQUFLTixTQUFMLEdBQWlCb0IsSUFBSXZCLElBQUosQ0FBU0csU0FBMUI7QUFDQU0sZUFBS0wsT0FBTCxHQUFlbUIsSUFBSXZCLElBQUosQ0FBU0ksT0FBeEI7QUFDQUssZUFBS1AsT0FBTCxHQUFlcUIsSUFBSXZCLElBQUosQ0FBU0UsT0FBeEI7QUFDQU8sZUFBS2UsTUFBTDtBQUNBZixlQUFLZ0IsU0FBTDtBQUNEO0FBZFEsT0FBWDtBQWdCRDtBQUNEOzs7O2dDQUNZO0FBQ1YsVUFBTWhCLE9BQU8sSUFBYjtBQUNBLDZCQUFhO0FBQ1hpQixrQkFBVSxLQURDO0FBRVhDLGNBQU0sS0FGSztBQUdYQyxnQkFBUSxDQUNOO0FBQ0ViLGdCQUFNLE1BRFI7QUFFRWYsZ0JBQU02QixTQUFTcEIsS0FBS1QsSUFBTCxDQUFVRyxTQUFuQixDQUZSO0FBR0UyQixpQkFBTyxTQUhUO0FBSUVDLGtCQUFRLGtCQUFXO0FBQ2pCLG9DQUFZLEtBQUsvQixJQUFqQjtBQUNEO0FBTkgsU0FETSxFQVNOO0FBQ0VlLGdCQUFNLE1BRFI7QUFFRWYsZ0JBQU02QixTQUFTcEIsS0FBS1QsSUFBTCxDQUFVSSxPQUFuQixDQUZSO0FBR0UwQixpQkFBTyxTQUhUO0FBSUVDLGtCQUFRLGtCQUFXO0FBQ2pCLG9DQUFZLEtBQUsvQixJQUFqQjtBQUNEO0FBTkgsU0FUTSxDQUhHO0FBcUJYZ0MsZUFBTyxHQXJCSTtBQXNCWEMsZ0JBQVEsR0F0Qkc7QUF1QlhDLG1CQUFXO0FBdkJBLE9BQWI7QUF5QkQ7Ozs7RUFwRWlDLGVBQUtDLEk7O2tCQUFwQnRDLE0iLCJmaWxlIjoiY2VudGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgd3hDaGFydHMgZnJvbSAnLi4vbGliL3d4Y2hhcnRzLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENlbnRlciBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ivvueoi+aAu+iniCdcclxuICB9O1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgdXNlck5hbWU6IG51bGwsXHJcbiAgICBsZXNzb25zOiBbXSxcclxuICAgIGV4cGVuZE51bTogbnVsbCxcclxuICAgIHJlc3ROdW06IG51bGxcclxuICB9O1xyXG4gIG9uU2hvdyhvcHRpb25zKSB7XHJcbiAgICB0aGlzLmdldEluZm8oKTtcclxuICB9XHJcbiAgZ2V0SW5mbygpIHtcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgLy8g6I635Y+W5a2m55SfXHJcbiAgICBjb25zdCBzdHVkZW50ID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3N0dWRlbnQnKTtcclxuICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XHJcbiAgICAgIHRpdGxlOiBgJHtzdHVkZW50Lm5hbWV95ZCM5a2m6K++56iL5oC76KeIYFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBvcGVuaWQgPSB3eC5nZXRTdG9yYWdlU3luYygnb3BlbmlkJyk7XHJcblxyXG4gICAgd3gucmVxdWVzdCh7XHJcbiAgICAgIHVybDogJ2h0dHBzOi8vYmFjay55dWl5dS5jbi93eC9zdHVkZW50L3N0YXQnLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgc3R1ZGVudElkOiBzdHVkZW50LmlkLFxyXG4gICAgICAgIG9wZW5pZDogb3BlbmlkXHJcbiAgICAgICAgLy8gb3BlbmlkOiAnbzJmUGE0cmJMMWo4R3AwUWxxQkR6bDNSNDB2QSdcclxuICAgICAgfSxcclxuICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgIHRoYXQuZXhwZW5kTnVtID0gcmVzLmRhdGEuZXhwZW5kTnVtO1xyXG4gICAgICAgIHRoYXQucmVzdE51bSA9IHJlcy5kYXRhLnJlc3ROdW07XHJcbiAgICAgICAgdGhhdC5sZXNzb25zID0gcmVzLmRhdGEubGVzc29ucztcclxuICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgIHRoYXQuZHJhd0NoYXJ0KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICAvLyDnu5jliLbppbzlm75cclxuICBkcmF3Q2hhcnQoKSB7XHJcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgIG5ldyB3eENoYXJ0cyh7XHJcbiAgICAgIGNhbnZhc0lkOiAncGllJyxcclxuICAgICAgdHlwZTogJ3BpZScsXHJcbiAgICAgIHNlcmllczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6ICflt7LnlKjor77ml7YnLFxyXG4gICAgICAgICAgZGF0YTogcGFyc2VJbnQodGhhdC5kYXRhLmV4cGVuZE51bSksXHJcbiAgICAgICAgICBjb2xvcjogJyNiZmJmYmYnLFxyXG4gICAgICAgICAgZm9ybWF0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGDlt7LnlKgke3RoaXMuZGF0YX3or77ml7ZgO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbmFtZTogJ+W+heeUqOivvuaXticsXHJcbiAgICAgICAgICBkYXRhOiBwYXJzZUludCh0aGF0LmRhdGEucmVzdE51bSksXHJcbiAgICAgICAgICBjb2xvcjogJyM5NWRlNjQnLFxyXG4gICAgICAgICAgZm9ybWF0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGDlvoXnlKgke3RoaXMuZGF0YX3or77ml7ZgO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgXSxcclxuICAgICAgd2lkdGg6IDM1MCxcclxuICAgICAgaGVpZ2h0OiAyNTAsXHJcbiAgICAgIGRhdGFMYWJlbDogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGNvbXB1dGVkID0ge307XHJcblxyXG4gIG1ldGhvZHMgPSB7fTtcclxufVxyXG4iXX0=