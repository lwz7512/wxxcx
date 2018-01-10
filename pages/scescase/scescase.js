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
    results: [],
    results_raw: []
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
      results: this.data.results_raw // restore original list
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: "",
      results: this.data.results_raw // restore original list
    });
  },
  inputTyping: function (e) {
    var raw = this.data.results_raw;
    // console.log(this.data.inputVal);
    var key = e.detail.value;
    var searched = [];
    for (var item of raw) {
      item.tags.forEach(tag => {
        if(searched.indexOf(item)>-1) return;
        if(tag.name.indexOf(key)>-1) searched.push(item);
      });
    }
    this.setData({
      results: searched,
      inputVal: e.detail.value
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

    if(app.globalData.posts || app.globalData.categories){
      this.setData({loading: false});
    }else{
      return; // 数据没有准备好，不继续了
    }
    console.log('..........');
    var postsID = [];
    var categories = app.globalData.categories;
    for (var key in categories) {
      // 获取案例
      if(categories[key]['name']=='story') postsID = categories[key]['posts'];
    }
    var stories = []; // these are really stories
    console.log(postsID);
    postsID.forEach(id => {
      stories.push(app.globalData.posts[id]);
    });

    that.setData({loading: false,results: stories});


  

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
})
