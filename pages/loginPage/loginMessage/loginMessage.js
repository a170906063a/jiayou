var requests = require('../../../utils/request.js');
var that;
var app=getApp();
// pages/sao/sao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    second:"获取验证码",
    color:'#888888',
    phone:0,
    code:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
  },
  getCode:function(){
    if (this.data.second != "获取验证码" || this.data.color != "#000000"){
      return;
    }
    var timestamp=requests.getTimestamp();
    var method='POST'
    var params={ 
      mobile: parseInt(that.data.phone), 
      timestamp: timestamp
    };
    requests.sendSms('POST', params, (data) => {
      if (data.data.code == "10000"){
        that.setData({
          color: '#888888'
        })
        that.tl({
          onFrame: function (f) {
            that.setData({ second: (60 - f) + "s" });
          }, s: 1000, t: 60, r: 1, onComplete: function () {
            that.setData({ second: "获取验证码", color: '#000000' });
          }
        });
      }else{
        that.alert(data.data.msg)
      }
    })
  },
  goLogin:function(){
    var timestamp = requests.getTimestamp();
    var params = {
      login_type: "sms",
      mobile: parseInt(that.data.phone), 
      verify_code: parseInt(that.data.code), 
      mtype: app.globalData.mobileStyle,
      device_id:"",
      source:"smallCode",
      timestamp: timestamp
    };
    requests.loginIndex('POST', params, (data) => {
      console.log(data.data)
      if (data.data.code == "10000") {
        if (data.data.data.bind_step == "bind_car") {
          wx.navigateTo({
            url: '/pages/loginPage/plateMessage/plateMessage',
          })
          wx.setStorageSync('bindCardNum', '0')//需要绑定车牌
        }else if (data.data.data.bind_step == "bind_gas"){
          wx.navigateTo({
            url: '/pages/loginPage/sao/sao',
          })
          wx.setStorageSync('bindGas', '0')//需要绑定加油站
        }else{
          wx.navigateTo({
            url: '/pages/index/index',
          })
        }
      }else{
        that.alert(data.data.msg)
      }
    })
  },
  inputChange:function(res){
    if (res.currentTarget.id =="phone"){
      var str = res.detail.value;
      if (str.length==11){
        this.setData({
          color: "#000000"
        })
      }else{
        this.setData({
          color: "#888888"
        })
      }
    }
    this.data[res.currentTarget.id] = res.detail.value;
  },
  alert: function (message) {
    wx.showModal({
      showCancel: false,
      title: '提示信息',
      content: message
    });
  },
  tl(options) {
    var op = {
      onFrame: function () { },
      onStart: function () { },
      onEnd: function () { },
      onComplete: function () { },
      s: 100,
      t: 2,
      r: 0,
      at: 0
    };
    for (var prop in options) {
      op[prop] = options[prop];
    }
    var c = 0;
    var i = op.at;
    var timer = setInterval(function () {
      if (i == 0) { op.onStart(); }
      i++;
      op.onFrame(i);
      if (i >= op.t) {
        i = 0;
        op.onEnd(c);
        if (op.r != -1) {
          c++;
          if (c >= op.r) {
            op.onComplete();
            clearInterval(timer);
          }
        }
      }
    }, op.s);
    return timer;
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