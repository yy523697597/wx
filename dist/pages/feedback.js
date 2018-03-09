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
            noteMaxLen: 7000,
            history: []
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
                                var openid = wx.getStorageSync('openid');
                                wx.request({
                                    url: 'https://back.yuiyu.cn/wx/feedback/add',
                                    data: {
                                        studentId: wx.getStorageSync('student').id, //学生id
                                        content: that.info, //反馈内容,
                                        openid: openid
                                    },
                                    method: 'POST',
                                    success: function success(res) {
                                        console.log(res.data);
                                        that.info = '';
                                        that.$apply();
                                        wx.showToast({
                                            title: '成功',
                                            icon: 'success',
                                            duration: 2000
                                        });
                                        that.getFeed();
                                    }
                                });
                            } else if (res.cancel) {}
                        }
                    });
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Feedback, [{
        key: 'onShow',
        value: function onShow() {
            this.getFeed();
        }
    }, {
        key: 'getFeed',
        value: function getFeed() {
            var openid = wx.getStorageSync('openid');
            var student = wx.getStorageSync('student');
            var that = this;
            wx.request({
                url: 'https://back.yuiyu.cn/wx/feedback/index',
                data: {
                    // openid: openid,
                    openid: 'o2fPa4rbL1j8Gp0QlqBDzl3R40vA',
                    studentId: student.id
                },
                method: 'POST',
                success: function success(res) {
                    console.log(res.data);
                    if (res.data.ok) {
                        console.log('成功请求反馈历史记录');
                        that.history = res.data.list;
                        that.$apply();
                        console.log(that.history);
                    }
                }
            });
        }
    }]);

    return Feedback;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Feedback , 'pages/feedback'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlZWRiYWNrLmpzIl0sIm5hbWVzIjpbIkZlZWRiYWNrIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1c2VyTmFtZSIsImNsYXNzRGV0YWlsIiwiaW5mbyIsIm5vdGVNYXhMZW4iLCJoaXN0b3J5IiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiYmluZFRleHRBcmVhQ2hhbmdlIiwiZSIsImRldGFpbCIsInZhbHVlIiwiYmluZEZvcm1TdWJtaXQiLCJ0aGF0Iiwid3giLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImNhbmNlbCIsIm9wZW5pZCIsImdldFN0b3JhZ2VTeW5jIiwicmVxdWVzdCIsInVybCIsInN0dWRlbnRJZCIsImlkIiwibWV0aG9kIiwiY29uc29sZSIsImxvZyIsIiRhcHBseSIsInNob3dUb2FzdCIsImljb24iLCJkdXJhdGlvbiIsImdldEZlZWQiLCJzdHVkZW50Iiwib2siLCJsaXN0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7Ozs7OExBQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFJVEMsSSxHQUFPO0FBQ0hDLHNCQUFVLElBRFA7QUFFSEMseUJBQWEsSUFGVjtBQUdIQyxrQkFBTSxFQUhIO0FBSUhDLHdCQUFZLElBSlQ7QUFLSEMscUJBQVM7QUFMTixTLFFBaUNQQyxRLEdBQVcsRSxRQUVYQyxPLEdBQVU7QUFDTkMsOEJBRE0sOEJBQ2FDLENBRGIsRUFDZ0I7QUFDbEIscUJBQUtOLElBQUwsR0FBWU0sRUFBRUMsTUFBRixDQUFTQyxLQUFyQjtBQUNILGFBSEs7QUFJTkMsMEJBSk0sMEJBSVNILENBSlQsRUFJWTtBQUNkLG9CQUFNSSxPQUFPLElBQWI7QUFDQSxvQkFBSSxDQUFDLEtBQUtWLElBQVYsRUFBZ0I7QUFDWlcsdUJBQUdDLFNBQUgsQ0FBYTtBQUNUQywrQkFBTyxJQURFO0FBRVRDLGlDQUFTLFNBRkE7QUFHVEMsK0JBSFMsbUJBR0RDLEdBSEMsRUFHSTtBQUNULGdDQUFJQSxJQUFJQyxPQUFSLEVBQWlCLENBQ2hCLENBREQsTUFDTyxJQUFJRCxJQUFJRSxNQUFSLEVBQWdCLENBQ3RCO0FBQ0o7QUFQUSxxQkFBYjtBQVNILGlCQVZELE1BVU87QUFDSFAsdUJBQUdDLFNBQUgsQ0FBYTtBQUNUQywrQkFBTyxJQURFO0FBRVRDLGlDQUFTLFdBRkE7QUFHVEMsK0JBSFMsbUJBR0RDLEdBSEMsRUFHSTtBQUNULGdDQUFJQSxJQUFJQyxPQUFSLEVBQWlCO0FBQ2Isb0NBQU1FLFNBQVNSLEdBQUdTLGNBQUgsQ0FBa0IsUUFBbEIsQ0FBZjtBQUNBVCxtQ0FBR1UsT0FBSCxDQUFXO0FBQ1BDLHlDQUFLLHVDQURFO0FBRVB6QiwwQ0FBTTtBQUNGMEIsbURBQVdaLEdBQUdTLGNBQUgsQ0FBa0IsU0FBbEIsRUFBNkJJLEVBRHRDLEVBQzBDO0FBQzVDVixpREFBU0osS0FBS1YsSUFGWixFQUVrQjtBQUNwQm1CLGdEQUFRQTtBQUhOLHFDQUZDO0FBT1BNLDRDQUFRLE1BUEQ7QUFRUFYsNkNBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNuQlUsZ0RBQVFDLEdBQVIsQ0FBWVgsSUFBSW5CLElBQWhCO0FBQ0FhLDZDQUFLVixJQUFMLEdBQVksRUFBWjtBQUNBVSw2Q0FBS2tCLE1BQUw7QUFDQWpCLDJDQUFHa0IsU0FBSCxDQUFhO0FBQ1RoQixtREFBTyxJQURFO0FBRVRpQixrREFBTSxTQUZHO0FBR1RDLHNEQUFVO0FBSEQseUNBQWI7QUFLQXJCLDZDQUFLc0IsT0FBTDtBQUNIO0FBbEJNLGlDQUFYO0FBb0JILDZCQXRCRCxNQXNCTyxJQUFJaEIsSUFBSUUsTUFBUixFQUFnQixDQUN0QjtBQUNKO0FBNUJRLHFCQUFiO0FBOEJIO0FBQ0o7QUFoREssUzs7Ozs7aUNBNUJEO0FBQ0wsaUJBQUtjLE9BQUw7QUFDSDs7O2tDQUNTO0FBQ04sZ0JBQU1iLFNBQVNSLEdBQUdTLGNBQUgsQ0FBa0IsUUFBbEIsQ0FBZjtBQUNBLGdCQUFNYSxVQUFVdEIsR0FBR1MsY0FBSCxDQUFrQixTQUFsQixDQUFoQjtBQUNBLGdCQUFNVixPQUFPLElBQWI7QUFDQUMsZUFBR1UsT0FBSCxDQUFXO0FBQ1BDLHFCQUFLLHlDQURFO0FBRVB6QixzQkFBTTtBQUNGO0FBQ0FzQiw0QkFBUSw4QkFGTjtBQUdGSSwrQkFBV1UsUUFBUVQ7QUFIakIsaUJBRkM7QUFPUEMsd0JBQVEsTUFQRDtBQVFQVix5QkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ25CVSw0QkFBUUMsR0FBUixDQUFZWCxJQUFJbkIsSUFBaEI7QUFDQSx3QkFBSW1CLElBQUluQixJQUFKLENBQVNxQyxFQUFiLEVBQWlCO0FBQ2JSLGdDQUFRQyxHQUFSLENBQVksWUFBWjtBQUNBakIsNkJBQUtSLE9BQUwsR0FBZWMsSUFBSW5CLElBQUosQ0FBU3NDLElBQXhCO0FBQ0F6Qiw2QkFBS2tCLE1BQUw7QUFDQUYsZ0NBQVFDLEdBQVIsQ0FBWWpCLEtBQUtSLE9BQWpCO0FBQ0g7QUFDSjtBQWhCTSxhQUFYO0FBa0JIOzs7O0VBckNpQyxlQUFLa0MsSTs7a0JBQXRCMUMsUSIsImZpbGUiOiJmZWVkYmFjay5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZlZWRiYWNrIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflrrbplb/lj43ppognXG4gICAgfTtcblxuICAgIGRhdGEgPSB7XG4gICAgICAgIHVzZXJOYW1lOiBudWxsLFxuICAgICAgICBjbGFzc0RldGFpbDogbnVsbCxcbiAgICAgICAgaW5mbzogJycsXG4gICAgICAgIG5vdGVNYXhMZW46IDcwMDAsXG4gICAgICAgIGhpc3Rvcnk6IFtdXG4gICAgfTtcbiAgICBvblNob3coKSB7XG4gICAgICAgIHRoaXMuZ2V0RmVlZCgpO1xuICAgIH1cbiAgICBnZXRGZWVkKCkge1xuICAgICAgICBjb25zdCBvcGVuaWQgPSB3eC5nZXRTdG9yYWdlU3luYygnb3BlbmlkJyk7XG4gICAgICAgIGNvbnN0IHN0dWRlbnQgPSB3eC5nZXRTdG9yYWdlU3luYygnc3R1ZGVudCcpO1xuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6ICdodHRwczovL2JhY2sueXVpeXUuY24vd3gvZmVlZGJhY2svaW5kZXgnLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIC8vIG9wZW5pZDogb3BlbmlkLFxuICAgICAgICAgICAgICAgIG9wZW5pZDogJ28yZlBhNHJiTDFqOEdwMFFscUJEemwzUjQwdkEnLFxuICAgICAgICAgICAgICAgIHN0dWRlbnRJZDogc3R1ZGVudC5pZFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5vaykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5oiQ5Yqf6K+35rGC5Y+N6aaI5Y6G5Y+y6K6w5b2VJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaGlzdG9yeSA9IHJlcy5kYXRhLmxpc3Q7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoYXQuaGlzdG9yeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7fTtcblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIGJpbmRUZXh0QXJlYUNoYW5nZShlKSB7XG4gICAgICAgICAgICB0aGlzLmluZm8gPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgYmluZEZvcm1TdWJtaXQoZSkge1xuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaW5mbykge1xuICAgICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogJ+WPjemmiOS4jeiDveS4uuepuuWTnycsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogJ+aYr+WQpuimgeaPkOS6pOaCqOeahOWPjemmiCcsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvcGVuaWQgPSB3eC5nZXRTdG9yYWdlU3luYygnb3BlbmlkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vYmFjay55dWl5dS5jbi93eC9mZWVkYmFjay9hZGQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHVkZW50SWQ6IHd4LmdldFN0b3JhZ2VTeW5jKCdzdHVkZW50JykuaWQsIC8v5a2m55SfaWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoYXQuaW5mbywgLy/lj43ppojlhoXlrrksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuaWQ6IG9wZW5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmluZm8gPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5oiQ5YqfJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5nZXRGZWVkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuIl19