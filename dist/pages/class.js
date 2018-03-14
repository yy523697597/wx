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
            allClass: [],
            addCount: 1,
            cutCount: 1,
            upHasMore: true,
            downHasMore: true
        }, _this.methods = {
            // 点击请假按钮
            selectClass: function selectClass(monthIndex, dayIndex, classIndex) {
                var that = this;
                var openid = wx.getStorageSync('openid');
                wx.showModal({
                    title: '提示',
                    content: '确定这节课要请假吗',
                    success: function success(res) {
                        if (res.confirm) {
                            var id = that.allClass[monthIndex].detail[dayIndex].record[classIndex].id;
                            wx.request({
                                url: 'https://back.yuiyu.cn/wx/record/leave',
                                data: {
                                    id: id,
                                    openid: openid
                                    // openid: 'o2fPa4rbL1j8Gp0QlqBDzl3R40vA'
                                },
                                method: 'POST',
                                success: function success(res) {
                                    if (res.data.ok) {
                                        wx.showToast({
                                            title: '请假成功',
                                            icon: 'success',
                                            duration: 1000
                                        });
                                        that.getClass();
                                    } else {
                                        wx.showModal({
                                            title: '请假失败',
                                            content: res.data.errorMsg,
                                            showCancel: false
                                        });
                                    }
                                }
                            });
                        }
                    }
                });
            },
            cancleClass: function cancleClass(monthIndex, dayIndex, classIndex) {
                wx.showModal({
                    title: '提示',
                    content: '这节课您已经请过假了哟',
                    showCancel: false
                });
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
            if (this.upHasMore) {
                this.cutCount -= 3;
                this.$apply();
                this.getClass();
            } else {
                wx.showModal({
                    title: '提示',
                    content: '没有更多历史记录了哟',
                    showCancel: false
                });
                wx.stopPullDownRefresh();
            }
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

        // 加减月份

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
        value: function onReachBottom() {
            if (this.downHasMore) {
                this.addCount += 3;
                this.$apply();
                this.getClass();
            } else {
                wx.showModal({
                    title: '提示',
                    content: '没有更多待上课程了哟',
                    showCancel: false
                });
            }
        }
        // 获取课表信息

    }, {
        key: 'getClass',
        value: function getClass() {
            var student = wx.getStorageSync('student');
            var openid = wx.getStorageSync('openid');
            var startDate = this.addMonth(new Date(), -this.cutCount);
            var endDate = this.addMonth(new Date(), this.addCount);
            var that = this;
            wx.request({
                url: 'https://back.yuiyu.cn/wx/record/index',
                data: {
                    studentId: student.id, //学生id
                    startMonth: startDate, //查询的开始日期
                    endMonth: endDate, //查询的结束日期,
                    openid: openid
                    // openid: 'o2fPa4rbL1j8Gp0QlqBDzl3R40vA'
                },
                method: 'POST',
                success: function success(res) {
                    console.log(res.data);
                    if (res.data.ok) {
                        console.log('成功请求课表');
                        that.allClass = res.data.list;
                        that.downHasMore = res.data.downHasMore;
                        that.upHasMore = res.data.upHasMore;
                        that.$apply();
                        wx.stopPullDownRefresh();
                    }
                }
            });
        }
    }]);

    return ClassDetail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ClassDetail , 'pages/class'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzLmpzIl0sIm5hbWVzIjpbIkNsYXNzRGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsImRhdGEiLCJ1c2VyTmFtZSIsImFsbENsYXNzIiwiYWRkQ291bnQiLCJjdXRDb3VudCIsInVwSGFzTW9yZSIsImRvd25IYXNNb3JlIiwibWV0aG9kcyIsInNlbGVjdENsYXNzIiwibW9udGhJbmRleCIsImRheUluZGV4IiwiY2xhc3NJbmRleCIsInRoYXQiLCJvcGVuaWQiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJpZCIsImRldGFpbCIsInJlY29yZCIsInJlcXVlc3QiLCJ1cmwiLCJtZXRob2QiLCJvayIsInNob3dUb2FzdCIsImljb24iLCJkdXJhdGlvbiIsImdldENsYXNzIiwiZXJyb3JNc2ciLCJzaG93Q2FuY2VsIiwiY2FuY2xlQ2xhc3MiLCJvcHRpb25zIiwiJGFwcGx5Iiwic3RvcFB1bGxEb3duUmVmcmVzaCIsImRhdGUiLCJzRGF0ZSIsIkRhdGUiLCJnZXRNb250aCIsImFyciIsInNwbGl0IiwibGVuZ3RoIiwibnVtIiwicGFyc2VJbnQiLCJkYXRlVG9EYXRlIiwic1llYXIiLCJnZXRGdWxsWWVhciIsInNNb250aCIsInNEYXkiLCJnZXREYXRlIiwiZVllYXIiLCJlTW9udGgiLCJlRGF5IiwiZURhdGUiLCJtb250aCIsInN0dWRlbnQiLCJzdGFydERhdGUiLCJhZGRNb250aCIsImVuZERhdGUiLCJzdHVkZW50SWQiLCJzdGFydE1vbnRoIiwiZW5kTW9udGgiLCJjb25zb2xlIiwibG9nIiwibGlzdCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsVzs7Ozs7Ozs7Ozs7Ozs7b01BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCLEtBRG5C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SDs7OztFQTVIb0MsZUFBSytCLEk7O2tCQUF6QnpFLFciLCJmaWxlIjoiY2xhc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGFzc0RldGFpbCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6K++56iL6KGoJyxcbiAgICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiB0cnVlXG4gICAgfTtcblxuICAgIGRhdGEgPSB7XG4gICAgICAgIHVzZXJOYW1lOiBudWxsLFxuICAgICAgICBhbGxDbGFzczogW10sXG4gICAgICAgIGFkZENvdW50OiAxLFxuICAgICAgICBjdXRDb3VudDogMSxcbiAgICAgICAgdXBIYXNNb3JlOiB0cnVlLFxuICAgICAgICBkb3duSGFzTW9yZTogdHJ1ZVxuICAgIH07XG5cbiAgICBvbkxvYWQob3B0aW9ucykge1xuICAgICAgICB0aGlzLmdldENsYXNzKCk7XG4gICAgfVxuICAgIC8vIOS4i+aLiea3u+WKoOabtOWkmuWOn+adpeeahOS4iuivvuiusOW9lVxuICAgIG9uUHVsbERvd25SZWZyZXNoKCkge1xuICAgICAgICBpZiAodGhpcy51cEhhc01vcmUpIHtcbiAgICAgICAgICAgIHRoaXMuY3V0Q291bnQgLT0gMztcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgICB0aGlzLmdldENsYXNzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiAn5rKh5pyJ5pu05aSa5Y6G5Y+y6K6w5b2V5LqG5ZOfJyxcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkYXRlVG9EYXRlKGRhdGUpIHtcbiAgICAgICAgbGV0IHNEYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdHlwZW9mIGRhdGUgPT0gJ29iamVjdCcgJiZcbiAgICAgICAgICAgIHR5cGVvZiBuZXcgRGF0ZSgpLmdldE1vbnRoID09ICdmdW5jdGlvbidcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBzRGF0ZSA9IGRhdGU7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRhdGUgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGxldCBhcnIgPSBkYXRlLnNwbGl0KCctJyk7XG4gICAgICAgICAgICBpZiAoYXJyLmxlbmd0aCA9PSAzKSB7XG4gICAgICAgICAgICAgICAgc0RhdGUgPSBuZXcgRGF0ZShhcnJbMF0gKyAnLScgKyBhcnJbMV0gKyAnLScgKyBhcnJbMl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNEYXRlO1xuICAgIH1cblxuICAgIC8vIOWKoOWHj+aciOS7vVxuICAgIGFkZE1vbnRoKGRhdGUsIG51bSkge1xuICAgICAgICBudW0gPSBwYXJzZUludChudW0pO1xuICAgICAgICBsZXQgc0RhdGUgPSB0aGlzLmRhdGVUb0RhdGUoZGF0ZSk7XG5cbiAgICAgICAgbGV0IHNZZWFyID0gc0RhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgbGV0IHNNb250aCA9IHNEYXRlLmdldE1vbnRoKCkgKyAxO1xuICAgICAgICBsZXQgc0RheSA9IHNEYXRlLmdldERhdGUoKTtcblxuICAgICAgICBsZXQgZVllYXIgPSBzWWVhcjtcbiAgICAgICAgbGV0IGVNb250aCA9IHNNb250aCArIG51bTtcbiAgICAgICAgbGV0IGVEYXkgPSBzRGF5O1xuICAgICAgICB3aGlsZSAoZU1vbnRoID4gMTIpIHtcbiAgICAgICAgICAgIGVZZWFyKys7XG4gICAgICAgICAgICBlTW9udGggLT0gMTI7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZURhdGUgPSBuZXcgRGF0ZShlWWVhciwgZU1vbnRoIC0gMSwgZURheSk7XG5cbiAgICAgICAgd2hpbGUgKGVEYXRlLmdldE1vbnRoKCkgIT0gZU1vbnRoIC0gMSkge1xuICAgICAgICAgICAgZURheS0tO1xuICAgICAgICAgICAgZURhdGUgPSBuZXcgRGF0ZShlWWVhciwgZU1vbnRoIC0gMSwgZURheSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG1vbnRoID0gZURhdGUuZ2V0TW9udGgoKSArIDE7XG4gICAgICAgIGlmIChtb250aCA8IDEwKSB7XG4gICAgICAgICAgICBtb250aCA9ICcwJyArIG1vbnRoO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlRGF0ZS5nZXRGdWxsWWVhcigpICsgJy0nICsgbW9udGg7XG4gICAgfVxuXG4gICAgLy8g5LiK5ouJ5Yqg6L295pu05aSa5pyq5LiK6K++6K6w5b2VXG4gICAgb25SZWFjaEJvdHRvbSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZG93bkhhc01vcmUpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkQ291bnQgKz0gMztcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgICB0aGlzLmdldENsYXNzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiAn5rKh5pyJ5pu05aSa5b6F5LiK6K++56iL5LqG5ZOfJyxcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8g6I635Y+W6K++6KGo5L+h5oGvXG4gICAgZ2V0Q2xhc3MoKSB7XG4gICAgICAgIGNvbnN0IHN0dWRlbnQgPSB3eC5nZXRTdG9yYWdlU3luYygnc3R1ZGVudCcpO1xuICAgICAgICBjb25zdCBvcGVuaWQgPSB3eC5nZXRTdG9yYWdlU3luYygnb3BlbmlkJyk7XG4gICAgICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IHRoaXMuYWRkTW9udGgobmV3IERhdGUoKSwgLXRoaXMuY3V0Q291bnQpO1xuICAgICAgICBjb25zdCBlbmREYXRlID0gdGhpcy5hZGRNb250aChuZXcgRGF0ZSgpLCB0aGlzLmFkZENvdW50KTtcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9iYWNrLnl1aXl1LmNuL3d4L3JlY29yZC9pbmRleCcsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgc3R1ZGVudElkOiBzdHVkZW50LmlkLCAvL+WtpueUn2lkXG4gICAgICAgICAgICAgICAgc3RhcnRNb250aDogc3RhcnREYXRlLCAvL+afpeivoueahOW8gOWni+aXpeacn1xuICAgICAgICAgICAgICAgIGVuZE1vbnRoOiBlbmREYXRlLCAvL+afpeivoueahOe7k+adn+aXpeacnyxcbiAgICAgICAgICAgICAgICBvcGVuaWQ6IG9wZW5pZFxuICAgICAgICAgICAgICAgIC8vIG9wZW5pZDogJ28yZlBhNHJiTDFqOEdwMFFscUJEemwzUjQwdkEnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmiJDlip/or7fmsYLor77ooagnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5hbGxDbGFzcyA9IHJlcy5kYXRhLmxpc3Q7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZG93bkhhc01vcmUgPSByZXMuZGF0YS5kb3duSGFzTW9yZTtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC51cEhhc01vcmUgPSByZXMuZGF0YS51cEhhc01vcmU7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgICAvLyDngrnlh7vor7flgYfmjInpkq5cbiAgICAgICAgc2VsZWN0Q2xhc3MobW9udGhJbmRleCwgZGF5SW5kZXgsIGNsYXNzSW5kZXgpIHtcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgY29uc3Qgb3BlbmlkID0gd3guZ2V0U3RvcmFnZVN5bmMoJ29wZW5pZCcpO1xuICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogJ+ehruWumui/meiKguivvuimgeivt+WBh+WQlycsXG4gICAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpZCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hbGxDbGFzc1ttb250aEluZGV4XS5kZXRhaWxbZGF5SW5kZXhdLnJlY29yZFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NJbmRleFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0uaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdodHRwczovL2JhY2sueXVpeXUuY24vd3gvcmVjb3JkL2xlYXZlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmlkOiBvcGVuaWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3BlbmlkOiAnbzJmUGE0cmJMMWo4R3AwUWxxQkR6bDNSNDB2QSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEub2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfor7flgYfmiJDlip8nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdldENsYXNzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn6K+35YGH5aSx6LSlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiByZXMuZGF0YS5lcnJvck1zZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNhbmNsZUNsYXNzKG1vbnRoSW5kZXgsIGRheUluZGV4LCBjbGFzc0luZGV4KSB7XG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiAn6L+Z6IqC6K++5oKo5bey57uP6K+36L+H5YGH5LqG5ZOfJyxcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuIl19