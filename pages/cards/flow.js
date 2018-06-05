// pages/cards/flow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    loading: true,
    results: [],
    results_raw: [],
    splashIn: false,
    windowHeight: 0,
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
      // results: this.data.results_raw // restore original list
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: "",
      // results: this.data.results_raw // restore original list
    });
  },
  inputTyping: function (e) {
    var raw = this.data.results_raw;
    var key = e.detail.value;
    var searched = [];

    if(!key) return this.clearInput();

    // for (var item of raw) {
    //   if(searched.indexOf(item)>-1) continue;
    //   // check tag
    //   item.tags.forEach(tag => {
    //     if(tag.indexOf(key)>-1) searched.push(item);
    //   });
    //   // check title
    //   if(searched.indexOf(item)>-1) continue;
    //   if(item.title.indexOf(key)>-1) searched.push(item);
    // }
    //
    // this.setData({
    //   results: searched,
    //   inputVal: e.detail.value
    // });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var res = wx.getSystemInfoSync()
    // this.windowHeight = res.windowWidth;
    console.log(res.windowHeight);
    this.setData({windowHeight: res.windowHeight-48});
  },

  openDetailPage: function(evt) {
    wx.navigateTo({
      url: '/pages/cards/detail'
    })
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