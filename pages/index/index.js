//index.js
var requests = require('../../utils/request.js');

//获取应用实例
const app = getApp()

Page({
  data: {
    newAward:true,
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
      newAward:false
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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