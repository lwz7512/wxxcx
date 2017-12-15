Page({

  /**
   * 页面的初始数据
   */
  data: {
    title : '',
    published_at : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    var pid = options.id;
    var post = {title:''};
    app.globalData.posts.forEach(item => {
      if(item.id == pid) post = item;
    });
    // console.log(app.globalData.posts);

    wx.setNavigationBarTitle({
      title: post.title
    });

    this.setData({
      title : post.title,
      published_at : post.published_at_show
    });

    var mobiledoc = JSON.parse(post.mobiledoc);
    var markdown = mobiledoc.cards[0][1].markdown;
    // console.log(markdown);
    /**
    * WxParse.wxParse(bindName , type, data, target,imagePadding)
    * 1.bindName绑定的数据名(必填)
    * 2.type可以为html或者md(必填)
    * 3.data为传入的具体数据(必填)
    * 4.target为Page对象,一般为this(必填)
    * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
    */
    // var that = this;
    //在使用的View中引入WxParse模块
    var mdParser = app.globalData.wxParser;
    mdParser.wxParse('article', 'md', markdown, this, 5);

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
