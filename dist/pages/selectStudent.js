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
                wx.setStorageSync('student', this.students[index]);
                wx.switchTab({
                    url: './center'
                });
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbGVjdFN0dWRlbnQuanMiXSwibmFtZXMiOlsiU2VsZWN0U3R1ZGVudCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwic3R1ZGVudHMiLCJtZXRob2RzIiwic2VsZWN0U3R1ZGVudCIsImluZGV4Iiwid3giLCJzZXRTdG9yYWdlU3luYyIsInN3aXRjaFRhYiIsInVybCIsImdldFN0b3JhZ2VTeW5jIiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsYTs7Ozs7Ozs7Ozs7Ozs7d01BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVEMsSSxHQUFPO0FBQ0hDLHNCQUFVO0FBRFAsUyxRQU9QQyxPLEdBQVU7QUFDTkMseUJBRE0seUJBQ1FDLEtBRFIsRUFDZTtBQUNqQkMsbUJBQUdDLGNBQUgsQ0FBa0IsU0FBbEIsRUFBNkIsS0FBS0wsUUFBTCxDQUFjRyxLQUFkLENBQTdCO0FBQ0FDLG1CQUFHRSxTQUFILENBQWE7QUFDVEMseUJBQUs7QUFESSxpQkFBYjtBQUdIO0FBTkssUzs7Ozs7aUNBSkQ7QUFDTCxpQkFBS1AsUUFBTCxHQUFnQkksR0FBR0ksY0FBSCxDQUFrQixhQUFsQixDQUFoQjtBQUNBLGlCQUFLQyxNQUFMO0FBQ0g7Ozs7RUFWc0MsZUFBS0MsSTs7a0JBQTNCZCxhIiwiZmlsZSI6InNlbGVjdFN0dWRlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWxlY3RTdHVkZW50IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfpgInmi6nlrabnlJ8nXG4gICAgfTtcbiAgICBkYXRhID0ge1xuICAgICAgICBzdHVkZW50czogW11cbiAgICB9O1xuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5zdHVkZW50cyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdzdHVkZW50TGlzdCcpO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgICBzZWxlY3RTdHVkZW50KGluZGV4KSB7XG4gICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnc3R1ZGVudCcsIHRoaXMuc3R1ZGVudHNbaW5kZXhdKTtcbiAgICAgICAgICAgIHd4LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAgICAgdXJsOiAnLi9jZW50ZXInXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59XG4iXX0=