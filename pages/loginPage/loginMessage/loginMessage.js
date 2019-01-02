var requests = require('../../../utils/request.js');
var that;
var app=getApp();
// pages/sao/sao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    if(this.data.color!="#000000"){
      return;
    }
    var timestamp=requests.getTimestamp();
    var themeId=2;
    var method='POST'
    var data={ 
      mobile: parseInt(that.data.phone), 
      timestamp: timestamp
    };
    var success=function(res){
      console.log(res)
    };
    var error=function(res){
      console.log(res)
    };
    var complete=function (res) {
      console.log(res)
    }
    requests.sendSms(themeId, method, data, success, error, complete)
  },
  goLogin:function(){
    var timestamp = requests.getTimestamp();
    var themeId = 1;
    var method = 'POST'
    var data = {
      login_type: "sms",
      mobile: parseInt(that.data.phone), 
      verify_code: parseInt(that.data.code), 
      mtype: app.globalData.mobileStyle,
      device_id:"",
      source:"smallCode",
      timestamp: timestamp
    };
    var success = function (res) {
      if(res.data.code=="10000"){
        wx.navigateTo({
          url: '/pages/loginPage/plateMessage/plateMessage',
        })
      }
    };
    var error = function (res) {
      console.log(res)
    };
    var complete = function (res) {
      console.log(res)
    }
    requests.loginIndex(themeId, method, data, success, error, complete)
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