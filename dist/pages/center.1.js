'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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
      classDetail: null
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
        _this2.classDetail = [{
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

exports.default = Center;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlbnRlci4xLmpzIl0sIm5hbWVzIjpbIkNlbnRlciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidXNlck5hbWUiLCJjbGFzc0RldGFpbCIsImNvbXB1dGVkIiwibWV0aG9kcyIsInd4Iiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsIm1hc2siLCJzZXRUaW1lb3V0IiwiaGlkZUxvYWRpbmciLCJ0b3RhbCIsInVzZWQiLCJhdmFsaWFibGUiLCJ1c2VkQ29sb3IiLCJhdmFDb2xvciIsIiRhcHBseSIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsImRyYXdDaGFydCIsImNhbnZhc0lkIiwidHlwZSIsInNlcmllcyIsIm5hbWUiLCJjb2xvciIsImZvcm1hdCIsIndpZHRoIiwiaGVpZ2h0IiwiZGF0YUxhYmVsIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxNOzs7Ozs7Ozs7Ozs7OztzTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUlUQyxJLEdBQU87QUFDTEMsZ0JBQVUsSUFETDtBQUVMQyxtQkFBYTtBQUZSLEssUUFvRlBDLFEsR0FBVyxFLFFBRVhDLE8sR0FBVSxFOzs7Ozs2QkFsRkQ7QUFBQTs7QUFDUEMsU0FBR0MsV0FBSCxDQUFlO0FBQ2JDLGVBQU8sVUFETTtBQUViQyxjQUFNO0FBRk8sT0FBZjtBQUlBQyxpQkFBVyxZQUFNO0FBQ2ZKLFdBQUdLLFdBQUg7QUFDQSxlQUFLVCxRQUFMLEdBQWdCLEtBQWhCO0FBQ0EsZUFBS0MsV0FBTCxHQUFtQixDQUNqQjtBQUNFSyxpQkFBTyxRQURUO0FBRUVJLGlCQUFPLEVBRlQ7QUFHRUMsZ0JBQU0sQ0FIUjtBQUlFQyxxQkFBVyxDQUpiO0FBS0VDLHFCQUFXLFNBTGI7QUFNRUMsb0JBQVU7QUFOWixTQURpQixFQVNqQjtBQUNFUixpQkFBTyxNQURUO0FBRUVJLGlCQUFPLEVBRlQ7QUFHRUMsZ0JBQU0sQ0FIUjtBQUlFQyxxQkFBVyxFQUpiO0FBS0VDLHFCQUFXLFNBTGI7QUFNRUMsb0JBQVU7QUFOWixTQVRpQixFQWlCakI7QUFDRVIsaUJBQU8sS0FEVDtBQUVFSSxpQkFBTyxFQUZUO0FBR0VDLGdCQUFNLENBSFI7QUFJRUMscUJBQVcsRUFKYjtBQUtFQyxxQkFBVyxTQUxiO0FBTUVDLG9CQUFVO0FBTlosU0FqQmlCLEVBeUJqQjtBQUNFUixpQkFBTyxLQURUO0FBRUVJLGlCQUFPLEVBRlQ7QUFHRUMsZ0JBQU0sRUFIUjtBQUlFQyxxQkFBVyxDQUpiO0FBS0VDLHFCQUFXLFNBTGI7QUFNRUMsb0JBQVU7QUFOWixTQXpCaUIsQ0FBbkI7QUFrQ0E7QUFDQSxlQUFLQyxNQUFMOztBQUVBWCxXQUFHWSxxQkFBSCxDQUF5QjtBQUN2QlYsaUJBQVUsT0FBS04sUUFBZjtBQUR1QixTQUF6Qjs7QUFJQSxlQUFLaUIsU0FBTDtBQUNELE9BN0NELEVBNkNHLElBN0NIO0FBOENEO0FBQ0Q7Ozs7Z0NBQ1k7QUFDViw2QkFBYTtBQUNYQyxrQkFBVSxLQURDO0FBRVhDLGNBQU0sS0FGSztBQUdYQyxnQkFBUSxDQUNOO0FBQ0VDLGdCQUFNLE1BRFI7QUFFRXRCLGdCQUFNLEVBRlI7QUFHRXVCLGlCQUFPLGtCQUhUO0FBSUVDLGtCQUFRLGtCQUFXO0FBQ2pCLG9DQUFZLEtBQUt4QixJQUFqQjtBQUNEO0FBTkgsU0FETSxFQVNOO0FBQ0VzQixnQkFBTSxNQURSO0FBRUV0QixnQkFBTSxFQUZSO0FBR0V1QixpQkFBTyxrQkFIVDtBQUlFQyxrQkFBUSxrQkFBVztBQUNqQixvQ0FBWSxLQUFLeEIsSUFBakI7QUFDRDtBQU5ILFNBVE0sQ0FIRztBQXFCWHlCLGVBQU8sR0FyQkk7QUFzQlhDLGdCQUFRLEdBdEJHO0FBdUJYQyxtQkFBVztBQXZCQSxPQUFiO0FBeUJEOzs7O0VBeEZpQyxlQUFLQyxJOztrQkFBcEIvQixNIiwiZmlsZSI6ImNlbnRlci4xLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB3eENoYXJ0cyBmcm9tICcuLi9saWIvd3hjaGFydHMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDZW50ZXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ivvueoi+aAu+iniCdcbiAgfTtcblxuICBkYXRhID0ge1xuICAgIHVzZXJOYW1lOiBudWxsLFxuICAgIGNsYXNzRGV0YWlsOiBudWxsXG4gIH07XG4gIG9uTG9hZCgpIHtcbiAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICB0aXRsZTogJ+ato+WcqOWKoOi9veS4rS4uLicsXG4gICAgICBtYXNrOiB0cnVlXG4gICAgfSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgdGhpcy51c2VyTmFtZSA9ICdZdWknO1xuICAgICAgdGhpcy5jbGFzc0RldGFpbCA9IFtcbiAgICAgICAge1xuICAgICAgICAgIHRpdGxlOiAn6aKG6KKW5Y+j5omN6K6h5YiSJyxcbiAgICAgICAgICB0b3RhbDogMTYsXG4gICAgICAgICAgdXNlZDogOSxcbiAgICAgICAgICBhdmFsaWFibGU6IDcsXG4gICAgICAgICAgdXNlZENvbG9yOiAnI2ZmYTM5ZScsXG4gICAgICAgICAgYXZhQ29sb3I6ICcjYjdlYjhmJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGl0bGU6ICfkuLvmjIHlpKfotZsnLFxuICAgICAgICAgIHRvdGFsOiAxNixcbiAgICAgICAgICB1c2VkOiA0LFxuICAgICAgICAgIGF2YWxpYWJsZTogMTIsXG4gICAgICAgICAgdXNlZENvbG9yOiAnI2ZmZmI4ZicsXG4gICAgICAgICAgYXZhQ29sb3I6ICcjYjdlYjhmJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGl0bGU6ICflvaLkvZPnj60nLFxuICAgICAgICAgIHRvdGFsOiAxNixcbiAgICAgICAgICB1c2VkOiA2LFxuICAgICAgICAgIGF2YWxpYWJsZTogMTAsXG4gICAgICAgICAgdXNlZENvbG9yOiAnI2FkYzZmZicsXG4gICAgICAgICAgYXZhQ29sb3I6ICcjYjdlYjhmJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGl0bGU6ICfoiJ7lj7DliacnLFxuICAgICAgICAgIHRvdGFsOiAxNixcbiAgICAgICAgICB1c2VkOiAxMixcbiAgICAgICAgICBhdmFsaWFibGU6IDQsXG4gICAgICAgICAgdXNlZENvbG9yOiAnI2QzYWRmNycsXG4gICAgICAgICAgYXZhQ29sb3I6ICcjYjdlYjhmJ1xuICAgICAgICB9XG4gICAgICBdO1xuICAgICAgLy8g5byC5q2l6LCD55So5b+F6aG75L2/55SoYXBwbHnov5vooYzmlbDmja7liLfmlrBcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG5cbiAgICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XG4gICAgICAgIHRpdGxlOiBgJHt0aGlzLnVzZXJOYW1lfeWQjOWtpuivvueoi+aAu+iniGBcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmRyYXdDaGFydCgpO1xuICAgIH0sIDIwMDApO1xuICB9XG4gIC8vIOe7mOWItumlvOWbvlxuICBkcmF3Q2hhcnQoKSB7XG4gICAgbmV3IHd4Q2hhcnRzKHtcbiAgICAgIGNhbnZhc0lkOiAncGllJyxcbiAgICAgIHR5cGU6ICdwaWUnLFxuICAgICAgc2VyaWVzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAn5bey55So6K++5pe2JyxcbiAgICAgICAgICBkYXRhOiA1MCxcbiAgICAgICAgICBjb2xvcjogJ3JnYigyNTUsMTYzLDE1OCknLFxuICAgICAgICAgIGZvcm1hdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gYOW3sueUqCR7dGhpcy5kYXRhfeivvuaXtmA7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ+W+heeUqOivvuaXticsXG4gICAgICAgICAgZGF0YTogMTQsXG4gICAgICAgICAgY29sb3I6ICdyZ2IoMTQ5LDIyMiwxMDApJyxcbiAgICAgICAgICBmb3JtYXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGDlvoXnlKgke3RoaXMuZGF0YX3or77ml7ZgO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIHdpZHRoOiAzNTAsXG4gICAgICBoZWlnaHQ6IDI1MCxcbiAgICAgIGRhdGFMYWJlbDogdHJ1ZVxuICAgIH0pO1xuICB9XG4gIGNvbXB1dGVkID0ge307XG5cbiAgbWV0aG9kcyA9IHt9O1xufVxuIl19