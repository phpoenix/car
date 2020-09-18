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
    street: ''
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
          console.log(item);
          qqmapsdk.reverseGeocoder({
            location: item.latitude +","+ item.longitude,
            success: function(res) {
                console.log(res)
                that.setData({
                    address: res.result.address,
                    markers: [{
                      id: 88,
                      latitude: item.latitude,
                      longitude: item.longitude,
                      title: res.result.address,
                      iconPath: "/images/pos.png"
                      // label: {
                      //   content: '标记',
                      //   color: '#22ac38',
                      //   fontSize: 14,
                      //   bgColor: "#fff",
                      //   borderRadius: 30,
                      //   borderColor: "#22ac38",
                      //   borderWidth: 1,
                      //   padding: 3
                      // }, 
                    }]
                })
            },
            fail: function(res) {
                 console.log(res);
            },
            complete: function(res) {
                 console.log(res);
            }
        });
          //赋值经纬度
          that.setData({
            latitude: item.latitude,
            longitude: item.longitude,
          })
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
    this.setData({
      date:e.detail.value,
    });
  },

  eventInput: function(e){
    //移动手机号
    var reg1 = /^1(3[4-9]|5[012789]|8[78])\d{8}$/;
    //电信手机号
    var reg2 = /^18[09]\d{8}$/;
    //联通手机号
    var reg3 = /^1(3[0-2]|5[56]|8[56])\d{8}$/;
    //CDMA手机号
    var reg4 = /^1[35]3\d{8}$/;

    var reg = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/;
    if (reg.test(e.detail.value)){
      wx.hideKeyboard();
    }
  },

  /**
   * form表单提交
   */
  formSubmit: function(e){
    var position,date,phone;
    position = e.detail.value.position;
    date = e.detail.value.date;
    phone = e.detail.value.phone;
    console.log(position)
    wx.request({
      url: "https://super.mynatapp.cc/index/proxy/collect",
      method: "POST",
      data: {
        position:position,
        date: date,
        phone: phone
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
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
    console.log(e.detail.current)
    var that = this;
    that.setData({
      currentTab: e.detail.current,
      height: e.detail.current == 0? 220 : 150,
      display_map: 'none'
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
  }
})