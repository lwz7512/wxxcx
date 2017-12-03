// pages/scescase/scescase.js
// var base64 = require("../images/base64");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    dmdata: [
      {
        title: '毕马威助中国中车成功完成海外收购', desc: '国企走出去之一', icon: '../../materials/case_o.png',
        url: '../pptreport/pptreport', tags: ['国企','海外收购','制造业']
      },
      {
        title: '响应一带一路，毕马威助客户成功海外收购', desc: '国企走出去之二', icon: '../../materials/case_b.png',
        url: '../pptreport/pptreport', tags: ['国企','海外收购','建筑行业']
      },
      {
        title: '为国有药企提供延续性服务', desc: '国企走出去之三', icon: '../../materials/case_r.png',
        url: '../pptreport/pptreport', tags: ['国企','合规服务','医药行业']
      },
      {
        title: '毕马威助力欧洲零售巨头进驻中国市场', desc: '海外本土化之一', icon: '../../materials/case_g.png',
        url: '../pptreport/pptreport', tags: ['外资','本土化','零售业']
      },
      {
        title: '毕马威助汇丰银行完成银行完成数字化系统搭建', desc: '海外本土化之二', icon: '../../materials/case_b.png',
        url: '../pptreport/pptreport', tags: ['外资','数字化服务','金融业']
      }
    ]
  },

  showInput: function () {
      this.setData({
          inputShowed: true
      });
  },
  hideInput: function () {
      this.setData({
          inputVal: "",
          inputShowed: false,
          list: this.data.dmdata
      });
  },
  clearInput: function () {
      this.setData({
          inputVal: "",
          list: this.data.dmdata
      });
  },
  inputTyping: function (e) {
    var dmdata = this.data.dmdata;
    this.setData({
        inputVal: e.detail.value
    });
    console.log(this.data.inputVal);
    var key = this.data.inputVal;
    var results = [];
    for (var item of dmdata) {
      if(item.tags.indexOf(key)>-1) results.push(item);
    }
    this.setData({
      list: results
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that = this;

    wx.setNavigationBarTitle({
      title: '成功案例'
    });

    this.setData({
      list: this.data.dmdata
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
