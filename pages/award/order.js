// pages/award/order.js
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
    course_name: '',
    course_price:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      course: options.course_id,
      course_price:  options.price,
      course_name: getApp().globalData.course.name,
    });

  },

  goPay: function () {
    return;
    
    var that = this;

    util.showBusy('发起付款...');
    var total = this.data.course_price;

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
