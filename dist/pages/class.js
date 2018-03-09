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
          record: [{
            date: '2018-03-12',
            id: '101',
            lessonId: '6',
            lessonName: '钢琴课',
            location: 'B教室',
            school: '天府校区',
            startTime: '1520839800',
            timeRange: '15:30-17:00',
            type: '待上',
            weekday: '周一'
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
                  }
                }
              });
            }
          }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzLmpzIl0sIm5hbWVzIjpbIkNsYXNzRGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsImRhdGEiLCJ1c2VyTmFtZSIsImFsbENsYXNzIiwibW9udGgiLCJkZXRhaWwiLCJkYXkiLCJ3ZWVrIiwicmVjb3JkIiwiZGF0ZSIsImlkIiwibGVzc29uSWQiLCJsZXNzb25OYW1lIiwibG9jYXRpb24iLCJzY2hvb2wiLCJzdGFydFRpbWUiLCJ0aW1lUmFuZ2UiLCJ0eXBlIiwid2Vla2RheSIsImNsYXNzIiwiY2xhc3NJZCIsImNsYXNzTmFtZSIsImJnQ29sb3IiLCJ0aW1lIiwibGVhdmUiLCJhZGRDb3VudCIsImN1dENvdW50IiwidXBIYXNNb3JlIiwiZG93bkhhc01vcmUiLCJtZXRob2RzIiwic2VsZWN0Q2xhc3MiLCJtb250aEluZGV4IiwiZGF5SW5kZXgiLCJjbGFzc0luZGV4IiwidGhhdCIsIm9wZW5pZCIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsInJlcXVlc3QiLCJ1cmwiLCJtZXRob2QiLCJvayIsInNob3dUb2FzdCIsImljb24iLCJkdXJhdGlvbiIsImdldENsYXNzIiwib3B0aW9ucyIsIiRhcHBseSIsInNob3dDYW5jZWwiLCJzdG9wUHVsbERvd25SZWZyZXNoIiwic0RhdGUiLCJEYXRlIiwiZ2V0TW9udGgiLCJhcnIiLCJzcGxpdCIsImxlbmd0aCIsIm51bSIsInBhcnNlSW50IiwiZGF0ZVRvRGF0ZSIsInNZZWFyIiwiZ2V0RnVsbFllYXIiLCJzTW9udGgiLCJzRGF5IiwiZ2V0RGF0ZSIsImVZZWFyIiwiZU1vbnRoIiwiZURheSIsImVEYXRlIiwic3R1ZGVudCIsInN0YXJ0RGF0ZSIsImFkZE1vbnRoIiwiZW5kRGF0ZSIsInN0dWRlbnRJZCIsInN0YXJ0TW9udGgiLCJlbmRNb250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TUFBTDtBQUNBakIsZUFBR21CLG1CQUFIO0FBQ0Q7QUFDRjtBQXBCUSxPQUFYO0FBc0JEOzs7O0VBL01zQyxlQUFLNkIsSTs7a0JBQXpCdkYsVyIsImZpbGUiOiJjbGFzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsYXNzRGV0YWlsIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6K++56iL6KGoJyxcclxuICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogdHJ1ZVxyXG4gIH07XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICB1c2VyTmFtZTogbnVsbCxcclxuICAgIGFsbENsYXNzOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBtb250aDogJzIwMTjlubQwMeaciCcsXHJcbiAgICAgICAgZGV0YWlsOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGRheTogJzA5JyxcclxuICAgICAgICAgICAgd2VlazogJ+WRqOWFrScsXHJcbiAgICAgICAgICAgIHJlY29yZDogW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRhdGU6ICcyMDE4LTAzLTEyJyxcclxuICAgICAgICAgICAgICAgIGlkOiAnMTAxJyxcclxuICAgICAgICAgICAgICAgIGxlc3NvbklkOiAnNicsXHJcbiAgICAgICAgICAgICAgICBsZXNzb25OYW1lOiAn6ZKi55C06K++JyxcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAnQuaVmeWupCcsXHJcbiAgICAgICAgICAgICAgICBzY2hvb2w6ICflpKnlupzmoKHljLonLFxyXG4gICAgICAgICAgICAgICAgc3RhcnRUaW1lOiAnMTUyMDgzOTgwMCcsXHJcbiAgICAgICAgICAgICAgICB0aW1lUmFuZ2U6ICcxNTozMC0xNzowMCcsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAn5b6F5LiKJyxcclxuICAgICAgICAgICAgICAgIHdlZWtkYXk6ICflkajkuIAnXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgbW9udGg6ICcyMDE45bm0MDLmnIgnLFxyXG4gICAgICAgIGRldGFpbDogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBkYXk6ICcwOCcsXHJcbiAgICAgICAgICAgIHdlZWs6ICflkajkuIknLFxyXG4gICAgICAgICAgICBjbGFzczogW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNsYXNzSWQ6IDM0NTUsXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICfoiJ7ouYjor74nLFxyXG4gICAgICAgICAgICAgICAgYmdDb2xvcjogJ3BpbmsnLFxyXG4gICAgICAgICAgICAgICAgdGltZTogJzE3Oi0xODozMCcsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAn5b6F5LiKJyxcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAnQuaVmeWupCcsXHJcbiAgICAgICAgICAgICAgICBkYXk6ICcwOScsXHJcbiAgICAgICAgICAgICAgICB3ZWVrOiAn5ZGo5LiJJyxcclxuICAgICAgICAgICAgICAgIGxlYXZlOiAn6K+35YGHJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2xhc3NJZDogMzQ1NSxcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ+iInui5iOivvicsXHJcbiAgICAgICAgICAgICAgICBiZ0NvbG9yOiAneWVsbG93Z3JlZW4nLFxyXG4gICAgICAgICAgICAgICAgdGltZTogJzE3Oi0xODozMCcsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAn5b6F5LiKJyxcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAnQuaVmeWupCcsXHJcbiAgICAgICAgICAgICAgICBkYXk6ICcwOScsXHJcbiAgICAgICAgICAgICAgICB3ZWVrOiAn5ZGo5LiJJyxcclxuICAgICAgICAgICAgICAgIGxlYXZlOiAn6K+35YGHJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgZGF5OiAnMTInLFxyXG4gICAgICAgICAgICB3ZWVrOiAn5ZGo5ZubJyxcclxuICAgICAgICAgICAgY2xhc3M6IFtcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjbGFzc0lkOiAzNDU1LFxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAn6Iie6LmI6K++JyxcclxuICAgICAgICAgICAgICAgIGJnQ29sb3I6ICd5ZWxsb3dncmVlbicsXHJcbiAgICAgICAgICAgICAgICB0aW1lOiAnMTc6LTE4OjMwJyxcclxuXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAn5b6F5LiKJyxcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAnQuaVmeWupCcsXHJcbiAgICAgICAgICAgICAgICBkYXk6ICcwOScsXHJcbiAgICAgICAgICAgICAgICB3ZWVrOiAn5ZGo5ZubJyxcclxuICAgICAgICAgICAgICAgIGxlYXZlOiAn6K+35YGHJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2xhc3NJZDogMzQ1NSxcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ+iInui5iOivvicsXHJcbiAgICAgICAgICAgICAgICBiZ0NvbG9yOiAneWVsbG93Z3JlZW4nLFxyXG4gICAgICAgICAgICAgICAgdGltZTogJzE3Oi0xODozMCcsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAn5b6F5LiKJyxcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAnQuaVmeWupCcsXHJcbiAgICAgICAgICAgICAgICBkYXk6ICcwOScsXHJcbiAgICAgICAgICAgICAgICB3ZWVrOiAn5ZGo5ZubJyxcclxuICAgICAgICAgICAgICAgIGxlYXZlOiAn6K+35YGHJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgXSxcclxuICAgIGFkZENvdW50OiAxLFxyXG4gICAgY3V0Q291bnQ6IDEsXHJcbiAgICB1cEhhc01vcmU6IHRydWUsXHJcbiAgICBkb3duSGFzTW9yZTogdHJ1ZVxyXG4gIH07XHJcblxyXG4gIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICB0aGlzLmdldENsYXNzKCk7XHJcbiAgfVxyXG4gIC8vIOS4i+aLiea3u+WKoOabtOWkmuWOn+adpeeahOS4iuivvuiusOW9lVxyXG4gIG9uUHVsbERvd25SZWZyZXNoKCkge1xyXG4gICAgaWYgKHRoaXMudXBIYXNNb3JlKSB7XHJcbiAgICAgIHRoaXMuY3V0Q291bnQgLT0gMztcclxuICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgdGhpcy5nZXRDbGFzcygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICB0aXRsZTogJ+aPkOekuicsXHJcbiAgICAgICAgY29udGVudDogJ+ayoeacieabtOWkmuWOhuWPsuiusOW9leS6huWTnycsXHJcbiAgICAgICAgc2hvd0NhbmNlbDogZmFsc2VcclxuICAgICAgfSk7XHJcbiAgICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRhdGVUb0RhdGUoZGF0ZSkge1xyXG4gICAgbGV0IHNEYXRlID0gbmV3IERhdGUoKTtcclxuICAgIGlmICh0eXBlb2YgZGF0ZSA9PSAnb2JqZWN0JyAmJiB0eXBlb2YgbmV3IERhdGUoKS5nZXRNb250aCA9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHNEYXRlID0gZGF0ZTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGRhdGUgPT0gJ3N0cmluZycpIHtcclxuICAgICAgbGV0IGFyciA9IGRhdGUuc3BsaXQoJy0nKTtcclxuICAgICAgaWYgKGFyci5sZW5ndGggPT0gMykge1xyXG4gICAgICAgIHNEYXRlID0gbmV3IERhdGUoYXJyWzBdICsgJy0nICsgYXJyWzFdICsgJy0nICsgYXJyWzJdKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzRGF0ZTtcclxuICB9XHJcblxyXG4gIC8vIOWKoOWHj+aciOS7vVxyXG4gIGFkZE1vbnRoKGRhdGUsIG51bSkge1xyXG4gICAgbnVtID0gcGFyc2VJbnQobnVtKTtcclxuICAgIGxldCBzRGF0ZSA9IHRoaXMuZGF0ZVRvRGF0ZShkYXRlKTtcclxuXHJcbiAgICBsZXQgc1llYXIgPSBzRGF0ZS5nZXRGdWxsWWVhcigpO1xyXG4gICAgbGV0IHNNb250aCA9IHNEYXRlLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgbGV0IHNEYXkgPSBzRGF0ZS5nZXREYXRlKCk7XHJcblxyXG4gICAgbGV0IGVZZWFyID0gc1llYXI7XHJcbiAgICBsZXQgZU1vbnRoID0gc01vbnRoICsgbnVtO1xyXG4gICAgbGV0IGVEYXkgPSBzRGF5O1xyXG4gICAgd2hpbGUgKGVNb250aCA+IDEyKSB7XHJcbiAgICAgIGVZZWFyKys7XHJcbiAgICAgIGVNb250aCAtPSAxMjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgZURhdGUgPSBuZXcgRGF0ZShlWWVhciwgZU1vbnRoIC0gMSwgZURheSk7XHJcblxyXG4gICAgd2hpbGUgKGVEYXRlLmdldE1vbnRoKCkgIT0gZU1vbnRoIC0gMSkge1xyXG4gICAgICBlRGF5LS07XHJcbiAgICAgIGVEYXRlID0gbmV3IERhdGUoZVllYXIsIGVNb250aCAtIDEsIGVEYXkpO1xyXG4gICAgfVxyXG4gICAgbGV0IG1vbnRoID0gZURhdGUuZ2V0TW9udGgoKSArIDE7XHJcbiAgICBpZiAobW9udGggPCAxMCkge1xyXG4gICAgICBtb250aCA9ICcwJyArIG1vbnRoO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVEYXRlLmdldEZ1bGxZZWFyKCkgKyAnLScgKyBtb250aDtcclxuICB9XHJcblxyXG4gIC8vIOS4iuaLieWKoOi9veabtOWkmuacquS4iuivvuiusOW9lVxyXG4gIG9uUmVhY2hCb3R0b20oKSB7XHJcbiAgICBpZiAodGhpcy5kb3duSGFzTW9yZSkge1xyXG4gICAgICB0aGlzLmFkZENvdW50ICs9IDM7XHJcbiAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgIHRoaXMuZ2V0Q2xhc3MoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxyXG4gICAgICAgIGNvbnRlbnQ6ICfmsqHmnInmm7TlpJrlvoXkuIror77nqIvkuoblk58nLFxyXG4gICAgICAgIHNob3dDYW5jZWw6IGZhbHNlXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuICAvLyDojrflj5bor77ooajkv6Hmga9cclxuICBnZXRDbGFzcygpIHtcclxuICAgIGNvbnN0IHN0dWRlbnQgPSB3eC5nZXRTdG9yYWdlU3luYygnc3R1ZGVudCcpO1xyXG4gICAgY29uc3Qgb3BlbmlkID0gd3guZ2V0U3RvcmFnZVN5bmMoJ29wZW5pZCcpO1xyXG4gICAgY29uc3Qgc3RhcnREYXRlID0gdGhpcy5hZGRNb250aChuZXcgRGF0ZSgpLCAtdGhpcy5jdXRDb3VudCk7XHJcbiAgICBjb25zdCBlbmREYXRlID0gdGhpcy5hZGRNb250aChuZXcgRGF0ZSgpLCB0aGlzLmFkZENvdW50KTtcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgd3gucmVxdWVzdCh7XHJcbiAgICAgIHVybDogJ2h0dHBzOi8vYmFjay55dWl5dS5jbi93eC9yZWNvcmQvaW5kZXgnLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgc3R1ZGVudElkOiBzdHVkZW50LmlkLCAvL+WtpueUn2lkXHJcbiAgICAgICAgc3RhcnRNb250aDogc3RhcnREYXRlLCAvL+afpeivoueahOW8gOWni+aXpeacn1xyXG4gICAgICAgIGVuZE1vbnRoOiBlbmREYXRlLCAvL+afpeivoueahOe7k+adn+aXpeacnyxcclxuICAgICAgICBvcGVuaWQ6IG9wZW5pZFxyXG4gICAgICAgIC8vIG9wZW5pZDogJ28yZlBhNHJiTDFqOEdwMFFscUJEemwzUjQwdkEnXHJcbiAgICAgIH0sXHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XHJcbiAgICAgICAgaWYgKHJlcy5kYXRhLm9rKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygn5oiQ5Yqf6K+35rGC6K++6KGoJyk7XHJcbiAgICAgICAgICB0aGF0LmFsbENsYXNzID0gcmVzLmRhdGEubGlzdDtcclxuICAgICAgICAgIHRoYXQuZG93bkhhc01vcmUgPSByZXMuZGF0YS5kb3duSGFzTW9yZTtcclxuICAgICAgICAgIHRoYXQudXBIYXNNb3JlID0gcmVzLmRhdGEudXBIYXNNb3JlO1xyXG4gICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICBtZXRob2RzID0ge1xyXG4gICAgLy8g54K55Ye76K+35YGH5oyJ6ZKuXHJcbiAgICBzZWxlY3RDbGFzcyhtb250aEluZGV4LCBkYXlJbmRleCwgY2xhc3NJbmRleCkge1xyXG4gICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgY29uc3Qgb3BlbmlkID0gd3guZ2V0U3RvcmFnZVN5bmMoJ29wZW5pZCcpO1xyXG4gICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcclxuICAgICAgICBjb250ZW50OiAn56Gu5a6a6L+Z6IqC6K++6KaB6K+35YGH5ZCXJyxcclxuICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlkID1cclxuICAgICAgICAgICAgICB0aGF0LmFsbENsYXNzW21vbnRoSW5kZXhdLmRldGFpbFtkYXlJbmRleF0ucmVjb3JkW2NsYXNzSW5kZXhdLmlkO1xyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICB1cmw6ICdodHRwczovL2JhY2sueXVpeXUuY24vd3gvcmVjb3JkL2xlYXZlJyxcclxuICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBpZDogaWQsXHJcbiAgICAgICAgICAgICAgICBvcGVuaWQ6IG9wZW5pZFxyXG4gICAgICAgICAgICAgICAgLy8gb3BlbmlkOiAnbzJmUGE0cmJMMWo4R3AwUWxxQkR6bDNSNDB2QSdcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfor7flgYfmiJDlip8nLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcclxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgdGhhdC5nZXRDbGFzcygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG59XHJcbiJdfQ==