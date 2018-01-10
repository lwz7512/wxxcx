Page({

  /**
   * 页面的初始数据
   */
  data: {
    title : '',
    published_at : '',
    tags: [],
    has_video : false,
    src: ''  // video file source
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    var pid = options.id;
    var post = {title:''};
    var page = this;
    // page.videoContext = wx.createVideoContext('myVideo');

    wx.request({
      url: app.globalData.postBaseURL+'/'+pid+'/content.json',
      success: function(res){
        console.log(res);
        //在使用的View中引入WxParse模块
        var mdParser = app.globalData.wxParser;
        mdParser.wxParse('article', 'html', res.data.content, page, 5);
      }
    });

    // 找出对应的帖子
    for (var key in app.globalData.posts) {
      if(key == pid) post = app.globalData.posts[key];
    }

    wx.setNavigationBarTitle({
      title: post.title
    });

    this.setData({
      title : post.title,
      published_at : post.published_at_show,
      tags : post.tags
    });


  

    // FIXME, 暂时用摘要字段保存视频地址
    // if(!post.custom_excerpt) return;
    // if(post.custom_excerpt.indexOf('http')<0) return;
    // 显示视频控件
    // page.setData({has_video: true});
    // src: 'http://dnld.runbytech.com/case.02.mp4',
    // setTimeout(function(){
    //   page.setData({
    //     src: post.custom_excerpt,
    //   });
    // }, 1000);

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
});
