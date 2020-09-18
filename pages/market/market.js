// pages/makelist/makelist.js
Page({
    data: {
      category: [{ "name": "机油" }, { "name": "润滑油" }, { "name": "变速邮箱" }, { "name": "刹车油" }, { "name": "饰品" }, { "name": "超市" }, { "name": "更多" }],
      banner: [
        { img: '/images/market1.png' },
        { img: '/images/market2.jpg' },
        { img: '/images/market3.jpg' }
      ],
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
        url: 'https://super.mynatapp.cc/index/index/market',
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