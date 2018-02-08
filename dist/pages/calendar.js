'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wepyCalendar = require('./../npm/wepy-calendar/calendar.js');

var _wepyCalendar2 = _interopRequireDefault(_wepyCalendar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = function (_wepy$page) {
    _inherits(Calendar, _wepy$page);

    function Calendar() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Calendar);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '课程表'
        }, _this.$repeat = {}, _this.$props = { "wepyCanlendar": { "xmlns:v-bind": "", "v-bind:currentDate.sync": "currentDate", "v-bind:startDate.sync": "startDate", "v-bind:endDate.sync": "endDate", "v-bind:hasIconList.sync": "hasIconList" } }, _this.$events = {}, _this.components = {
            wepyCanlendar: _wepyCalendar2.default
        }, _this.data = {
            currentDate: '2018-02-07',
            startDate: '2018-02-01',
            endDate: '2018-02-28',
            hasIconList: [1, 2, 3, 4, 10, 12, 14],
            selectDate: null,
            classes: {
                '2018-02-01': [{
                    name: '舞蹈课',
                    bgColor: 'yellowgreen'
                }],
                '2018-02-02': [{
                    name: '才艺课',
                    bgColor: 'skyblue'
                }, {
                    name: '口才课',
                    bgColor: 'pink'
                }],
                '2018-02-10': [{
                    name: '口才课',
                    bgColor: 'pink'
                }]
            }
        }, _this.computed = {}, _this.methods = {}, _this.events = {
            calChangeCurrentDate: function calChangeCurrentDate(date, e) {
                //日历当前时间改变回调
            },
            calChangeSelectedDay: function calChangeSelectedDay(date, e) {
                //点击日历选择天回调
                this.selectDate = date;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Calendar, [{
        key: 'onLoad',
        // 声明组件之间的事件处理函数
        value: function onLoad(option) {
            console.log(option.month);
            this.$broadcast('startRenderCalendar'); //通知日历组件可以开始渲染
        }
    }]);

    return Calendar;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Calendar , 'pages/calendar'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbGVuZGFyLmpzIl0sIm5hbWVzIjpbIkNhbGVuZGFyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIndlcHlDYW5sZW5kYXIiLCJkYXRhIiwiY3VycmVudERhdGUiLCJzdGFydERhdGUiLCJlbmREYXRlIiwiaGFzSWNvbkxpc3QiLCJzZWxlY3REYXRlIiwiY2xhc3NlcyIsIm5hbWUiLCJiZ0NvbG9yIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZXZlbnRzIiwiY2FsQ2hhbmdlQ3VycmVudERhdGUiLCJkYXRlIiwiZSIsImNhbENoYW5nZVNlbGVjdGVkRGF5Iiwib3B0aW9uIiwiY29uc29sZSIsImxvZyIsIm1vbnRoIiwiJGJyb2FkY2FzdCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsUTs7Ozs7Ozs7Ozs7Ozs7OExBQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVkMsTyxHQUFVLEUsUUFDYkMsTSxHQUFTLEVBQUMsaUJBQWdCLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsMkJBQTBCLGFBQTdDLEVBQTJELHlCQUF3QixXQUFuRixFQUErRix1QkFBc0IsU0FBckgsRUFBK0gsMkJBQTBCLGFBQXpKLEVBQWpCLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ05DO0FBRE0sUyxRQUdWQyxJLEdBQU87QUFDSEMseUJBQWEsWUFEVjtBQUVIQyx1QkFBVyxZQUZSO0FBR0hDLHFCQUFTLFlBSE47QUFJSEMseUJBQWEsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsRUFBYixFQUFpQixFQUFqQixFQUFxQixFQUFyQixDQUpWO0FBS0hDLHdCQUFZLElBTFQ7QUFNSEMscUJBQVM7QUFDTCw4QkFBYyxDQUNWO0FBQ0lDLDBCQUFNLEtBRFY7QUFFSUMsNkJBQVM7QUFGYixpQkFEVSxDQURUO0FBT0wsOEJBQWMsQ0FDVjtBQUNJRCwwQkFBTSxLQURWO0FBRUlDLDZCQUFTO0FBRmIsaUJBRFUsRUFLVjtBQUNJRCwwQkFBTSxLQURWO0FBRUlDLDZCQUFTO0FBRmIsaUJBTFUsQ0FQVDtBQWlCTCw4QkFBYyxDQUNWO0FBQ0lELDBCQUFNLEtBRFY7QUFFSUMsNkJBQVM7QUFGYixpQkFEVTtBQWpCVDtBQU5OLFMsUUErQlBDLFEsR0FBVyxFLFFBQ1hDLE8sR0FBVSxFLFFBTVZDLE0sR0FBUztBQUNMQyxrQ0FBc0IsOEJBQVNDLElBQVQsRUFBZUMsQ0FBZixFQUFrQjtBQUNwQztBQUNILGFBSEk7QUFJTEMsa0NBQXNCLDhCQUFTRixJQUFULEVBQWVDLENBQWYsRUFBa0I7QUFDcEM7QUFDQSxxQkFBS1QsVUFBTCxHQUFrQlEsSUFBbEI7QUFDSDtBQVBJLFM7Ozs7O0FBUU47K0JBWklHLE0sRUFBUTtBQUNYQyxvQkFBUUMsR0FBUixDQUFZRixPQUFPRyxLQUFuQjtBQUNBLGlCQUFLQyxVQUFMLENBQWdCLHFCQUFoQixFQUZXLENBRTZCO0FBQzNDOzs7O0VBL0NpQyxlQUFLQyxJOztrQkFBdEI3QixRIiwiZmlsZSI6ImNhbGVuZGFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB3ZXB5Q2FubGVuZGFyIGZyb20gJ3dlcHktY2FsZW5kYXInO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FsZW5kYXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ivvueoi+ihqCdcbiAgICB9O1xuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJ3ZXB5Q2FubGVuZGFyXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpjdXJyZW50RGF0ZS5zeW5jXCI6XCJjdXJyZW50RGF0ZVwiLFwidi1iaW5kOnN0YXJ0RGF0ZS5zeW5jXCI6XCJzdGFydERhdGVcIixcInYtYmluZDplbmREYXRlLnN5bmNcIjpcImVuZERhdGVcIixcInYtYmluZDpoYXNJY29uTGlzdC5zeW5jXCI6XCJoYXNJY29uTGlzdFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICAgIHdlcHlDYW5sZW5kYXJcbiAgICB9O1xuICAgIGRhdGEgPSB7XG4gICAgICAgIGN1cnJlbnREYXRlOiAnMjAxOC0wMi0wNycsXG4gICAgICAgIHN0YXJ0RGF0ZTogJzIwMTgtMDItMDEnLFxuICAgICAgICBlbmREYXRlOiAnMjAxOC0wMi0yOCcsXG4gICAgICAgIGhhc0ljb25MaXN0OiBbMSwgMiwgMywgNCwgMTAsIDEyLCAxNF0sXG4gICAgICAgIHNlbGVjdERhdGU6IG51bGwsXG4gICAgICAgIGNsYXNzZXM6IHtcbiAgICAgICAgICAgICcyMDE4LTAyLTAxJzogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ+iInui5iOivvicsXG4gICAgICAgICAgICAgICAgICAgIGJnQ29sb3I6ICd5ZWxsb3dncmVlbidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgJzIwMTgtMDItMDInOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAn5omN6Im66K++JyxcbiAgICAgICAgICAgICAgICAgICAgYmdDb2xvcjogJ3NreWJsdWUnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICflj6PmiY3or74nLFxuICAgICAgICAgICAgICAgICAgICBiZ0NvbG9yOiAncGluaydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgJzIwMTgtMDItMTAnOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAn5Y+j5omN6K++JyxcbiAgICAgICAgICAgICAgICAgICAgYmdDb2xvcjogJ3BpbmsnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfTtcbiAgICBjb21wdXRlZCA9IHt9O1xuICAgIG1ldGhvZHMgPSB7fTtcblxuICAgIG9uTG9hZChvcHRpb24pIHtcbiAgICAgICAgY29uc29sZS5sb2cob3B0aW9uLm1vbnRoKTtcbiAgICAgICAgdGhpcy4kYnJvYWRjYXN0KCdzdGFydFJlbmRlckNhbGVuZGFyJyk7IC8v6YCa55+l5pel5Y6G57uE5Lu25Y+v5Lul5byA5aeL5riy5p+TXG4gICAgfVxuICAgIGV2ZW50cyA9IHtcbiAgICAgICAgY2FsQ2hhbmdlQ3VycmVudERhdGU6IGZ1bmN0aW9uKGRhdGUsIGUpIHtcbiAgICAgICAgICAgIC8v5pel5Y6G5b2T5YmN5pe26Ze05pS55Y+Y5Zue6LCDXG4gICAgICAgIH0sXG4gICAgICAgIGNhbENoYW5nZVNlbGVjdGVkRGF5OiBmdW5jdGlvbihkYXRlLCBlKSB7XG4gICAgICAgICAgICAvL+eCueWHu+aXpeWOhumAieaLqeWkqeWbnuiwg1xuICAgICAgICAgICAgdGhpcy5zZWxlY3REYXRlID0gZGF0ZTtcbiAgICAgICAgfVxuICAgIH07IC8vIOWjsOaYjue7hOS7tuS5i+mXtOeahOS6i+S7tuWkhOeQhuWHveaVsFxufVxuIl19