"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _moment = require('./../npm/moment/moment.js');

var _moment2 = _interopRequireDefault(_moment);

require('./../npm/moment/locale/zh-cn.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_moment2.default.locale("zh-cn");

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
      addCount: 2,
      cutCount: 0,
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
        this.cutCount += 3;
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
      console.log(m);

      if (m <= 9) m = "0" + m;
      if (d <= 9) d = "0" + d;
      var cdate = y + "-" + m;
      console.log(cdate);

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

      var month = (0, _moment2.default)().month() + 1;
      console.log(month);
      var startDate = (0, _moment2.default)().subtract(this.cutCount, "months").format("YYYY-MM");
      var endDate = (0, _moment2.default)().add(this.addCount, "months").format("YYYY-MM");
      // let now = new Date();
      // const startDate = this.addMonth(now, this.cutCount);
      // const endDate = this.addMonth(now, this.addCount);
      console.log(startDate, endDate);

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzLmpzIl0sIm5hbWVzIjpbImxvY2FsZSIsIkNsYXNzRGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsImRhdGEiLCJ1c2VyTmFtZSIsImFsbENsYXNzIiwiYWRkQ291bnQiLCJjdXRDb3VudCIsInVwSGFzTW9yZSIsImRvd25IYXNNb3JlIiwibWV0aG9kcyIsInNlbGVjdENsYXNzIiwibW9udGhJbmRleCIsImRheUluZGV4IiwiY2xhc3NJbmRleCIsInRoYXQiLCJvcGVuaWQiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJpZCIsImRldGFpbCIsInJlY29yZCIsInJlcXVlc3QiLCJ1cmwiLCJtZXRob2QiLCJvayIsInNob3dUb2FzdCIsImljb24iLCJkdXJhdGlvbiIsImdldENsYXNzIiwiZXJyb3JNc2ciLCJzaG93Q2FuY2VsIiwiY2FuY2xlQ2xhc3MiLCJvcHRpb25zIiwiJGFwcGx5Iiwic3RvcFB1bGxEb3duUmVmcmVzaCIsImRhdGUiLCJzRGF0ZSIsIkRhdGUiLCJnZXRNb250aCIsImFyciIsInNwbGl0IiwibGVuZ3RoIiwiX2RhdGVPYmplY3QiLCJ4IiwidW5kZWZpbmVkIiwic2V0TW9udGgiLCJuZCIsInZhbHVlT2YiLCJ5IiwiZ2V0RnVsbFllYXIiLCJtIiwiZCIsImdldERhdGUiLCJjb25zb2xlIiwibG9nIiwiY2RhdGUiLCJzdHVkZW50IiwibW9udGgiLCJzdGFydERhdGUiLCJzdWJ0cmFjdCIsImZvcm1hdCIsImVuZERhdGUiLCJhZGQiLCJzdHVkZW50SWQiLCJzdGFydE1vbnRoIiwiZW5kTW9udGgiLCJsaXN0IiwiZmFpbCIsImUiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztBQUNBLGlCQUFPQSxNQUFQ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cUJUaUMsWUFyQlMsZ0JBcUJKQyxDQXJCSSxFQXFCRDtBQUNOZixrQkFBUUMsR0FBUixDQUFZYyxDQUFaO0FBQ0Q7QUF2QlEsT0FBWDtBQXlCRDs7OztFQWhJc0MsZUFBS0MsSTs7a0JBQXpCN0UsVyIsImZpbGUiOiJjbGFzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSBcIndlcHlcIjtcbmltcG9ydCBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xuaW1wb3J0IFwibW9tZW50L2xvY2FsZS96aC1jblwiO1xubW9tZW50LmxvY2FsZShcInpoLWNuXCIpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGFzc0RldGFpbCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiBcIuivvueoi+ihqFwiLFxuICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogdHJ1ZVxuICB9O1xuXG4gIGRhdGEgPSB7XG4gICAgdXNlck5hbWU6IG51bGwsXG4gICAgYWxsQ2xhc3M6IFtdLFxuICAgIGFkZENvdW50OiAyLFxuICAgIGN1dENvdW50OiAwLFxuICAgIHVwSGFzTW9yZTogdHJ1ZSxcbiAgICBkb3duSGFzTW9yZTogdHJ1ZVxuICB9O1xuXG4gIG9uU2hvdyhvcHRpb25zKSB7XG4gICAgdGhpcy5nZXRDbGFzcygpO1xuICB9XG4gIC8vIOS4i+aLiea3u+WKoOabtOWkmuWOn+adpeeahOS4iuivvuiusOW9lVxuICBvblB1bGxEb3duUmVmcmVzaCgpIHtcbiAgICBpZiAodGhpcy51cEhhc01vcmUpIHtcbiAgICAgIHRoaXMuY3V0Q291bnQgKz0gMztcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICB0aGlzLmdldENsYXNzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiBcIuaPkOekulwiLFxuICAgICAgICBjb250ZW50OiBcIuayoeacieabtOWkmuWOhuWPsuiusOW9leS6huWTn1wiLFxuICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxuICAgICAgfSk7XG4gICAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKCk7XG4gICAgfVxuICB9XG5cbiAgZGF0ZVRvRGF0ZShkYXRlKSB7XG4gICAgbGV0IHNEYXRlID0gbmV3IERhdGUoKTtcbiAgICBpZiAodHlwZW9mIGRhdGUgPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbmV3IERhdGUoKS5nZXRNb250aCA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHNEYXRlID0gZGF0ZTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkYXRlID09IFwic3RyaW5nXCIpIHtcbiAgICAgIGxldCBhcnIgPSBkYXRlLnNwbGl0KFwiLVwiKTtcbiAgICAgIGlmIChhcnIubGVuZ3RoID09IDMpIHtcbiAgICAgICAgc0RhdGUgPSBuZXcgRGF0ZShhcnJbMF0gKyBcIi1cIiArIGFyclsxXSArIFwiLVwiICsgYXJyWzJdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc0RhdGU7XG4gIH1cblxuICAvLyDliqDlh4/mnIjku71cbiAgYWRkTW9udGgoX2RhdGVPYmplY3QsIHgpIHtcbiAgICBpZiAoX2RhdGVPYmplY3QgPT0gbnVsbCB8fCB1bmRlZmluZWQgPT0gX2RhdGVPYmplY3QgfHwgX2RhdGVPYmplY3QgPT0gXCJcIikge1xuICAgICAgX2RhdGVPYmplY3QgPSBuZXcgRGF0ZSgpO1xuICAgIH1cbiAgICBfZGF0ZU9iamVjdC5zZXRNb250aCh4KTtcbiAgICB2YXIgbmQgPSBfZGF0ZU9iamVjdC52YWx1ZU9mKCk7XG4gICAgbmQgPSBuZXcgRGF0ZShuZCk7XG5cbiAgICB2YXIgeSA9IG5kLmdldEZ1bGxZZWFyKCk7XG4gICAgdmFyIG0gPSBuZC5nZXRNb250aCgpICsgMTtcbiAgICB2YXIgZCA9IG5kLmdldERhdGUoKTtcbiAgICBjb25zb2xlLmxvZyhtKTtcblxuICAgIGlmIChtIDw9IDkpIG0gPSBcIjBcIiArIG07XG4gICAgaWYgKGQgPD0gOSkgZCA9IFwiMFwiICsgZDtcbiAgICB2YXIgY2RhdGUgPSB5ICsgXCItXCIgKyBtO1xuICAgIGNvbnNvbGUubG9nKGNkYXRlKTtcblxuICAgIHJldHVybiBjZGF0ZTtcbiAgfVxuICAvLyDkuIrmi4nliqDovb3mm7TlpJrmnKrkuIror77orrDlvZVcbiAgb25SZWFjaEJvdHRvbSgpIHtcbiAgICBpZiAodGhpcy5kb3duSGFzTW9yZSkge1xuICAgICAgdGhpcy5hZGRDb3VudCArPSAzO1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIHRoaXMuZ2V0Q2xhc3MoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6IFwi5o+Q56S6XCIsXG4gICAgICAgIGNvbnRlbnQ6IFwi5rKh5pyJ5pu05aSa5b6F5LiK6K++56iL5LqG5ZOfXCIsXG4gICAgICAgIHNob3dDYW5jZWw6IGZhbHNlXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgLy8g6I635Y+W6K++6KGo5L+h5oGvXG4gIGdldENsYXNzKCkge1xuICAgIGNvbnN0IHN0dWRlbnQgPSB3eC5nZXRTdG9yYWdlU3luYyhcInN0dWRlbnRcIik7XG4gICAgY29uc3Qgb3BlbmlkID0gd3guZ2V0U3RvcmFnZVN5bmMoXCJvcGVuaWRcIik7XG5cbiAgICBsZXQgbW9udGggPSBtb21lbnQoKS5tb250aCgpICsgMTtcbiAgICBjb25zb2xlLmxvZyhtb250aCk7XG4gICAgY29uc3Qgc3RhcnREYXRlID0gbW9tZW50KClcbiAgICAgIC5zdWJ0cmFjdCh0aGlzLmN1dENvdW50LCBcIm1vbnRoc1wiKVxuICAgICAgLmZvcm1hdChcIllZWVktTU1cIik7XG4gICAgY29uc3QgZW5kRGF0ZSA9IG1vbWVudCgpXG4gICAgICAuYWRkKHRoaXMuYWRkQ291bnQsIFwibW9udGhzXCIpXG4gICAgICAuZm9ybWF0KFwiWVlZWS1NTVwiKTtcbiAgICAvLyBsZXQgbm93ID0gbmV3IERhdGUoKTtcbiAgICAvLyBjb25zdCBzdGFydERhdGUgPSB0aGlzLmFkZE1vbnRoKG5vdywgdGhpcy5jdXRDb3VudCk7XG4gICAgLy8gY29uc3QgZW5kRGF0ZSA9IHRoaXMuYWRkTW9udGgobm93LCB0aGlzLmFkZENvdW50KTtcbiAgICBjb25zb2xlLmxvZyhzdGFydERhdGUsIGVuZERhdGUpO1xuXG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XG5cbiAgICB3eC5yZXF1ZXN0KHtcbiAgICAgIHVybDogXCJodHRwczovL2JhY2sueXVpeXUuY24vd3gvcmVjb3JkL2luZGV4XCIsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIHN0dWRlbnRJZDogc3R1ZGVudC5pZCwgLy/lrabnlJ9pZFxuICAgICAgICBzdGFydE1vbnRoOiBzdGFydERhdGUsIC8v5p+l6K+i55qE5byA5aeL5pel5pyfXG4gICAgICAgIGVuZE1vbnRoOiBlbmREYXRlLCAvL+afpeivoueahOe7k+adn+aXpeacnyxcbiAgICAgICAgb3BlbmlkOiBvcGVuaWRcbiAgICAgICAgLy8gb3BlbmlkOiAnbzJmUGE0cmJMMWo4R3AwUWxxQkR6bDNSNDB2QSdcbiAgICAgIH0sXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbiAgICAgICAgaWYgKHJlcy5kYXRhLm9rKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCLmiJDlip/or7fmsYLor77ooahcIik7XG4gICAgICAgICAgdGhhdC5hbGxDbGFzcyA9IHJlcy5kYXRhLmxpc3Q7XG4gICAgICAgICAgdGhhdC5kb3duSGFzTW9yZSA9IHJlcy5kYXRhLmRvd25IYXNNb3JlO1xuICAgICAgICAgIHRoYXQudXBIYXNNb3JlID0gcmVzLmRhdGEudXBIYXNNb3JlO1xuICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgICAgICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZmFpbChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgLy8g54K55Ye76K+35YGH5oyJ6ZKuXG4gICAgc2VsZWN0Q2xhc3MobW9udGhJbmRleCwgZGF5SW5kZXgsIGNsYXNzSW5kZXgpIHtcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgICAgY29uc3Qgb3BlbmlkID0gd3guZ2V0U3RvcmFnZVN5bmMoXCJvcGVuaWRcIik7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogXCLmj5DnpLpcIixcbiAgICAgICAgY29udGVudDogXCLnoa7lrprov5noioLor77opoHor7flgYflkJdcIixcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgIGNvbnN0IGlkID1cbiAgICAgICAgICAgICAgdGhhdC5hbGxDbGFzc1ttb250aEluZGV4XS5kZXRhaWxbZGF5SW5kZXhdLnJlY29yZFtjbGFzc0luZGV4XS5pZDtcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgICAgICB1cmw6IFwiaHR0cHM6Ly9iYWNrLnl1aXl1LmNuL3d4L3JlY29yZC9sZWF2ZVwiLFxuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgIG9wZW5pZDogb3BlbmlkXG4gICAgICAgICAgICAgICAgLy8gb3BlbmlkOiAnbzJmUGE0cmJMMWo4R3AwUWxxQkR6bDNSNDB2QSdcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLm9rKSB7XG4gICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLor7flgYfmiJDlip9cIixcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIHRoYXQuZ2V0Q2xhc3MoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwi6K+35YGH5aSx6LSlXCIsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHJlcy5kYXRhLmVycm9yTXNnLFxuICAgICAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBjYW5jbGVDbGFzcyhtb250aEluZGV4LCBkYXlJbmRleCwgY2xhc3NJbmRleCkge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6IFwi5o+Q56S6XCIsXG4gICAgICAgIGNvbnRlbnQ6IFwi6L+Z6IqC6K++5oKo5bey57uP6K+36L+H5YGH5LqG5ZOfXCIsXG4gICAgICAgIHNob3dDYW5jZWw6IGZhbHNlXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59XG4iXX0=