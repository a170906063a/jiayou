//index.js
var requests = require('../../utils/request.js');
var that;
//获取应用实例
const app = getApp()

Page({
  data: {
    inviteRed:2,//邀请红包
    cardVoucher: 2,//卡券
    integral: 2,//积分
    gasRecord: 2,//加油记录

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
    that=this;
    // 首页获取新用户奖励
    const params = {
      send_type: "user_bind",
      timestamp: requests.getTimestamp()
    }
    requests.newUser('POST', params, (data) => {
      if (data.data.code=="10000"){
        this.setData({
          newAward: true
        })
      }else{
        console.log(data.data.msg)
      }
    });

    // 首页获取信息
    const data = {
      device_id: 1,
      timestamp: requests.getTimestamp()
    }
    requests.driverIndex('GET',data,(data)=>{
      var res = data.data;
      if (res.code == "10000") {
        that.setData({
          inviteRed: res.data.userInfo.invite_total,//邀请红包
          cardVoucher: res.data.userInfo.card_total,//卡券
          integral: res.data.userInfo.bonus_total,//积分
          gasRecord: res.data.userInfo.msg_total,//加油记录
        })
        res.data.userInfo
      } else {
        console.log(res.msg)
      }
      console.log(res)
    });
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  alert: function (message) {
    wx.showModal({
      showCancel: false,
      title: '提示信息',
      content: message
    });
  },
})