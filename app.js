//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力

    // 登录

    // 获取用户信息

    //在使用的View中引入WxParse模块
    var WxParse = require('wxParse/wxParse.js');
    this.globalData.wxParser = WxParse;
  },
  globalData: {
    userInfo: null
  }
})
