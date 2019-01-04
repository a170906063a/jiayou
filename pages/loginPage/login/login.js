var requests = require('../../../utils/request.js');
var that;
var app=getApp();
// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
  },
  wxLogin:function(){
    
  }, 
  mobileLogin: function () {
    var curToken = wx.getStorageSync('token');
    var bindCardNum = wx.getStorageSync('bindCardNum');
    var bindGas = wx.getStorageSync('bindGas');

    if (curToken) {
      if (bindCardNum != "1") {
        wx.navigateTo({
          url: '/pages/loginPage/plateMessage/plateMessage',
        })//需要绑定车牌
      } else if (bindGas == "0") {
        wx.navigateTo({
          url: '/pages/loginPage/sao/sao',
        })//需要绑定加油站
      } else {
        wx.navigateTo({
          url: '/pages/index/index',
        })//绑定全部成功
      }
    } else {
      //去登陆
      wx.navigateTo({
        url: '/pages/loginPage/loginMessage/loginMessage',
      })//绑定全部成功
    }
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