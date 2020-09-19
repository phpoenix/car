// pages/proxy/index.js
var QQMapWX = require('/../../library/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
        * 页面配置
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
    height: 220,
    display_map:'none',
    latitude: 0,
    longitude: 0,
    scale: 14,
    markers: [],
    address: '',
    province: '',
    city: '',
    district: '',
    street: '',
    date: '',
    phone: '',
    background: '#bbbab8',
    disabled: false
  },
  
  /**
   * 实时位置
   */
  bindPosition: function(e){
    if (this.data.display_map == 'none'){
      var that = this;
      //获取当前的地理位置、速度
      wx.getLocation({
        type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
        success: function (item) {
          qqmapsdk.reverseGeocoder({
            location: item.latitude +","+ item.longitude,
            success: function(res) {
                that.setData({
                    address: res.result.address,
                    markers: [{
                      id: 88,
                      latitude: item.latitude,
                      longitude: item.longitude,
                      title: res.result.address,
                      iconPath: "/images/pos.png" 
                    }]
                })
            },
            fail: function(res) {
                 console.log(res);
            },
            complete: function(res) {
                 
            }
          });
          if(that.checkForm()){
            that.setData({
              background: '#f7bb4b',
              disabled: true
            });
          }
          //赋值经纬度
          that.setData({
            latitude: item.latitude,
            longitude: item.longitude,
          });
        }
      });
      
      this.setData({
        display_map: 'block',
        height: 300
      })
    }else{
      this.setData({
        display_map: 'none',
        height: 220
      })
    }
    
  },

  markDetail: function(res){
    // console.log(res)
  },

  /**
   * 日期组件
   */
  bindDateChange:function(e){
    var that = this;
    that.setData({
      date:e.detail.value,
    });
    if(that.checkForm()){
      that.setData({
       background: '#f7bb4b',
       disabled: true
      });
    }
  },

  eventInput: function(e){
    //前台不必要验证手机号正确与否
    var that = this;
    // var reg = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/;
    if ((e.detail.value).length == 11){
      that.setData({
        phone: e.detail.value
      });
      wx.hideKeyboard();
      if(that.checkForm()){
        that.setData({
         background: '#f7bb4b',
         disabled: true
        });
      }
    }
  },

  /**
   * form表单提交
   */
  formSubmit: function(e){
    if(this.data.disabled == false)
      return false;
    var data = {}, that = this;
    //向接口提交的数据data
    data = {
      type: that.data.currentTab + 1,
      address: that.data.address,
      latitude: that.data.latitude,
      longitude: that.data.longitude,
      date: that.data.date,
      phone: that.data.phone
    };
    wx.request({
      url: "https://super.mynatapp.cc/index/proxy/collect",
      method: "POST",
      data: data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        
        //阻止重复提交
        that.setData({
          disabled: false
        });

        if(res.data.code == 400){
          wx.showToast({
            title: res.data.result.error,
            icon: 'none',
            duration: 1000,
            mask:true
          })
        };
        console.log(res.data);
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "审车"
    });
    /**
     * 获取系统信息
     */
    var that = this;
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });

    qqmapsdk = new QQMapWX({
      key: "H3JBZ-ACJ6O-LIWWV-SY2IC-YOEYJ-77BIQ"
    });
    
    // qqmapsdk.reverseGeocoder({
    //   success: function(res){
    //     console.log(res);
    //   }
    // })
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

  },
  

  /**
     * 滑动切换tab
     */
  bindChange: function (e) {
    // console.log(e.detail.current)
    var that = this;
    that.setData({
      currentTab: e.detail.current,
      height: e.detail.current == 0? 220 : 200,
      display_map: 'none',
      //切换后置空input框的值
      address: '',
      latitude: '',
      longitude: '',
      date: '',
      phone: '',
      background: '#bbbab8',
      disabled: false
    });

  },
  /**
   * 点击tab切换
   */
  swichNav: function (e) {

    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        display_map: 'none'
      })
    }
  },

  /**
   * 验证表单是否填写完整
   */
  checkForm: function(){
    var option;
    if(this.data.currentTab==0){
      option = [this.data.address,this.data.date,this.data.phone];
    }else{
      option = [this.data.date,this.data.phone];
    }console.log(option)
    for(var item in option){
      if(option[item] == "" || option[item] == null || option[item] == "undefined"){
        return false;
      }
    }
    return true;
  }
  
})