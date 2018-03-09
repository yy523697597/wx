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

            // 获取学生id
            var studentId = wx.getStorageSync('studentId');

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlbnRlci5qcyJdLCJuYW1lcyI6WyJDZW50ZXIiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInVzZXJOYW1lIiwidXNlckNsYXNzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwib3B0aW9ucyIsInN0dWRlbnRJZCIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJzaG93TG9hZGluZyIsInRpdGxlIiwibWFzayIsInNldFRpbWVvdXQiLCJoaWRlTG9hZGluZyIsInRvdGFsIiwidXNlZCIsImF2YWxpYWJsZSIsInVzZWRDb2xvciIsImF2YUNvbG9yIiwiJGFwcGx5Iiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwiZHJhd0NoYXJ0IiwiY2FudmFzSWQiLCJ0eXBlIiwic2VyaWVzIiwibmFtZSIsImNvbG9yIiwiZm9ybWF0Iiwid2lkdGgiLCJoZWlnaHQiLCJkYXRhTGFiZWwiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7OzBMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBSVRDLEksR0FBTztBQUNIQyxzQkFBVSxJQURQO0FBRUhDLHVCQUFXO0FBRlIsUyxRQXVGUEMsUSxHQUFXLEUsUUFFWEMsTyxHQUFVLEU7Ozs7OytCQXJGSEMsTyxFQUFTO0FBQUE7O0FBQ1o7QUFDQSxnQkFBTUMsWUFBWUMsR0FBR0MsY0FBSCxDQUFrQixXQUFsQixDQUFsQjs7QUFFQUQsZUFBR0UsV0FBSCxDQUFlO0FBQ1hDLHVCQUFPLFVBREk7QUFFWEMsc0JBQU07QUFGSyxhQUFmO0FBSUFDLHVCQUFXLFlBQU07QUFDYkwsbUJBQUdNLFdBQUg7QUFDQSx1QkFBS1osUUFBTCxHQUFnQixLQUFoQjtBQUNBLHVCQUFLQyxTQUFMLEdBQWlCLENBQ2I7QUFDSVEsMkJBQU8sUUFEWDtBQUVJSSwyQkFBTyxFQUZYO0FBR0lDLDBCQUFNLENBSFY7QUFJSUMsK0JBQVcsQ0FKZjtBQUtJQywrQkFBVyxTQUxmO0FBTUlDLDhCQUFVO0FBTmQsaUJBRGEsRUFTYjtBQUNJUiwyQkFBTyxNQURYO0FBRUlJLDJCQUFPLEVBRlg7QUFHSUMsMEJBQU0sQ0FIVjtBQUlJQywrQkFBVyxFQUpmO0FBS0lDLCtCQUFXLFNBTGY7QUFNSUMsOEJBQVU7QUFOZCxpQkFUYSxFQWlCYjtBQUNJUiwyQkFBTyxLQURYO0FBRUlJLDJCQUFPLEVBRlg7QUFHSUMsMEJBQU0sQ0FIVjtBQUlJQywrQkFBVyxFQUpmO0FBS0lDLCtCQUFXLFNBTGY7QUFNSUMsOEJBQVU7QUFOZCxpQkFqQmEsRUF5QmI7QUFDSVIsMkJBQU8sS0FEWDtBQUVJSSwyQkFBTyxFQUZYO0FBR0lDLDBCQUFNLEVBSFY7QUFJSUMsK0JBQVcsQ0FKZjtBQUtJQywrQkFBVyxTQUxmO0FBTUlDLDhCQUFVO0FBTmQsaUJBekJhLENBQWpCO0FBa0NBO0FBQ0EsdUJBQUtDLE1BQUw7O0FBRUFaLG1CQUFHYSxxQkFBSCxDQUF5QjtBQUNyQlYsMkJBQVUsT0FBS1QsUUFBZjtBQURxQixpQkFBekI7O0FBSUEsdUJBQUtvQixTQUFMO0FBQ0gsYUE3Q0QsRUE2Q0csSUE3Q0g7QUE4Q0g7QUFDRDs7OztvQ0FDWTtBQUNSLG1DQUFhO0FBQ1RDLDBCQUFVLEtBREQ7QUFFVEMsc0JBQU0sS0FGRztBQUdUQyx3QkFBUSxDQUNKO0FBQ0lDLDBCQUFNLE1BRFY7QUFFSXpCLDBCQUFNLEVBRlY7QUFHSTBCLDJCQUFPLFNBSFg7QUFJSUMsNEJBQVEsa0JBQVc7QUFDZixnREFBWSxLQUFLM0IsSUFBakI7QUFDSDtBQU5MLGlCQURJLEVBU0o7QUFDSXlCLDBCQUFNLE1BRFY7QUFFSXpCLDBCQUFNLEVBRlY7QUFHSTBCLDJCQUFPLFNBSFg7QUFJSUMsNEJBQVEsa0JBQVc7QUFDZixnREFBWSxLQUFLM0IsSUFBakI7QUFDSDtBQU5MLGlCQVRJLENBSEM7QUFxQlQ0Qix1QkFBTyxHQXJCRTtBQXNCVEMsd0JBQVEsR0F0QkM7QUF1QlRDLDJCQUFXO0FBdkJGLGFBQWI7QUF5Qkg7Ozs7RUEzRitCLGVBQUtDLEk7O2tCQUFwQmxDLE0iLCJmaWxlIjoiY2VudGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB3eENoYXJ0cyBmcm9tICcuLi9saWIvd3hjaGFydHMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDZW50ZXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ivvueoi+aAu+iniCdcbiAgICB9O1xuXG4gICAgZGF0YSA9IHtcbiAgICAgICAgdXNlck5hbWU6IG51bGwsXG4gICAgICAgIHVzZXJDbGFzczogbnVsbFxuICAgIH07XG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICAgICAgLy8g6I635Y+W5a2m55SfaWRcbiAgICAgICAgY29uc3Qgc3R1ZGVudElkID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3N0dWRlbnRJZCcpO1xuXG4gICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5q2j5Zyo5Yqg6L295LitLi4uJyxcbiAgICAgICAgICAgIG1hc2s6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICAgIHRoaXMudXNlck5hbWUgPSAnWXVpJztcbiAgICAgICAgICAgIHRoaXMudXNlckNsYXNzID0gW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfpooboopblj6PmiY3orqHliJInLFxuICAgICAgICAgICAgICAgICAgICB0b3RhbDogMTYsXG4gICAgICAgICAgICAgICAgICAgIHVzZWQ6IDksXG4gICAgICAgICAgICAgICAgICAgIGF2YWxpYWJsZTogNyxcbiAgICAgICAgICAgICAgICAgICAgdXNlZENvbG9yOiAnI2JmYmZiZicsXG4gICAgICAgICAgICAgICAgICAgIGF2YUNvbG9yOiAnIzk1ZGU2NCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfkuLvmjIHlpKfotZsnLFxuICAgICAgICAgICAgICAgICAgICB0b3RhbDogMTYsXG4gICAgICAgICAgICAgICAgICAgIHVzZWQ6IDQsXG4gICAgICAgICAgICAgICAgICAgIGF2YWxpYWJsZTogMTIsXG4gICAgICAgICAgICAgICAgICAgIHVzZWRDb2xvcjogJyNiZmJmYmYnLFxuICAgICAgICAgICAgICAgICAgICBhdmFDb2xvcjogJyM5NWRlNjQnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5b2i5L2T54+tJyxcbiAgICAgICAgICAgICAgICAgICAgdG90YWw6IDE2LFxuICAgICAgICAgICAgICAgICAgICB1c2VkOiA2LFxuICAgICAgICAgICAgICAgICAgICBhdmFsaWFibGU6IDEwLFxuICAgICAgICAgICAgICAgICAgICB1c2VkQ29sb3I6ICcjYmZiZmJmJyxcbiAgICAgICAgICAgICAgICAgICAgYXZhQ29sb3I6ICcjOTVkZTY0J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+iInuWPsOWJpycsXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsOiAxNixcbiAgICAgICAgICAgICAgICAgICAgdXNlZDogMTIsXG4gICAgICAgICAgICAgICAgICAgIGF2YWxpYWJsZTogNCxcbiAgICAgICAgICAgICAgICAgICAgdXNlZENvbG9yOiAnI2JmYmZiZicsXG4gICAgICAgICAgICAgICAgICAgIGF2YUNvbG9yOiAnIzk1ZGU2NCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgLy8g5byC5q2l6LCD55So5b+F6aG75L2/55SoYXBwbHnov5vooYzmlbDmja7liLfmlrBcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG5cbiAgICAgICAgICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGAke3RoaXMudXNlck5hbWV95ZCM5a2m6K++56iL5oC76KeIYFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuZHJhd0NoYXJ0KCk7XG4gICAgICAgIH0sIDIwMDApO1xuICAgIH1cbiAgICAvLyDnu5jliLbppbzlm75cbiAgICBkcmF3Q2hhcnQoKSB7XG4gICAgICAgIG5ldyB3eENoYXJ0cyh7XG4gICAgICAgICAgICBjYW52YXNJZDogJ3BpZScsXG4gICAgICAgICAgICB0eXBlOiAncGllJyxcbiAgICAgICAgICAgIHNlcmllczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ+W3sueUqOivvuaXticsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IDUwLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyNiZmJmYmYnLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGDlt7LnlKgke3RoaXMuZGF0YX3or77ml7ZgO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICflvoXnlKjor77ml7YnLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiAxNCxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjOTVkZTY0JyxcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBg5b6F55SoJHt0aGlzLmRhdGF96K++5pe2YDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB3aWR0aDogMzUwLFxuICAgICAgICAgICAgaGVpZ2h0OiAyNTAsXG4gICAgICAgICAgICBkYXRhTGFiZWw6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNvbXB1dGVkID0ge307XG5cbiAgICBtZXRob2RzID0ge307XG59XG4iXX0=