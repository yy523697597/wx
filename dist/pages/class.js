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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzLmpzIl0sIm5hbWVzIjpbIkNsYXNzRGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsImRhdGEiLCJ1c2VyTmFtZSIsImFsbENsYXNzIiwiYWRkQ291bnQiLCJjdXRDb3VudCIsInVwSGFzTW9yZSIsImRvd25IYXNNb3JlIiwibWV0aG9kcyIsInNlbGVjdENsYXNzIiwibW9udGhJbmRleCIsImRheUluZGV4IiwiY2xhc3NJbmRleCIsInRoYXQiLCJvcGVuaWQiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJpZCIsImRldGFpbCIsInJlY29yZCIsInJlcXVlc3QiLCJ1cmwiLCJtZXRob2QiLCJvayIsInNob3dUb2FzdCIsImljb24iLCJkdXJhdGlvbiIsImdldENsYXNzIiwiY2FuY2xlQ2xhc3MiLCJzaG93Q2FuY2VsIiwib3B0aW9ucyIsIiRhcHBseSIsInN0b3BQdWxsRG93blJlZnJlc2giLCJkYXRlIiwic0RhdGUiLCJEYXRlIiwiZ2V0TW9udGgiLCJhcnIiLCJzcGxpdCIsImxlbmd0aCIsIm51bSIsInBhcnNlSW50IiwiZGF0ZVRvRGF0ZSIsInNZZWFyIiwiZ2V0RnVsbFllYXIiLCJzTW9udGgiLCJzRGF5IiwiZ2V0RGF0ZSIsImVZZWFyIiwiZU1vbnRoIiwiZURheSIsImVEYXRlIiwibW9udGgiLCJzdHVkZW50Iiwic3RhcnREYXRlIiwiYWRkTW9udGgiLCJlbmREYXRlIiwic3R1ZGVudElkIiwic3RhcnRNb250aCIsImVuZE1vbnRoIiwiY29uc29sZSIsImxvZyIsImxpc3QiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFc7Ozs7Ozs7Ozs7Ozs7O2dNQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixLQURqQjtBQUVQQyw2QkFBdUI7QUFGaEIsSyxRQUtUQyxJLEdBQU87QUFDTEMsZ0JBQVUsSUFETDtBQUVMQyxnQkFBVSxFQUZMO0FBR0xDLGdCQUFVLENBSEw7QUFJTEMsZ0JBQVUsQ0FKTDtBQUtMQyxpQkFBVyxJQUxOO0FBTUxDLG1CQUFhO0FBTlIsSyxRQW9IUEMsTyxHQUFVO0FBQ1I7QUFDQUMsaUJBRlEsdUJBRUlDLFVBRkosRUFFZ0JDLFFBRmhCLEVBRTBCQyxVQUYxQixFQUVzQztBQUM1QyxZQUFNQyxPQUFPLElBQWI7QUFDQSxZQUFNQyxTQUFTQyxHQUFHQyxjQUFILENBQWtCLFFBQWxCLENBQWY7QUFDQUQsV0FBR0UsU0FBSCxDQUFhO0FBQ1hDLGlCQUFPLElBREk7QUFFWEMsbUJBQVMsV0FGRTtBQUdYQyxpQkFIVyxtQkFHSEMsR0FIRyxFQUdFO0FBQ1gsZ0JBQUlBLElBQUlDLE9BQVIsRUFBaUI7QUFDZixrQkFBTUMsS0FDSlYsS0FBS1YsUUFBTCxDQUFjTyxVQUFkLEVBQTBCYyxNQUExQixDQUFpQ2IsUUFBakMsRUFBMkNjLE1BQTNDLENBQWtEYixVQUFsRCxFQUE4RFcsRUFEaEU7QUFFQVIsaUJBQUdXLE9BQUgsQ0FBVztBQUNUQyxxQkFBSyx1Q0FESTtBQUVUMUIsc0JBQU07QUFDSnNCLHNCQUFJQSxFQURBO0FBRUpULDBCQUFRQTtBQUNSO0FBSEksaUJBRkc7QUFPVGMsd0JBQVEsTUFQQztBQVFUUix5QkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCLHNCQUFJQSxJQUFJcEIsSUFBSixDQUFTNEIsRUFBYixFQUFpQjtBQUNmZCx1QkFBR2UsU0FBSCxDQUFhO0FBQ1haLDZCQUFPLE1BREk7QUFFWGEsNEJBQU0sU0FGSztBQUdYQyxnQ0FBVTtBQUhDLHFCQUFiO0FBS0FuQix5QkFBS29CLFFBQUw7QUFDRDtBQUNGO0FBakJRLGVBQVg7QUFtQkQ7QUFDRjtBQTNCVSxTQUFiO0FBNkJELE9BbENPO0FBb0NSQyxpQkFwQ1EsdUJBb0NJeEIsVUFwQ0osRUFvQ2dCQyxRQXBDaEIsRUFvQzBCQyxVQXBDMUIsRUFvQ3NDO0FBQzVDRyxXQUFHRSxTQUFILENBQWE7QUFDWEMsaUJBQU8sSUFESTtBQUVYQyxtQkFBUyxhQUZFO0FBR1hnQixzQkFBWTtBQUhELFNBQWI7QUFLRDtBQTFDTyxLOzs7OzsyQkEzR0hDLE8sRUFBUztBQUNkLFdBQUtILFFBQUw7QUFDRDtBQUNEOzs7O3dDQUNvQjtBQUNsQixVQUFJLEtBQUszQixTQUFULEVBQW9CO0FBQ2xCLGFBQUtELFFBQUwsSUFBaUIsQ0FBakI7QUFDQSxhQUFLZ0MsTUFBTDtBQUNBLGFBQUtKLFFBQUw7QUFDRCxPQUpELE1BSU87QUFDTGxCLFdBQUdFLFNBQUgsQ0FBYTtBQUNYQyxpQkFBTyxJQURJO0FBRVhDLG1CQUFTLFlBRkU7QUFHWGdCLHNCQUFZO0FBSEQsU0FBYjtBQUtBcEIsV0FBR3VCLG1CQUFIO0FBQ0Q7QUFDRjs7OytCQUVVQyxJLEVBQU07QUFDZixVQUFJQyxRQUFRLElBQUlDLElBQUosRUFBWjtBQUNBLFVBQUksUUFBT0YsSUFBUCx5Q0FBT0EsSUFBUCxNQUFlLFFBQWYsSUFBMkIsT0FBTyxJQUFJRSxJQUFKLEdBQVdDLFFBQWxCLElBQThCLFVBQTdELEVBQXlFO0FBQ3ZFRixnQkFBUUQsSUFBUjtBQUNELE9BRkQsTUFFTyxJQUFJLE9BQU9BLElBQVAsSUFBZSxRQUFuQixFQUE2QjtBQUNsQyxZQUFJSSxNQUFNSixLQUFLSyxLQUFMLENBQVcsR0FBWCxDQUFWO0FBQ0EsWUFBSUQsSUFBSUUsTUFBSixJQUFjLENBQWxCLEVBQXFCO0FBQ25CTCxrQkFBUSxJQUFJQyxJQUFKLENBQVNFLElBQUksQ0FBSixJQUFTLEdBQVQsR0FBZUEsSUFBSSxDQUFKLENBQWYsR0FBd0IsR0FBeEIsR0FBOEJBLElBQUksQ0FBSixDQUF2QyxDQUFSO0FBQ0Q7QUFDRjs7QUFFRCxhQUFPSCxLQUFQO0FBQ0Q7O0FBRUQ7Ozs7NkJBQ1NELEksRUFBTU8sRyxFQUFLO0FBQ2xCQSxZQUFNQyxTQUFTRCxHQUFULENBQU47QUFDQSxVQUFJTixRQUFRLEtBQUtRLFVBQUwsQ0FBZ0JULElBQWhCLENBQVo7O0FBRUEsVUFBSVUsUUFBUVQsTUFBTVUsV0FBTixFQUFaO0FBQ0EsVUFBSUMsU0FBU1gsTUFBTUUsUUFBTixLQUFtQixDQUFoQztBQUNBLFVBQUlVLE9BQU9aLE1BQU1hLE9BQU4sRUFBWDs7QUFFQSxVQUFJQyxRQUFRTCxLQUFaO0FBQ0EsVUFBSU0sU0FBU0osU0FBU0wsR0FBdEI7QUFDQSxVQUFJVSxPQUFPSixJQUFYO0FBQ0EsYUFBT0csU0FBUyxFQUFoQixFQUFvQjtBQUNsQkQ7QUFDQUMsa0JBQVUsRUFBVjtBQUNEOztBQUVELFVBQUlFLFFBQVEsSUFBSWhCLElBQUosQ0FBU2EsS0FBVCxFQUFnQkMsU0FBUyxDQUF6QixFQUE0QkMsSUFBNUIsQ0FBWjs7QUFFQSxhQUFPQyxNQUFNZixRQUFOLE1BQW9CYSxTQUFTLENBQXBDLEVBQXVDO0FBQ3JDQztBQUNBQyxnQkFBUSxJQUFJaEIsSUFBSixDQUFTYSxLQUFULEVBQWdCQyxTQUFTLENBQXpCLEVBQTRCQyxJQUE1QixDQUFSO0FBQ0Q7QUFDRCxVQUFJRSxRQUFRRCxNQUFNZixRQUFOLEtBQW1CLENBQS9CO0FBQ0EsVUFBSWdCLFFBQVEsRUFBWixFQUFnQjtBQUNkQSxnQkFBUSxNQUFNQSxLQUFkO0FBQ0Q7QUFDRCxhQUFPRCxNQUFNUCxXQUFOLEtBQXNCLEdBQXRCLEdBQTRCUSxLQUFuQztBQUNEOztBQUVEOzs7O29DQUNnQjtBQUNkLFVBQUksS0FBS25ELFdBQVQsRUFBc0I7QUFDcEIsYUFBS0gsUUFBTCxJQUFpQixDQUFqQjtBQUNBLGFBQUtpQyxNQUFMO0FBQ0EsYUFBS0osUUFBTDtBQUNELE9BSkQsTUFJTztBQUNMbEIsV0FBR0UsU0FBSCxDQUFhO0FBQ1hDLGlCQUFPLElBREk7QUFFWEMsbUJBQVMsWUFGRTtBQUdYZ0Isc0JBQVk7QUFIRCxTQUFiO0FBS0Q7QUFDRjtBQUNEOzs7OytCQUNXO0FBQ1QsVUFBTXdCLFVBQVU1QyxHQUFHQyxjQUFILENBQWtCLFNBQWxCLENBQWhCO0FBQ0EsVUFBTUYsU0FBU0MsR0FBR0MsY0FBSCxDQUFrQixRQUFsQixDQUFmO0FBQ0EsVUFBTTRDLFlBQVksS0FBS0MsUUFBTCxDQUFjLElBQUlwQixJQUFKLEVBQWQsRUFBMEIsQ0FBQyxLQUFLcEMsUUFBaEMsQ0FBbEI7QUFDQSxVQUFNeUQsVUFBVSxLQUFLRCxRQUFMLENBQWMsSUFBSXBCLElBQUosRUFBZCxFQUEwQixLQUFLckMsUUFBL0IsQ0FBaEI7QUFDQSxVQUFNUyxPQUFPLElBQWI7QUFDQUUsU0FBR1csT0FBSCxDQUFXO0FBQ1RDLGFBQUssdUNBREk7QUFFVDFCLGNBQU07QUFDSjhELHFCQUFXSixRQUFRcEMsRUFEZixFQUNtQjtBQUN2QnlDLHNCQUFZSixTQUZSLEVBRW1CO0FBQ3ZCSyxvQkFBVUgsT0FITixFQUdlO0FBQ25CaEQsa0JBQVFBO0FBQ1I7QUFMSSxTQUZHO0FBU1RjLGdCQUFRLE1BVEM7QUFVVFIsaUJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNyQjZDLGtCQUFRQyxHQUFSLENBQVk5QyxJQUFJcEIsSUFBaEI7QUFDQSxjQUFJb0IsSUFBSXBCLElBQUosQ0FBUzRCLEVBQWIsRUFBaUI7QUFDZnFDLG9CQUFRQyxHQUFSLENBQVksUUFBWjtBQUNBdEQsaUJBQUtWLFFBQUwsR0FBZ0JrQixJQUFJcEIsSUFBSixDQUFTbUUsSUFBekI7QUFDQXZELGlCQUFLTixXQUFMLEdBQW1CYyxJQUFJcEIsSUFBSixDQUFTTSxXQUE1QjtBQUNBTSxpQkFBS1AsU0FBTCxHQUFpQmUsSUFBSXBCLElBQUosQ0FBU0ssU0FBMUI7QUFDQU8saUJBQUt3QixNQUFMO0FBQ0F0QixlQUFHdUIsbUJBQUg7QUFDRDtBQUNGO0FBcEJRLE9BQVg7QUFzQkQ7Ozs7RUF6SHNDLGVBQUsrQixJOztrQkFBekJ4RSxXIiwiZmlsZSI6ImNsYXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xhc3NEZXRhaWwgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ivvueoi+ihqCcsXG4gICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiB0cnVlXG4gIH07XG5cbiAgZGF0YSA9IHtcbiAgICB1c2VyTmFtZTogbnVsbCxcbiAgICBhbGxDbGFzczogW10sXG4gICAgYWRkQ291bnQ6IDEsXG4gICAgY3V0Q291bnQ6IDEsXG4gICAgdXBIYXNNb3JlOiB0cnVlLFxuICAgIGRvd25IYXNNb3JlOiB0cnVlXG4gIH07XG5cbiAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICB0aGlzLmdldENsYXNzKCk7XG4gIH1cbiAgLy8g5LiL5ouJ5re75Yqg5pu05aSa5Y6f5p2l55qE5LiK6K++6K6w5b2VXG4gIG9uUHVsbERvd25SZWZyZXNoKCkge1xuICAgIGlmICh0aGlzLnVwSGFzTW9yZSkge1xuICAgICAgdGhpcy5jdXRDb3VudCAtPSAzO1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIHRoaXMuZ2V0Q2xhc3MoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICBjb250ZW50OiAn5rKh5pyJ5pu05aSa5Y6G5Y+y6K6w5b2V5LqG5ZOfJyxcbiAgICAgICAgc2hvd0NhbmNlbDogZmFsc2VcbiAgICAgIH0pO1xuICAgICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpO1xuICAgIH1cbiAgfVxuXG4gIGRhdGVUb0RhdGUoZGF0ZSkge1xuICAgIGxldCBzRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgaWYgKHR5cGVvZiBkYXRlID09ICdvYmplY3QnICYmIHR5cGVvZiBuZXcgRGF0ZSgpLmdldE1vbnRoID09ICdmdW5jdGlvbicpIHtcbiAgICAgIHNEYXRlID0gZGF0ZTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkYXRlID09ICdzdHJpbmcnKSB7XG4gICAgICBsZXQgYXJyID0gZGF0ZS5zcGxpdCgnLScpO1xuICAgICAgaWYgKGFyci5sZW5ndGggPT0gMykge1xuICAgICAgICBzRGF0ZSA9IG5ldyBEYXRlKGFyclswXSArICctJyArIGFyclsxXSArICctJyArIGFyclsyXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNEYXRlO1xuICB9XG5cbiAgLy8g5Yqg5YeP5pyI5Lu9XG4gIGFkZE1vbnRoKGRhdGUsIG51bSkge1xuICAgIG51bSA9IHBhcnNlSW50KG51bSk7XG4gICAgbGV0IHNEYXRlID0gdGhpcy5kYXRlVG9EYXRlKGRhdGUpO1xuXG4gICAgbGV0IHNZZWFyID0gc0RhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICBsZXQgc01vbnRoID0gc0RhdGUuZ2V0TW9udGgoKSArIDE7XG4gICAgbGV0IHNEYXkgPSBzRGF0ZS5nZXREYXRlKCk7XG5cbiAgICBsZXQgZVllYXIgPSBzWWVhcjtcbiAgICBsZXQgZU1vbnRoID0gc01vbnRoICsgbnVtO1xuICAgIGxldCBlRGF5ID0gc0RheTtcbiAgICB3aGlsZSAoZU1vbnRoID4gMTIpIHtcbiAgICAgIGVZZWFyKys7XG4gICAgICBlTW9udGggLT0gMTI7XG4gICAgfVxuXG4gICAgbGV0IGVEYXRlID0gbmV3IERhdGUoZVllYXIsIGVNb250aCAtIDEsIGVEYXkpO1xuXG4gICAgd2hpbGUgKGVEYXRlLmdldE1vbnRoKCkgIT0gZU1vbnRoIC0gMSkge1xuICAgICAgZURheS0tO1xuICAgICAgZURhdGUgPSBuZXcgRGF0ZShlWWVhciwgZU1vbnRoIC0gMSwgZURheSk7XG4gICAgfVxuICAgIGxldCBtb250aCA9IGVEYXRlLmdldE1vbnRoKCkgKyAxO1xuICAgIGlmIChtb250aCA8IDEwKSB7XG4gICAgICBtb250aCA9ICcwJyArIG1vbnRoO1xuICAgIH1cbiAgICByZXR1cm4gZURhdGUuZ2V0RnVsbFllYXIoKSArICctJyArIG1vbnRoO1xuICB9XG5cbiAgLy8g5LiK5ouJ5Yqg6L295pu05aSa5pyq5LiK6K++6K6w5b2VXG4gIG9uUmVhY2hCb3R0b20oKSB7XG4gICAgaWYgKHRoaXMuZG93bkhhc01vcmUpIHtcbiAgICAgIHRoaXMuYWRkQ291bnQgKz0gMztcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICB0aGlzLmdldENsYXNzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgY29udGVudDogJ+ayoeacieabtOWkmuW+heS4iuivvueoi+S6huWTnycsXG4gICAgICAgIHNob3dDYW5jZWw6IGZhbHNlXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgLy8g6I635Y+W6K++6KGo5L+h5oGvXG4gIGdldENsYXNzKCkge1xuICAgIGNvbnN0IHN0dWRlbnQgPSB3eC5nZXRTdG9yYWdlU3luYygnc3R1ZGVudCcpO1xuICAgIGNvbnN0IG9wZW5pZCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdvcGVuaWQnKTtcbiAgICBjb25zdCBzdGFydERhdGUgPSB0aGlzLmFkZE1vbnRoKG5ldyBEYXRlKCksIC10aGlzLmN1dENvdW50KTtcbiAgICBjb25zdCBlbmREYXRlID0gdGhpcy5hZGRNb250aChuZXcgRGF0ZSgpLCB0aGlzLmFkZENvdW50KTtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICB3eC5yZXF1ZXN0KHtcbiAgICAgIHVybDogJ2h0dHBzOi8vYmFjay55dWl5dS5jbi93eC9yZWNvcmQvaW5kZXgnLFxuICAgICAgZGF0YToge1xuICAgICAgICBzdHVkZW50SWQ6IHN0dWRlbnQuaWQsIC8v5a2m55SfaWRcbiAgICAgICAgc3RhcnRNb250aDogc3RhcnREYXRlLCAvL+afpeivoueahOW8gOWni+aXpeacn1xuICAgICAgICBlbmRNb250aDogZW5kRGF0ZSwgLy/mn6Xor6LnmoTnu5PmnZ/ml6XmnJ8sXG4gICAgICAgIG9wZW5pZDogb3BlbmlkXG4gICAgICAgIC8vIG9wZW5pZDogJ28yZlBhNHJiTDFqOEdwMFFscUJEemwzUjQwdkEnXG4gICAgICB9LFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAgICAgICBpZiAocmVzLmRhdGEub2spIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygn5oiQ5Yqf6K+35rGC6K++6KGoJyk7XG4gICAgICAgICAgdGhhdC5hbGxDbGFzcyA9IHJlcy5kYXRhLmxpc3Q7XG4gICAgICAgICAgdGhhdC5kb3duSGFzTW9yZSA9IHJlcy5kYXRhLmRvd25IYXNNb3JlO1xuICAgICAgICAgIHRoYXQudXBIYXNNb3JlID0gcmVzLmRhdGEudXBIYXNNb3JlO1xuICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgICAgICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICAvLyDngrnlh7vor7flgYfmjInpkq5cbiAgICBzZWxlY3RDbGFzcyhtb250aEluZGV4LCBkYXlJbmRleCwgY2xhc3NJbmRleCkge1xuICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgICBjb25zdCBvcGVuaWQgPSB3eC5nZXRTdG9yYWdlU3luYygnb3BlbmlkJyk7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgIGNvbnRlbnQ6ICfnoa7lrprov5noioLor77opoHor7flgYflkJcnLFxuICAgICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgY29uc3QgaWQgPVxuICAgICAgICAgICAgICB0aGF0LmFsbENsYXNzW21vbnRoSW5kZXhdLmRldGFpbFtkYXlJbmRleF0ucmVjb3JkW2NsYXNzSW5kZXhdLmlkO1xuICAgICAgICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vYmFjay55dWl5dS5jbi93eC9yZWNvcmQvbGVhdmUnLFxuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgIG9wZW5pZDogb3BlbmlkXG4gICAgICAgICAgICAgICAgLy8gb3BlbmlkOiAnbzJmUGE0cmJMMWo4R3AwUWxxQkR6bDNSNDB2QSdcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5vaykge1xuICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfor7flgYfmiJDlip8nLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIHRoYXQuZ2V0Q2xhc3MoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcblxuICAgIGNhbmNsZUNsYXNzKG1vbnRoSW5kZXgsIGRheUluZGV4LCBjbGFzc0luZGV4KSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgIGNvbnRlbnQ6ICfov5noioLor77mgqjlt7Lnu4/or7fov4flgYfkuoblk58nLFxuICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufVxuIl19