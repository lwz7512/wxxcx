//index.js
//获取应用实例
const app = getApp();
const Session = require('../../session');
const config = require('../../config');
const util = require('../../utils/util');

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
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    currentIndex: 0
  },

  //事件处理函数
  iWantLearn: function() {
    wx.navigateTo({
      url: '/pages/cards/flow'
    })
  },

  /**
   * 进入页面
   */
  onLoad: function () {

    // FIXME, JUST FOR DEVTEST...
    setTimeout(()=> wx.navigateTo({
      url: '/pages/cards/flow'
    }), 100);

    console.log("进入首页");
    var that = this;

    // check user logged in...to switch tab mine
    wx.getSetting({success: function (res) {
      // console.log(res);
      if (res.authSetting['scope.userInfo']) {
        wx.checkSession({
          success: function(){

            var session = Session.get();
            console.log(session);

            // 如果本地没有回话则重新登录
            if(!session) return that.switchToMine();

            // that.setData({userInfo: session.userinfo, logged: true});
          },
          fail: function () {
            console.warn('Session is expired!');
            that.switchToMine();
          }
        });
      } else {
        // util.showModel('用户未授权', '...');
        // setTimeout(()=> that.switchToMine(), 100);
      }
    }});

  }, // end of onLoad


  switchToMine: function () {
    wx.switchTab({
      url: '/pages/mine/mine'
    })
  },

  // onLoad: function () {
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse){
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },

  onSwiperChange: function(e) {
    // console.log(e);
    this.setData({currentIndex: e.detail.current});
  },


  getUserInfo: function(e) {
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
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },


})
