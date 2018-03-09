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

var SelectStudent = function (_wepy$page) {
    _inherits(SelectStudent, _wepy$page);

    function SelectStudent() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SelectStudent);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SelectStudent.__proto__ || Object.getPrototypeOf(SelectStudent)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '选择学生'
        }, _this.data = {
            students: []
        }, _this.methods = {
            selectStudent: function selectStudent(index) {
                var studentId = this.students[index].studentId;
                wx.switchTab({
                    url: './center?studentId=' + studentId
                });
                console.log(studentId);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SelectStudent, [{
        key: 'onLoad',
        value: function onLoad() {
            this.students = wx.getStorageSync('studentList');
            this.$apply();
        }
    }]);

    return SelectStudent;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(SelectStudent , 'pages/selectStudent'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbGVjdFN0dWRlbnQuanMiXSwibmFtZXMiOlsiU2VsZWN0U3R1ZGVudCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwic3R1ZGVudHMiLCJtZXRob2RzIiwic2VsZWN0U3R1ZGVudCIsImluZGV4Iiwic3R1ZGVudElkIiwid3giLCJzd2l0Y2hUYWIiLCJ1cmwiLCJjb25zb2xlIiwibG9nIiwiZ2V0U3RvcmFnZVN5bmMiLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxhOzs7Ozs7Ozs7Ozs7Ozt3TUFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdUQyxJLEdBQU87QUFDSEMsc0JBQVU7QUFEUCxTLFFBT1BDLE8sR0FBVTtBQUNOQyx5QkFETSx5QkFDUUMsS0FEUixFQUNlO0FBQ2pCLG9CQUFNQyxZQUFZLEtBQUtKLFFBQUwsQ0FBY0csS0FBZCxFQUFxQkMsU0FBdkM7QUFDQUMsbUJBQUdDLFNBQUgsQ0FBYTtBQUNUQyxpREFBMkJIO0FBRGxCLGlCQUFiO0FBR0FJLHdCQUFRQyxHQUFSLENBQVlMLFNBQVo7QUFDSDtBQVBLLFM7Ozs7O2lDQUpEO0FBQ0wsaUJBQUtKLFFBQUwsR0FBZ0JLLEdBQUdLLGNBQUgsQ0FBa0IsYUFBbEIsQ0FBaEI7QUFDQSxpQkFBS0MsTUFBTDtBQUNIOzs7O0VBVnNDLGVBQUtDLEk7O2tCQUEzQmhCLGEiLCJmaWxlIjoic2VsZWN0U3R1ZGVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlbGVjdFN0dWRlbnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+mAieaLqeWtpueUnydcbiAgICB9O1xuICAgIGRhdGEgPSB7XG4gICAgICAgIHN0dWRlbnRzOiBbXVxuICAgIH07XG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLnN0dWRlbnRzID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3N0dWRlbnRMaXN0Jyk7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIHNlbGVjdFN0dWRlbnQoaW5kZXgpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0dWRlbnRJZCA9IHRoaXMuc3R1ZGVudHNbaW5kZXhdLnN0dWRlbnRJZDtcbiAgICAgICAgICAgIHd4LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAgICAgdXJsOiBgLi9jZW50ZXI/c3R1ZGVudElkPSR7c3R1ZGVudElkfWBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coc3R1ZGVudElkKTtcbiAgICAgICAgfVxuICAgIH07XG59XG4iXX0=