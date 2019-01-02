const app = getApp()
//const webhost = "https://test-pay.xjiayou.com";
const webhost = "https://pay.xjiayou.com";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderno:'',
    money:'',
    status:0,
    message:'',
    isIos:true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ orderno: options.orderno });
    var that = this;
    wx.checkSession({
      success: function () {
        console.log("--check1--");
        try {
          var openid = wx.getStorageSync('openid');
          console.log("--check2--", openid);
          //that.onFetchUserinfo();
          if (!openid) {
            that.onFetchUserinfo();
          } else {
            app.globalData.openid = openid;
            that.onPay();
          }
        } catch (e) { }

      },
      fail: function () {
        console.log("--check2--");
        that.onFetchUserinfo();
      }
    });
    
    
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        if (res.platform == "android" || res.system.toLowerCase().indexOf("android")>-1) {
          console.log(res);
          that.setData({isIos:false});
        }
      }
    })
    
   
  },

  onFetchUserinfo: function () {
    console.log("--onFetchUserinfo--");
    var that = this;
    wx.login({
      success: function (res) {
        
        if (res.code) {
          //发起网络请求
          wx.request({
            url: webhost+'/wechat/user/openid_get',
            method: "POST",
            data: {
              code: res.code
            },

            success: function (res) {
              console.log(res);
              if (res.data.result == "OK") {
                app.globalData.openid = res.data.openid;
                wx.setStorageSync('openid', res.data.openid);
                that.onPay();
              }
            }


          });

        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  
  onPay: function () {
    var that = this;
    var link = '/pay/v1/pay/newOrderWx';
    if (this.data.orderno.indexOf("-")>-1){
      link = '/pay/pay/newOrderWx';
    }
    wx.request({
      url: webhost + link,
      method:'POST',
      data:{
        "subOpenId": app.globalData.openid,
        "order_no": this.data.orderno
      },
      success: function (res) {
        console.log(res.data);
        console.log(res.data.data);
        if (res.data.code==1){
          that.onWechatPay(res.data.data.miniPayRequest);
          that.setData({ money: res.data.data.money});
        }else{
          that.setData({ status: 2 });
          //that.alert("支付失败");
        }
      }
    })
  },

  onWechatPay:function(item){
    var that = this;
    wx.requestPayment({
      timeStamp: item.timeStamp,
      nonceStr: item.nonceStr,
      'package': item.package,
      signType: item.signType,
      paySign: item.paySign,
      success:function(res){
        console.log(res);
        that.setData({status:1});
      },
      fail: function (res) {
        console.log(res);
        that.setData({ status: 2 });
      },
      complete: function (res) {
        console.log(res);
      },

    });
  },
  
  alert: function (message) {
    wx.showModal({
      showCancel: false,
      title: '提示信息',
      content: message
    });
  },

  launchAppError(e) {
    console.log(e.detail.errMsg)
    this.setData({ message: e.detail.errMsg});
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