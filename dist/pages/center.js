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
    value: function onLoad() {
      var _this2 = this;

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlbnRlci5qcyJdLCJuYW1lcyI6WyJDZW50ZXIiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInVzZXJOYW1lIiwidXNlckNsYXNzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwid3giLCJzaG93TG9hZGluZyIsInRpdGxlIiwibWFzayIsInNldFRpbWVvdXQiLCJoaWRlTG9hZGluZyIsInRvdGFsIiwidXNlZCIsImF2YWxpYWJsZSIsInVzZWRDb2xvciIsImF2YUNvbG9yIiwiJGFwcGx5Iiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwiZHJhd0NoYXJ0IiwiY2FudmFzSWQiLCJ0eXBlIiwic2VyaWVzIiwibmFtZSIsImNvbG9yIiwiZm9ybWF0Iiwid2lkdGgiLCJoZWlnaHQiLCJkYXRhTGFiZWwiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7O3NMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVRDLEksR0FBTztBQUNMQyxnQkFBVSxJQURMO0FBRUxDLGlCQUFXO0FBRk4sSyxRQW9GUEMsUSxHQUFXLEUsUUFFWEMsTyxHQUFVLEU7Ozs7OzZCQWxGRDtBQUFBOztBQUNQQyxTQUFHQyxXQUFILENBQWU7QUFDYkMsZUFBTyxVQURNO0FBRWJDLGNBQU07QUFGTyxPQUFmO0FBSUFDLGlCQUFXLFlBQU07QUFDZkosV0FBR0ssV0FBSDtBQUNBLGVBQUtULFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxlQUFLQyxTQUFMLEdBQWlCLENBQ2Y7QUFDRUssaUJBQU8sUUFEVDtBQUVFSSxpQkFBTyxFQUZUO0FBR0VDLGdCQUFNLENBSFI7QUFJRUMscUJBQVcsQ0FKYjtBQUtFQyxxQkFBVyxTQUxiO0FBTUVDLG9CQUFVO0FBTlosU0FEZSxFQVNmO0FBQ0VSLGlCQUFPLE1BRFQ7QUFFRUksaUJBQU8sRUFGVDtBQUdFQyxnQkFBTSxDQUhSO0FBSUVDLHFCQUFXLEVBSmI7QUFLRUMscUJBQVcsU0FMYjtBQU1FQyxvQkFBVTtBQU5aLFNBVGUsRUFpQmY7QUFDRVIsaUJBQU8sS0FEVDtBQUVFSSxpQkFBTyxFQUZUO0FBR0VDLGdCQUFNLENBSFI7QUFJRUMscUJBQVcsRUFKYjtBQUtFQyxxQkFBVyxTQUxiO0FBTUVDLG9CQUFVO0FBTlosU0FqQmUsRUF5QmY7QUFDRVIsaUJBQU8sS0FEVDtBQUVFSSxpQkFBTyxFQUZUO0FBR0VDLGdCQUFNLEVBSFI7QUFJRUMscUJBQVcsQ0FKYjtBQUtFQyxxQkFBVyxTQUxiO0FBTUVDLG9CQUFVO0FBTlosU0F6QmUsQ0FBakI7QUFrQ0E7QUFDQSxlQUFLQyxNQUFMOztBQUVBWCxXQUFHWSxxQkFBSCxDQUF5QjtBQUN2QlYsaUJBQVUsT0FBS04sUUFBZjtBQUR1QixTQUF6Qjs7QUFJQSxlQUFLaUIsU0FBTDtBQUNELE9BN0NELEVBNkNHLElBN0NIO0FBOENEO0FBQ0Q7Ozs7Z0NBQ1k7QUFDViw2QkFBYTtBQUNYQyxrQkFBVSxLQURDO0FBRVhDLGNBQU0sS0FGSztBQUdYQyxnQkFBUSxDQUNOO0FBQ0VDLGdCQUFNLE1BRFI7QUFFRXRCLGdCQUFNLEVBRlI7QUFHRXVCLGlCQUFPLGtCQUhUO0FBSUVDLGtCQUFRLGtCQUFXO0FBQ2pCLG9DQUFZLEtBQUt4QixJQUFqQjtBQUNEO0FBTkgsU0FETSxFQVNOO0FBQ0VzQixnQkFBTSxNQURSO0FBRUV0QixnQkFBTSxFQUZSO0FBR0V1QixpQkFBTyxrQkFIVDtBQUlFQyxrQkFBUSxrQkFBVztBQUNqQixvQ0FBWSxLQUFLeEIsSUFBakI7QUFDRDtBQU5ILFNBVE0sQ0FIRztBQXFCWHlCLGVBQU8sR0FyQkk7QUFzQlhDLGdCQUFRLEdBdEJHO0FBdUJYQyxtQkFBVztBQXZCQSxPQUFiO0FBeUJEOzs7O0VBeEZpQyxlQUFLQyxJOztrQkFBcEIvQixNIiwiZmlsZSI6ImNlbnRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgd3hDaGFydHMgZnJvbSAnLi4vbGliL3d4Y2hhcnRzLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2VudGVyIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfor77nqIvmgLvop4gnXG4gIH07XG5cbiAgZGF0YSA9IHtcbiAgICB1c2VyTmFtZTogbnVsbCxcbiAgICB1c2VyQ2xhc3M6IG51bGxcbiAgfTtcbiAgb25Mb2FkKCkge1xuICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgIHRpdGxlOiAn5q2j5Zyo5Yqg6L295LitLi4uJyxcbiAgICAgIG1hc2s6IHRydWVcbiAgICB9KTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICB0aGlzLnVzZXJOYW1lID0gJ1l1aSc7XG4gICAgICB0aGlzLnVzZXJDbGFzcyA9IFtcbiAgICAgICAge1xuICAgICAgICAgIHRpdGxlOiAn6aKG6KKW5Y+j5omN6K6h5YiSJyxcbiAgICAgICAgICB0b3RhbDogMTYsXG4gICAgICAgICAgdXNlZDogOSxcbiAgICAgICAgICBhdmFsaWFibGU6IDcsXG4gICAgICAgICAgdXNlZENvbG9yOiAnI2ZmYTM5ZScsXG4gICAgICAgICAgYXZhQ29sb3I6ICcjYjdlYjhmJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGl0bGU6ICfkuLvmjIHlpKfotZsnLFxuICAgICAgICAgIHRvdGFsOiAxNixcbiAgICAgICAgICB1c2VkOiA0LFxuICAgICAgICAgIGF2YWxpYWJsZTogMTIsXG4gICAgICAgICAgdXNlZENvbG9yOiAnI2ZmZmI4ZicsXG4gICAgICAgICAgYXZhQ29sb3I6ICcjYjdlYjhmJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGl0bGU6ICflvaLkvZPnj60nLFxuICAgICAgICAgIHRvdGFsOiAxNixcbiAgICAgICAgICB1c2VkOiA2LFxuICAgICAgICAgIGF2YWxpYWJsZTogMTAsXG4gICAgICAgICAgdXNlZENvbG9yOiAnI2FkYzZmZicsXG4gICAgICAgICAgYXZhQ29sb3I6ICcjYjdlYjhmJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGl0bGU6ICfoiJ7lj7DliacnLFxuICAgICAgICAgIHRvdGFsOiAxNixcbiAgICAgICAgICB1c2VkOiAxMixcbiAgICAgICAgICBhdmFsaWFibGU6IDQsXG4gICAgICAgICAgdXNlZENvbG9yOiAnI2QzYWRmNycsXG4gICAgICAgICAgYXZhQ29sb3I6ICcjYjdlYjhmJ1xuICAgICAgICB9XG4gICAgICBdO1xuICAgICAgLy8g5byC5q2l6LCD55So5b+F6aG75L2/55SoYXBwbHnov5vooYzmlbDmja7liLfmlrBcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG5cbiAgICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XG4gICAgICAgIHRpdGxlOiBgJHt0aGlzLnVzZXJOYW1lfeWQjOWtpuivvueoi+aAu+iniGBcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmRyYXdDaGFydCgpO1xuICAgIH0sIDIwMDApO1xuICB9XG4gIC8vIOe7mOWItumlvOWbvlxuICBkcmF3Q2hhcnQoKSB7XG4gICAgbmV3IHd4Q2hhcnRzKHtcbiAgICAgIGNhbnZhc0lkOiAncGllJyxcbiAgICAgIHR5cGU6ICdwaWUnLFxuICAgICAgc2VyaWVzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAn5bey55So6K++5pe2JyxcbiAgICAgICAgICBkYXRhOiA1MCxcbiAgICAgICAgICBjb2xvcjogJ3JnYigyNTUsMTYzLDE1OCknLFxuICAgICAgICAgIGZvcm1hdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gYOW3sueUqCR7dGhpcy5kYXRhfeivvuaXtmA7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ+W+heeUqOivvuaXticsXG4gICAgICAgICAgZGF0YTogMTQsXG4gICAgICAgICAgY29sb3I6ICdyZ2IoMTQ5LDIyMiwxMDApJyxcbiAgICAgICAgICBmb3JtYXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGDlvoXnlKgke3RoaXMuZGF0YX3or77ml7ZgO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIHdpZHRoOiAzNTAsXG4gICAgICBoZWlnaHQ6IDI1MCxcbiAgICAgIGRhdGFMYWJlbDogdHJ1ZVxuICAgIH0pO1xuICB9XG4gIGNvbXB1dGVkID0ge307XG5cbiAgbWV0aG9kcyA9IHt9O1xufVxuIl19