var app = getApp();

const API_BASE = 'http://news-at.zhihu.com/api/';

var api = {
	getThemeStories: API_BASE + 'theme'
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
function requestData(url, data, successCallback, errorCallback, completeCallback) {
	if(app.debug) {
		console.log('requestData url: ', url);
	}
	wx.request({
		url: url,
		data: data,
		header: {
			'Content-Type': 'application/json'
		},
		success: function(res) {
			if(app.debug) {
				console.log('response data: ', res);
			}
			if(res.statusCode == 200)
				util.isFunction(successCallback) && successCallback(res.data);
			else
				util.isFunction(errorCallback) && errorCallback();
		},
		error: function() {
			util.isFunction(errorCallback) && errorCallback();
		},
		complete: function() {
			util.isFunction(completeCallback) && completeCallback();
		}
	});
}

function getThemeStories(themeId, successCallback, errorCallback, completeCallback) {
	requestData(api.getThemeStories, {}, successCallback, errorCallback, completeCallback);
}

module.exports = {

	getThemeStories: getThemeStories,

};