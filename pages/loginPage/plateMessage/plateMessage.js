var requests = require('../../../utils/request.js');

// pages/sao/sao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseSheng: false,
    chooseNumber: false,
    boxContent1: '省',
    boxContent2: '',
    boxContent3: '',
    boxContent4: '',
    boxContent5: '',
    boxContent6: '',
    boxContent7: '',
    boxContent8: '',
    keyArray: [{
      name: '皖'
    }, {
      name: '津'
    }, {
      name: '冀'
    }, {
      name: '鲁'
    }, {
      name: '晋'
    }, {
      name: '蒙'
    }, {
      name: '辽'
    }, {
      name: '吉'
    }, {
      name: '黑'
    }, {
      name: '沪'
    }, {
      name: '苏'
    }, {
      name: '浙'
    }, {
      name: '京'
    }, {
      name: '闽'
    }, {
      name: '赣'
    }, {
      name: '豫'
    }, {
      name: '鄂'
    }, {
      name: '湘'
    }, {
      name: '粤'
    }, {
      name: '桂'
    }, {
      name: '渝'
    }, {
      name: '川'
    }, {
      name: '贵'
    }, {
      name: '云'
    }, {
      name: '藏'
    }, {
      name: '陕'
    }, {
      name: '甘'
    }, {
      name: '青'
    }, {
      name: '琼'
    }, {
      name: '新'
    }, {
      name: '宁'
    }, {
      name: '使'
    }],
    numberArray: [{
      number: '0'
    }, {
      number: '1'
    }, {
      number: '2'
    }, {
      number: '3'
    }, {
      number: '4'
    }, {
      number: '5'
    }, {
      number: '6'
    }, {
      number: '7'
    }, {
      number: '8'
    }, {
      number: '9'
    }],
    englishArray1: [{
      number: 'Q'
    }, {
      number: 'W'
    }, {
      number: 'E'
    }, {
      number: 'R'
    }, {
      number: 'T'
    }, {
      number: 'Y'
    }, {
      number: 'U'
    }, {
      number: 'I'
    }, {
      number: 'O'
    }, {
      number: 'P'
    }],
    englishArray2: [{
      number: 'A'
    }, {
      number: 'S'
    }, {
      number: 'D'
    }, {
      number: 'F'
    }, {
      number: 'G'
    }, {
      number: 'H'
    }, {
      number: 'J'
    }, {
      number: 'K'
    }, {
      number: 'L'
    }],
    englishArray3: [{
      number: 'Z'
    }, {
      number: 'X'
    }, {
      number: 'C'
    }, {
      number: 'V'
    }, {
      number: 'B'
    }, {
      number: 'N'
    }, {
      number: 'M'
    }],
    carType: '普通车型'
  },
  // 切换车型
  changeCarType: function() {
    const carType = this.data.carType
    if (carType == '普通车型') {
      this.setData({
        carType: '新能源车'
      })
    } else {
      this.setData({
        carType: '普通车型'
      })
    }
  },
  // 弹出省份键盘
  chooseS: function() {
    this.setData({
      chooseSheng: true,
      chooseNumber: false
    })
  },
  // 弹出数字和英文键盘
  chooseN: function() {
    this.setData({
      chooseNumber: true,
      chooseSheng: false
    })
  },
  // 选择省份
  choose: function(e) {
    const s = e.currentTarget.dataset.name
    this.setData({
      boxContent1: s,
      chooseSheng: false
    })
  },
  // 选择省份
  chooseNumber: function(e) {
    const carType = this.data.carType
    const s = e.currentTarget.dataset.number
    if (this.data.boxContent2 == '') {
      this.setData({
        boxContent2: s
      })
      return;
    }
    if (this.data.boxContent3 == '') {
      this.setData({
        boxContent3: s
      })
      return;
    }
    if (this.data.boxContent4 == '') {
      this.setData({
        boxContent4: s
      })
      return;
    }
    if (this.data.boxContent5 == '') {
      this.setData({
        boxContent5: s
      })
      return;
    }
    if (this.data.boxContent6 == '') {
      this.setData({
        boxContent6: s
      })
      return;
    }
    if (this.data.boxContent7 == '') {
      this.setData({
        boxContent7: s
      })
      return;
    }
    if (this.data.boxContent8 == '' && carType == '普通车型') {
      this.setData({
        boxContent8: s
      })
      return;
    }
  },
  // 键盘删除
  deleteKey: function() {
    if (this.data.boxContent8 != '') {
      this.setData({
        boxContent8: ''
      })
      return;
    }
    if (this.data.boxContent7 != '') {
      this.setData({
        boxContent7: ''
      })
      return;
    }
    if (this.data.boxContent6 != '') {
      this.setData({
        boxContent6: ''
      })
      return;
    }
    if (this.data.boxContent5 != '') {
      this.setData({
        boxContent5: ''
      })
      return;
    }
    if (this.data.boxContent4 != '') {
      this.setData({
        boxContent4: ''
      })
      return;
    }
    if (this.data.boxContent3 != '') {
      this.setData({
        boxContent3: ''
      })
      return;
    }
    if (this.data.boxContent2 != '') {
      this.setData({
        boxContent2: ''
      })
      return;
    }

  },
  // 键盘收起
  complete: function() {
    this.setData({
      chooseNumber: false
    })
  },
  // 提交
  comfire: function() {
    const carType = this.data.carType
    if (this.data.boxContent1 == '省') {
      wx.showModal({
        title: '提示',
        content: '请选择省份',
      })
      return;
    }
    if (this.data.boxContent2 == '') {
      wx.showModal({
        title: '提示',
        content: '信息不完整',
      })
      return;
    }
    if (this.data.boxContent3 == '') {
      wx.showModal({
        title: '提示',
        content: '信息不完整',
      })
      return;
    }
    if (this.data.boxContent4 == '') {
      wx.showModal({
        title: '提示',
        content: '信息不完整',
      })
      return;
    }
    if (this.data.boxContent5 == '') {
      wx.showModal({
        title: '提示',
        content: '信息不完整',
      })
      return;
    }
    if (this.data.boxContent6 == '') {
      wx.showModal({
        title: '提示',
        content: '信息不完整',
      })
      return;
    }
    if (this.data.boxContent7 == '') {
      wx.showModal({
        title: '提示',
        content: '信息不完整',
      })
      return;
    }
    if (this.data.boxContent8 == '' && carType == '普通车型') {
      wx.showModal({
        title: '提示',
        content: '信息不完整',
      })
      return;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})