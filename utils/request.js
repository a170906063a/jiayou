var md5 = require('../utils/js-md5.js');


var app = getApp();
const API_BASE = 'https://test-api.xjiayou.com/users/';
var secret = "f8156a4ec792608f4a08eefe1ee07eda"
var token = "";
var api = {
  //用户登录接口
  loginIndex: API_BASE + 'v1/login/index',
  //发送短信验证码接口
  sendSms: API_BASE + 'sms/send',
  // 车主首页
  driverIndex: API_BASE + 'v1/home/index',
}

//时间戳
function getTimestamp() {
  var timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000;
  return timestamp;
}

/*
 * 生成sign签名
 */
function createSign(data) {
  let keys = Object.keys(data);
  keys = keys.sort();
  let str = '';
  keys.forEach(k => {
    if (data[k] != '' && data[k] != 0 && data[k] != undefined) {
      str += k + '=' + data[k] + '&';
    }
  });

  str += 'appSecret=' + secret;
  return md5.hex_md5(str);
}

/**
 * 网络请求方法
 * @param url {string} 请求url
 * @param data {object} 参数
 * @param successCallback {function} 成功回调函数
 * @param errorCallback {function} 失败回调函数
 * @param completeCallback {function} 完成回调函数
 * @returns {void}
 */
function requestData(url, method, data, successCallback, errorCallback, completeCallback) {
  if (app.debug) {
    console.log('requestData url: ', url);
  }
  const headers = {
    'X-SIGN': createSign(data),
    'X-TOKEN': token ? token : ''
  }
  wx.request({
    url: url,
    data: data,
    header: headers,
    method: method,
    success: function(res) {
      if (app.debug) {
        console.log('response data: ', res);
      }
      if (res.statusCode == 200) {
        successCallback(res);
        token = res.data.token;
      } else {
        errorCallback(res);
      }
    },
    error: function() {
      errorCallback();
    }
  });
}

//用户登录接口
function loginIndex(themeId, method, data, successCallback, errorCallback) {
  requestData(api.loginIndex, method, data, successCallback, errorCallback);
}
//发送短信验证码接口
function sendSms(themeId, method, data, successCallback, errorCallback) {
  requestData(api.sendSms, method, data, successCallback, errorCallback);
}
//车主首页接口
function driverIndex(method, data, successCallback, errorCallback) {
  requestData(api.driverIndex, method, data, successCallback, errorCallback);
}

module.exports = {
  loginIndex: loginIndex,
  sendSms: sendSms,
  getTimestamp: getTimestamp,
  driverIndex: driverIndex
};