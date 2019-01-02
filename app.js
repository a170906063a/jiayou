
//app.js

var that, mobileStyle;
App({
  onLaunch: function () {
    that=this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.checkSession({
          success: function () {
            console.log("--check1--");
            try {
              var openid = wx.getStorageSync('openid');
              console.log("--check2--", openid);
              that.onFetchUserinfo();
              if (!openid) {
                that.onFetchUserinfo();
              } else {
                that.globalData.openid = openid;
              }
            } catch (e) { }

          },
          fail: function () {
            console.log("--check2--");
            that.onFetchUserinfo();
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    //获取手机类型
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        if (res.platform == "android" || res.system.toLowerCase().indexOf("android") > -1) {
          that.globalData.mobileStyle=1;
        }else{
          that.globalData.mobileStyle=2;
        }
      }
    })
  },
  onFetchUserinfo: function () {
    console.log("--onFetchUserinfo--");
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://pay.xjiayou.com/wechat/user/openid_get',
            method: "POST",
            data: {
              code: res.code
            },

            success: function (res) {
              console.log(res);
              if (res.data.result == "OK") {
                that.globalData.openid = res.data.openid;
                wx.setStorageSync('openid', res.data.openid);

              }
            }


          });

        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  globalData: {
    userInfo: null,
    openid:"",
    mobileStyle: 0,
  }
})