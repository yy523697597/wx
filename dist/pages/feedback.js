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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlZWRiYWNrLmpzIl0sIm5hbWVzIjpbIkZlZWRiYWNrIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1c2VyTmFtZSIsImNsYXNzRGV0YWlsIiwiaW5mbyIsIm5vdGVNYXhMZW4iLCJoaXN0b3J5IiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiYmluZFRleHRBcmVhQ2hhbmdlIiwiZSIsImRldGFpbCIsInZhbHVlIiwiYmluZEZvcm1TdWJtaXQiLCJ0aGF0Iiwid3giLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImNhbmNlbCIsIm9wZW5pZCIsImdldFN0b3JhZ2VTeW5jIiwicmVxdWVzdCIsInVybCIsInN0dWRlbnRJZCIsImlkIiwibWV0aG9kIiwiY29uc29sZSIsImxvZyIsIiRhcHBseSIsInNob3dUb2FzdCIsImljb24iLCJkdXJhdGlvbiIsImdldEZlZWQiLCJzdHVkZW50Iiwib2siLCJsaXN0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7Ozs7OExBQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFJVEMsSSxHQUFPO0FBQ0hDLHNCQUFVLElBRFA7QUFFSEMseUJBQWEsSUFGVjtBQUdIQyxrQkFBTSxFQUhIO0FBSUhDLHdCQUFZLElBSlQ7QUFLSEMscUJBQVM7QUFMTixTLFFBaUNQQyxRLEdBQVcsRSxRQUVYQyxPLEdBQVU7QUFDTkMsOEJBRE0sOEJBQ2FDLENBRGIsRUFDZ0I7QUFDbEIscUJBQUtOLElBQUwsR0FBWU0sRUFBRUMsTUFBRixDQUFTQyxLQUFyQjtBQUNILGFBSEs7QUFJTkMsMEJBSk0sMEJBSVNILENBSlQsRUFJWTtBQUNkLG9CQUFNSSxPQUFPLElBQWI7QUFDQSxvQkFBSSxDQUFDLEtBQUtWLElBQVYsRUFBZ0I7QUFDWlcsdUJBQUdDLFNBQUgsQ0FBYTtBQUNUQywrQkFBTyxJQURFO0FBRVRDLGlDQUFTLFNBRkE7QUFHVEMsK0JBSFMsbUJBR0RDLEdBSEMsRUFHSTtBQUNULGdDQUFJQSxJQUFJQyxPQUFSLEVBQWlCLENBQ2hCLENBREQsTUFDTyxJQUFJRCxJQUFJRSxNQUFSLEVBQWdCLENBQ3RCO0FBQ0o7QUFQUSxxQkFBYjtBQVNILGlCQVZELE1BVU87QUFDSFAsdUJBQUdDLFNBQUgsQ0FBYTtBQUNUQywrQkFBTyxJQURFO0FBRVRDLGlDQUFTLFdBRkE7QUFHVEMsK0JBSFMsbUJBR0RDLEdBSEMsRUFHSTtBQUNULGdDQUFJQSxJQUFJQyxPQUFSLEVBQWlCO0FBQ2Isb0NBQU1FLFNBQVNSLEdBQUdTLGNBQUgsQ0FBa0IsUUFBbEIsQ0FBZjtBQUNBVCxtQ0FBR1UsT0FBSCxDQUFXO0FBQ1BDLHlDQUFLLHVDQURFO0FBRVB6QiwwQ0FBTTtBQUNGMEIsbURBQVdaLEdBQUdTLGNBQUgsQ0FBa0IsU0FBbEIsRUFBNkJJLEVBRHRDLEVBQzBDO0FBQzVDVixpREFBU0osS0FBS1YsSUFGWixFQUVrQjtBQUNwQm1CLGdEQUFRQTtBQUhOLHFDQUZDO0FBT1BNLDRDQUFRLE1BUEQ7QUFRUFYsNkNBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNuQlUsZ0RBQVFDLEdBQVIsQ0FBWVgsSUFBSW5CLElBQWhCO0FBQ0FhLDZDQUFLVixJQUFMLEdBQVksRUFBWjtBQUNBVSw2Q0FBS2tCLE1BQUw7QUFDQWpCLDJDQUFHa0IsU0FBSCxDQUFhO0FBQ1RoQixtREFBTyxJQURFO0FBRVRpQixrREFBTSxTQUZHO0FBR1RDLHNEQUFVO0FBSEQseUNBQWI7QUFLQXJCLDZDQUFLc0IsT0FBTDtBQUNIO0FBbEJNLGlDQUFYO0FBb0JILDZCQXRCRCxNQXNCTyxJQUFJaEIsSUFBSUUsTUFBUixFQUFnQixDQUN0QjtBQUNKO0FBNUJRLHFCQUFiO0FBOEJIO0FBQ0o7QUFoREssUzs7Ozs7aUNBNUJEO0FBQ0wsaUJBQUtjLE9BQUw7QUFDSDs7O2tDQUNTO0FBQ04sZ0JBQU1iLFNBQVNSLEdBQUdTLGNBQUgsQ0FBa0IsUUFBbEIsQ0FBZjtBQUNBLGdCQUFNYSxVQUFVdEIsR0FBR1MsY0FBSCxDQUFrQixTQUFsQixDQUFoQjtBQUNBLGdCQUFNVixPQUFPLElBQWI7QUFDQUMsZUFBR1UsT0FBSCxDQUFXO0FBQ1BDLHFCQUFLLHlDQURFO0FBRVB6QixzQkFBTTtBQUNGO0FBQ0FzQiw0QkFBUSw4QkFGTjtBQUdGSSwrQkFBV1UsUUFBUVQ7QUFIakIsaUJBRkM7QUFPUEMsd0JBQVEsTUFQRDtBQVFQVix5QkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ25CVSw0QkFBUUMsR0FBUixDQUFZWCxJQUFJbkIsSUFBaEI7QUFDQSx3QkFBSW1CLElBQUluQixJQUFKLENBQVNxQyxFQUFiLEVBQWlCO0FBQ2JSLGdDQUFRQyxHQUFSLENBQVksWUFBWjtBQUNBakIsNkJBQUtSLE9BQUwsR0FBZWMsSUFBSW5CLElBQUosQ0FBU3NDLElBQXhCO0FBQ0F6Qiw2QkFBS2tCLE1BQUw7QUFDQUYsZ0NBQVFDLEdBQVIsQ0FBWWpCLEtBQUtSLE9BQWpCO0FBQ0g7QUFDSjtBQWhCTSxhQUFYO0FBa0JIOzs7O0VBckNpQyxlQUFLa0MsSTs7a0JBQXRCMUMsUSIsImZpbGUiOiJmZWVkYmFjay5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZlZWRiYWNrIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5a626ZW/5Y+N6aaIJ1xyXG4gICAgfTtcclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIHVzZXJOYW1lOiBudWxsLFxyXG4gICAgICAgIGNsYXNzRGV0YWlsOiBudWxsLFxyXG4gICAgICAgIGluZm86ICcnLFxyXG4gICAgICAgIG5vdGVNYXhMZW46IDcwMDAsXHJcbiAgICAgICAgaGlzdG9yeTogW11cclxuICAgIH07XHJcbiAgICBvblNob3coKSB7XHJcbiAgICAgICAgdGhpcy5nZXRGZWVkKCk7XHJcbiAgICB9XHJcbiAgICBnZXRGZWVkKCkge1xyXG4gICAgICAgIGNvbnN0IG9wZW5pZCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdvcGVuaWQnKTtcclxuICAgICAgICBjb25zdCBzdHVkZW50ID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3N0dWRlbnQnKTtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9iYWNrLnl1aXl1LmNuL3d4L2ZlZWRiYWNrL2luZGV4JyxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgLy8gb3BlbmlkOiBvcGVuaWQsXHJcbiAgICAgICAgICAgICAgICBvcGVuaWQ6ICdvMmZQYTRyYkwxajhHcDBRbHFCRHpsM1I0MHZBJyxcclxuICAgICAgICAgICAgICAgIHN0dWRlbnRJZDogc3R1ZGVudC5pZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEub2spIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5oiQ5Yqf6K+35rGC5Y+N6aaI5Y6G5Y+y6K6w5b2VJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5oaXN0b3J5ID0gcmVzLmRhdGEubGlzdDtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoYXQuaGlzdG9yeSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGNvbXB1dGVkID0ge307XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBiaW5kVGV4dEFyZWFDaGFuZ2UoZSkge1xyXG4gICAgICAgICAgICB0aGlzLmluZm8gPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRGb3JtU3VibWl0KGUpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pbmZvKSB7XHJcbiAgICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAn5Y+N6aaI5LiN6IO95Li656m65ZOfJyxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfmmK/lkKbopoHmj5DkuqTmgqjnmoTlj43ppognLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3BlbmlkID0gd3guZ2V0U3RvcmFnZVN5bmMoJ29wZW5pZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9iYWNrLnl1aXl1LmNuL3d4L2ZlZWRiYWNrL2FkZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHVkZW50SWQ6IHd4LmdldFN0b3JhZ2VTeW5jKCdzdHVkZW50JykuaWQsIC8v5a2m55SfaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogdGhhdC5pbmZvLCAvL+WPjemmiOWGheWuuSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmlkOiBvcGVuaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW5mbyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmiJDlip8nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ2V0RmVlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG4iXX0=