'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


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
            students: [{
                studentId: 123245,
                studentName: '小帅'
            }, {
                studentId: 123246,
                studentName: '王小虎'
            }]
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

    return SelectStudent;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(SelectStudent , 'pages/selectStudent'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbGVjdFN0dWRlbnQuanMiXSwibmFtZXMiOlsiU2VsZWN0U3R1ZGVudCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwic3R1ZGVudHMiLCJzdHVkZW50SWQiLCJzdHVkZW50TmFtZSIsIm1ldGhvZHMiLCJzZWxlY3RTdHVkZW50IiwiaW5kZXgiLCJ3eCIsInN3aXRjaFRhYiIsInVybCIsImNvbnNvbGUiLCJsb2ciLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsYTs7Ozs7Ozs7Ozs7Ozs7d01BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVEMsSSxHQUFPO0FBQ0hDLHNCQUFVLENBQ047QUFDSUMsMkJBQVcsTUFEZjtBQUVJQyw2QkFBYTtBQUZqQixhQURNLEVBS047QUFDSUQsMkJBQVcsTUFEZjtBQUVJQyw2QkFBYTtBQUZqQixhQUxNO0FBRFAsUyxRQVlQQyxPLEdBQVU7QUFDTkMseUJBRE0seUJBQ1FDLEtBRFIsRUFDZTtBQUNqQixvQkFBTUosWUFBWSxLQUFLRCxRQUFMLENBQWNLLEtBQWQsRUFBcUJKLFNBQXZDO0FBQ0FLLG1CQUFHQyxTQUFILENBQWE7QUFDVEMsaURBQTJCUDtBQURsQixpQkFBYjtBQUdBUSx3QkFBUUMsR0FBUixDQUFZVCxTQUFaO0FBQ0g7QUFQSyxTOzs7O0VBaEI2QixlQUFLVSxJOztrQkFBM0JmLGEiLCJmaWxlIjoic2VsZWN0U3R1ZGVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlbGVjdFN0dWRlbnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+mAieaLqeWtpueUnydcbiAgICB9O1xuICAgIGRhdGEgPSB7XG4gICAgICAgIHN0dWRlbnRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3R1ZGVudElkOiAxMjMyNDUsXG4gICAgICAgICAgICAgICAgc3R1ZGVudE5hbWU6ICflsI/luIUnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0dWRlbnRJZDogMTIzMjQ2LFxuICAgICAgICAgICAgICAgIHN0dWRlbnROYW1lOiAn546L5bCP6JmOJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgICBzZWxlY3RTdHVkZW50KGluZGV4KSB7XG4gICAgICAgICAgICBjb25zdCBzdHVkZW50SWQgPSB0aGlzLnN0dWRlbnRzW2luZGV4XS5zdHVkZW50SWQ7XG4gICAgICAgICAgICB3eC5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICAgIHVybDogYC4vY2VudGVyP3N0dWRlbnRJZD0ke3N0dWRlbnRJZH1gXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHN0dWRlbnRJZCk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuIl19