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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzLmpzIl0sIm5hbWVzIjpbIkNsYXNzRGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1c2VyTmFtZSIsImFsbENsYXNzIiwibW9udGgiLCJkZXRhaWwiLCJkYXkiLCJ3ZWVrIiwiY2xhc3MiLCJjbGFzc0lkIiwiY2xhc3NOYW1lIiwiYmdDb2xvciIsInRpbWUiLCJub29uIiwic3RhdHVzIiwibG9jYXRpb24iLCJsZWF2ZSIsImNvbXB1dGVkIiwibWV0aG9kcyIsInNlbGVjdENsYXNzIiwibW9udGhJbmRleCIsImRheUluZGV4IiwiY2xhc3NJbmRleCIsInRoYXQiLCJ3eCIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwic2hvd1RvYXN0IiwiaWNvbiIsImR1cmF0aW9uIiwiJGFwcGx5IiwiY2FuY2VsIiwiY29uc29sZSIsImxvZyIsImltYWdlIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFc7Ozs7Ozs7Ozs7Ozs7O29NQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBSVRDLEksR0FBTztBQUNIQyxzQkFBVSxJQURQO0FBRUhDLHNCQUFVLENBQ047QUFDSUMsdUJBQU8sVUFEWDtBQUVJQyx3QkFBUSxDQUNKO0FBQ0lDLHlCQUFLLElBRFQ7QUFFSUMsMEJBQU0sSUFGVjtBQUdJQywyQkFBTyxDQUNIO0FBQ0lDLGlDQUFTLEdBRGI7QUFFSUMsbUNBQVcsUUFGZjtBQUdJQyxpQ0FBUyxNQUhiO0FBSUlDLDhCQUFNLFdBSlY7QUFLSUMsOEJBQU0sSUFMVjtBQU1JQyxnQ0FBUSxJQU5aO0FBT0lDLGtDQUFVLEtBUGQ7QUFRSVQsNkJBQUssSUFSVDtBQVNJQyw4QkFBTSxJQVRWO0FBVUlTLCtCQUFPO0FBVlgscUJBREcsRUFhSDtBQUNJUCxpQ0FBUyxJQURiO0FBRUlDLG1DQUFXLEtBRmY7QUFHSUMs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LEtBQTNDLENBQ0ljLFVBREosRUFFRU4sS0FGRixHQUdJLEtBSEo7QUFJQU8scUNBQUtXLE1BQUw7QUFDSCw2QkFaRCxNQVlPLElBQUlMLElBQUlNLE1BQVIsRUFBZ0I7QUFDbkJDLHdDQUFRQyxHQUFSLENBQVksUUFBWjtBQUNIO0FBQ0o7QUFuQlEscUJBQWI7QUFxQkgsaUJBdEJELE1Bc0JPO0FBQ0hiLHVCQUFHTyxTQUFILENBQWE7QUFDVEwsK0JBQU8sU0FERTtBQUVUWSwrQkFBTyxnQkFGRTtBQUdUTCxrQ0FBVTtBQUhELHFCQUFiO0FBS0g7QUFDSjtBQW5DSyxTOzs7O0VBOUoyQixlQUFLTSxJOztrQkFBekJ6QyxXIiwiZmlsZSI6ImNsYXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xhc3NEZXRhaWwgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ivvueoi+ihqCdcbiAgICB9O1xuXG4gICAgZGF0YSA9IHtcbiAgICAgICAgdXNlck5hbWU6IG51bGwsXG4gICAgICAgIGFsbENsYXNzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbW9udGg6ICcyMDE45bm0MDHmnIgnLFxuICAgICAgICAgICAgICAgIGRldGFpbDogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXk6ICcwOScsXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWVrOiAn5ZGo5YWtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc0lkOiAyMzQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ+mihuiiluWPo+aJjeiuoeWIkicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnQ29sb3I6ICcjY2NjJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZTogJzE3Oi0xODozMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vb246ICfkuIvljYgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICflt7LkuIonLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjogJ0HmlZnlrqQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXk6ICcwOScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlZWs6ICflkajlha0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWF2ZTogJ+ivt+WBhydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NJZDogMzQ1NSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAn6Iie6LmI6K++JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmdDb2xvcjogJyNjY2MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lOiAnMTc6LTE4OjMwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9vbjogJ+S4i+WNiCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ+W3suS4iicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAnQuaVmeWupCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRheTogJzA5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VlazogJ+WRqOWFrScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlYXZlOiAn6K+35YGHJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbW9udGg6ICcyMDE45bm0MDLmnIgnLFxuICAgICAgICAgICAgICAgIGRldGFpbDogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXk6ICcwOCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWVrOiAn5ZGo5LiJJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc0lkOiAzNDU1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICfoiJ7ouYjor74nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZ0NvbG9yOiAncGluaycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWU6ICcxNzotMTg6MzAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub29uOiAn5LiL5Y2IJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAn5b6F5LiKJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246ICdC5pWZ5a6kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF5OiAnMDknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWVrOiAn5ZGo5LiJJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVhdmU6ICfor7flgYcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzSWQ6IDM0NTUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ+iInui5iOivvicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnQ29sb3I6ICd5ZWxsb3dncmVlbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWU6ICcxNzotMTg6MzAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub29uOiAn5LiL5Y2IJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAn5b6F5LiKJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246ICdC5pWZ5a6kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF5OiAnMDknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWVrOiAn5ZGo5LiJJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVhdmU6ICfor7flgYcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXk6ICcxMicsXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWVrOiAn5ZGo5ZubJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc0lkOiAzNDU1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICfoiJ7ouYjor74nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZ0NvbG9yOiAneWVsbG93Z3JlZW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lOiAnMTc6LTE4OjMwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9vbjogJ+S4i+WNiCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ+W+heS4iicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAnQuaVmeWupCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRheTogJzA5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VlazogJ+WRqOWbmycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlYXZlOiAn6K+35YGHJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc0lkOiAzNDU1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICfoiJ7ouYjor74nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZ0NvbG9yOiAneWVsbG93Z3JlZW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lOiAnMTc6LTE4OjMwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9vbjogJ+S4i+WNiCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ+W+heS4iicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAnQuaVmeWupCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRheTogJzA5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VlazogJ+WRqOWbmycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlYXZlOiAn6K+35YGHJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgIC8vICAgICBtb250aDogJzIwMTjlubQwM+aciCcsXG4gICAgICAgICAgICAvLyAgICAgZGV0YWlsOiBbXG4gICAgICAgICAgICAvLyAgICAgICAgIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGRheTogJzE1JyxcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHdlZWs6ICflkajml6UnLFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgY2xhc3M6IFtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGNsYXNzSWQ6IDIzNCxcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAn6aKG6KKW5Y+j5omN6K6h5YiSJyxcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgYmdDb2xvcjogJ3llbGxvd2dyZWVuJ1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBjbGFzc0lkOiAzNDU1LFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICfoiJ7ouYjor74nLFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBiZ0NvbG9yOiAncGluaydcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgY2xhc3NJZDogMzQ1NSxcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAn5oiP5YmnJyxcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgYmdDb2xvcjogJ3NreWJsdWUnXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgXVxuICAgICAgICAgICAgLy8gICAgICAgICB9LFxuICAgICAgICAgICAgLy8gICAgICAgICB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBkYXk6ICcyMicsXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB3ZWVrOiAn5ZGo5pelJyxcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGNsYXNzOiBbXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBjbGFzc0lkOiAyMzQsXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ+mihuiiluWPo+aJjeiuoeWIkicsXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGJnQ29sb3I6ICd5ZWxsb3dncmVlbidcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgY2xhc3NJZDogMzQ1NSxcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAn6Iie6LmI6K++JyxcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgYmdDb2xvcjogJ3BpbmsnXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGNsYXNzSWQ6IDM0NTUsXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ+aIj+WJpycsXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGJnQ29sb3I6ICdza3libHVlJ1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAgICAgLy8gICAgIF1cbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgXVxuICAgIH07XG4gICAgY29tcHV0ZWQgPSB7fTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgICBzZWxlY3RDbGFzcyhtb250aEluZGV4LCBkYXlJbmRleCwgY2xhc3NJbmRleCkge1xuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICBsZXQgbGVhdmUgPVxuICAgICAgICAgICAgICAgIHRoYXQuYWxsQ2xhc3NbbW9udGhJbmRleF0uZGV0YWlsW2RheUluZGV4XS5jbGFzc1tjbGFzc0luZGV4XVxuICAgICAgICAgICAgICAgICAgICAubGVhdmU7XG4gICAgICAgICAgICBpZiAobGVhdmUgIT09ICflt7Lor7flgYcnKSB7XG4gICAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAn56Gu5a6a6KaB6K+35YGH5ZCXJyxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn6K+35YGH5oiQ5YqfJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hbGxDbGFzc1ttb250aEluZGV4XS5kZXRhaWxbZGF5SW5kZXhdLmNsYXNzW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc0luZGV4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXS5sZWF2ZSA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICflt7Lor7flgYcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmgqjlt7Lnu4/or7fov4flgYfkuoYnLFxuICAgICAgICAgICAgICAgICAgICBpbWFnZTogJy4vaW1nL2ZhaWwucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG4iXX0=