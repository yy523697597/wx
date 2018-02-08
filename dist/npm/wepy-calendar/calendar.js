'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var choose_year = null,
    choose_month = null;

var WepyCalendar = function (_wepy$component) {
    _inherits(WepyCalendar, _wepy$component);

    function WepyCalendar() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, WepyCalendar);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WepyCalendar.__proto__ || Object.getPrototypeOf(WepyCalendar)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
            currentDate: {
                type: String,
                defult: new Date(),
                twoWay: true
            },
            startDate: {
                type: String,
                defult: '',
                twoWay: true
            },
            endDate: {
                type: String,
                defult: '',
                twoWay: true
            },
            hasIconList: {
                type: Array,
                defult: [],
                twoWay: true
            }
        }, _this.config = {}, _this.data = {
            days: [],
            current: {},
            hasEmptyGrid: false,
            empytGrids: [],
            showPicker: false,
            weeks_ch: ['日', '一', '二', '三', '四', '五', '六'],
            dayWidth: 0,
            now: {
                year: 0,
                month: 0,
                day: 0
            }
        }, _this.components = {}, _this.mixins = [], _this.computed = {
            pickerValue: function pickerValue() {
                var value = this.current.year + "-" + this.setMonthDouble(this.current.month);
                return value;
            }
        }, _this.watch = {
            currentDate: function currentDate() {
                this.setCurrentData();
            }
        }, _this.methods = {
            // 点击日历上某一天
            tapDayItem: function tapDayItem(index, e) {
                var _this2 = this;

                if (this.days[index].choosed) {
                    this.days[index].choosed = false;
                } else {
                    this.setAllNotSelected().then(function () {
                        _this2.days[index].choosed = true;
                        _this2.$apply();
                    });
                }
                this.$emit('calChangeSelectedDay', this.current.year + "-" + this.setMonthDouble(this.current.month) + "-" + (index + 1), e);
            },

            // 递增、递减切换月份
            handleCalendar: function handleCalendar(type, e) {
                var cur_year = this.current.year;
                var cur_month = this.current.month;
                var newMonth = void 0;
                var newYear = void 0;
                if (type === 'prev') {
                    newMonth = cur_month - 1;
                    newYear = cur_year;
                    if (newMonth < 1) {
                        newYear = cur_year - 1;
                        newMonth = 12;
                    }
                } else {
                    newMonth = cur_month + 1;
                    newYear = cur_year;
                    if (newMonth > 12) {
                        newYear = cur_year + 1;
                        newMonth = 1;
                    }
                }
                this.current.year = newYear;
                this.current.month = newMonth;
                this.$emit('calChangeCurrentDate', this.current.year + "-" + this.setMonthDouble(this.current.month), e);
            },

            // 点击年月调用picker选择器
            bindDateChange: function bindDateChange(e) {
                var value = e.detail.value.split("-");
                var year = parseInt(value[0]);
                var month = parseInt(value[1]);
                if (year == this.current.year && month == this.current.month) {
                    return false;
                } else {
                    this.current.year = year;
                    this.current.month = month;
                    this.$emit('calChangeCurrentDate', this.current.year + "-" + this.setMonthDouble(this.current.month), e);
                }
            }
        }, _this.events = {
            startRenderCalendar: function startRenderCalendar() {
                this.drawCalendar();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(WepyCalendar, [{
        key: 'onLoad',
        value: function onLoad() {
            if (!this.currentDate) {
                this.currentDate = new Date();
            }

            this.setCurrentData();

            var date = new Date();
            this.now.year = date.getFullYear();
            this.now.month = date.getMonth() + 1;
            this.now.day = date.getDate();
        } // 在Page和Component共用的生命周期函数

    }, {
        key: 'onShow',
        value: function onShow() {} // 只在Page中存在的页面生命周期函数

        // 只在Page实例中存在的配置数据，对应于原生的page.json文件

        // 页面所需数据均需在这里声明，可用于模板数据绑定

        // 声明页面中所引用的组件，或声明组件中所引用的子组件

        // 声明页面所引用的Mixin实例

        // 声明计算属性（详见后文介绍）

        // 声明数据watcher（详见后文介绍）

        // 声明页面wxml中标签的事件处理函数。注意，此处只用于声明页面wxml中标签的bind、catch事件，自定义方法需以自定义方法的方式声明

    }, {
        key: 'getThisMonthDays',
        // 声明组件之间的事件处理函数

        value: function getThisMonthDays(year, month) {
            return new Date(year, month, 0).getDate();
        }
        // 计算每月第一天是星期几

    }, {
        key: 'getFirstDayOfWeek',
        value: function getFirstDayOfWeek(year, month) {
            return new Date(Date.UTC(year, month - 1, 1)).getDay();
        }
        // 计算在每月第一天在当月第一周之前的空余的天数

    }, {
        key: 'calculateEmptyGrids',
        value: function calculateEmptyGrids(year, month) {
            var firstDayOfWeek = this.getFirstDayOfWeek(year, month);
            var empytGrids = [];
            if (firstDayOfWeek > 0) {
                for (var i = 0; i < firstDayOfWeek; i++) {
                    empytGrids.push(i);
                }
                this.hasEmptyGrid = true;
            }
            this.empytGrids = empytGrids;
        }
        // 渲染日历格子

    }, {
        key: 'calculateDays',
        value: function calculateDays(year, month) {
            var _this3 = this;

            var days = [];
            var thisMonthDays = this.getThisMonthDays(year, month);

            var _loop = function _loop(i) {
                var day = {
                    day: i,
                    choosed: false
                };
                if (_this3.hasIconList && _this3.hasIconList.length > 0) {
                    _this3.hasIconList.map(function (item) {
                        if (i == item) {
                            day.hasIcon = true;
                        }
                    });
                }
                if (_this3.current.year == _this3.now.year && _this3.current.month == _this3.now.month && i == _this3.now.day) {
                    day.today = true;
                }
                days.push(day);
            };

            for (var i = 1; i <= thisMonthDays; i++) {
                _loop(i);
            }
            this.days = days;
            this.$apply();
        }
    }, {
        key: 'setAllNotSelected',
        value: function setAllNotSelected() {
            var _this4 = this;

            return new Promise(function (resolve, reject) {
                _this4.days.map(function (item) {
                    item.choosed = false;
                });
                resolve();
            });
        }
    }, {
        key: 'drawCalendar',
        value: function drawCalendar() {
            var _this5 = this;

            this.calculateEmptyGrids(this.current.year, this.current.month);
            this.calculateDays(this.current.year, this.current.month);

            var getDayWidth = new Promise(function (resolve, reject) {
                wx.createSelectorQuery().select('.wepy-calendar-weeks').boundingClientRect(function (rect) {
                    resolve(parseInt(rect.width / 7));
                }).exec();
            });
            getDayWidth.then(function (width) {
                _this5.dayWidth = width;
                _this5.$apply();
            });
        }
    }, {
        key: 'setMonthDouble',
        value: function setMonthDouble(value) {
            //设置月份两位数格式
            if (value) {
                value = value.toString();
                if (value.length == 2) {
                    return value;
                } else {
                    return "0" + value;
                }
            }
        }
    }, {
        key: 'setCurrentData',
        value: function setCurrentData() {
            //设置当前年月
            this.current.year = new Date(this.currentDate).getFullYear();
            this.current.month = new Date(this.currentDate).getMonth() + 1;
        }
    }]);

    return WepyCalendar;
}(_wepy2.default.component);

exports.default = WepyCalendar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbGVuZGFyLmpzIl0sIm5hbWVzIjpbImNob29zZV95ZWFyIiwiY2hvb3NlX21vbnRoIiwiV2VweUNhbGVuZGFyIiwicHJvcHMiLCJjdXJyZW50RGF0ZSIsInR5cGUiLCJTdHJpbmciLCJkZWZ1bHQiLCJEYXRlIiwidHdvV2F5Iiwic3RhcnREYXRlIiwiZW5kRGF0ZSIsImhhc0ljb25MaXN0IiwiQXJyYXkiLCJjb25maWciLCJkYXRhIiwiZGF5cyIsImN1cnJlbnQiLCJoYXNFbXB0eUdyaWQiLCJlbXB5dEdyaWRzIiwic2hvd1BpY2tlciIsIndlZWtzX2NoIiwiZGF5V2lkdGgiLCJub3ciLCJ5ZWFyIiwibW9udGgiLCJkYXkiLCJjb21wb25lbnRzIiwibWl4aW5zIiwiY29tcHV0ZWQiLCJwaWNrZXJWYWx1ZSIsInZhbHVlIiwic2V0TW9udGhEb3VibGUiLCJ3YXRjaCIsInNldEN1cnJlbnREYXRhIiwibWV0aG9kcyIsInRhcERheUl0ZW0iLCJpbmRleCIsImUiLCJjaG9vc2VkIiwic2V0QWxsTm90U2VsZWN0ZWQiLCJ0aGVuIiwiJGFwcGx5IiwiJGVtaXQiLCJoYW5kbGVDYWxlbmRhciIsImN1cl95ZWFyIiwiY3VyX21vbnRoIiwibmV3TW9udGgiLCJuZXdZZWFyIiwiYmluZERhdGVDaGFuZ2UiLCJkZXRhaWwiLCJzcGxpdCIsInBhcnNlSW50IiwiZXZlbnRzIiwic3RhcnRSZW5kZXJDYWxlbmRhciIsImRyYXdDYWxlbmRhciIsImRhdGUiLCJnZXRGdWxsWWVhciIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsIlVUQyIsImdldERheSIsImZpcnN0RGF5T2ZXZWVrIiwiZ2V0Rmlyc3REYXlPZldlZWsiLCJpIiwicHVzaCIsInRoaXNNb250aERheXMiLCJnZXRUaGlzTW9udGhEYXlzIiwibGVuZ3RoIiwibWFwIiwiaXRlbSIsImhhc0ljb24iLCJ0b2RheSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY2FsY3VsYXRlRW1wdHlHcmlkcyIsImNhbGN1bGF0ZURheXMiLCJnZXREYXlXaWR0aCIsInd4IiwiY3JlYXRlU2VsZWN0b3JRdWVyeSIsInNlbGVjdCIsImJvdW5kaW5nQ2xpZW50UmVjdCIsInJlY3QiLCJ3aWR0aCIsImV4ZWMiLCJ0b1N0cmluZyIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0k7Ozs7Ozs7Ozs7OztBQUNBLElBQUlBLGNBQWMsSUFBbEI7QUFBQSxJQUNJQyxlQUFlLElBRG5COztJQUdxQkMsWTs7Ozs7Ozs7Ozs7Ozs7c01BQ2pCQyxLLEdBQVE7QUFDSkMseUJBQWE7QUFDVEMsc0JBQUtDLE1BREk7QUFFVEMsd0JBQU8sSUFBSUMsSUFBSixFQUZFO0FBR1RDLHdCQUFRO0FBSEMsYUFEVDtBQU1KQyx1QkFBVztBQUNQTCxzQkFBS0MsTUFERTtBQUVQQyx3QkFBTyxFQUZBO0FBR1BFLHdCQUFRO0FBSEQsYUFOUDtBQVdKRSxxQkFBUztBQUNMTixzQkFBS0MsTUFEQTtBQUVMQyx3QkFBTyxFQUZGO0FBR0xFLHdCQUFRO0FBSEgsYUFYTDtBQWdCSkcseUJBQVk7QUFDUlAsc0JBQUtRLEtBREc7QUFFUk4sd0JBQU8sRUFGQztBQUdSRSx3QkFBUTtBQUhBO0FBaEJSLFMsUUF5Q1JLLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNIQyxrQkFBSyxFQURGO0FBRUhDLHFCQUFRLEVBRkw7QUFHSEMsMEJBQWMsS0FIWDtBQUlIQyx3QkFBVyxFQUpSO0FBS0hDLHdCQUFZLEtBTFQ7QUFNSEMsc0JBQVMsQ0FBRSxHQUFGLEVBQU8sR0FBUCxFQUFZLEdBQVosRUFBaUIsR0FBakIsRUFBc0IsR0FBdEIsRUFBMkIsR0FBM0IsRUFBZ0MsR0FBaEMsQ0FOTjtBQU9IQyxzQkFBUyxDQVBOO0FBUUhDLGlCQUFJO0FBQ0FDLHNCQUFLLENBREw7QUFFQUMsdUJBQU0sQ0FGTjtBQUdBQyxxQkFBSTtBQUhKO0FBUkQsUyxRQWVQQyxVLEdBQWEsRSxRQUliQyxNLEdBQVMsRSxRQUVUQyxRLEdBQVc7QUFDUEMsdUJBRE8seUJBQ007QUFDVCxvQkFB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QSx3QkFBTUEsTUFBTXVELFFBQU4sRUFBTjtBQUNBLG9CQUFHdkQsTUFBTXFDLE1BQU4sSUFBYyxDQUFqQixFQUFtQjtBQUNmLDJCQUFPckMsS0FBUDtBQUNILGlCQUZELE1BRUs7QUFDRCwyQkFBTyxNQUFJQSxLQUFYO0FBQ0g7QUFDSjtBQUNKOzs7eUNBRWU7QUFBQztBQUNiLGlCQUFLZCxPQUFMLENBQWFPLElBQWIsR0FBa0IsSUFBSWhCLElBQUosQ0FBUyxLQUFLSixXQUFkLEVBQTJCcUQsV0FBM0IsRUFBbEI7QUFDQSxpQkFBS3hDLE9BQUwsQ0FBYVEsS0FBYixHQUFtQixJQUFJakIsSUFBSixDQUFTLEtBQUtKLFdBQWQsRUFBMkJzRCxRQUEzQixLQUF3QyxDQUEzRDtBQUNIOzs7O0VBM05xQyxlQUFLNkIsUzs7a0JBQTFCckYsWSIsImZpbGUiOiJjYWxlbmRhci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gICAgbGV0IGNob29zZV95ZWFyID0gbnVsbCxcbiAgICAgICAgY2hvb3NlX21vbnRoID0gbnVsbDtcblxuICAgIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlcHlDYWxlbmRhciBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICAgICAgcHJvcHMgPSB7XG4gICAgICAgICAgICBjdXJyZW50RGF0ZToge1xuICAgICAgICAgICAgICAgIHR5cGU6U3RyaW5nLFxuICAgICAgICAgICAgICAgIGRlZnVsdDpuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgICAgIHR3b1dheTogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0YXJ0RGF0ZToge1xuICAgICAgICAgICAgICAgIHR5cGU6U3RyaW5nLFxuICAgICAgICAgICAgICAgIGRlZnVsdDonJyxcbiAgICAgICAgICAgICAgICB0d29XYXk6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbmREYXRlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTpTdHJpbmcsXG4gICAgICAgICAgICAgICAgZGVmdWx0OicnLFxuICAgICAgICAgICAgICAgIHR3b1dheTogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhhc0ljb25MaXN0OntcbiAgICAgICAgICAgICAgICB0eXBlOkFycmF5LFxuICAgICAgICAgICAgICAgIGRlZnVsdDpbXSxcbiAgICAgICAgICAgICAgICB0d29XYXk6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgb25Mb2FkICgpIHtcbiAgICAgICAgICAgIGlmKCF0aGlzLmN1cnJlbnREYXRlKXtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnREYXRlPW5ldyBEYXRlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudERhdGEoKTtcblxuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICB0aGlzLm5vdy55ZWFyPWRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICAgIHRoaXMubm93Lm1vbnRoPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xuICAgICAgICAgICAgdGhpcy5ub3cuZGF5PSBkYXRlLmdldERhdGUoKTtcblxuXG4gICAgICAgIH0gIC8vIOWcqFBhZ2XlkoxDb21wb25lbnTlhbHnlKjnmoTnlJ/lkb3lkajmnJ/lh73mlbBcblxuICAgICAgICBvblNob3cgKCkge1xuXG4gICAgICAgIH0gIC8vIOWPquWcqFBhZ2XkuK3lrZjlnKjnmoTpobXpnaLnlJ/lkb3lkajmnJ/lh73mlbBcblxuICAgICAgICBjb25maWcgPSB7fTsgIC8vIOWPquWcqFBhZ2Xlrp7kvovkuK3lrZjlnKjnmoTphY3nva7mlbDmja7vvIzlr7nlupTkuo7ljp/nlJ/nmoRwYWdlLmpzb27mlofku7ZcblxuICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgZGF5czpbXSxcbiAgICAgICAgICAgIGN1cnJlbnQ6e30sXG4gICAgICAgICAgICBoYXNFbXB0eUdyaWQ6IGZhbHNlLFxuICAgICAgICAgICAgZW1weXRHcmlkczpbXSxcbiAgICAgICAgICAgIHNob3dQaWNrZXI6IGZhbHNlLFxuICAgICAgICAgICAgd2Vla3NfY2g6WyAn5pelJywgJ+S4gCcsICfkuownLCAn5LiJJywgJ+WbmycsICfkupQnLCAn5YWtJyBdLFxuICAgICAgICAgICAgZGF5V2lkdGg6MCxcbiAgICAgICAgICAgIG5vdzp7XG4gICAgICAgICAgICAgICAgeWVhcjowLFxuICAgICAgICAgICAgICAgIG1vbnRoOjAsXG4gICAgICAgICAgICAgICAgZGF5OjBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTsgIC8vIOmhtemdouaJgOmcgOaVsOaNruWdh+mcgOWcqOi/memHjOWjsOaYju+8jOWPr+eUqOS6juaooeadv+aVsOaNrue7keWumlxuXG4gICAgICAgIGNvbXBvbmVudHMgPSB7XG5cbiAgICAgICAgfTsgIC8vIOWjsOaYjumhtemdouS4reaJgOW8leeUqOeahOe7hOS7tu+8jOaIluWjsOaYjue7hOS7tuS4reaJgOW8leeUqOeahOWtkOe7hOS7tlxuXG4gICAgICAgIG1peGlucyA9IFtdOyAgLy8g5aOw5piO6aG16Z2i5omA5byV55So55qETWl4aW7lrp7kvotcblxuICAgICAgICBjb21wdXRlZCA9IHtcbiAgICAgICAgICAgIHBpY2tlclZhbHVlKCl7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlPXRoaXMuY3VycmVudC55ZWFyK1wiLVwiK3RoaXMuc2V0TW9udGhEb3VibGUodGhpcy5jdXJyZW50Lm1vbnRoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07ICAvLyDlo7DmmI7orqHnrpflsZ7mgKfvvIjor6bop4HlkI7mlofku4vnu43vvIlcblxuICAgICAgICB3YXRjaCA9IHtcbiAgICAgICAgICAgIGN1cnJlbnREYXRlKCl7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50RGF0YSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9OyAgLy8g5aOw5piO5pWw5o2ud2F0Y2hlcu+8iOivpuingeWQjuaWh+S7i+e7je+8iVxuXG4gICAgICAgIG1ldGhvZHMgPSB7XG4gICAgICAgICAgICAvLyDngrnlh7vml6XljobkuIrmn5DkuIDlpKlcbiAgICAgICAgICAgIHRhcERheUl0ZW0oaW5kZXgsZSkge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuZGF5c1tpbmRleF0uY2hvb3NlZCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF5c1tpbmRleF0uY2hvb3NlZD1mYWxzZTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBbGxOb3RTZWxlY3RlZCgpLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF5c1tpbmRleF0uY2hvb3NlZD10cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnY2FsQ2hhbmdlU2VsZWN0ZWREYXknLHRoaXMuY3VycmVudC55ZWFyK1wiLVwiK3RoaXMuc2V0TW9udGhEb3VibGUodGhpcy5jdXJyZW50Lm1vbnRoKStcIi1cIisoaW5kZXgrMSksZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8g6YCS5aKe44CB6YCS5YeP5YiH5o2i5pyI5Lu9XG4gICAgICAgICAgICBoYW5kbGVDYWxlbmRhcih0eXBlLGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJfeWVhciA9IHRoaXMuY3VycmVudC55ZWFyO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cl9tb250aCA9IHRoaXMuY3VycmVudC5tb250aFxuICAgICAgICAgICAgICAgIGxldCBuZXdNb250aDtcbiAgICAgICAgICAgICAgICBsZXQgbmV3WWVhcjtcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3ByZXYnKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld01vbnRoID0gY3VyX21vbnRoIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgbmV3WWVhciA9IGN1cl95ZWFyO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV3TW9udGggPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdZZWFyID0gY3VyX3llYXIgLSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3TW9udGggPSAxMjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld01vbnRoID0gY3VyX21vbnRoICsgMTtcbiAgICAgICAgICAgICAgICAgICAgbmV3WWVhciA9IGN1cl95ZWFyO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV3TW9udGggPiAxMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3WWVhciA9IGN1cl95ZWFyICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld01vbnRoID0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnQueWVhcj1uZXdZZWFyO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudC5tb250aD1uZXdNb250aDtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdjYWxDaGFuZ2VDdXJyZW50RGF0ZScsdGhpcy5jdXJyZW50LnllYXIrXCItXCIrdGhpcy5zZXRNb250aERvdWJsZSh0aGlzLmN1cnJlbnQubW9udGgpLGUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIOeCueWHu+W5tOaciOiwg+eUqHBpY2tlcumAieaLqeWZqFxuICAgICAgICAgICAgYmluZERhdGVDaGFuZ2UoZSkge1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZT1lLmRldGFpbC52YWx1ZS5zcGxpdChcIi1cIik7XG4gICAgICAgICAgICAgICAgbGV0IHllYXI9cGFyc2VJbnQodmFsdWVbMF0pO1xuICAgICAgICAgICAgICAgIGxldCBtb250aD1wYXJzZUludCh2YWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgaWYoeWVhcj09dGhpcy5jdXJyZW50LnllYXIgJiYgbW9udGg9PXRoaXMuY3VycmVudC5tb250aCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50LnllYXI9eWVhcjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50Lm1vbnRoPW1vbnRoO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdjYWxDaGFuZ2VDdXJyZW50RGF0ZScsdGhpcy5jdXJyZW50LnllYXIrXCItXCIrdGhpcy5zZXRNb250aERvdWJsZSh0aGlzLmN1cnJlbnQubW9udGgpLGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTsgIC8vIOWjsOaYjumhtemdond4bWzkuK3moIfnrb7nmoTkuovku7blpITnkIblh73mlbDjgILms6jmhI/vvIzmraTlpITlj6rnlKjkuo7lo7DmmI7pobXpnaJ3eG1s5Lit5qCH562+55qEYmluZOOAgWNhdGNo5LqL5Lu277yM6Ieq5a6a5LmJ5pa55rOV6ZyA5Lul6Ieq5a6a5LmJ5pa55rOV55qE5pa55byP5aOw5piOXG5cbiAgICAgICAgZXZlbnRzID0ge1xuICAgICAgICAgICAgc3RhcnRSZW5kZXJDYWxlbmRhcigpe1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0NhbGVuZGFyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07ICAvLyDlo7DmmI7nu4Tku7bkuYvpl7TnmoTkuovku7blpITnkIblh73mlbBcblxuICAgICAgICBnZXRUaGlzTW9udGhEYXlzKHllYXIsIG1vbnRoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGgsIDApLmdldERhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyDorqHnrpfmr4/mnIjnrKzkuIDlpKnmmK/mmJ/mnJ/lh6BcbiAgICAgICAgZ2V0Rmlyc3REYXlPZldlZWsoeWVhciwgbW9udGgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQyh5ZWFyLCBtb250aCAtIDEsIDEpKS5nZXREYXkoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyDorqHnrpflnKjmr4/mnIjnrKzkuIDlpKnlnKjlvZPmnIjnrKzkuIDlkajkuYvliY3nmoTnqbrkvZnnmoTlpKnmlbBcbiAgICAgICAgY2FsY3VsYXRlRW1wdHlHcmlkcyh5ZWFyLCBtb250aCkge1xuICAgICAgICAgICAgY29uc3QgZmlyc3REYXlPZldlZWsgPSB0aGlzLmdldEZpcnN0RGF5T2ZXZWVrKHllYXIsIG1vbnRoKTtcbiAgICAgICAgICAgIGxldCBlbXB5dEdyaWRzID0gW107XG4gICAgICAgICAgICBpZiAoZmlyc3REYXlPZldlZWsgPiAwKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaXJzdERheU9mV2VlazsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGVtcHl0R3JpZHMucHVzaChpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5oYXNFbXB0eUdyaWQ9dHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZW1weXRHcmlkcz1lbXB5dEdyaWRzO1xuICAgICAgICB9XG4gICAgICAgIC8vIOa4suafk+aXpeWOhuagvOWtkFxuICAgICAgICBjYWxjdWxhdGVEYXlzKHllYXIsIG1vbnRoKSB7XG4gICAgICAgICAgICBsZXQgZGF5cyA9IFtdO1xuICAgICAgICAgICAgY29uc3QgdGhpc01vbnRoRGF5cyA9IHRoaXMuZ2V0VGhpc01vbnRoRGF5cyh5ZWFyLCBtb250aCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSB0aGlzTW9udGhEYXlzOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgIGRheT17XG4gICAgICAgICAgICAgICAgICAgIGRheTogaSxcbiAgICAgICAgICAgICAgICAgICAgY2hvb3NlZDogZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYodGhpcy5oYXNJY29uTGlzdCAmJiB0aGlzLmhhc0ljb25MaXN0Lmxlbmd0aD4wKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNJY29uTGlzdC5tYXAoKGl0ZW0pPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpPT1pdGVtKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXkuaGFzSWNvbj10cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZih0aGlzLmN1cnJlbnQueWVhcj09dGhpcy5ub3cueWVhciAmJiB0aGlzLmN1cnJlbnQubW9udGg9PXRoaXMubm93Lm1vbnRoICYmIGk9PXRoaXMubm93LmRheSl7XG4gICAgICAgICAgICAgICAgICAgIGRheS50b2RheT10cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkYXlzLnB1c2goZGF5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGF5cz1kYXlzO1xuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEFsbE5vdFNlbGVjdGVkKCl7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuZGF5cy5tYXAoKGl0ZW0pPT57XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2hvb3NlZD1mYWxzZTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBkcmF3Q2FsZW5kYXIoKXtcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlRW1wdHlHcmlkcyh0aGlzLmN1cnJlbnQueWVhciwgdGhpcy5jdXJyZW50Lm1vbnRoKTtcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlRGF5cyh0aGlzLmN1cnJlbnQueWVhciwgdGhpcy5jdXJyZW50Lm1vbnRoKTtcblxuICAgICAgICAgICAgbGV0IGdldERheVdpZHRoPW5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcbiAgICAgICAgICAgICAgICB3eC5jcmVhdGVTZWxlY3RvclF1ZXJ5KCkuc2VsZWN0KCcud2VweS1jYWxlbmRhci13ZWVrcycpLmJvdW5kaW5nQ2xpZW50UmVjdChmdW5jdGlvbihyZWN0KXtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShwYXJzZUludChyZWN0LndpZHRoLzcpKTtcbiAgICAgICAgICAgICAgICB9KS5leGVjKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBnZXREYXlXaWR0aC50aGVuKCh3aWR0aCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLmRheVdpZHRoPXdpZHRoO1xuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgc2V0TW9udGhEb3VibGUodmFsdWUpey8v6K6+572u5pyI5Lu95Lik5L2N5pWw5qC85byPXG4gICAgICAgICAgICBpZih2YWx1ZSl7XG4gICAgICAgICAgICAgICAgdmFsdWU9dmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBpZih2YWx1ZS5sZW5ndGg9PTIpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIjBcIit2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzZXRDdXJyZW50RGF0YSgpey8v6K6+572u5b2T5YmN5bm05pyIXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQueWVhcj1uZXcgRGF0ZSh0aGlzLmN1cnJlbnREYXRlKS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50Lm1vbnRoPW5ldyBEYXRlKHRoaXMuY3VycmVudERhdGUpLmdldE1vbnRoKCkgKyAxO1xuICAgICAgICB9XG5cbiAgICB9XG4iXX0=