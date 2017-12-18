/**
 * pages/scescase/scescase.js
 * 成功案例， tag: story
 */

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    loading: true,
    results: []
  },

  showInput: function () {
      this.setData({
          inputShowed: true
      });
  },
  hideInput: function () {
      this.setData({
          inputVal: "",
          inputShowed: false,
          list: this.data.dmdata
      });
  },
  clearInput: function () {
      this.setData({
          inputVal: "",
          list: this.data.dmdata
      });
  },
  inputTyping: function (e) {
    var dmdata = this.data.dmdata;
    this.setData({
        inputVal: e.detail.value
    });
    console.log(this.data.inputVal);
    var key = this.data.inputVal;
    var results = [];
    for (var item of dmdata) {
      if(item.tags.indexOf(key)>-1) results.push(item);
    }
    this.setData({
      list: results
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: '成功案例'
    });

    var app = getApp();
    var that = this;

    wx.request({
      url: 'https://ipintu.com/blog/posts/story/1',
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var app = getApp();
    // console.log(this.data.results);
    app.globalData.posts = this.data.results;
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
})
