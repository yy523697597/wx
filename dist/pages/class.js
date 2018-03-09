'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
            navigationBarTitleText: '课程表',
            enablePullDownRefresh: true
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
            }],
            addCount: 30,
            cutCount: 30
        }, _this.methods = {
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

    _createClass(ClassDetail, [{
        key: 'onLoad',
        value: function onLoad(options) {
            this.getClass();
        }
        // 下拉添加更多原来的上课记录

    }, {
        key: 'onPullDownRefresh',
        value: function onPullDownRefresh() {
            console.log(5555);
            setTimeout(function () {
                wx.stopPullDownRefresh();
            }, 2000);
        }
    }, {
        key: 'dateToDate',
        value: function dateToDate(date) {
            var sDate = new Date();
            if ((typeof date === 'undefined' ? 'undefined' : _typeof(date)) == 'object' && typeof new Date().getMonth == 'function') {
                sDate = date;
            } else if (typeof date == 'string') {
                var arr = date.split('-');
                if (arr.length == 3) {
                    sDate = new Date(arr[0] + '-' + arr[1] + '-' + arr[2]);
                }
            }

            return sDate;
        }
    }, {
        key: 'addMonth',
        value: function addMonth(date, num) {
            num = parseInt(num);
            var sDate = this.dateToDate(date);

            var sYear = sDate.getFullYear();
            var sMonth = sDate.getMonth() + 1;
            var sDay = sDate.getDate();

            var eYear = sYear;
            var eMonth = sMonth + num;
            var eDay = sDay;
            while (eMonth > 12) {
                eYear++;
                eMonth -= 12;
            }

            var eDate = new Date(eYear, eMonth - 1, eDay);

            while (eDate.getMonth() != eMonth - 1) {
                eDay--;
                eDate = new Date(eYear, eMonth - 1, eDay);
            }
            var month = eDate.getMonth() + 1;
            if (month < 10) {
                month = '0' + month;
            }
            return eDate.getFullYear() + '-' + month;
        }

        // 上拉加载更多未上课记录

    }, {
        key: 'onReachBottom',
        value: function onReachBottom() {}
    }, {
        key: 'getClass',
        value: function getClass() {
            var student = wx.getStorageSync('student');
            var openid = wx.getStorageSync('openid');
            var startDate = this.addDate(new Date(), -this.cutCount);
            var endDate = this.addDate(new Date(), this.addCount);

            wx.request({
                url: 'https://back.yuiyu.cn/wx/record/index',
                data: {
                    studentId: student.id, //学生id
                    startDate: startDate, //查询的开始日期
                    endDate: endDate, //查询的结束日期,
                    // openid:openid,
                    openid: 'o2fPa4rbL1j8Gp0QlqBDzl3R40vA'
                },
                method: 'POST',
                success: function success(res) {
                    // success
                }
            });
        }
    }]);

    return ClassDetail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ClassDetail , 'pages/class'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzLmpzIl0sIm5hbWVzIjpbIkNsYXNzRGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsImRhdGEiLCJ1c2VyTmFtZSIsImFsbENsYXNzIiwibW9udGgiLCJkZXRhaWwiLCJkYXkiLCJ3ZWVrIiwiY2xhc3MiLCJjbGFzc0lkIiwiY2xhc3NOYW1lIiwiYmdDb2xvciIsInRpbWUiLCJ0eXBlIiwibG9jYXRpb24iLCJsZWF2ZSIsImFkZENvdW50IiwiY3V0Q291bnQiLCJtZXRob2RzIiwic2VsZWN0Q2xhc3MiLCJtb250aEluZGV4IiwiZGF5SW5kZXgiLCJjbGFzc0luZGV4IiwidGhhdCIsInd4Iiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJzaG93VG9hc3QiLCJpY29uIiwiZHVyYXRpb24iLCIkYXBwbHkiLCJjYW5jZWwiLCJjb25zb2xlIiwibG9nIiwiaW1hZ2UiLCJvcHRpb25zIiwiZ2V0Q2xhc3MiLCJzZXRUaW1lb3V0Iiwic3RvcFB1bGxEb3duUmVmcmVzaCIsImRhdGUiLCJzRGF0ZSIsIkRhdGUiLCJnZXRNb250aCIsImFyciIsInNwbGl0IiwibGVuZ3RoIiwibnVtIiwicGFyc2VJbnQiLCJkYXRlVG9EYXRlIiwic1llYXIiLCJnZXRGdWxsWWVhciIsInNNb250aCIsInNEYXkiLCJnZXREYXRlIiwiZVllYXIiLCJlTW9udGgiLCJlRGF5IiwiZURhdGUiLCJzdHVkZW50IiwiZ2V0U3RvcmFnZVN5bmMiLCJvcGVuaWQiLCJzdGFydERhdGUiLCJhZGREYXRlIiwiZW5kRGF0ZSIsInJlcXVlc3QiLCJ1cmwiLCJzdHVkZW50SWQiLCJpZCIsIm1ldGhvZCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsVzs7Ozs7Ozs7Ozs7Ozs7b01BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdC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YixFQUF5QixDQUFDLEtBQUs1QixRQUEvQixDQUFsQjtBQUNBLGdCQUFNa0QsVUFBVSxLQUFLRCxPQUFMLENBQWEsSUFBSXJCLElBQUosRUFBYixFQUF5QixLQUFLN0IsUUFBOUIsQ0FBaEI7O0FBRUFRLGVBQUc0QyxPQUFILENBQVc7QUFDUEMscUJBQUssdUNBREU7QUFFUHBFLHNCQUFNO0FBQ0ZxRSwrQkFBV1IsUUFBUVMsRUFEakIsRUFDcUI7QUFDdkJOLCtCQUFXQSxTQUZULEVBRW9CO0FBQ3RCRSw2QkFBU0EsT0FIUCxFQUdnQjtBQUNsQjtBQUNBSCw0QkFBUTtBQUxOLGlCQUZDO0FBU1BRLHdCQUFRLE1BVEQ7QUFVUDVDLHlCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDbkI7QUFDSDtBQVpNLGFBQVg7QUFjSDs7OztFQTVMb0MsZUFBSzRDLEk7O2tCQUF6QjVFLFciLCJmaWxlIjoiY2xhc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGFzc0RldGFpbCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6K++56iL6KGoJyxcbiAgICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiB0cnVlXG4gICAgfTtcblxuICAgIGRhdGEgPSB7XG4gICAgICAgIHVzZXJOYW1lOiBudWxsLFxuICAgICAgICBhbGxDbGFzczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG1vbnRoOiAnMjAxOOW5tDAx5pyIJyxcbiAgICAgICAgICAgICAgICBkZXRhaWw6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF5OiAnMDknLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2VlazogJ+WRqOWFrScsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NJZDogMjM0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICfpooboopblj6PmiY3orqHliJInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZ0NvbG9yOiAnI2NjYycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWU6ICcxNzowMC0xODozMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICflt7LkuIonLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjogJ0HmlZnlrqQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXk6ICcwOScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlZWs6ICflkajlha0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWF2ZTogJ+ivt+WBhydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NJZDogMzQ1NSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAn6Iie6LmI6K++JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmdDb2xvcjogJyNjY2MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lOiAnMTc6MDAtMTg6MzAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAn5bey5LiKJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246ICdC5pWZ5a6kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF5OiAnMDknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWVrOiAn5ZGo5YWtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVhdmU6ICfor7flgYcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBtb250aDogJzIwMTjlubQwMuaciCcsXG4gICAgICAgICAgICAgICAgZGV0YWlsOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheTogJzA4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlZWs6ICflkajkuIknLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzSWQ6IDM0NTUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ+iInui5iOivvicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnQ29sb3I6ICdwaW5rJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZTogJzE3Oi0xODozMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICflvoXkuIonLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjogJ0LmlZnlrqQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXk6ICcwOScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlZWs6ICflkajkuIknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWF2ZTogJ+ivt+WBhydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NJZDogMzQ1NSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAn6Iie6LmI6K++JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmdDb2xvcjogJ3llbGxvd2dyZWVuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZTogJzE3Oi0xODozMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICflvoXkuIonLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjogJ0LmlZnlrqQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXk6ICcwOScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlZWs6ICflkajkuIknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWF2ZTogJ+ivt+WBhydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheTogJzEyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlZWs6ICflkajlm5snLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzSWQ6IDM0NTUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ+iInui5iOivvicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnQ29sb3I6ICd5ZWxsb3dncmVlbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWU6ICcxNzotMTg6MzAnLFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICflvoXkuIonLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjogJ0LmlZnlrqQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXk6ICcwOScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlZWs6ICflkajlm5snLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWF2ZTogJ+ivt+WBhydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NJZDogMzQ1NSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAn6Iie6LmI6K++JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmdDb2xvcjogJ3llbGxvd2dyZWVuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZTogJzE3Oi0xODozMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICflvoXkuIonLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjogJ0LmlZnlrqQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXk6ICcwOScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlZWs6ICflkajlm5snLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWF2ZTogJ+ivt+WBhydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGFkZENvdW50OiAzMCxcbiAgICAgICAgY3V0Q291bnQ6IDMwXG4gICAgfTtcblxuICAgIG9uTG9hZChvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuZ2V0Q2xhc3MoKTtcbiAgICB9XG4gICAgLy8g5LiL5ouJ5re75Yqg5pu05aSa5Y6f5p2l55qE5LiK6K++6K6w5b2VXG4gICAgb25QdWxsRG93blJlZnJlc2goKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKDU1NTUpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKTtcbiAgICAgICAgfSwgMjAwMCk7XG4gICAgfVxuXG4gICAgZGF0ZVRvRGF0ZShkYXRlKSB7XG4gICAgICAgIGxldCBzRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiBkYXRlID09ICdvYmplY3QnICYmXG4gICAgICAgICAgICB0eXBlb2YgbmV3IERhdGUoKS5nZXRNb250aCA9PSAnZnVuY3Rpb24nXG4gICAgICAgICkge1xuICAgICAgICAgICAgc0RhdGUgPSBkYXRlO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkYXRlID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBsZXQgYXJyID0gZGF0ZS5zcGxpdCgnLScpO1xuICAgICAgICAgICAgaWYgKGFyci5sZW5ndGggPT0gMykge1xuICAgICAgICAgICAgICAgIHNEYXRlID0gbmV3IERhdGUoYXJyWzBdICsgJy0nICsgYXJyWzFdICsgJy0nICsgYXJyWzJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzRGF0ZTtcbiAgICB9XG5cbiAgICBhZGRNb250aChkYXRlLCBudW0pIHtcbiAgICAgICAgbnVtID0gcGFyc2VJbnQobnVtKTtcbiAgICAgICAgbGV0IHNEYXRlID0gdGhpcy5kYXRlVG9EYXRlKGRhdGUpO1xuXG4gICAgICAgIGxldCBzWWVhciA9IHNEYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIGxldCBzTW9udGggPSBzRGF0ZS5nZXRNb250aCgpICsgMTtcbiAgICAgICAgbGV0IHNEYXkgPSBzRGF0ZS5nZXREYXRlKCk7XG5cbiAgICAgICAgbGV0IGVZZWFyID0gc1llYXI7XG4gICAgICAgIGxldCBlTW9udGggPSBzTW9udGggKyBudW07XG4gICAgICAgIGxldCBlRGF5ID0gc0RheTtcbiAgICAgICAgd2hpbGUgKGVNb250aCA+IDEyKSB7XG4gICAgICAgICAgICBlWWVhcisrO1xuICAgICAgICAgICAgZU1vbnRoIC09IDEyO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVEYXRlID0gbmV3IERhdGUoZVllYXIsIGVNb250aCAtIDEsIGVEYXkpO1xuXG4gICAgICAgIHdoaWxlIChlRGF0ZS5nZXRNb250aCgpICE9IGVNb250aCAtIDEpIHtcbiAgICAgICAgICAgIGVEYXktLTtcbiAgICAgICAgICAgIGVEYXRlID0gbmV3IERhdGUoZVllYXIsIGVNb250aCAtIDEsIGVEYXkpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBtb250aCA9IGVEYXRlLmdldE1vbnRoKCkgKyAxO1xuICAgICAgICBpZiAobW9udGggPCAxMCkge1xuICAgICAgICAgICAgbW9udGggPSAnMCcgKyBtb250aDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZURhdGUuZ2V0RnVsbFllYXIoKSArICctJyArIG1vbnRoO1xuICAgIH1cblxuICAgIC8vIOS4iuaLieWKoOi9veabtOWkmuacquS4iuivvuiusOW9lVxuICAgIG9uUmVhY2hCb3R0b20oKSB7fVxuICAgIGdldENsYXNzKCkge1xuICAgICAgICBjb25zdCBzdHVkZW50ID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3N0dWRlbnQnKTtcbiAgICAgICAgY29uc3Qgb3BlbmlkID0gd3guZ2V0U3RvcmFnZVN5bmMoJ29wZW5pZCcpO1xuICAgICAgICBjb25zdCBzdGFydERhdGUgPSB0aGlzLmFkZERhdGUobmV3IERhdGUoKSwgLXRoaXMuY3V0Q291bnQpO1xuICAgICAgICBjb25zdCBlbmREYXRlID0gdGhpcy5hZGREYXRlKG5ldyBEYXRlKCksIHRoaXMuYWRkQ291bnQpO1xuXG4gICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9iYWNrLnl1aXl1LmNuL3d4L3JlY29yZC9pbmRleCcsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgc3R1ZGVudElkOiBzdHVkZW50LmlkLCAvL+WtpueUn2lkXG4gICAgICAgICAgICAgICAgc3RhcnREYXRlOiBzdGFydERhdGUsIC8v5p+l6K+i55qE5byA5aeL5pel5pyfXG4gICAgICAgICAgICAgICAgZW5kRGF0ZTogZW5kRGF0ZSwgLy/mn6Xor6LnmoTnu5PmnZ/ml6XmnJ8sXG4gICAgICAgICAgICAgICAgLy8gb3BlbmlkOm9wZW5pZCxcbiAgICAgICAgICAgICAgICBvcGVuaWQ6ICdvMmZQYTRyYkwxajhHcDBRbHFCRHpsM1I0MHZBJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgLy8gc3VjY2Vzc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgc2VsZWN0Q2xhc3MobW9udGhJbmRleCwgZGF5SW5kZXgsIGNsYXNzSW5kZXgpIHtcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgbGV0IGxlYXZlID1cbiAgICAgICAgICAgICAgICB0aGF0LmFsbENsYXNzW21vbnRoSW5kZXhdLmRldGFpbFtkYXlJbmRleF0uY2xhc3NbY2xhc3NJbmRleF1cbiAgICAgICAgICAgICAgICAgICAgLmxlYXZlO1xuICAgICAgICAgICAgaWYgKGxlYXZlICE9PSAn5bey6K+35YGHJykge1xuICAgICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogJ+ehruWumuimgeivt+WBh+WQlycsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+ivt+WBh+aIkOWKnycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWxsQ2xhc3NbbW9udGhJbmRleF0uZGV0YWlsW2RheUluZGV4XS5jbGFzc1tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NJbmRleFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0ubGVhdmUgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAn5bey6K+35YGHJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5oKo5bey57uP6K+36L+H5YGH5LqGJyxcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6ICcuL2ltZy9mYWlsLnBuZycsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuIl19