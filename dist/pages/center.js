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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlbnRlci5qcyJdLCJuYW1lcyI6WyJDZW50ZXIiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInVzZXJOYW1lIiwibGVzc29ucyIsImV4cGVuZE51bSIsInJlc3ROdW0iLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJvcHRpb25zIiwiZ2V0SW5mbyIsInRoYXQiLCJzdHVkZW50Iiwid3giLCJnZXRTdG9yYWdlU3luYyIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsInRpdGxlIiwibmFtZSIsIm9wZW5pZCIsInJlcXVlc3QiLCJ1cmwiLCJzdHVkZW50SWQiLCJpZCIsIm1ldGhvZCIsInN1Y2Nlc3MiLCJyZXMiLCIkYXBwbHkiLCJkcmF3Q2hhcnQiLCJjYW52YXNJZCIsInR5cGUiLCJzZXJpZXMiLCJwYXJzZUludCIsImNvbG9yIiwiZm9ybWF0Iiwid2lkdGgiLCJoZWlnaHQiLCJkYXRhTGFiZWwiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7O3NMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVRDLEksR0FBTztBQUNMQyxnQkFBVSxJQURMO0FBRUxDLGVBQVMsRUFGSjtBQUdMQyxpQkFBVyxJQUhOO0FBSUxDLGVBQVM7QUFKSixLLFFBZ0VQQyxRLEdBQVcsRSxRQUVYQyxPLEdBQVUsRTs7Ozs7MkJBNURIQyxPLEVBQVM7QUFDZCxXQUFLQyxPQUFMO0FBQ0Q7Ozs4QkFDUztBQUNSLFVBQU1DLE9BQU8sSUFBYjtBQUNBO0FBQ0EsVUFBTUMsVUFBVUMsR0FBR0MsY0FBSCxDQUFrQixTQUFsQixDQUFoQjtBQUNBRCxTQUFHRSxxQkFBSCxDQUF5QjtBQUN2QkMsZUFBVUosUUFBUUssSUFBbEI7QUFEdUIsT0FBekI7QUFHQSxVQUFNQyxTQUFTTCxHQUFHQyxjQUFILENBQWtCLFFBQWxCLENBQWY7O0FBRUFELFNBQUdNLE9BQUgsQ0FBVztBQUNUQyxhQUFLLHVDQURJO0FBRVRsQixjQUFNO0FBQ0ptQixxQkFBV1QsUUFBUVUsRUFEZjtBQUVKSixrQkFBUUE7QUFDUjtBQUhJLFNBRkc7QUFPVEssZ0JBQVEsTUFQQztBQVFUQyxpQkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCZCxlQUFLTixTQUFMLEdBQWlCb0IsSUFBSXZCLElBQUosQ0FBU0csU0FBMUI7QUFDQU0sZUFBS0wsT0FBTCxHQUFlbUIsSUFBSXZCLElBQUosQ0FBU0ksT0FBeEI7QUFDQUssZUFBS1AsT0FBTCxHQUFlcUIsSUFBSXZCLElBQUosQ0FBU0UsT0FBeEI7QUFDQU8sZUFBS2UsTUFBTDtBQUNBZixlQUFLZ0IsU0FBTDtBQUNEO0FBZFEsT0FBWDtBQWdCRDtBQUNEOzs7O2dDQUNZO0FBQ1YsVUFBTWhCLE9BQU8sSUFBYjtBQUNBLDZCQUFhO0FBQ1hpQixrQkFBVSxLQURDO0FBRVhDLGNBQU0sS0FGSztBQUdYQyxnQkFBUSxDQUNOO0FBQ0ViLGdCQUFNLE1BRFI7QUFFRWYsZ0JBQU02QixTQUFTcEIsS0FBS1QsSUFBTCxDQUFVRyxTQUFuQixDQUZSO0FBR0UyQixpQkFBTyxTQUhUO0FBSUVDLGtCQUFRLGtCQUFXO0FBQ2pCLG9DQUFZLEtBQUsvQixJQUFqQjtBQUNEO0FBTkgsU0FETSxFQVNOO0FBQ0VlLGdCQUFNLE1BRFI7QUFFRWYsZ0JBQU02QixTQUFTcEIsS0FBS1QsSUFBTCxDQUFVSSxPQUFuQixDQUZSO0FBR0UwQixpQkFBTyxTQUhUO0FBSUVDLGtCQUFRLGtCQUFXO0FBQ2pCLG9DQUFZLEtBQUsvQixJQUFqQjtBQUNEO0FBTkgsU0FUTSxDQUhHO0FBcUJYZ0MsZUFBTyxHQXJCSTtBQXNCWEMsZ0JBQVEsR0F0Qkc7QUF1QlhDLG1CQUFXO0FBdkJBLE9BQWI7QUF5QkQ7Ozs7RUFwRWlDLGVBQUtDLEk7O2tCQUFwQnRDLE0iLCJmaWxlIjoiY2VudGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB3eENoYXJ0cyBmcm9tICcuLi9saWIvd3hjaGFydHMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDZW50ZXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ivvueoi+aAu+iniCdcbiAgfTtcblxuICBkYXRhID0ge1xuICAgIHVzZXJOYW1lOiBudWxsLFxuICAgIGxlc3NvbnM6IFtdLFxuICAgIGV4cGVuZE51bTogbnVsbCxcbiAgICByZXN0TnVtOiBudWxsXG4gIH07XG4gIG9uU2hvdyhvcHRpb25zKSB7XG4gICAgdGhpcy5nZXRJbmZvKCk7XG4gIH1cbiAgZ2V0SW5mbygpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAvLyDojrflj5blrabnlJ9cbiAgICBjb25zdCBzdHVkZW50ID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3N0dWRlbnQnKTtcbiAgICB3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xuICAgICAgdGl0bGU6IGAke3N0dWRlbnQubmFtZX3lkIzlrabor77nqIvmgLvop4hgXG4gICAgfSk7XG4gICAgY29uc3Qgb3BlbmlkID0gd3guZ2V0U3RvcmFnZVN5bmMoJ29wZW5pZCcpO1xuXG4gICAgd3gucmVxdWVzdCh7XG4gICAgICB1cmw6ICdodHRwczovL2JhY2sueXVpeXUuY24vd3gvc3R1ZGVudC9zdGF0JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgc3R1ZGVudElkOiBzdHVkZW50LmlkLFxuICAgICAgICBvcGVuaWQ6IG9wZW5pZFxuICAgICAgICAvLyBvcGVuaWQ6ICdvMmZQYTRyYkwxajhHcDBRbHFCRHpsM1I0MHZBJ1xuICAgICAgfSxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIHRoYXQuZXhwZW5kTnVtID0gcmVzLmRhdGEuZXhwZW5kTnVtO1xuICAgICAgICB0aGF0LnJlc3ROdW0gPSByZXMuZGF0YS5yZXN0TnVtO1xuICAgICAgICB0aGF0Lmxlc3NvbnMgPSByZXMuZGF0YS5sZXNzb25zO1xuICAgICAgICB0aGF0LiRhcHBseSgpO1xuICAgICAgICB0aGF0LmRyYXdDaGFydCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIC8vIOe7mOWItumlvOWbvlxuICBkcmF3Q2hhcnQoKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgbmV3IHd4Q2hhcnRzKHtcbiAgICAgIGNhbnZhc0lkOiAncGllJyxcbiAgICAgIHR5cGU6ICdwaWUnLFxuICAgICAgc2VyaWVzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAn5bey55So6K++5pe2JyxcbiAgICAgICAgICBkYXRhOiBwYXJzZUludCh0aGF0LmRhdGEuZXhwZW5kTnVtKSxcbiAgICAgICAgICBjb2xvcjogJyNiZmJmYmYnLFxuICAgICAgICAgIGZvcm1hdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gYOW3sueUqCR7dGhpcy5kYXRhfeivvuaXtmA7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ+W+heeUqOivvuaXticsXG4gICAgICAgICAgZGF0YTogcGFyc2VJbnQodGhhdC5kYXRhLnJlc3ROdW0pLFxuICAgICAgICAgIGNvbG9yOiAnIzk1ZGU2NCcsXG4gICAgICAgICAgZm9ybWF0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBg5b6F55SoJHt0aGlzLmRhdGF96K++5pe2YDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICB3aWR0aDogMzUwLFxuICAgICAgaGVpZ2h0OiAyNTAsXG4gICAgICBkYXRhTGFiZWw6IHRydWVcbiAgICB9KTtcbiAgfVxuICBjb21wdXRlZCA9IHt9O1xuXG4gIG1ldGhvZHMgPSB7fTtcbn1cbiJdfQ==