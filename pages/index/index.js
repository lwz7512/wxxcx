/**
 * pages/index/index.js
 * 行业报告，tag: report
 */
Page({

  data: {
    loading: true,
    results: []
  },

  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '行业报告'
    });

    wx.showShareMenu({
      withShareTicket: true
    });

    var app = getApp();
    var that = this;

    wx.request({
      url: 'https://ipintu.com/blog/posts/report/1',
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


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      var app = getApp();
      // console.log(this.data.results);
      app.globalData.posts = this.data.results;
    },



});
