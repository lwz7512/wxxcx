//app.js
App({
  globalData: {
    userInfo: null
  },
  onLaunch: function () {
    //在使用的View中引入WxParse模块
    var WxParse = require('wxParse/wxParse.js');
    this.globalData.wxParser = WxParse;
  }

})
