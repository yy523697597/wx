'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Feedback = function (_wepy$page) {
    _inherits(Feedback, _wepy$page);

    function Feedback() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Feedback);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Feedback.__proto__ || Object.getPrototypeOf(Feedback)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '家长反馈'
        }, _this.data = {
            userName: null,
            classDetail: null
        }, _this.computed = {}, _this.methods = {
            commit: function commit() {
                wx.showModal({
                    title: '提示',
                    content: '是否要提交您的反馈',
                    success: function success(res) {
                        if (res.confirm) {
                            console.log('已经提交数据');
                            wx.showToast({
                                title: '成功',
                                icon: 'success',
                                duration: 2000
                            });
                        } else if (res.cancel) {}
                    }
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Feedback, [{
        key: 'onLoad',
        value: function onLoad() {}
    }]);

    return Feedback;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Feedback , 'pages/feedback'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlZWRiYWNrLmpzIl0sIm5hbWVzIjpbIkZlZWRiYWNrIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1c2VyTmFtZSIsImNsYXNzRGV0YWlsIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiY29tbWl0Iiwid3giLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImNvbnNvbGUiLCJsb2ciLCJzaG93VG9hc3QiLCJpY29uIiwiZHVyYXRpb24iLCJjYW5jZWwiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7Ozs7Ozs4TEFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUlUQyxJLEdBQU87QUFDSEMsc0JBQVUsSUFEUDtBQUVIQyx5QkFBYTtBQUZWLFMsUUFNUEMsUSxHQUFXLEUsUUFFWEMsTyxHQUFVO0FBQ05DLGtCQURNLG9CQUNHO0FBQ0xDLG1CQUFHQyxTQUFILENBQWE7QUFDVEMsMkJBQU8sSUFERTtBQUVUQyw2QkFBUyxXQUZBO0FBR1RDLDJCQUhTLG1CQUdEQyxHQUhDLEVBR0k7QUFDVCw0QkFBSUEsSUFBSUMsT0FBUixFQUFpQjtBQUNiQyxvQ0FBUUMsR0FBUixDQUFZLFFBQVo7QUFDQVIsK0JBQUdTLFNBQUgsQ0FBYTtBQUNUUCx1Q0FBTyxJQURFO0FBRVRRLHNDQUFNLFNBRkc7QUFHVEMsMENBQVU7QUFIRCw2QkFBYjtBQUtILHlCQVBELE1BT08sSUFBSU4sSUFBSU8sTUFBUixFQUFnQixDQUN0QjtBQUNKO0FBYlEsaUJBQWI7QUFlSDtBQWpCSyxTOzs7OztpQ0FKRCxDQUFFOzs7O0VBVHVCLGVBQUtDLEk7O2tCQUF0QnRCLFEiLCJmaWxlIjoiZmVlZGJhY2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGZWVkYmFjayBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5a626ZW/5Y+N6aaIJ1xuICAgIH07XG5cbiAgICBkYXRhID0ge1xuICAgICAgICB1c2VyTmFtZTogbnVsbCxcbiAgICAgICAgY2xhc3NEZXRhaWw6IG51bGxcbiAgICB9O1xuICAgIG9uTG9hZCgpIHt9XG5cbiAgICBjb21wdXRlZCA9IHt9O1xuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgY29tbWl0KCkge1xuICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogJ+aYr+WQpuimgeaPkOS6pOaCqOeahOWPjemmiCcsXG4gICAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5bey57uP5o+Q5Lqk5pWw5o2uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5oiQ5YqfJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn1cbiJdfQ==