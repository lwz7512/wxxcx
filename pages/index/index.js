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
    imgUrls: [
      '../../images/header.png',
      'https://i.imgur.com/UYiroysl.jpg',
      'https://i.imgur.com/UPrs1EWl.jpg'
    ],
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
    // this._onLoad();
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
            reject();
          });
        } else {
          console.error('no userinfo!');
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
        }
      });
    }).catch((err) => {
      console.log(this);
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


  getUserInfo: function (e) {
    // console.log(e)
    // app.globalData.userInfo = e.detail.userInfo
    // this.setData({
    //   userInfo: e.detail.userInfo,
    //   hasUserInfo: true
    // })
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
