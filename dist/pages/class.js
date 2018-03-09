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
                        time: '17:00-18:30',
                        type: '已上',
                        location: 'A教室',
                        day: '09',
                        week: '周六',
                        leave: '请假'
                    }, {
                        classId: 3455,
                        className: '舞蹈课',
                        bgColor: '#ccc',
                        time: '17:00-18:30',
                        type: '已上',
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
                        type: '待上',
                        location: 'B教室',
                        day: '09',
                        week: '周三',
                        leave: '请假'
                    }, {
                        classId: 3455,
                        className: '舞蹈课',
                        bgColor: 'yellowgreen',
                        time: '17:-18:30',
                        type: '待上',
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

                        type: '待上',
                        location: 'B教室',
                        day: '09',
                        week: '周四',
                        leave: '请假'
                    }, {
                        classId: 3455,
                        className: '舞蹈课',
                        bgColor: 'yellowgreen',
                        time: '17:-18:30',
                        type: '待上',
                        location: 'B教室',
                        day: '09',
                        week: '周四',
                        leave: '请假'
                    }]
                }]
            }]
        }, _this.computed = {}, _this.methods = {
            selectClass: function selectClass(monthIndex, dayIndex, classIndex) {
                var that = this;
                var leave = that.allClass[monthIndex].detail[dayIndex].class[classIndex].leave;
                if (leave !== '已请假') {
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
                } else {
                    wx.showToast({
                        title: '您已经请过假了',
                        image: './img/fail.png',
                        duration: 1000
                    });
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return ClassDetail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ClassDetail , 'pages/class'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzLmpzIl0sIm5hbWVzIjpbIkNsYXNzRGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1c2VyTmFtZSIsImFsbENsYXNzIiwibW9udGgiLCJkZXRhaWwiLCJkYXkiLCJ3ZWVrIiwiY2xhc3MiLCJjbGFzc0lkIiwiY2xhc3NOYW1lIiwiYmdDb2xvciIsInRpbWUiLCJ0eXBlIiwibG9jYXRpb24iLCJsZWF2ZSIsImNvbXB1dGVkIiwibWV0aG9kcyIsInNlbGVjdENsYXNzIiwibW9udGhJbmRleCIsImRheUluZGV4IiwiY2xhc3NJbmRleCIsInRoYXQiLCJ3eCIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwic2hvd1RvYXN0IiwiaWNvbiIsImR1cmF0aW9uIiwiJGFwcGx5IiwiY2FuY2VsIiwiY29uc29sZSIsImxvZyIsImltYWdlIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFc7Ozs7Ozs7Ozs7Ozs7O29NQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBSVRDLEksR0FBTztBQUNIQyxzQkFBVSxJQURQO0FBRUhDLHNCQUFVLENBQ047QUFDSUMsdUJBQU8sVUFEWDtBQUVJQyx3QkFBUSxDQUNKO0FBQ0lDLHlCQUFLLElBRFQ7QUFFSUMsMEJBQU0sSUFGVjtBQUdJQywyQkFBTyxDQUNIO0FBQ0lDLGlDQUFTLEdBRGI7QUFFSUMsbUNBQVcsUUFGZjtBQUdJQyxpQ0FBUyxNQUhiO0FBSUlDLDhCQUFNLGFBSlY7QUFLSUMsOEJBQU0sSUFMVjtBQU1JQyxrQ0FBVSxLQU5kO0FBT0lSLDZCQUFLLElBUFQ7QUFRSUMsOEJBQU0sSUFSVjtBQVNJUSwrQkFBTztBQVRYLHFCQURHLEVBWUg7QUFDSU4saUNBQVMsSUFEYjtBQUVJQyxtQ0FBVyxLQUZmO0FBR0lDLGlDQUFTLE1BSGI7QUFJSUMsOEJBQU0sYUFK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b20gJ3dlcHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGFzc0RldGFpbCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6K++56iL6KGoJ1xuICAgIH07XG5cbiAgICBkYXRhID0ge1xuICAgICAgICB1c2VyTmFtZTogbnVsbCxcbiAgICAgICAgYWxsQ2xhc3M6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBtb250aDogJzIwMTjlubQwMeaciCcsXG4gICAgICAgICAgICAgICAgZGV0YWlsOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheTogJzA5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlZWs6ICflkajlha0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzSWQ6IDIzNCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAn6aKG6KKW5Y+j5omN6K6h5YiSJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmdDb2xvcjogJyNjY2MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lOiAnMTc6MDAtMTg6MzAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAn5bey5LiKJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246ICdB5pWZ5a6kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF5OiAnMDknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWVrOiAn5ZGo5YWtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVhdmU6ICfor7flgYcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzSWQ6IDM0NTUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ+iInui5iOivvicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnQ29sb3I6ICcjY2NjJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZTogJzE3OjAwLTE4OjMwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ+W3suS4iicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAnQuaVmeWupCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRheTogJzA5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VlazogJ+WRqOWFrScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlYXZlOiAn6K+35YGHJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbW9udGg6ICcyMDE45bm0MDLmnIgnLFxuICAgICAgICAgICAgICAgIGRldGFpbDogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXk6ICcwOCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWVrOiAn5ZGo5LiJJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc0lkOiAzNDU1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICfoiJ7ouYjor74nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZ0NvbG9yOiAncGluaycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWU6ICcxNzotMTg6MzAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAn5b6F5LiKJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246ICdC5pWZ5a6kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF5OiAnMDknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWVrOiAn5ZGo5LiJJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVhdmU6ICfor7flgYcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzSWQ6IDM0NTUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ+iInui5iOivvicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnQ29sb3I6ICd5ZWxsb3dncmVlbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWU6ICcxNzotMTg6MzAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAn5b6F5LiKJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246ICdC5pWZ5a6kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF5OiAnMDknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWVrOiAn5ZGo5LiJJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVhdmU6ICfor7flgYcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXk6ICcxMicsXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWVrOiAn5ZGo5ZubJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc0lkOiAzNDU1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICfoiJ7ouYjor74nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZ0NvbG9yOiAneWVsbG93Z3JlZW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lOiAnMTc6LTE4OjMwJyxcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAn5b6F5LiKJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246ICdC5pWZ5a6kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF5OiAnMDknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWVrOiAn5ZGo5ZubJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVhdmU6ICfor7flgYcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzSWQ6IDM0NTUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ+iInui5iOivvicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnQ29sb3I6ICd5ZWxsb3dncmVlbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWU6ICcxNzotMTg6MzAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAn5b6F5LiKJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246ICdC5pWZ5a6kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF5OiAnMDknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWVrOiAn5ZGo5ZubJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVhdmU6ICfor7flgYcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcbiAgICBjb21wdXRlZCA9IHt9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIHNlbGVjdENsYXNzKG1vbnRoSW5kZXgsIGRheUluZGV4LCBjbGFzc0luZGV4KSB7XG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgIGxldCBsZWF2ZSA9XG4gICAgICAgICAgICAgICAgdGhhdC5hbGxDbGFzc1ttb250aEluZGV4XS5kZXRhaWxbZGF5SW5kZXhdLmNsYXNzW2NsYXNzSW5kZXhdXG4gICAgICAgICAgICAgICAgICAgIC5sZWF2ZTtcbiAgICAgICAgICAgIGlmIChsZWF2ZSAhPT0gJ+W3suivt+WBhycpIHtcbiAgICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfnoa7lrpropoHor7flgYflkJcnLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfor7flgYfmiJDlip8nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFsbENsYXNzW21vbnRoSW5kZXhdLmRldGFpbFtkYXlJbmRleF0uY2xhc3NbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzSW5kZXhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLmxlYXZlID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ+W3suivt+WBhyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aCqOW3sue7j+ivt+i/h+WBh+S6hicsXG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiAnLi9pbWcvZmFpbC5wbmcnLFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cbiJdfQ==