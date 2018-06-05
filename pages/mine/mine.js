// pages/mine/mine.js
const config = require('../../config');
const Session = require('../../session');
const util = require('../../utils/util');

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
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var session = Session.get();
    console.log(session);

    // 如果本地没有回话则重新登录
    if(!session) return;

    this.setData({userInfo: session.userinfo, logged: true});
  },

  // user invode login...
  bindGetUserInfo: function (e) {
    if (this.data.logged) return;
    // cancel selectItem
    this.setData({ selected: 0 });

    util.showBusy('正在登录');

    var that = this;
    var userInfo = e.detail.userInfo;

    console.log(userInfo);

    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {

          // 检查登录是否过期
          wx.checkSession({
            success: function () {
              var session = Session.get();
              console.log(session);
              // FIXME, relogin while no session... @2018/05/29
              // if(!session) that.login();
              var options = {
                encryptedData: e.detail.encryptedData,
                iv: e.detail.iv,
                userInfo: userInfo
              }
              console.log(options);

              if(!session) return that.doLogin(options);

              // 登录态未过期
              util.showSuccess('登录成功');
              that.setData({
                userInfo: userInfo,
                logged: true
              });
            },

            fail: function () {
              Session.clear();
              console.warn('checkSession fail to doLogin...');
              // 登录态已过期，需重新登录
              var options = {
                encryptedData: e.detail.encryptedData,
                iv: e.detail.iv,
                userInfo: userInfo
              };
              console.log(options);
              that.doLogin(options);
            },
          });
        } else {
          util.showModel('用户未授权', e.detail.errMsg);
        }
      }
    });
  },

  doLogin: function (options) {
    var that = this;
    console.log('wx login...');

    wx.login({
      success: function (loginResult) {
        console.log('loginResult: ');
        console.log(loginResult);
        wx.request({
          url: config.service.loginUrl,
          method: 'POST',
          data: {
            code: loginResult.code ,
            ...options.userInfo
          },
          header: {
              'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          success: function(res) {
            console.log(res);
            if(res.data.meta.code == '200'){
              util.showSuccess('登录成功');

              that.setData({
                userInfo: options.userInfo,
                logged: true
              });
              var session_3rd = res.data.res.data.session_3rd;
              // cache userinfo & session...
              Session.set({userinfo: options.userInfo, session_3rd});

            }else{
              util.showModel('登录失败', {});
            }
          }
        });
      },
      fail: function (loginError) {
        util.showModel('登录失败', loginError)
        console.log('登录失败', loginError)
      },
    });
  },


  selectItem: function(event) {
    var total = event.currentTarget.dataset.item;
    var that = this;
    that.setData({ selected: total });
    this.donate(event);
  },

  donate: function(event) {
    var that = this;

    var session = Session.get();
    console.log(session);
    // 如果本地没有回话则重新登录
    if(!session) return util.showModel('登录后付款', {info: '需要用微信登录并允许获取用户信息!'});

    util.showBusy('发起付款...');
    var total = event.currentTarget.dataset.item;

    wx.request({
      url: config.service.prepayUrl+'/'+ total,
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
