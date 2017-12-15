var base64 = require("../images/base64");

Page({

  data: {
    loading: true,
    results: []
  },

  onLoad: function () {
    var app = getApp();
    console.log(app);
    var that = this;

    wx.setNavigationBarTitle({
      title: '行业报告'
    });

    wx.showShareMenu({
      withShareTicket: true
    });

    wx.request({
      url: 'https://ipintu.com/blog/posts',
      success: function(res) {
        console.log(res.data);
        res.data.posts.forEach(item => {
          item.published_at_show = item.published_at.split('T')[0]
        });

        that.setData({loading: false, results: res.data.posts});
        // 缓存起来
        app.globalData.posts = res.data.posts;
      },
      fail: function(res) {},
      complete: function(res) {},
    });



  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '程序猿情报',
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


});
