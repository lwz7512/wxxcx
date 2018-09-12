// pages/mine/favorites.js
const config = require('../../config');
const Session = require('../../session');
const util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    results: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var res = wx.getSystemInfoSync()
    // console.log(res.windowHeight);
    this.setData({windowHeight: res.windowHeight});

    wx.request({
      url: config.service.myCollectUrl,
      method: 'GET',
      data: {session_3rd: Session.get().session_3rd},
      success: function(res){
        console.log(res);
        wx.hideLoading();
        var favorites = res.data.res.data;
        favorites.forEach(item => {
          var ctime = item.detail.ctime;
          item.showTime = util.formatTime(new Date(parseInt(ctime)*1000));
        });
        that.setData({results: favorites});
      }
    });
    wx.showLoading({
      title: '加载中',
    });
  },

  // open couse cards...
  openCourse: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/cards/flow?id=' + id
    })
  },

  openMagDetail: function (params) {
    var id = params.currentTarget.dataset.id;
    // console.log(id);
    wx.navigateTo({
      url: '/pages/class/magzine?id=' + id
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
