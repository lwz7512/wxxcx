// pages/cards/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    video_src: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    console.log('to load course: '+options.id);

    var res = wx.getSystemInfoSync()
    // console.log(res.windowHeight);
    this.setData({windowHeight: res.windowHeight-356});

    // TODO, loading...
    var course = getApp().globalData.course;
    console.log(course);
    if(!course) return;

    wx.setNavigationBarTitle({
      title: course.name
    });

    var mdParser = app.globalData.wxParser;
    var html = course.intro;
    mdParser.wxParse('article', 'html', html, this, 5);

    this.setData({video_src: course.av_link});
  },

  openAward: function () {
    var course = getApp().globalData.course;
    
    wx.navigateTo({
      url: '/pages/award/money?course_id='+course.course_id
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
    getApp().globalData.course = null;
    console.log('on unload!');
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
  }


})
