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
                    // openid: openid
                    openid: 'o2fPa4rbL1j8Gp0QlqBDzl3R40vA'
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlbnRlci5qcyJdLCJuYW1lcyI6WyJDZW50ZXIiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInVzZXJOYW1lIiwibGVzc29ucyIsImV4cGVuZE51bSIsInJlc3ROdW0iLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJvcHRpb25zIiwiZ2V0SW5mbyIsInRoYXQiLCJzdHVkZW50Iiwid3giLCJnZXRTdG9yYWdlU3luYyIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsInRpdGxlIiwibmFtZSIsIm9wZW5pZCIsInJlcXVlc3QiLCJ1cmwiLCJzdHVkZW50SWQiLCJpZCIsIm1ldGhvZCIsInN1Y2Nlc3MiLCJyZXMiLCIkYXBwbHkiLCJkcmF3Q2hhcnQiLCJjYW52YXNJZCIsInR5cGUiLCJzZXJpZXMiLCJwYXJzZUludCIsImNvbG9yIiwiZm9ybWF0Iiwid2lkdGgiLCJoZWlnaHQiLCJkYXRhTGFiZWwiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7OzBMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBSVRDLEksR0FBTztBQUNIQyxzQkFBVSxJQURQO0FBRUhDLHFCQUFTLEVBRk47QUFHSEMsdUJBQVcsSUFIUjtBQUlIQyxxQkFBUztBQUpOLFMsUUFnRVBDLFEsR0FBVyxFLFFBRVhDLE8sR0FBVSxFOzs7OzsrQkE1REhDLE8sRUFBUztBQUNaLGlCQUFLQyxPQUFMO0FBQ0g7OztrQ0FDUztBQUNOLGdCQUFNQyxPQUFPLElBQWI7QUFDQTtBQUNBLGdCQUFNQyxVQUFVQyxHQUFHQyxjQUFILENBQWtCLFNBQWxCLENBQWhCO0FBQ0FELGVBQUdFLHFCQUFILENBQXlCO0FBQ3JCQyx1QkFBVUosUUFBUUssSUFBbEI7QUFEcUIsYUFBekI7QUFHQSxnQkFBTUMsU0FBU0wsR0FBR0MsY0FBSCxDQUFrQixRQUFsQixDQUFmOztBQUVBRCxlQUFHTSxPQUFILENBQVc7QUFDUEMscUJBQUssdUNBREU7QUFFUGxCLHNCQUFNO0FBQ0ZtQiwrQkFBV1QsUUFBUVUsRUFEakI7QUFFRjtBQUNBSiw0QkFBUTtBQUhOLGlCQUZDO0FBT1BLLHdCQUFRLE1BUEQ7QUFRUEMseUJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNuQmQseUJBQUtOLFNBQUwsR0FBaUJvQixJQUFJdkIsSUFBSixDQUFTRyxTQUExQjtBQUNBTSx5QkFBS0wsT0FBTCxHQUFlbUIsSUFBSXZCLElBQUosQ0FBU0ksT0FBeEI7QUFDQUsseUJBQUtQLE9BQUwsR0FBZXFCLElBQUl2QixJQUFKLENBQVNFLE9BQXhCO0FBQ0FPLHlCQUFLZSxNQUFMO0FBQ0FmLHlCQUFLZ0IsU0FBTDtBQUNIO0FBZE0sYUFBWDtBQWdCSDtBQUNEOzs7O29DQUNZO0FBQ1IsZ0JBQU1oQixPQUFPLElBQWI7QUFDQSxtQ0FBYTtBQUNUaUIsMEJBQVUsS0FERDtBQUVUQyxzQkFBTSxLQUZHO0FBR1RDLHdCQUFRLENBQ0o7QUFDSWIsMEJBQU0sTUFEVjtBQUVJZiwwQkFBTTZCLFNBQVNwQixLQUFLVCxJQUFMLENBQVVHLFNBQW5CLENBRlY7QUFHSTJCLDJCQUFPLFNBSFg7QUFJSUMsNEJBQVEsa0JBQVc7QUFDZixnREFBWSxLQUFLL0IsSUFBakI7QUFDSDtBQU5MLGlCQURJLEVBU0o7QUFDSWUsMEJBQU0sTUFEVjtBQUVJZiwwQkFBTTZCLFNBQVNwQixLQUFLVCxJQUFMLENBQVVJLE9BQW5CLENBRlY7QUFHSTBCLDJCQUFPLFNBSFg7QUFJSUMsNEJBQVEsa0JBQVc7QUFDZixnREFBWSxLQUFLL0IsSUFBakI7QUFDSDtBQU5MLGlCQVRJLENBSEM7QUFxQlRnQyx1QkFBTyxHQXJCRTtBQXNCVEMsd0JBQVEsR0F0QkM7QUF1QlRDLDJCQUFXO0FBdkJGLGFBQWI7QUF5Qkg7Ozs7RUFwRStCLGVBQUtDLEk7O2tCQUFwQnRDLE0iLCJmaWxlIjoiY2VudGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgd3hDaGFydHMgZnJvbSAnLi4vbGliL3d4Y2hhcnRzLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENlbnRlciBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ivvueoi+aAu+iniCdcclxuICAgIH07XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICB1c2VyTmFtZTogbnVsbCxcclxuICAgICAgICBsZXNzb25zOiBbXSxcclxuICAgICAgICBleHBlbmROdW06IG51bGwsXHJcbiAgICAgICAgcmVzdE51bTogbnVsbFxyXG4gICAgfTtcclxuICAgIG9uU2hvdyhvcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5nZXRJbmZvKCk7XHJcbiAgICB9XHJcbiAgICBnZXRJbmZvKCkge1xyXG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIC8vIOiOt+WPluWtpueUn1xyXG4gICAgICAgIGNvbnN0IHN0dWRlbnQgPSB3eC5nZXRTdG9yYWdlU3luYygnc3R1ZGVudCcpO1xyXG4gICAgICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XHJcbiAgICAgICAgICAgIHRpdGxlOiBgJHtzdHVkZW50Lm5hbWV95ZCM5a2m6K++56iL5oC76KeIYFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IG9wZW5pZCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdvcGVuaWQnKTtcclxuXHJcbiAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vYmFjay55dWl5dS5jbi93eC9zdHVkZW50L3N0YXQnLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBzdHVkZW50SWQ6IHN0dWRlbnQuaWQsXHJcbiAgICAgICAgICAgICAgICAvLyBvcGVuaWQ6IG9wZW5pZFxyXG4gICAgICAgICAgICAgICAgb3BlbmlkOiAnbzJmUGE0cmJMMWo4R3AwUWxxQkR6bDNSNDB2QSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5leHBlbmROdW0gPSByZXMuZGF0YS5leHBlbmROdW07XHJcbiAgICAgICAgICAgICAgICB0aGF0LnJlc3ROdW0gPSByZXMuZGF0YS5yZXN0TnVtO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5sZXNzb25zID0gcmVzLmRhdGEubGVzc29ucztcclxuICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmRyYXdDaGFydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvLyDnu5jliLbppbzlm75cclxuICAgIGRyYXdDaGFydCgpIHtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICBuZXcgd3hDaGFydHMoe1xyXG4gICAgICAgICAgICBjYW52YXNJZDogJ3BpZScsXHJcbiAgICAgICAgICAgIHR5cGU6ICdwaWUnLFxyXG4gICAgICAgICAgICBzZXJpZXM6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAn5bey55So6K++5pe2JyxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBwYXJzZUludCh0aGF0LmRhdGEuZXhwZW5kTnVtKSxcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyNiZmJmYmYnLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBg5bey55SoJHt0aGlzLmRhdGF96K++5pe2YDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICflvoXnlKjor77ml7YnLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHBhcnNlSW50KHRoYXQuZGF0YS5yZXN0TnVtKSxcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyM5NWRlNjQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBg5b6F55SoJHt0aGlzLmRhdGF96K++5pe2YDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHdpZHRoOiAzNTAsXHJcbiAgICAgICAgICAgIGhlaWdodDogMjUwLFxyXG4gICAgICAgICAgICBkYXRhTGFiZWw6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGNvbXB1dGVkID0ge307XHJcblxyXG4gICAgbWV0aG9kcyA9IHt9O1xyXG59XHJcbiJdfQ==