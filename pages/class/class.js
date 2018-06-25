// pages/class/class.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    loading: true,
    categories: [
      {name:'专项培训', active: true},{name:'精品课程'},{name:'点读机'},{name:'最新政策法规'},
      {name:'往期研讨会'},{name:'读书会'},{name:'私人定制'},{name:'精英训练营'}
    ],
    windowHeight: 0,
    contents: ['专项培训有么有'], // for each section...
  },

  onLoad:function(){
    var res = wx.getSystemInfoSync()
    // console.log(res.windowHeight);
    this.setData({windowHeight: res.windowHeight-30});
  },

  selectMenu: function(evt) {
    var current  =evt.currentTarget.dataset.index;
    this.data.categories.forEach((item,i) => {
      if (current == i) {
        item.active = true;
      } else {
        item.active = false;
      }
    });
    this.setData({categories: this.data.categories});
    // TODO, get data....
    var contentlist = ['有么有','可以有','暂木有','在路上','还没有'];
    var randomWord = Math.floor(Math.random()*5);
    var category = this.data.categories[current].name;
    this.setData({contents: [category+contentlist[randomWord]]});

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

  },

  // /**
  //  * 生命周期函数--监听页面加载
  //  */
  // onLoad: function (options) {
  //
  // },
  //
  // /**
  //  * 生命周期函数--监听页面初次渲染完成
  //  */
  // onReady: function () {
  //
  // },
  //
  // /**
  //  * 生命周期函数--监听页面显示
  //  */
  // onShow: function () {
  //
  // },
  //
  // /**
  //  * 生命周期函数--监听页面隐藏
  //  */
  // onHide: function () {
  //
  // },
  //
  // /**
  //  * 生命周期函数--监听页面卸载
  //  */
  // onUnload: function () {
  //
  // },

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
