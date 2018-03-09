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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbGVuZGFyLmpzIl0sIm5hbWVzIjpbIkNhbGVuZGFyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIndlcHlDYW5sZW5kYXIiLCJkYXRhIiwiY3VycmVudERhdGUiLCJzdGFydERhdGUiLCJlbmREYXRlIiwiaGFzSWNvbkxpc3QiLCJzZWxlY3REYXRlIiwiY2xhc3NlcyIsIm5hbWUiLCJiZ0NvbG9yIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZXZlbnRzIiwiY2FsQ2hhbmdlQ3VycmVudERhdGUiLCJkYXRlIiwiZSIsImNhbENoYW5nZVNlbGVjdGVkRGF5Iiwib3B0aW9uIiwiY29uc29sZSIsImxvZyIsIm1vbnRoIiwiJGJyb2FkY2FzdCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsUTs7Ozs7Ozs7Ozs7Ozs7OExBQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVkMsTyxHQUFVLEUsUUFDYkMsTSxHQUFTLEVBQUMsaUJBQWdCLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsMkJBQTBCLGFBQTdDLEVBQTJELHlCQUF3QixXQUFuRixFQUErRix1QkFBc0IsU0FBckgsRUFBK0gsMkJBQTBCLGFBQXpKLEVBQWpCLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ05DO0FBRE0sUyxRQUdWQyxJLEdBQU87QUFDSEMseUJBQWEsWUFEVjtBQUVIQyx1QkFBVyxZQUZSO0FBR0hDLHFCQUFTLFlBSE47QUFJSEMseUJBQWEsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsRUFBYixFQUFpQixFQUFqQixFQUFxQixFQUFyQixDQUpWO0FBS0hDLHdCQUFZLElBTFQ7QUFNSEMscUJBQVM7QUFDTCw4QkFBYyxDQUNWO0FBQ0lDLDBCQUFNLEtBRFY7QUFFSUMsNkJBQVM7QUFGYixpQkFEVSxDQURUO0FBT0wsOEJBQWMsQ0FDVjtBQUNJRCwwQkFBTSxLQURWO0FBRUlDLDZCQUFTO0FBRmIsaUJBRFUsRUFLVjtBQUNJRCwwQkFBTSxLQURWO0FBRUlDLDZCQUFTO0FBRmIsaUJBTFUsQ0FQVDtBQWlCTCw4QkFBYyxDQUNWO0FBQ0lELDBCQUFNLEtBRFY7QUFFSUMsNkJBQVM7QUFGYixpQkFEVTtBQWpCVDtBQU5OLFMsUUErQlBDLFEsR0FBVyxFLFFBQ1hDLE8sR0FBVSxFLFFBTVZDLE0sR0FBUztBQUNMQyxrQ0FBc0IsOEJBQVNDLElBQVQsRUFBZUMsQ0FBZixFQUFrQjtBQUNwQztBQUNILGFBSEk7QUFJTEMsa0NBQXNCLDhCQUFTRixJQUFULEVBQWVDLENBQWYsRUFBa0I7QUFDcEM7QUFDQSxxQkFBS1QsVUFBTCxHQUFrQlEsSUFBbEI7QUFDSDtBQVBJLFM7Ozs7O0FBUU47K0JBWklHLE0sRUFBUTtBQUNYQyxvQkFBUUMsR0FBUixDQUFZRixPQUFPRyxLQUFuQjtBQUNBLGlCQUFLQyxVQUFMLENBQWdCLHFCQUFoQixFQUZXLENBRTZCO0FBQzNDOzs7O0VBL0NpQyxlQUFLQyxJOztrQkFBdEI3QixRIiwiZmlsZSI6ImNhbGVuZGFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgd2VweUNhbmxlbmRhciBmcm9tICd3ZXB5LWNhbGVuZGFyJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FsZW5kYXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfor77nqIvooagnXHJcbiAgICB9O1xyXG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIndlcHlDYW5sZW5kYXJcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmN1cnJlbnREYXRlLnN5bmNcIjpcImN1cnJlbnREYXRlXCIsXCJ2LWJpbmQ6c3RhcnREYXRlLnN5bmNcIjpcInN0YXJ0RGF0ZVwiLFwidi1iaW5kOmVuZERhdGUuc3luY1wiOlwiZW5kRGF0ZVwiLFwidi1iaW5kOmhhc0ljb25MaXN0LnN5bmNcIjpcImhhc0ljb25MaXN0XCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgICB3ZXB5Q2FubGVuZGFyXHJcbiAgICB9O1xyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBjdXJyZW50RGF0ZTogJzIwMTgtMDItMDcnLFxyXG4gICAgICAgIHN0YXJ0RGF0ZTogJzIwMTgtMDItMDEnLFxyXG4gICAgICAgIGVuZERhdGU6ICcyMDE4LTAyLTI4JyxcclxuICAgICAgICBoYXNJY29uTGlzdDogWzEsIDIsIDMsIDQsIDEwLCAxMiwgMTRdLFxyXG4gICAgICAgIHNlbGVjdERhdGU6IG51bGwsXHJcbiAgICAgICAgY2xhc3Nlczoge1xyXG4gICAgICAgICAgICAnMjAxOC0wMi0wMSc6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAn6Iie6LmI6K++JyxcclxuICAgICAgICAgICAgICAgICAgICBiZ0NvbG9yOiAneWVsbG93Z3JlZW4nXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICcyMDE4LTAyLTAyJzogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICfmiY3oibror74nLFxyXG4gICAgICAgICAgICAgICAgICAgIGJnQ29sb3I6ICdza3libHVlJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAn5Y+j5omN6K++JyxcclxuICAgICAgICAgICAgICAgICAgICBiZ0NvbG9yOiAncGluaydcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgJzIwMTgtMDItMTAnOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ+WPo+aJjeivvicsXHJcbiAgICAgICAgICAgICAgICAgICAgYmdDb2xvcjogJ3BpbmsnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgY29tcHV0ZWQgPSB7fTtcclxuICAgIG1ldGhvZHMgPSB7fTtcclxuXHJcbiAgICBvbkxvYWQob3B0aW9uKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cob3B0aW9uLm1vbnRoKTtcclxuICAgICAgICB0aGlzLiRicm9hZGNhc3QoJ3N0YXJ0UmVuZGVyQ2FsZW5kYXInKTsgLy/pgJrnn6Xml6Xljobnu4Tku7blj6/ku6XlvIDlp4vmuLLmn5NcclxuICAgIH1cclxuICAgIGV2ZW50cyA9IHtcclxuICAgICAgICBjYWxDaGFuZ2VDdXJyZW50RGF0ZTogZnVuY3Rpb24oZGF0ZSwgZSkge1xyXG4gICAgICAgICAgICAvL+aXpeWOhuW9k+WJjeaXtumXtOaUueWPmOWbnuiwg1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2FsQ2hhbmdlU2VsZWN0ZWREYXk6IGZ1bmN0aW9uKGRhdGUsIGUpIHtcclxuICAgICAgICAgICAgLy/ngrnlh7vml6XljobpgInmi6nlpKnlm57osINcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3REYXRlID0gZGF0ZTtcclxuICAgICAgICB9XHJcbiAgICB9OyAvLyDlo7DmmI7nu4Tku7bkuYvpl7TnmoTkuovku7blpITnkIblh73mlbBcclxufVxyXG4iXX0=