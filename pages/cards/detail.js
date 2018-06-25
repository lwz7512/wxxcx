// pages/cards/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    video_src: '',
    activeIndex: 1,
    playing: false,
    currentTime: 0,
    initialTime: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // TODO, loading...
    var course = getApp().globalData.course;
    if(!course) return;

    // restore play position...@2018/06/25
    // *** set initial time here to restore the last playing status;
    var savedPosition = wx.getStorageSync(course.course_id+'');
    if(savedPosition) this.setData({initialTime: savedPosition});
    this.setData({video_src: course.av_link});
    this.videoContext = wx.createVideoContext('myVideo');

    var app = getApp();
    var res = wx.getSystemInfoSync()
    // console.log(res.windowHeight);
    this.setData({windowHeight: res.windowHeight-356});

    var mdParser = app.globalData.wxParser;
    var html = course.intro;
    mdParser.wxParse('article', 'html', html, this, 5);

    // marquee setting...
    setInterval(()=>{
      var next = this.data.activeIndex==3?1:this.data.activeIndex+1;
      this.setData({activeIndex: next});
      // console.log(next);
    }, 3000);

    wx.setNavigationBarTitle({
      title: course.name
    });

    console.log('load...');
  },
  // @2018/06/25
  videoPlayed: function () {
    this.setData({playing: true});
  },

  videoPaused: function () {
    this.setData({playing: false});
  },

  videoUpdated: function (e) {
    // console.log(e.detail);
    this.setData({currentTime: e.detail.currentTime});
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
    console.log('ready...');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('show...');
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
    var vid = getApp().globalData.course.course_id
    if(this.data.playing) {
      wx.setStorageSync(vid+'', this.data.currentTime);
      this.videoContext.pause();
    }
    getApp().globalData.course = null;
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
