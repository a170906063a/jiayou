var requests = require('../../../utils/request.js');

// pages/sao/sao.js
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

  },
  scanCode:function(){
    wx.scanCode({
      success: (res) => {
        var timestamp = requests.getTimestamp();
        var method = 'POST'
        var params = {
          qrcode: res.result,//res.result,rawData
          timestamp: timestamp
        };
        requests.bindGasFun('POST', params, (data) => {
          console.log(data.data)
          if (data.data.code=="10000"){
            if (data.data.data.bind_step == "bind_car") {
              wx.navigateTo({
                url: '/pages/loginPage/plateMessage/plateMessage',
              })
              wx.setStorageSync('bindCardNum', '0')//需要绑定车牌
            } else {
              wx.navigateTo({
                url: '/pages/index/index',
              })
              wx.setStorageSync('bindGas', '1')//已绑定加油站
            }
            
            // wx.navigateTo({
            //   url: '/pages/loginPage/login/login',
            // })
          }
        })
      },
      fail: (res) => {
        console.log(res);
      }
    })
  },
  alert: function (message) {
    wx.showModal({
      showCancel: false,
      title: '提示信息',
      content: message
    });
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