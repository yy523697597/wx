//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    userPhone: null,
    userVali: null,
    phone: 18502810881,
    valiNum: 123456,
    valiText: '获取验证码',
    validating: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.switchTab({
      url: '../center/center'
    });
  },
  tryLogin: function() {
    if (this.data.userVali.length == 6) {
      if (this.data.userVali == this.data.valiNum) {
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000
        });
        setTimeout(() => {
          wx.switchTab({
            url: `../center/center?userPhone=${this.data.userPhone}`
          });
        }, 2000);
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '请输入正确的验证码'
      });
    }
  },
  getVali: function() {
    if (!this.data.validating) {
      if (this.data.phone == this.data.userPhone) {
        this.setData({
          valiText: '获取中...',
          validating: true
        });
      } else {
        if (this.data.userPhone.length !== 11) {
          wx.showToast({
            title: '请输入正确的手机号码',
            icon: 'none',
            duration: 2000
          });
        } else {
          wx.showModal({
            title: '提示',
            content: '您还不是我们的会员'
          });
        }
      }
    }
  },
  getUserPhone(e) {
    this.setData({
      userPhone: e.detail.value
    });
  },
  getUserVali(e) {
    this.setData({
      userVali: e.detail.value
    });
  }
});
