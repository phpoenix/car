// pages/service/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: [{ "name": "机油" }, { "name": "润滑油" }, { "name": "变速邮箱" }, { "name": "刹车油" }, { "name": "饰品" }, { "name": "超市" }, { "name": "更多" }],
    dataList: [
      {
        name: '佐佐木机油'
      },
      {
        name: '佐佐木机油'
      },
      {
        name: '佐佐木机油'
      },
      {
        name: '佐佐木机油'
      },
      {
        name: '佐佐木机油'
      },
      {
        name: '佐佐木机油'
      },
      {
        name: '佐佐木机油'
      }
    ],
    // 切换class样式标志
    flag: 0
  },
  //点击切换显示内容
  flagFun: function (e) {
    this.setData({
      flag: e.currentTarget.dataset.flagindex
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})