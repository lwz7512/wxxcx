//index.js
//获取应用实例
const app = getApp();
const Session = require('../../session');
const config = require('../../config');
const util = require('../../utils/util');
const Promise = require('../../utils/bluebird')
const wechat = require('../../utils/wechat');

Page({
  data: {
    // motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    slides: [],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    currentIndex: 0
  },

  //事件处理函数
  iWantLearn: function (params) {
    var id = params.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/cards/flow?id=' + id
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (!this.data.slides.length) this._onLoad();
  },

  onLoad: function () {

  },


  onUnload: function() {

  },

  onHide: function () {

  },

  /**
   * 进入页面
   * 只判断权限并跳转到登录页 @2018/06/06
   */
  _onLoad: function () {
    console.log("进入首页");

    var that = this;

    var loggedPro = new Promise((resolve, reject) => {
      wechat.getSetting().then(res => {
        if (res.authSetting['scope.userInfo']) {
          return wechat.checkSession().then(() => {
            resolve();
          }).catch(() => {
            console.error('no session!');
            reject(new Error('no session!'));
          });
        } else {
          // console.error('no userinfo!');
          // catched by promise callee @2018/07/06
          reject(new Error('no userinfo!'));
        }
      }).catch(() => {
        console.error('no permission!');
        reject();
      });
    });

    loggedPro.then(() => {
      var session = Session.get();
      console.log(session);
      console.log('to load remote data....');
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        // url: config.service.coursesUrl+'/1',
        url: config.service.recommendsUrl,
        method: 'GET',
        data: { session_3rd: Session.get().session_3rd },// unit: cent
        success: function (result) {
          console.log(result);
          wx.hideLoading();
          if (result.data.meta.code == 400) {// user session invalid
            setTimeout(() => that.switchToMine(), 100);
            Session.clear();
            return;
          }
          that.setData({ slides: result.data.res.data });
          // forward to user guide @2018/06/22
          that.openUserGuidePage();
        }
      });
    }).catch((err) => {
      // this is current page...
      setTimeout(() => this.switchToMine(), 100);
      Session.clear();
    });

  }, // end of onLoad


  switchToMine: function () {
    wx.switchTab({
      url: '/pages/mine/mine'
    })
  },

  onSwiperChange: function (e) {
    // console.log(e);
    this.setData({ currentIndex: e.detail.current });
  },

  // @2018/06/22
  // to check if save the selections; @2018/06/24
  openUserGuidePage: function () {
    var selected = wx.getStorageSync('complete');
    // console.log(selected?true:false);
    if(!selected) wx.navigateTo({url: '/pages/user/guide'});
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '码农情报',
      path: 'pages/index/index',
      // path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },


})
