// pages/mine/speedtest.js

// @2018/08/29
const networkSpeed = require('../../utils/networkspeed');
const config = require('../../config');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    speed: 0,
    percent: 0,
    running: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 网络监测回调
    networkSpeed.networkCallback = this.networkCallback;
  },

  // 网络监测回调
  networkCallback: function(options) {
    console.log(options);
    if(options.networkType == 1){
      this.setData({running: false});
    }
    if(options.networkType == 2){
      this.setData({
        speed: options.networkContent,
        percent: options.networkContent*100/1500
      });
    }
  },

  switch2Change: function (e) {
    // console.log('switch2 发生 change 事件，携带值为', e.detail.value);
    var status = e.detail.value;
    this.setData({running: status});

    if(status){
      var options = {
        // loop: true,
        url: config.speedtestUrl
      };
      networkSpeed.startNetwork(options);
      this.setData({speed: 0,percent: 0});
    }else{
      networkSpeed.stopNetwork();
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
    // 停止网络监测
    networkSpeed.stopNetwork();
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
