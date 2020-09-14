//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'http://cc.cc/index/index/index',
      success (e){
        that.setData({
          types : e.data.result.types,
          banner : e.data.result.banner,
          merchant : e.data.result.merchant
        })
        console.log(that.data.merchant);
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  handleClick: function(e){
    /*wx.navigateTo 未在app.json里注册的
      wx.switchTab  在app.json里面注册的
     */
    var index = 1;
    wx.navigateTo({
      url:'/pages/spar/index?index='+1,
    })
  }
})


