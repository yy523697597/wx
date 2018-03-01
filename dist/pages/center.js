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
                    usedColor: '#ffa39e',
                    avaColor: '#b7eb8f'
                }, {
                    title: '主持大赛',
                    total: 16,
                    used: 4,
                    avaliable: 12,
                    usedColor: '#fffb8f',
                    avaColor: '#b7eb8f'
                }, {
                    title: '形体班',
                    total: 16,
                    used: 6,
                    avaliable: 10,
                    usedColor: '#adc6ff',
                    avaColor: '#b7eb8f'
                }, {
                    title: '舞台剧',
                    total: 16,
                    used: 12,
                    avaliable: 4,
                    usedColor: '#d3adf7',
                    avaColor: '#b7eb8f'
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
                    color: 'rgb(255,163,158)',
                    format: function format() {
                        return '\u5DF2\u7528' + this.data + '\u8BFE\u65F6';
                    }
                }, {
                    name: '待用课时',
                    data: 14,
                    color: 'rgb(149,222,100)',
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlbnRlci5qcyJdLCJuYW1lcyI6WyJDZW50ZXIiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInVzZXJOYW1lIiwidXNlckNsYXNzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwib3B0aW9ucyIsInN0dWRlbnRJZCIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJzaG93TG9hZGluZyIsInRpdGxlIiwibWFzayIsInNldFRpbWVvdXQiLCJoaWRlTG9hZGluZyIsInRvdGFsIiwidXNlZCIsImF2YWxpYWJsZSIsInVzZWRDb2xvciIsImF2YUNvbG9yIiwiJGFwcGx5Iiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwiZHJhd0NoYXJ0IiwiY2FudmFzSWQiLCJ0eXBlIiwic2VyaWVzIiwibmFtZSIsImNvbG9yIiwiZm9ybWF0Iiwid2lkdGgiLCJoZWlnaHQiLCJkYXRhTGFiZWwiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7OzBMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBSVRDLEksR0FBTztBQUNIQyxzQkFBVSxJQURQO0FBRUhDLHVCQUFXO0FBRlIsUyxRQXVGUEMsUSxHQUFXLEUsUUFFWEMsTyxHQUFVLEU7Ozs7OytCQXJGSEMsTyxFQUFTO0FBQUE7O0FBQ1o7QUFDQSxnQkFBTUMsWUFBWUMsR0FBR0MsY0FBSCxDQUFrQixXQUFsQixDQUFsQjs7QUFFQUQsZUFBR0UsV0FBSCxDQUFlO0FBQ1hDLHVCQUFPLFVBREk7QUFFWEMsc0JBQU07QUFGSyxhQUFmO0FBSUFDLHVCQUFXLFlBQU07QUFDYkwsbUJBQUdNLFdBQUg7QUFDQSx1QkFBS1osUUFBTCxHQUFnQixLQUFoQjtBQUNBLHVCQUFLQyxTQUFMLEdBQWlCLENBQ2I7QUFDSVEsMkJBQU8sUUFEWDtBQUVJSSwyQkFBTyxFQUZYO0FBR0lDLDBCQUFNLENBSFY7QUFJSUMsK0JBQVcsQ0FKZjtBQUtJQywrQkFBVyxTQUxmO0FBTUlDLDhCQUFVO0FBTmQsaUJBRGEsRUFTYjtBQUNJUiwyQkFBTyxNQURYO0FBRUlJLDJCQUFPLEVBRlg7QUFHSUMsMEJBQU0sQ0FIVjtBQUlJQywrQkFBVyxFQUpmO0FBS0lDLCtCQUFXLFNBTGY7QUFNSUMsOEJBQVU7QUFOZCxpQkFUYSxFQWlCYjtBQUNJUiwyQkFBTyxLQURYO0FBRUlJLDJCQUFPLEVBRlg7QUFHSUMsMEJBQU0sQ0FIVjtBQUlJQywrQkFBVyxFQUpmO0FBS0lDLCtCQUFXLFNBTGY7QUFNSUMsOEJBQVU7QUFOZCxpQkFqQmEsRUF5QmI7QUFDSVIsMkJBQU8sS0FEWDtBQUVJSSwyQkFBTyxFQUZYO0FBR0lDLDBCQUFNLEVBSFY7QUFJSUMsK0JBQVcsQ0FKZjtBQUtJQywrQkFBVyxTQUxmO0FBTUlDLDhCQUFVO0FBTmQsaUJBekJhLENBQWpCO0FBa0NBO0FBQ0EsdUJBQUtDLE1BQUw7O0FBRUFaLG1CQUFHYSxxQkFBSCxDQUF5QjtBQUNyQlYsMkJBQVUsT0FBS1QsUUFBZjtBQURxQixpQkFBekI7O0FBSUEsdUJBQUtvQixTQUFMO0FBQ0gsYUE3Q0QsRUE2Q0csSUE3Q0g7QUE4Q0g7QUFDRDs7OztvQ0FDWTtBQUNSLG1DQUFhO0FBQ1RDLDBCQUFVLEtBREQ7QUFFVEMsc0JBQU0sS0FGRztBQUdUQyx3QkFBUSxDQUNKO0FBQ0lDLDBCQUFNLE1BRFY7QUFFSXpCLDBCQUFNLEVBRlY7QUFHSTBCLDJCQUFPLGtCQUhYO0FBSUlDLDRCQUFRLGtCQUFXO0FBQ2YsZ0RBQVksS0FBSzNCLElBQWpCO0FBQ0g7QUFOTCxpQkFESSxFQVNKO0FBQ0l5QiwwQkFBTSxNQURWO0FBRUl6QiwwQkFBTSxFQUZWO0FBR0kwQiwyQkFBTyxrQkFIWDtBQUlJQyw0QkFBUSxrQkFBVztBQUNmLGdEQUFZLEtBQUszQixJQUFqQjtBQUNIO0FBTkwsaUJBVEksQ0FIQztBQXFCVDRCLHVCQUFPLEdBckJFO0FBc0JUQyx3QkFBUSxHQXRCQztBQXVCVEMsMkJBQVc7QUF2QkYsYUFBYjtBQXlCSDs7OztFQTNGK0IsZUFBS0MsSTs7a0JBQXBCbEMsTSIsImZpbGUiOiJjZW50ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHd4Q2hhcnRzIGZyb20gJy4uL2xpYi93eGNoYXJ0cy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENlbnRlciBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6K++56iL5oC76KeIJ1xuICAgIH07XG5cbiAgICBkYXRhID0ge1xuICAgICAgICB1c2VyTmFtZTogbnVsbCxcbiAgICAgICAgdXNlckNsYXNzOiBudWxsXG4gICAgfTtcbiAgICBvbkxvYWQob3B0aW9ucykge1xuICAgICAgICAvLyDojrflj5blrabnlJ9pZFxuICAgICAgICBjb25zdCBzdHVkZW50SWQgPSB3eC5nZXRTdG9yYWdlU3luYygnc3R1ZGVudElkJyk7XG5cbiAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgICAgdGl0bGU6ICfmraPlnKjliqDovb3kuK0uLi4nLFxuICAgICAgICAgICAgbWFzazogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgdGhpcy51c2VyTmFtZSA9ICdZdWknO1xuICAgICAgICAgICAgdGhpcy51c2VyQ2xhc3MgPSBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+mihuiiluWPo+aJjeiuoeWIkicsXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsOiAxNixcbiAgICAgICAgICAgICAgICAgICAgdXNlZDogOSxcbiAgICAgICAgICAgICAgICAgICAgYXZhbGlhYmxlOiA3LFxuICAgICAgICAgICAgICAgICAgICB1c2VkQ29sb3I6ICcjZmZhMzllJyxcbiAgICAgICAgICAgICAgICAgICAgYXZhQ29sb3I6ICcjYjdlYjhmJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+S4u+aMgeWkp+i1mycsXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsOiAxNixcbiAgICAgICAgICAgICAgICAgICAgdXNlZDogNCxcbiAgICAgICAgICAgICAgICAgICAgYXZhbGlhYmxlOiAxMixcbiAgICAgICAgICAgICAgICAgICAgdXNlZENvbG9yOiAnI2ZmZmI4ZicsXG4gICAgICAgICAgICAgICAgICAgIGF2YUNvbG9yOiAnI2I3ZWI4ZidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICflvaLkvZPnj60nLFxuICAgICAgICAgICAgICAgICAgICB0b3RhbDogMTYsXG4gICAgICAgICAgICAgICAgICAgIHVzZWQ6IDYsXG4gICAgICAgICAgICAgICAgICAgIGF2YWxpYWJsZTogMTAsXG4gICAgICAgICAgICAgICAgICAgIHVzZWRDb2xvcjogJyNhZGM2ZmYnLFxuICAgICAgICAgICAgICAgICAgICBhdmFDb2xvcjogJyNiN2ViOGYnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn6Iie5Y+w5YmnJyxcbiAgICAgICAgICAgICAgICAgICAgdG90YWw6IDE2LFxuICAgICAgICAgICAgICAgICAgICB1c2VkOiAxMixcbiAgICAgICAgICAgICAgICAgICAgYXZhbGlhYmxlOiA0LFxuICAgICAgICAgICAgICAgICAgICB1c2VkQ29sb3I6ICcjZDNhZGY3JyxcbiAgICAgICAgICAgICAgICAgICAgYXZhQ29sb3I6ICcjYjdlYjhmJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICAvLyDlvILmraXosIPnlKjlv4Xpobvkvb/nlKhhcHBseei/m+ihjOaVsOaNruWIt+aWsFxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcblxuICAgICAgICAgICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogYCR7dGhpcy51c2VyTmFtZX3lkIzlrabor77nqIvmgLvop4hgXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5kcmF3Q2hhcnQoKTtcbiAgICAgICAgfSwgMjAwMCk7XG4gICAgfVxuICAgIC8vIOe7mOWItumlvOWbvlxuICAgIGRyYXdDaGFydCgpIHtcbiAgICAgICAgbmV3IHd4Q2hhcnRzKHtcbiAgICAgICAgICAgIGNhbnZhc0lkOiAncGllJyxcbiAgICAgICAgICAgIHR5cGU6ICdwaWUnLFxuICAgICAgICAgICAgc2VyaWVzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAn5bey55So6K++5pe2JyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogNTAsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAncmdiKDI1NSwxNjMsMTU4KScsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYOW3sueUqCR7dGhpcy5kYXRhfeivvuaXtmA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ+W+heeUqOivvuaXticsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IDE0LFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3JnYigxNDksMjIyLDEwMCknLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGDlvoXnlKgke3RoaXMuZGF0YX3or77ml7ZgO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHdpZHRoOiAzNTAsXG4gICAgICAgICAgICBoZWlnaHQ6IDI1MCxcbiAgICAgICAgICAgIGRhdGFMYWJlbDogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7fTtcblxuICAgIG1ldGhvZHMgPSB7fTtcbn1cbiJdfQ==