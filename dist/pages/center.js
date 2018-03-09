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
            userClass: null
        }, _this.computed = {}, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Center, [{
        key: 'onLoad',
        value: function onLoad(options) {
            var _this2 = this;

            // 获取学生
            var student = wx.getStorageSync('student');
            console.log(student);
            wx.showLoading({
                title: '正在加载中...',
                mask: true
            });
            setTimeout(function () {
                wx.hideLoading();
                _this2.userName = 'Yui';
                _this2.userClass = [{
                    title: '领袖口才计划',
                    total: 16,
                    used: 9,
                    avaliable: 7,
                    usedColor: '#bfbfbf',
                    avaColor: '#95de64'
                }, {
                    title: '主持大赛',
                    total: 16,
                    used: 4,
                    avaliable: 12,
                    usedColor: '#bfbfbf',
                    avaColor: '#95de64'
                }, {
                    title: '形体班',
                    total: 16,
                    used: 6,
                    avaliable: 10,
                    usedColor: '#bfbfbf',
                    avaColor: '#95de64'
                }, {
                    title: '舞台剧',
                    total: 16,
                    used: 12,
                    avaliable: 4,
                    usedColor: '#bfbfbf',
                    avaColor: '#95de64'
                }];
                // 异步调用必须使用apply进行数据刷新
                _this2.$apply();

                wx.setNavigationBarTitle({
                    title: _this2.userName + '\u540C\u5B66\u8BFE\u7A0B\u603B\u89C8'
                });

                _this2.drawChart();
            }, 2000);
        }
        // 绘制饼图

    }, {
        key: 'drawChart',
        value: function drawChart() {
            new _wxcharts2.default({
                canvasId: 'pie',
                type: 'pie',
                series: [{
                    name: '已用课时',
                    data: 50,
                    color: '#bfbfbf',
                    format: function format() {
                        return '\u5DF2\u7528' + this.data + '\u8BFE\u65F6';
                    }
                }, {
                    name: '待用课时',
                    data: 14,
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlbnRlci5qcyJdLCJuYW1lcyI6WyJDZW50ZXIiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInVzZXJOYW1lIiwidXNlckNsYXNzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwib3B0aW9ucyIsInN0dWRlbnQiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwiY29uc29sZSIsImxvZyIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJtYXNrIiwic2V0VGltZW91dCIsImhpZGVMb2FkaW5nIiwidG90YWwiLCJ1c2VkIiwiYXZhbGlhYmxlIiwidXNlZENvbG9yIiwiYXZhQ29sb3IiLCIkYXBwbHkiLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJkcmF3Q2hhcnQiLCJjYW52YXNJZCIsInR5cGUiLCJzZXJpZXMiLCJuYW1lIiwiY29sb3IiLCJmb3JtYXQiLCJ3aWR0aCIsImhlaWdodCIsImRhdGFMYWJlbCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTTs7Ozs7Ozs7Ozs7Ozs7MExBQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFJVEMsSSxHQUFPO0FBQ0hDLHNCQUFVLElBRFA7QUFFSEMsdUJBQVc7QUFGUixTLFFBdUZQQyxRLEdBQVcsRSxRQUVYQyxPLEdBQVUsRTs7Ozs7K0JBckZIQyxPLEVBQVM7QUFBQTs7QUFDWjtBQUNBLGdCQUFNQyxVQUFVQyxHQUFHQyxjQUFILENBQWtCLFNBQWxCLENBQWhCO0FBQ0FDLG9CQUFRQyxHQUFSLENBQVlKLE9BQVo7QUFDQUMsZUFBR0ksV0FBSCxDQUFlO0FBQ1hDLHVCQUFPLFVBREk7QUFFWEMsc0JBQU07QUFGSyxhQUFmO0FBSUFDLHVCQUFXLFlBQU07QUFDYlAsbUJBQUdRLFdBQUg7QUFDQSx1QkFBS2QsUUFBTCxHQUFnQixLQUFoQjtBQUNBLHVCQUFLQyxTQUFMLEdBQWlCLENBQ2I7QUFDSVUsMkJBQU8sUUFEWDtBQUVJSSwyQkFBTyxFQUZYO0FBR0lDLDBCQUFNLENBSFY7QUFJSUMsK0JBQVcsQ0FKZjtBQUtJQywrQkFBVyxTQUxmO0FBTUlDLDhCQUFVO0FBTmQsaUJBRGEsRUFTYjtBQUNJUiwyQkFBTyxNQURYO0FBRUlJLDJCQUFPLEVBRlg7QUFHSUMsMEJBQU0sQ0FIVjtBQUlJQywrQkFBVyxFQUpmO0FBS0lDLCtCQUFXLFNBTGY7QUFNSUMsOEJBQVU7QUFOZCxpQkFUYSxFQWlCYjtBQUNJUiwyQkFBTyxLQURYO0FBRUlJLDJCQUFPLEVBRlg7QUFHSUMsMEJBQU0sQ0FIVjtBQUlJQywrQkFBVyxFQUpmO0FBS0lDLCtCQUFXLFNBTGY7QUFNSUMsOEJBQVU7QUFOZCxpQkFqQmEsRUF5QmI7QUFDSVIsMkJBQU8sS0FEWDtBQUVJSSwyQkFBTyxFQUZYO0FBR0lDLDBCQUFNLEVBSFY7QUFJSUMsK0JBQVcsQ0FKZjtBQUtJQywrQkFBVyxTQUxmO0FBTUlDLDhCQUFVO0FBTmQsaUJBekJhLENBQWpCO0FBa0NBO0FBQ0EsdUJBQUtDLE1BQUw7O0FBRUFkLG1CQUFHZSxxQkFBSCxDQUF5QjtBQUNyQlYsMkJBQVUsT0FBS1gsUUFBZjtBQURxQixpQkFBekI7O0FBSUEsdUJBQUtzQixTQUFMO0FBQ0gsYUE3Q0QsRUE2Q0csSUE3Q0g7QUE4Q0g7QUFDRDs7OztvQ0FDWTtBQUNSLG1DQUFhO0FBQ1RDLDBCQUFVLEtBREQ7QUFFVEMsc0JBQU0sS0FGRztBQUdUQyx3QkFBUSxDQUNKO0FBQ0lDLDBCQUFNLE1BRFY7QUFFSTNCLDBCQUFNLEVBRlY7QUFHSTRCLDJCQUFPLFNBSFg7QUFJSUMsNEJBQVEsa0JBQVc7QUFDZixnREFBWSxLQUFLN0IsSUFBakI7QUFDSDtBQU5MLGlCQURJLEVBU0o7QUFDSTJCLDBCQUFNLE1BRFY7QUFFSTNCLDBCQUFNLEVBRlY7QUFHSTRCLDJCQUFPLFNBSFg7QUFJSUMsNEJBQVEsa0JBQVc7QUFDZixnREFBWSxLQUFLN0IsSUFBakI7QUFDSDtBQU5MLGlCQVRJLENBSEM7QUFxQlQ4Qix1QkFBTyxHQXJCRTtBQXNCVEMsd0JBQVEsR0F0QkM7QUF1QlRDLDJCQUFXO0FBdkJGLGFBQWI7QUF5Qkg7Ozs7RUEzRitCLGVBQUtDLEk7O2tCQUFwQnBDLE0iLCJmaWxlIjoiY2VudGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB3eENoYXJ0cyBmcm9tICcuLi9saWIvd3hjaGFydHMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDZW50ZXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ivvueoi+aAu+iniCdcbiAgICB9O1xuXG4gICAgZGF0YSA9IHtcbiAgICAgICAgdXNlck5hbWU6IG51bGwsXG4gICAgICAgIHVzZXJDbGFzczogbnVsbFxuICAgIH07XG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICAgICAgLy8g6I635Y+W5a2m55SfXG4gICAgICAgIGNvbnN0IHN0dWRlbnQgPSB3eC5nZXRTdG9yYWdlU3luYygnc3R1ZGVudCcpO1xuICAgICAgICBjb25zb2xlLmxvZyhzdHVkZW50KTtcbiAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgICAgdGl0bGU6ICfmraPlnKjliqDovb3kuK0uLi4nLFxuICAgICAgICAgICAgbWFzazogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgdGhpcy51c2VyTmFtZSA9ICdZdWknO1xuICAgICAgICAgICAgdGhpcy51c2VyQ2xhc3MgPSBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+mihuiiluWPo+aJjeiuoeWIkicsXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsOiAxNixcbiAgICAgICAgICAgICAgICAgICAgdXNlZDogOSxcbiAgICAgICAgICAgICAgICAgICAgYXZhbGlhYmxlOiA3LFxuICAgICAgICAgICAgICAgICAgICB1c2VkQ29sb3I6ICcjYmZiZmJmJyxcbiAgICAgICAgICAgICAgICAgICAgYXZhQ29sb3I6ICcjOTVkZTY0J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+S4u+aMgeWkp+i1mycsXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsOiAxNixcbiAgICAgICAgICAgICAgICAgICAgdXNlZDogNCxcbiAgICAgICAgICAgICAgICAgICAgYXZhbGlhYmxlOiAxMixcbiAgICAgICAgICAgICAgICAgICAgdXNlZENvbG9yOiAnI2JmYmZiZicsXG4gICAgICAgICAgICAgICAgICAgIGF2YUNvbG9yOiAnIzk1ZGU2NCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICflvaLkvZPnj60nLFxuICAgICAgICAgICAgICAgICAgICB0b3RhbDogMTYsXG4gICAgICAgICAgICAgICAgICAgIHVzZWQ6IDYsXG4gICAgICAgICAgICAgICAgICAgIGF2YWxpYWJsZTogMTAsXG4gICAgICAgICAgICAgICAgICAgIHVzZWRDb2xvcjogJyNiZmJmYmYnLFxuICAgICAgICAgICAgICAgICAgICBhdmFDb2xvcjogJyM5NWRlNjQnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn6Iie5Y+w5YmnJyxcbiAgICAgICAgICAgICAgICAgICAgdG90YWw6IDE2LFxuICAgICAgICAgICAgICAgICAgICB1c2VkOiAxMixcbiAgICAgICAgICAgICAgICAgICAgYXZhbGlhYmxlOiA0LFxuICAgICAgICAgICAgICAgICAgICB1c2VkQ29sb3I6ICcjYmZiZmJmJyxcbiAgICAgICAgICAgICAgICAgICAgYXZhQ29sb3I6ICcjOTVkZTY0J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICAvLyDlvILmraXosIPnlKjlv4Xpobvkvb/nlKhhcHBseei/m+ihjOaVsOaNruWIt+aWsFxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcblxuICAgICAgICAgICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogYCR7dGhpcy51c2VyTmFtZX3lkIzlrabor77nqIvmgLvop4hgXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5kcmF3Q2hhcnQoKTtcbiAgICAgICAgfSwgMjAwMCk7XG4gICAgfVxuICAgIC8vIOe7mOWItumlvOWbvlxuICAgIGRyYXdDaGFydCgpIHtcbiAgICAgICAgbmV3IHd4Q2hhcnRzKHtcbiAgICAgICAgICAgIGNhbnZhc0lkOiAncGllJyxcbiAgICAgICAgICAgIHR5cGU6ICdwaWUnLFxuICAgICAgICAgICAgc2VyaWVzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAn5bey55So6K++5pe2JyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogNTAsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI2JmYmZiZicsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYOW3sueUqCR7dGhpcy5kYXRhfeivvuaXtmA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ+W+heeUqOivvuaXticsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IDE0LFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyM5NWRlNjQnLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGDlvoXnlKgke3RoaXMuZGF0YX3or77ml7ZgO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHdpZHRoOiAzNTAsXG4gICAgICAgICAgICBoZWlnaHQ6IDI1MCxcbiAgICAgICAgICAgIGRhdGFMYWJlbDogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7fTtcblxuICAgIG1ldGhvZHMgPSB7fTtcbn1cbiJdfQ==