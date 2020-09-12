// pages/makelist/makelist.js
Page({
    data: {
      category: [{ "name": "机油" }, { "name": "润滑油" }, { "name": "变速邮箱" }, { "name": "刹车油" }, { "name": "饰品" }, { "name": "超市" }, { "name": "更多" }],
      dataList:[
        {
          name: '南极人座椅靠背',
          img: '/../images/goods1.jpg'
        },
        {
          name: '后视镜倒车雷达',
          img: '/../images/goods2.jpg'
        },
        {
          name: '车掸',
          img: '/../images/goods3.jpg'
        },
        {
          name: 'BOZL水蜡',
          img: '/../images/goods4.jpg'
        },
        {
          name: '零配件',
          img: '/../images/goods5.jpg'
        },
        {
          name: '后视镜倒车雷达',
          img: '/../images/goods2.jpg'
        },
        {
          name: '车掸',
          img: '/../images/goods3.jpg'
        }
      ],
      banner:[
        {img:'/../images/market1.png'},
        {img: '/../images/market2.jpg'},
        {img: '/../images/market3.jpg'}
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
      
    },
  })