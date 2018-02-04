// pages/center/center.js
var wxCharts = require('../../utils/wxcharts.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userName: '哆啦A梦',
    classDetail: [
      {
        title: '领袖口才计划',
        total: 16,
        used: 9,
        avaliable: 7,
        usedColor: '#ffa39e',
        avaColor: '#b7eb8f'
      },
      {
        title: '主持大赛',
        total: 16,
        used: 4,
        avaliable: 12,
        usedColor: '#fffb8f',
        avaColor: '#b7eb8f'
      },
      {
        title: '形体班',
        total: 16,
        used: 6,
        avaliable: 10,
        usedColor: '#adc6ff',
        avaColor: '#b7eb8f'
      },
      {
        title: '舞台剧',
        total: 16,
        used: 12,
        avaliable: 4,
        usedColor: '#d3adf7',
        avaColor: '#b7eb8f'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: `${this.data.userName}同学统计数据`,
      success: function(res) {
        // success
      }
    });

    new wxCharts({
      canvasId: 'pie',
      type: 'pie',

      series: [
        {
          name: '已用课时',
          data: 50,
          color: 'rgb(255,163,158)',
          format: function() {
            return `已用${this.data}课时`;
          }
        },
        {
          name: '待用课时',
          data: 14,
          color: 'rgb(149,222,100)',
          format: function() {
            return `待用${this.data}课时`;
          }
        }
      ],
      width: 350,
      height: 250,
      dataLabel: true
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
