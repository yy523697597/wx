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

var Detail = function (_wepy$page) {
    _inherits(Detail, _wepy$page);

    function Detail() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Detail);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Detail.__proto__ || Object.getPrototypeOf(Detail)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '请假'
        }, _this.data = {
            userName: '',
            day: null,
            week: null,
            className: null,
            classId: null,
            btnText: '请假',
            btnBgColor: null
        }, _this.computed = {}, _this.methods = {
            pause: function pause() {
                var that = this;
                wx.showModal({
                    title: '提示',
                    content: '您确定这节课要请假吗?',
                    success: function success(res) {
                        if (res.confirm) {
                            that.setData({
                                btnText: '已请假',
                                btnBgColor: 'pink'
                            });
                        } else if (res.cancel) {}
                    }
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Detail, [{
        key: 'onLoad',
        value: function onLoad(option) {
            this.userName = this.$parent.customData.userName;
            this.day = option.day;
            this.className = option.name;
            this.week = option.week;
            this.classId = option.classId;
            this.btnBgColor = 'rgb(250,140,10)';
            this.$apply();
        }
    }]);

    return Detail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Detail , 'pages/detail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJEZXRhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInVzZXJOYW1lIiwiZGF5Iiwid2VlayIsImNsYXNzTmFtZSIsImNsYXNzSWQiLCJidG5UZXh0IiwiYnRuQmdDb2xvciIsImNvbXB1dGVkIiwibWV0aG9kcyIsInBhdXNlIiwidGhhdCIsInd4Iiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJzZXREYXRhIiwiY2FuY2VsIiwib3B0aW9uIiwiJHBhcmVudCIsImN1c3RvbURhdGEiLCJuYW1lIiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTTs7Ozs7Ozs7Ozs7Ozs7MExBQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFJVEMsSSxHQUFPO0FBQ0hDLHNCQUFVLEVBRFA7QUFFSEMsaUJBQUssSUFGRjtBQUdIQyxrQkFBTSxJQUhIO0FBSUhDLHVCQUFXLElBSlI7QUFLSEMscUJBQVMsSUFMTjtBQU1IQyxxQkFBUyxJQU5OO0FBT0hDLHdCQUFZO0FBUFQsUyxRQWtCUEMsUSxHQUFXLEUsUUFDWEMsTyxHQUFVO0FBQ05DLGlCQURNLG1CQUNFO0FBQ0osb0JBQU1DLE9BQU8sSUFBYjtBQUNBQyxtQkFBR0MsU0FBSCxDQUFhO0FBQ1RDLDJCQUFPLElBREU7QUFFVEMsNkJBQVMsYUFGQTtBQUdUQywyQkFIUyxtQkFHREMsR0FIQyxFQUdJO0FBQ1QsNEJBQUlBLElBQUlDLE9BQVIsRUFBaUI7QUFDYlAsaUNBQUtRLE9BQUwsQ0FBYTtBQUNUYix5Q0FBUyxLQURBO0FBRVRDLDRDQUFZO0FBRkgsNkJBQWI7QUFJSCx5QkFMRCxNQUtPLElBQUlVLElBQUlHLE1BQVIsRUFBZ0IsQ0FDdEI7QUFDSjtBQVhRLGlCQUFiO0FBYUg7QUFoQkssUzs7Ozs7K0JBVkhDLE0sRUFBUTtBQUNYLGlCQUFLcEIsUUFBTCxHQUFnQixLQUFLcUIsT0FBTCxDQUFhQyxVQUFiLENBQXdCdEIsUUFBeEM7QUFDQSxpQkFBS0MsR0FBTCxHQUFXbUIsT0FBT25CLEdBQWxCO0FBQ0EsaUJBQUtFLFNBQUwsR0FBaUJpQixPQUFPRyxJQUF4QjtBQUNBLGlCQUFLckIsSUFBTCxHQUFZa0IsT0FBT2xCLElBQW5CO0FBQ0EsaUJBQUtFLE9BQUwsR0FBZWdCLE9BQU9oQixPQUF0QjtBQUNBLGlCQUFLRSxVQUFMLEdBQWtCLGlCQUFsQjtBQUNBLGlCQUFLa0IsTUFBTDtBQUNIOzs7O0VBdEIrQixlQUFLQyxJOztrQkFBcEI3QixNIiwiZmlsZSI6ImRldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERldGFpbCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6K+35YGHJ1xuICAgIH07XG5cbiAgICBkYXRhID0ge1xuICAgICAgICB1c2VyTmFtZTogJycsXG4gICAgICAgIGRheTogbnVsbCxcbiAgICAgICAgd2VlazogbnVsbCxcbiAgICAgICAgY2xhc3NOYW1lOiBudWxsLFxuICAgICAgICBjbGFzc0lkOiBudWxsLFxuICAgICAgICBidG5UZXh0OiAn6K+35YGHJyxcbiAgICAgICAgYnRuQmdDb2xvcjogbnVsbFxuICAgIH07XG4gICAgb25Mb2FkKG9wdGlvbikge1xuICAgICAgICB0aGlzLnVzZXJOYW1lID0gdGhpcy4kcGFyZW50LmN1c3RvbURhdGEudXNlck5hbWU7XG4gICAgICAgIHRoaXMuZGF5ID0gb3B0aW9uLmRheTtcbiAgICAgICAgdGhpcy5jbGFzc05hbWUgPSBvcHRpb24ubmFtZTtcbiAgICAgICAgdGhpcy53ZWVrID0gb3B0aW9uLndlZWs7XG4gICAgICAgIHRoaXMuY2xhc3NJZCA9IG9wdGlvbi5jbGFzc0lkO1xuICAgICAgICB0aGlzLmJ0bkJnQ29sb3IgPSAncmdiKDI1MCwxNDAsMTApJztcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7fTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgICBwYXVzZSgpIHtcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogJ+aCqOehruWumui/meiKguivvuimgeivt+WBh+WQlz8nLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidG5UZXh0OiAn5bey6K+35YGHJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidG5CZ0NvbG9yOiAncGluaydcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn1cbiJdfQ==