"use strict";

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
      navigationBarTitleText: "课程表",
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
        var openid = wx.getStorageSync("openid");
        wx.showModal({
          title: "提示",
          content: "确定这节课要请假吗",
          success: function success(res) {
            if (res.confirm) {
              var id = that.allClass[monthIndex].detail[dayIndex].record[classIndex].id;
              wx.request({
                url: "https://back.yuiyu.cn/wx/record/leave",
                data: {
                  id: id,
                  openid: openid
                  // openid: 'o2fPa4rbL1j8Gp0QlqBDzl3R40vA'
                },
                method: "POST",
                success: function success(res) {
                  if (res.data.ok) {
                    wx.showToast({
                      title: "请假成功",
                      icon: "success",
                      duration: 1000
                    });
                    that.getClass();
                  } else {
                    wx.showModal({
                      title: "请假失败",
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
          title: "提示",
          content: "这节课您已经请过假了哟",
          showCancel: false
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ClassDetail, [{
    key: "onShow",
    value: function onShow(options) {
      this.getClass();
    }
    // 下拉添加更多原来的上课记录

  }, {
    key: "onPullDownRefresh",
    value: function onPullDownRefresh() {
      if (this.upHasMore) {
        this.cutCount -= 3;
        this.$apply();
        this.getClass();
      } else {
        wx.showModal({
          title: "提示",
          content: "没有更多历史记录了哟",
          showCancel: false
        });
        wx.stopPullDownRefresh();
      }
    }
  }, {
    key: "dateToDate",
    value: function dateToDate(date) {
      var sDate = new Date();
      if ((typeof date === "undefined" ? "undefined" : _typeof(date)) == "object" && typeof new Date().getMonth == "function") {
        sDate = date;
      } else if (typeof date == "string") {
        var arr = date.split("-");
        if (arr.length == 3) {
          sDate = new Date(arr[0] + "-" + arr[1] + "-" + arr[2]);
        }
      }

      return sDate;
    }

    // 加减月份

  }, {
    key: "addMonth",
    value: function addMonth(_dateObject, x) {
      if (_dateObject == null || undefined == _dateObject || _dateObject == "") {
        _dateObject = new Date();
      }
      _dateObject.setMonth(x);
      var nd = _dateObject.valueOf();
      nd = new Date(nd);

      var y = nd.getFullYear();
      var m = nd.getMonth() + 1;
      var d = nd.getDate();

      if (m <= 9) m = "0" + m;
      if (d <= 9) d = "0" + d;
      var cdate = y + "-" + m;

      return cdate;
    }
    // 上拉加载更多未上课记录

  }, {
    key: "onReachBottom",
    value: function onReachBottom() {
      if (this.downHasMore) {
        this.addCount += 3;
        this.$apply();
        this.getClass();
      } else {
        wx.showModal({
          title: "提示",
          content: "没有更多待上课程了哟",
          showCancel: false
        });
      }
    }
    // 获取课表信息

  }, {
    key: "getClass",
    value: function getClass() {
      var student = wx.getStorageSync("student");
      var openid = wx.getStorageSync("openid");
      var startDate = this.addMonth(new Date(), this.cutCount);
      var endDate = this.addMonth(new Date(), this.addCount);
      var that = this;

      wx.request({
        url: "https://back.yuiyu.cn/wx/record/index",
        data: {
          studentId: student.id, //学生id
          startMonth: startDate, //查询的开始日期
          endMonth: endDate, //查询的结束日期,
          openid: openid
          // openid: 'o2fPa4rbL1j8Gp0QlqBDzl3R40vA'
        },
        method: "POST",
        success: function success(res) {
          console.log(res.data);
          if (res.data.ok) {
            console.log("成功请求课表");
            that.allClass = res.data.list;
            that.downHasMore = res.data.downHasMore;
            that.upHasMore = res.data.upHasMore;
            that.$apply();
            wx.stopPullDownRefresh();
          }
        },
        fail: function fail(e) {
          console.log(e);
        }
      });
    }
  }]);

  return ClassDetail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ClassDetail , 'pages/class'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzLmpzIl0sIm5hbWVzIjpbIkNsYXNzRGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsImRhdGEiLCJ1c2VyTmFtZSIsImFsbENsYXNzIiwiYWRkQ291bnQiLCJjdXRDb3VudCIsInVwSGFzTW9yZSIsImRvd25IYXNNb3JlIiwibWV0aG9kcyIsInNlbGVjdENsYXNzIiwibW9udGhJbmRleCIsImRheUluZGV4IiwiY2xhc3NJbmRleCIsInRoYXQiLCJvcGVuaWQiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJpZCIsImRldGFpbCIsInJlY29yZCIsInJlcXVlc3QiLCJ1cmwiLCJtZXRob2QiLCJvayIsInNob3dUb2FzdCIsImljb24iLCJkdXJhdGlvbiIsImdldENsYXNzIiwiZXJyb3JNc2ciLCJzaG93Q2FuY2VsIiwiY2FuY2xlQ2xhc3MiLCJvcHRpb25zIiwiJGFwcGx5Iiwic3RvcFB1bGxEb3duUmVmcmVzaCIsImRhdGUiLCJzRGF0ZSIsIkRhdGUiLCJnZXRNb250aCIsImFyciIsInNwbGl0IiwibGVuZ3RoIiwiX2RhdGVPYmplY3QiLCJ4IiwidW5kZWZpbmVkIiwic2V0TW9udGgiLCJuZCIsInZhbHVlT2YiLCJ5IiwiZ2V0RnVsbFllYXIiLCJtIiwiZCIsImdldERhdGUiLCJjZGF0ZSIsInN0dWRlbnQiLCJzdGFydERhdGUiLCJhZGRNb250aCIsImVuZERhdGUiLCJzdHVkZW50SWQiLCJzdGFydE1vbnRoIiwiZW5kTW9udGgiLCJjb25zb2xlIiwibG9nIiwibGlzdCIsImZhaWwiLCJlIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxXOzs7Ozs7Ozs7Ozs7OztnTUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsS0FEakI7QUFFUEMs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O0FBQ0EsVUFBTXlELFVBQVUsS0FBS0QsUUFBTCxDQUFjLElBQUluQixJQUFKLEVBQWQsRUFBMEIsS0FBS3RDLFFBQS9CLENBQWhCO0FBQ0EsVUFBTVMsT0FBTyxJQUFiOztBQUVBRSxTQUFHVyxPQUFILENBQVc7QUFDVEMsYUFBSyx1Q0FESTtBQUVUMUIsY0FBTTtBQUNKOEQscUJBQVdKLFFBQVFwQyxFQURmLEVBQ21CO0FBQ3ZCeUMsc0JBQVlKLFNBRlIsRUFFbUI7QUFDdkJLLG9CQUFVSCxPQUhOLEVBR2U7QUFDbkJoRCxrQkFBUUE7QUFDUjtBQUxJLFNBRkc7QUFTVGMsZ0JBQVEsTUFUQztBQVVUUixpQkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCNkMsa0JBQVFDLEdBQVIsQ0FBWTlDLElBQUlwQixJQUFoQjtBQUNBLGNBQUlvQixJQUFJcEIsSUFBSixDQUFTNEIsRUFBYixFQUFpQjtBQUNmcUMsb0JBQVFDLEdBQVIsQ0FBWSxRQUFaO0FBQ0F0RCxpQkFBS1YsUUFBTCxHQUFnQmtCLElBQUlwQixJQUFKLENBQVNtRSxJQUF6QjtBQUNBdkQsaUJBQUtOLFdBQUwsR0FBbUJjLElBQUlwQixJQUFKLENBQVNNLFdBQTVCO0FBQ0FNLGlCQUFLUCxTQUFMLEdBQWlCZSxJQUFJcEIsSUFBSixDQUFTSyxTQUExQjtBQUNBTyxpQkFBS3lCLE1BQUw7QUFDQXZCLGVBQUd3QixtQkFBSDtBQUNEO0FBQ0YsU0FwQlE7QUFxQlQ4QixZQXJCUyxnQkFxQkpDLENBckJJLEVBcUJEO0FBQ05KLGtCQUFRQyxHQUFSLENBQVlHLENBQVo7QUFDRDtBQXZCUSxPQUFYO0FBeUJEOzs7O0VBbEhzQyxlQUFLQyxJOztrQkFBekIxRSxXIiwiZmlsZSI6ImNsYXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tIFwid2VweVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGFzc0RldGFpbCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiBcIuivvueoi+ihqFwiLFxuICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogdHJ1ZVxuICB9O1xuXG4gIGRhdGEgPSB7XG4gICAgdXNlck5hbWU6IG51bGwsXG4gICAgYWxsQ2xhc3M6IFtdLFxuICAgIGFkZENvdW50OiAxLFxuICAgIGN1dENvdW50OiAxLFxuICAgIHVwSGFzTW9yZTogdHJ1ZSxcbiAgICBkb3duSGFzTW9yZTogdHJ1ZVxuICB9O1xuXG4gIG9uU2hvdyhvcHRpb25zKSB7XG4gICAgdGhpcy5nZXRDbGFzcygpO1xuICB9XG4gIC8vIOS4i+aLiea3u+WKoOabtOWkmuWOn+adpeeahOS4iuivvuiusOW9lVxuICBvblB1bGxEb3duUmVmcmVzaCgpIHtcbiAgICBpZiAodGhpcy51cEhhc01vcmUpIHtcbiAgICAgIHRoaXMuY3V0Q291bnQgLT0gMztcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICB0aGlzLmdldENsYXNzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiBcIuaPkOekulwiLFxuICAgICAgICBjb250ZW50OiBcIuayoeacieabtOWkmuWOhuWPsuiusOW9leS6huWTn1wiLFxuICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxuICAgICAgfSk7XG4gICAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKCk7XG4gICAgfVxuICB9XG5cbiAgZGF0ZVRvRGF0ZShkYXRlKSB7XG4gICAgbGV0IHNEYXRlID0gbmV3IERhdGUoKTtcbiAgICBpZiAodHlwZW9mIGRhdGUgPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbmV3IERhdGUoKS5nZXRNb250aCA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHNEYXRlID0gZGF0ZTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkYXRlID09IFwic3RyaW5nXCIpIHtcbiAgICAgIGxldCBhcnIgPSBkYXRlLnNwbGl0KFwiLVwiKTtcbiAgICAgIGlmIChhcnIubGVuZ3RoID09IDMpIHtcbiAgICAgICAgc0RhdGUgPSBuZXcgRGF0ZShhcnJbMF0gKyBcIi1cIiArIGFyclsxXSArIFwiLVwiICsgYXJyWzJdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc0RhdGU7XG4gIH1cblxuICAvLyDliqDlh4/mnIjku71cbiAgYWRkTW9udGgoX2RhdGVPYmplY3QsIHgpIHtcbiAgICBpZiAoX2RhdGVPYmplY3QgPT0gbnVsbCB8fCB1bmRlZmluZWQgPT0gX2RhdGVPYmplY3QgfHwgX2RhdGVPYmplY3QgPT0gXCJcIikge1xuICAgICAgX2RhdGVPYmplY3QgPSBuZXcgRGF0ZSgpO1xuICAgIH1cbiAgICBfZGF0ZU9iamVjdC5zZXRNb250aCh4KTtcbiAgICB2YXIgbmQgPSBfZGF0ZU9iamVjdC52YWx1ZU9mKCk7XG4gICAgbmQgPSBuZXcgRGF0ZShuZCk7XG5cbiAgICB2YXIgeSA9IG5kLmdldEZ1bGxZZWFyKCk7XG4gICAgdmFyIG0gPSBuZC5nZXRNb250aCgpICsgMTtcbiAgICB2YXIgZCA9IG5kLmdldERhdGUoKTtcblxuICAgIGlmIChtIDw9IDkpIG0gPSBcIjBcIiArIG07XG4gICAgaWYgKGQgPD0gOSkgZCA9IFwiMFwiICsgZDtcbiAgICB2YXIgY2RhdGUgPSB5ICsgXCItXCIgKyBtO1xuXG4gICAgcmV0dXJuIGNkYXRlO1xuICB9XG4gIC8vIOS4iuaLieWKoOi9veabtOWkmuacquS4iuivvuiusOW9lVxuICBvblJlYWNoQm90dG9tKCkge1xuICAgIGlmICh0aGlzLmRvd25IYXNNb3JlKSB7XG4gICAgICB0aGlzLmFkZENvdW50ICs9IDM7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgdGhpcy5nZXRDbGFzcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogXCLmj5DnpLpcIixcbiAgICAgICAgY29udGVudDogXCLmsqHmnInmm7TlpJrlvoXkuIror77nqIvkuoblk59cIixcbiAgICAgICAgc2hvd0NhbmNlbDogZmFsc2VcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICAvLyDojrflj5bor77ooajkv6Hmga9cbiAgZ2V0Q2xhc3MoKSB7XG4gICAgY29uc3Qgc3R1ZGVudCA9IHd4LmdldFN0b3JhZ2VTeW5jKFwic3R1ZGVudFwiKTtcbiAgICBjb25zdCBvcGVuaWQgPSB3eC5nZXRTdG9yYWdlU3luYyhcIm9wZW5pZFwiKTtcbiAgICBjb25zdCBzdGFydERhdGUgPSB0aGlzLmFkZE1vbnRoKG5ldyBEYXRlKCksIHRoaXMuY3V0Q291bnQpO1xuICAgIGNvbnN0IGVuZERhdGUgPSB0aGlzLmFkZE1vbnRoKG5ldyBEYXRlKCksIHRoaXMuYWRkQ291bnQpO1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuXG4gICAgd3gucmVxdWVzdCh7XG4gICAgICB1cmw6IFwiaHR0cHM6Ly9iYWNrLnl1aXl1LmNuL3d4L3JlY29yZC9pbmRleFwiLFxuICAgICAgZGF0YToge1xuICAgICAgICBzdHVkZW50SWQ6IHN0dWRlbnQuaWQsIC8v5a2m55SfaWRcbiAgICAgICAgc3RhcnRNb250aDogc3RhcnREYXRlLCAvL+afpeivoueahOW8gOWni+aXpeacn1xuICAgICAgICBlbmRNb250aDogZW5kRGF0ZSwgLy/mn6Xor6LnmoTnu5PmnZ/ml6XmnJ8sXG4gICAgICAgIG9wZW5pZDogb3BlbmlkXG4gICAgICAgIC8vIG9wZW5pZDogJ28yZlBhNHJiTDFqOEdwMFFscUJEemwzUjQwdkEnXG4gICAgICB9LFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG4gICAgICAgIGlmIChyZXMuZGF0YS5vaykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwi5oiQ5Yqf6K+35rGC6K++6KGoXCIpO1xuICAgICAgICAgIHRoYXQuYWxsQ2xhc3MgPSByZXMuZGF0YS5saXN0O1xuICAgICAgICAgIHRoYXQuZG93bkhhc01vcmUgPSByZXMuZGF0YS5kb3duSGFzTW9yZTtcbiAgICAgICAgICB0aGF0LnVwSGFzTW9yZSA9IHJlcy5kYXRhLnVwSGFzTW9yZTtcbiAgICAgICAgICB0aGF0LiRhcHBseSgpO1xuICAgICAgICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGZhaWwoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIC8vIOeCueWHu+ivt+WBh+aMiemSrlxuICAgIHNlbGVjdENsYXNzKG1vbnRoSW5kZXgsIGRheUluZGV4LCBjbGFzc0luZGV4KSB7XG4gICAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAgIGNvbnN0IG9wZW5pZCA9IHd4LmdldFN0b3JhZ2VTeW5jKFwib3BlbmlkXCIpO1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6IFwi5o+Q56S6XCIsXG4gICAgICAgIGNvbnRlbnQ6IFwi56Gu5a6a6L+Z6IqC6K++6KaB6K+35YGH5ZCXXCIsXG4gICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICBjb25zdCBpZCA9XG4gICAgICAgICAgICAgIHRoYXQuYWxsQ2xhc3NbbW9udGhJbmRleF0uZGV0YWlsW2RheUluZGV4XS5yZWNvcmRbY2xhc3NJbmRleF0uaWQ7XG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgdXJsOiBcImh0dHBzOi8vYmFjay55dWl5dS5jbi93eC9yZWNvcmQvbGVhdmVcIixcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgICBvcGVuaWQ6IG9wZW5pZFxuICAgICAgICAgICAgICAgIC8vIG9wZW5pZDogJ28yZlBhNHJiTDFqOEdwMFFscUJEemwzUjQwdkEnXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5vaykge1xuICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwi6K+35YGH5oiQ5YqfXCIsXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB0aGF0LmdldENsYXNzKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIuivt+WBh+Wksei0pVwiLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiByZXMuZGF0YS5lcnJvck1zZyxcbiAgICAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2VcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgY2FuY2xlQ2xhc3MobW9udGhJbmRleCwgZGF5SW5kZXgsIGNsYXNzSW5kZXgpIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiBcIuaPkOekulwiLFxuICAgICAgICBjb250ZW50OiBcIui/meiKguivvuaCqOW3sue7j+ivt+i/h+WBh+S6huWTn1wiLFxuICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufVxuIl19