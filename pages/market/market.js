// pages/makelist/makelist.js
Page({
    data: {
    // 切换class样式标志
        flag:0
      },
    //点击切换显示内容
    flagFun: function (e) {
        this.setData({
          flag: e.currentTarget.dataset.flagindex
        });
      },
    onLoad: function (options) {
      var that = this;
      wx.request({
        url: 'http://cc.cc/index/index/market',
        success(e) {
          that.setData({
            goods: e.data.result.goods,
            hot: e.data.result.hot
          })
          console.log(that.data.goods);
        }
      })
    },
  })