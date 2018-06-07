// pages/award/money.js
const config = require('../../config');
const Session = require('../../session');
const util = require('../../utils/util');
const Promise = require('../../utils/bluebird')
const wechat = require('../../utils/wechat');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    logo: '/images/logo.jpg',
    title: '点击登录',
    selected: 0,
    prices: [
      1, 5, 18, 48, 98, 188
    ],
    course: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({course: options.course_id});
    console.log(options);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  selectItem: function(event) {
    var total = event.currentTarget.dataset.item;
    var that = this;
    that.setData({ selected: total });
    this.donate(event);
  },

  donate: function(event) {
    var that = this;


    util.showBusy('发起付款...');
    var total = event.currentTarget.dataset.item;

    wx.request({
      url: config.service.prepayUrl+'?course_id='+ this.data.course + '&price=' +total,
      method: 'GET',
      data: {session_3rd: Session.get().session_3rd},// unit: cent
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      success: function(res) {
        console.log(res);
        wx.hideToast();

        if(res.data.meta.code !== 200) return util.showModel('支付失败', {});

        var data = res.data.res.data;
        console.log(data);

        wx.requestPayment({
          timeStamp: data.timeStamp,
          nonceStr: data.nonceStr,
          package: data.package,
          signType: 'MD5',
          paySign: data.paySign,
          success:function(res){
            wx.showToast({
              title: '支付成功,感谢',
              icon: 'success'
            });
          },
          fail:function(res){
            that.setData({ selected: 0 });
            wx.showToast({
              title: '已取消支付',
              icon: 'success'
            });
          },
          complete:function(res){
            // cancel select..
          }
        });
      }
    });

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
