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
            classDetail: null,
            info: '',
            noteMaxLen: 7000
        }, _this.computed = {}, _this.methods = {
            bindTextAreaChange: function bindTextAreaChange(e) {
                this.info = e.detail.value;
            },
            bindFormSubmit: function bindFormSubmit(e) {
                var that = this;
                if (!this.info) {
                    wx.showModal({
                        title: '提示',
                        content: '反馈不能为空哟',
                        success: function success(res) {
                            if (res.confirm) {} else if (res.cancel) {}
                        }
                    });
                } else {
                    wx.showModal({
                        title: '提示',
                        content: '是否要提交您的反馈',
                        success: function success(res) {
                            if (res.confirm) {
                                that.info = '';
                                that.$apply();
                                wx.showToast({
                                    title: '成功',
                                    icon: 'success',
                                    duration: 2000
                                });
                            } else if (res.cancel) {}
                        }
                    });
                }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlZWRiYWNrLmpzIl0sIm5hbWVzIjpbIkZlZWRiYWNrIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1c2VyTmFtZSIsImNsYXNzRGV0YWlsIiwiaW5mbyIsIm5vdGVNYXhMZW4iLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJiaW5kVGV4dEFyZWFDaGFuZ2UiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJiaW5kRm9ybVN1Ym1pdCIsInRoYXQiLCJ3eCIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwiY2FuY2VsIiwiJGFwcGx5Iiwic2hvd1RvYXN0IiwiaWNvbiIsImR1cmF0aW9uIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7Ozs7OExBQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFJVEMsSSxHQUFPO0FBQ0hDLHNCQUFVLElBRFA7QUFFSEMseUJBQWEsSUFGVjtBQUdIQyxrQkFBTSxFQUhIO0FBSUhDLHdCQUFZO0FBSlQsUyxRQVFQQyxRLEdBQVcsRSxRQUVYQyxPLEdBQVU7QUFDTkMsOEJBRE0sOEJBQ2FDLENBRGIsRUFDZ0I7QUFDbEIscUJBQUtMLElBQUwsR0FBWUssRUFBRUMsTUFBRixDQUFTQyxLQUFyQjtBQUNILGFBSEs7QUFJTkMsMEJBSk0sMEJBSVNILENBSlQsRUFJWTtBQUNkLG9CQUFNSSxPQUFPLElBQWI7QUFDQSxvQkFBSSxDQUFDLEtBQUtULElBQVYsRUFBZ0I7QUFDWlUsdUJBQUdDLFNBQUgsQ0FBYTtBQUNUQywrQkFBTyxJQURFO0FBRVRDLGlDQUFTLFNBRkE7QUFHVEMsK0JBSFMsbUJBR0RDLEdBSEMsRUFHSTtBQUNULGdDQUFJQSxJQUFJQyxPQUFSLEVBQWlCLENBQ2hCLENBREQsTUFDTyxJQUFJRCxJQUFJRSxNQUFSLEVBQWdCLENBQ3RCO0FBQ0o7QUFQUSxxQkFBYjtBQVNILGlCQVZELE1BVU87QUFDSFAsdUJBQUdDLFNBQUgsQ0FBYTtBQUNUQywrQkFBTyxJQURFO0FBRVRDLGlDQUFTLFdBRkE7QUFHVEMsK0JBSFMsbUJBR0RDLEdBSEMsRUFHSTtBQUNULGdDQUFJQSxJQUFJQyxPQUFSLEVBQWlCO0FBQ2JQLHFDQUFLVCxJQUFMLEdBQVksRUFBWjtBQUNBUyxxQ0FBS1MsTUFBTDtBQUNBUixtQ0FBR1MsU0FBSCxDQUFhO0FBQ1RQLDJDQUFPLElBREU7QUFFVFEsMENBQU0sU0FGRztBQUdUQyw4Q0FBVTtBQUhELGlDQUFiO0FBS0gsNkJBUkQsTUFRTyxJQUFJTixJQUFJRSxNQUFSLEVBQWdCLENBQ3RCO0FBQ0o7QUFkUSxxQkFBYjtBQWdCSDtBQUNKO0FBbENLLFM7Ozs7O2lDQUpELENBQUU7Ozs7RUFYdUIsZUFBS0ssSTs7a0JBQXRCNUIsUSIsImZpbGUiOiJmZWVkYmFjay5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZlZWRiYWNrIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflrrbplb/lj43ppognXG4gICAgfTtcblxuICAgIGRhdGEgPSB7XG4gICAgICAgIHVzZXJOYW1lOiBudWxsLFxuICAgICAgICBjbGFzc0RldGFpbDogbnVsbCxcbiAgICAgICAgaW5mbzogJycsXG4gICAgICAgIG5vdGVNYXhMZW46IDcwMDBcbiAgICB9O1xuICAgIG9uTG9hZCgpIHt9XG5cbiAgICBjb21wdXRlZCA9IHt9O1xuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgYmluZFRleHRBcmVhQ2hhbmdlKGUpIHtcbiAgICAgICAgICAgIHRoaXMuaW5mbyA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBiaW5kRm9ybVN1Ym1pdChlKSB7XG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgIGlmICghdGhpcy5pbmZvKSB7XG4gICAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAn5Y+N6aaI5LiN6IO95Li656m65ZOfJyxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAn5piv5ZCm6KaB5o+Q5Lqk5oKo55qE5Y+N6aaIJyxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW5mbyA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmiJDlip8nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cbiJdfQ==