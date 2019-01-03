//index.js
var requests = require('../../utils/request.js');

//获取应用实例
const app = getApp()

Page({
  data: {
    newAward: true,
    //滚动
    imgUrls: [
      '/images/Rectangle3@2x.png',
      '/images/Rectangle3@2x.png',
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    // 油价
    priceList: [{
      number: '19#',
      price1: '6.45',
      price2: '5.52'
    }, {
      number: '19#',
      price1: '6.45',
      price2: '5.52'
    }],
    //日常活动 
    arrayList: [{
      img: '/images/pic@2x.png',
      title: '最多26个字中秋送好礼啦了10倍积分赶快来抢购啊',
      time: '2018-10-20',
      look: '200'
    }, {
      img: '/images/pic@2x.png',
      title: '最多26个字中秋送好礼啦了10倍积分赶快来抢购啊积分赶快来抢购啊积分赶快来抢购啊积分赶快来抢购啊',
      time: '2018-10-20',
      look: '200'
    }],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  close: function() {
    this.setData({
      newAward: false
    })
  },
  onLoad: function() {
    // 首页获取信息
    const data = {
      device_id: 1,
      timestamp: requests.getTimestamp()
    }
    requests.driverIndex('GET',data,(data)=>{
      console.log(data.data.msg)
    });
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})