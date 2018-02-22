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

var ClassDetail = function (_wepy$page) {
    _inherits(ClassDetail, _wepy$page);

    function ClassDetail() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ClassDetail);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ClassDetail.__proto__ || Object.getPrototypeOf(ClassDetail)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '课程表'
        }, _this.data = {
            userName: null,
            allClass: [{
                month: '2018年01月',
                detail: [{
                    day: '09',
                    week: '周六',
                    class: [{
                        classId: 234,
                        className: '领袖口才计划',
                        bgColor: '#ccc',
                        time: '17:-18:30',
                        noon: '下午',
                        status: '已上',
                        location: 'A教室',
                        day: '09',
                        week: '周六',
                        leave: '请假'
                    }, {
                        classId: 3455,
                        className: '舞蹈课',
                        bgColor: '#ccc',
                        time: '17:-18:30',
                        noon: '下午',
                        status: '已上',
                        location: 'B教室',
                        day: '09',
                        week: '周六',
                        leave: '请假'
                    }]
                }]
            }, {
                month: '2018年02月',
                detail: [{
                    day: '08',
                    week: '周三',
                    class: [{
                        classId: 3455,
                        className: '舞蹈课',
                        bgColor: 'pink',
                        time: '17:-18:30',
                        noon: '下午',
                        status: '待上',
                        location: 'B教室',
                        day: '09',
                        week: '周三',
                        leave: '请假'
                    }, {
                        classId: 3455,
                        className: '舞蹈课',
                        bgColor: 'yellowgreen',
                        time: '17:-18:30',
                        noon: '下午',
                        status: '待上',
                        location: 'B教室',
                        day: '09',
                        week: '周三',
                        leave: '请假'
                    }]
                }, {
                    day: '12',
                    week: '周四',
                    class: [{
                        classId: 3455,
                        className: '舞蹈课',
                        bgColor: 'yellowgreen',
                        time: '17:-18:30',
                        noon: '下午',
                        status: '待上',
                        location: 'B教室',
                        day: '09',
                        week: '周四',
                        leave: '请假'
                    }, {
                        classId: 3455,
                        className: '舞蹈课',
                        bgColor: 'yellowgreen',
                        time: '17:-18:30',
                        noon: '下午',
                        status: '待上',
                        location: 'B教室',
                        day: '09',
                        week: '周四',
                        leave: '请假'
                    }]
                }]
                // {
                //     month: '2018年03月',
                //     detail: [
                //         {
                //             day: '15',
                //             week: '周日',
                //             class: [
                //                 {
                //                     classId: 234,
                //                     className: '领袖口才计划',
                //                     bgColor: 'yellowgreen'
                //                 },
                //                 {
                //                     classId: 3455,
                //                     className: '舞蹈课',
                //                     bgColor: 'pink'
                //                 },
                //                 {
                //                     classId: 3455,
                //                     className: '戏剧',
                //                     bgColor: 'skyblue'
                //                 }
                //             ]
                //         },
                //         {
                //             day: '22',
                //             week: '周日',
                //             class: [
                //                 {
                //                     classId: 234,
                //                     className: '领袖口才计划',
                //                     bgColor: 'yellowgreen'
                //                 },
                //                 {
                //                     classId: 3455,
                //                     className: '舞蹈课',
                //                     bgColor: 'pink'
                //                 },
                //                 {
                //                     classId: 3455,
                //                     className: '戏剧',
                //                     bgColor: 'skyblue'
                //                 }
                //             ]
                //         }
                //     ]
                // }
            }]
        }, _this.computed = {}, _this.methods = {
            selectClass: function selectClass(monthIndex, dayIndex, classIndex) {
                var that = this;
                wx.showModal({
                    title: '提示',
                    content: '确定要请假吗',
                    success: function success(res) {
                        if (res.confirm) {
                            wx.showToast({
                                title: '请假成功',
                                icon: 'success',
                                duration: 1000
                            });

                            that.allClass[monthIndex].detail[dayIndex].class[classIndex].leave = '已请假';
                            that.$apply();
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return ClassDetail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ClassDetail , 'pages/class'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzLmpzIl0sIm5hbWVzIjpbIkNsYXNzRGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1c2VyTmFtZSIsImFsbENsYXNzIiwibW9udGgiLCJkZXRhaWwiLCJkYXkiLCJ3ZWVrIiwiY2xhc3MiLCJjbGFzc0lkIiwiY2xhc3NOYW1lIiwiYmdDb2xvciIsInRpbWUiLCJub29uIiwic3RhdHVzIiwibG9jYXRpb24iLCJsZWF2ZSIsImNvbXB1dGVkIiwibWV0aG9kcyIsInNlbGVjdENsYXNzIiwibW9udGhJbmRleCIsImRheUluZGV4IiwiY2xhc3NJbmRleCIsInRoYXQiLCJ3eCIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwic2hvd1RvYXN0IiwiaWNvbiIsImR1cmF0aW9uIiwiJGFwcGx5IiwiY2FuY2VsIiwiY29uc29sZSIsImxvZyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxXOzs7Ozs7Ozs7Ozs7OztvTUFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUlUQyxJLEdBQU87QUFDSEMsc0JBQVUsSUFEUDtBQUVIQyxzQkFBVSxDQUNOO0FBQ0lDLHVCQUFPLFVBRFg7QUFFSUMsd0JBQVEsQ0FDSjtBQUNJQyx5QkFBSyxJQURUO0FBRUlDLDBCQUFNLElBRlY7QUFHSUMsMkJBQU8sQ0FDSDtBQUNJQyxpQ0FBUyxHQURiO0FBRUlDLG1DQUFXLFFBRmY7QUFHSUMsaUNBQVMsTUFIYjtBQUlJQyw4QkFBTSxXQUpWO0FBS0lDLDhCQUFNLElBTFY7QUFNSUMsZ0NBQVEsSUFOWjtBQU9JQyxrQ0FBVSxLQVBkO0FBUUlULDZCQUFLLElBUlQ7QUFTSUMsOEJBQU0sSUFUVjtBQVVJUywrQkFBTztBQVZYLHFCQURHLEVBYUg7QUFDSVAsaUNBQVMsSUFEYjtBQUVJQyxtQ0FBVyxLQUZmO0FBR0lDLGlDQUFTLE1BSGI7QUFJSUMsOEJBQU0sV0FKVjtBQUtJQyw4QkFBTSxJQUxWO0FBTUlDLGdDQUFRLElBTlo7QUFPSUMsa0NBQVUsS0FQZDtBQVFJVCw2QkFBSyxJQVJUO0FBU0lDLDhCQUFNLElBVFY7QUFVSVMsK0JBQU87QUFWWCxxQkFiRztBQUhYLGlCQURJO0FBRlosYUFETSxFQW9DTjtBQUNJWix1QkFBTyxVQURYO0FBRUlDLHdCQUFRLENBQ0o7QUFDSUMseUJBQUssSUFEVDtBQUVJQywwQkFBTSxJQUZWO0FBR0lDLDJCQUFPLENBQ0g7QUFDSUMsaUNBQVMsSUFEYjtBQUVJQyxtQ0FBVyxLQUZmO0FBR0lDLGlDQUFTLE1BSGI7QUFJSUMsOEJBQU0sV0FKVjtBQUtJQyw4QkFBTSxJQUxWO0FBTUlDLGdDQUFRLElBTlo7QUFPSUMsa0NBQVUsS0FQZDtBQVFJVCw2QkFBSyxJQVJUO0FBU0lDLDhCQUFNLElBVFY7QUFVSVMsK0JBQU87QUFWWCxxQkFERyxFQWFIO0FBQ0lQLGlDQUFTLElBRGI7QUFFSUMsbUNBQVcsS0FGZjtBQUdJQyxpQ0FBUyxhQUhiO0FBSUlDLDhCQUFNLFdBSlY7QUFLSUMsOEJBQU0sSUFMVjtBQU1JQyxnQ0FBUSxJQU5aO0FBT0lDLGtDQUFVLEtBUGQ7QUFRSVQsNkJBQUssSUFSVDtBQVNJQyw4QkFBTSxJQVRWO0FBVUlTLCtCQUFPO0FBVlgscUJBYkc7QUFIWCxpQkFESSxFQStCSjtBQUNJVix5QkFBSyxJQURUO0FBRUlDLDBCQUFNLElBRlY7QUFHSUMsMkJBQU8sQ0FDSDtBQUNJQyxpQ0FBUyxJQURiO0FBRUlDLG1DQUFXLEtBRmY7QUFHSUMsaUNBQVMsYUFIYjtBQUlJQyw4QkFBTSxXQUpWO0FBS0lDLDhCQUFNLElBTFY7QUFNSUMsZ0NBQVEsSUFOWjtBQU9JQyxrQ0FBVSxLQVBkO0FBUUlULDZCQUFLLElBUlQ7QUFTSUMsOEJBQU0sSUFUVjtBQVVJUywrQkFBTztBQVZYLHFCQURHLEVBYUg7QUFDSVAsaUNBQVMsSUFEYjtBQUVJQyxtQ0FBVyxLQUZmO0FBR0lDLGlDQUFTLGFBSGI7QUFJSUMsOEJBQU0sV0FKVjtBQUtJQyw4QkFBTSxJQUxWO0FBTUlDLGdDQUFRLElBTlo7QUFPSUMsa0NBQVUsS0FQZDtBQVFJVCw2QkFBSyxJQVJUO0FBU0lDLDhCQUFNLElBVFY7QUFVSVMsK0JBQU87QUFWWCxxQkFiRztBQUhYLGlCQS9CSTtBQStEWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBL0dBLGFBcENNO0FBRlAsUyxRQXdKUEMsUSxHQUFXLEUsUUFDWEMsTyxHQUFVO0FBQ05DLHVCQURNLHVCQUNNQyxVQUROLEVBQ2tCQyxRQURsQixFQUM0QkMsVUFENUIsRUFDd0M7QUFDMUMsb0JBQU1DLE9BQU8sSUFBYjtBQUNBQyxtQkFBR0MsU0FBSCxDQUFhO0FBQ1RDLDJCQUFPLElBREU7QUFFVEMsNkJBQVMsUUFGQTtBQUdUQywyQkFIUyxtQkFHREMsR0FIQyxFQUdJO0FBQ1QsNEJBQUlBLElBQUlDLE9BQVIsRUFBaUI7QUFDYk4sK0JBQUdPLFNBQUgsQ0FBYTtBQUNUTCx1Q0FBTyxNQURFO0FBRVRNLHNDQUFNLFNBRkc7QUFHVEMsMENBQVU7QUFIRCw2QkFBYjs7QUFNQVYsaUNBQUtwQixRQUFMLENBQWNpQixVQUFkLEVBQTBCZixNQUExQixDQUFpQ2dCLFFBQWpDLEVBQTJDYixLQUEzQyxDQUNJYyxVQURKLEVBRUVOLEtBRkYsR0FHSSxLQUhKO0FBSUFPLGlDQUFLVyxNQUFMO0FBQ0gseUJBWkQsTUFZTyxJQUFJTCxJQUFJTSxNQUFSLEVBQWdCO0FBQ25CQyxvQ0FBUUMsR0FBUixDQUFZLFFBQVo7QUFDSDtBQUNKO0FBbkJRLGlCQUFiO0FBcUJIO0FBeEJLLFM7Ozs7RUE5SjJCLGVBQUtDLEk7O2tCQUF6QnhDLFciLCJmaWxlIjoiY2xhc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGFzc0RldGFpbCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6K++56iL6KGoJ1xuICAgIH07XG5cbiAgICBkYXRhID0ge1xuICAgICAgICB1c2VyTmFtZTogbnVsbCxcbiAgICAgICAgYWxsQ2xhc3M6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBtb250aDogJzIwMTjlubQwMeaciCcsXG4gICAgICAgICAgICAgICAgZGV0YWlsOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheTogJzA5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlZWs6ICflkajlha0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzSWQ6IDIzNCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAn6aKG6KKW5Y+j5omN6K6h5YiSJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmdDb2xvcjogJyNjY2MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lOiAnMTc6LTE4OjMwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9vbjogJ+S4i+WNiCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ+W3suS4iicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAnQeaVmeWupCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRheTogJzA5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VlazogJ+WRqOWFrScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlYXZlOiAn6K+35YGHJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc0lkOiAzNDU1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICfoiJ7ouYjor74nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZ0NvbG9yOiAnI2NjYycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWU6ICcxNzotMTg6MzAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub29uOiAn5LiL5Y2IJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAn5bey5LiKJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246ICdC5pWZ5a6kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF5OiAnMDknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWVrOiAn5ZGo5YWtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVhdmU6ICfor7flgYcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBtb250aDogJzIwMTjlubQwMuaciCcsXG4gICAgICAgICAgICAgICAgZGV0YWlsOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheTogJzA4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlZWs6ICflkajkuIknLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzSWQ6IDM0NTUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ+iInui5iOivvicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnQ29sb3I6ICdwaW5rJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZTogJzE3Oi0xODozMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vb246ICfkuIvljYgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICflvoXkuIonLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjogJ0LmlZnlrqQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXk6ICcwOScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlZWs6ICflkajkuIknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWF2ZTogJ+ivt+WBhydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NJZDogMzQ1NSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAn6Iie6LmI6K++JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmdDb2xvcjogJ3llbGxvd2dyZWVuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZTogJzE3Oi0xODozMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vb246ICfkuIvljYgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICflvoXkuIonLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjogJ0LmlZnlrqQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXk6ICcwOScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlZWs6ICflkajkuIknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWF2ZTogJ+ivt+WBhydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheTogJzEyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlZWs6ICflkajlm5snLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzSWQ6IDM0NTUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ+iInui5iOivvicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnQ29sb3I6ICd5ZWxsb3dncmVlbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWU6ICcxNzotMTg6MzAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub29uOiAn5LiL5Y2IJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAn5b6F5LiKJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246ICdC5pWZ5a6kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF5OiAnMDknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWVrOiAn5ZGo5ZubJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVhdmU6ICfor7flgYcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzSWQ6IDM0NTUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ+iInui5iOivvicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnQ29sb3I6ICd5ZWxsb3dncmVlbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWU6ICcxNzotMTg6MzAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub29uOiAn5LiL5Y2IJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAn5b6F5LiKJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246ICdC5pWZ5a6kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF5OiAnMDknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWVrOiAn5ZGo5ZubJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVhdmU6ICfor7flgYcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgLy8gICAgIG1vbnRoOiAnMjAxOOW5tDAz5pyIJyxcbiAgICAgICAgICAgIC8vICAgICBkZXRhaWw6IFtcbiAgICAgICAgICAgIC8vICAgICAgICAge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgZGF5OiAnMTUnLFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgd2VlazogJ+WRqOaXpScsXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBjbGFzczogW1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgY2xhc3NJZDogMjM0LFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICfpooboopblj6PmiY3orqHliJInLFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBiZ0NvbG9yOiAneWVsbG93Z3JlZW4nXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGNsYXNzSWQ6IDM0NTUsXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ+iInui5iOivvicsXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGJnQ29sb3I6ICdwaW5rJ1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBjbGFzc0lkOiAzNDU1LFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICfmiI/liacnLFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBiZ0NvbG9yOiAnc2t5Ymx1ZSdcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBdXG4gICAgICAgICAgICAvLyAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyAgICAgICAgIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGRheTogJzIyJyxcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHdlZWs6ICflkajml6UnLFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgY2xhc3M6IFtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGNsYXNzSWQ6IDIzNCxcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAn6aKG6KKW5Y+j5omN6K6h5YiSJyxcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgYmdDb2xvcjogJ3llbGxvd2dyZWVuJ1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBjbGFzc0lkOiAzNDU1LFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICfoiJ7ouYjor74nLFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBiZ0NvbG9yOiAncGluaydcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgY2xhc3NJZDogMzQ1NSxcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAn5oiP5YmnJyxcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgYmdDb2xvcjogJ3NreWJsdWUnXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgXVxuICAgICAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgICAgICAvLyAgICAgXVxuICAgICAgICAgICAgLy8gfVxuICAgICAgICBdXG4gICAgfTtcbiAgICBjb21wdXRlZCA9IHt9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIHNlbGVjdENsYXNzKG1vbnRoSW5kZXgsIGRheUluZGV4LCBjbGFzc0luZGV4KSB7XG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfnoa7lrpropoHor7flgYflkJcnLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+ivt+WBh+aIkOWKnycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hbGxDbGFzc1ttb250aEluZGV4XS5kZXRhaWxbZGF5SW5kZXhdLmNsYXNzW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzSW5kZXhcbiAgICAgICAgICAgICAgICAgICAgICAgIF0ubGVhdmUgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICflt7Lor7flgYcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59XG4iXX0=