//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tags: [
      { 
        "name": "备品超市",
        "image": "/images/tag_market.png",
        "url": "/pages/market/market"
      }, 
      {
        "name": "车辆美容",
        "image": "/images/tag_beauty.png",
        "url": "/pages/spar/index"
      },
      {
        "name": "维修与救援",
        "image": "/images/tag_repair.png",
        "url": "/pages/market/market"
      },
      {
        "name": "快修与保养",
        "image": "/images/tag_run.png",
        "url": "/pages/service/index"
      },
      {
        "name": "轮胎更换",
        "image": "/images/tag_change.png",
        "url": "/pages/market/market"
      },
      {
        "name": "品质贴膜",
        "image": "/images/tag_around.png",
        "url": "/pages/market/market"
      },
      {
        "name": "审车代办",
        "image": "/images/tag_proxy.png",
        "url": "/pages/proxy/index"
      },
      {
        "name": "洗车",
        "image": "/images/tag_wash.png",
        "url": "/pages/market/market"
      },
      {
        "name": "专属服务",
        "image": "/images/tag_spicial.png",
        "url": "/pages/vip/index"
      }
    ],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  binddown:function(){
    
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://super.mynatapp.cc/index/index/index',
      success (e){
        that.setData({
          types : e.data.result.types,
          banner : e.data.result.banner,
          merchant : e.data.result.merchant
        })
      }
    })
  },
  getUserInfo: function(e) {
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
    var index = e.currentTarget.id;
    wx.navigateTo({
      url:this.data.tags[index].url,
    })
  }
})


