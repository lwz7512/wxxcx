// pages/class/class.js
// 课堂主模块
const config = require('../../config');
const Session = require('../../session');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    loading: true,
    categories: [
      {name:'专项培训', active: true, type: 1},{name:'精品课程', type: 2},
      // {name:'点读机', type: 3},{name:'最新政策法规', type: 4},{name:'私人定制', type: 7},
      {name:'往期研讨会', type: 3},{name:'KPMG刊物', type: 0},{name:'精英训练营', type: 6}
    ],
    windowHeight: 0,
    contents: ['专项培训有么有'], // for each section...
    results: [],
    current: 0, // save active index
    format: 'card' // 'card', 'item'
  },

  onLoad:function(){
    var that = this;
    var res = wx.getSystemInfoSync()
    // console.log(res.windowHeight);
    this.setData({windowHeight: res.windowHeight-92});

    wx.request({
      url: config.service.categoryUrl,
      method: 'GET',
      data: {
        session_3rd: Session.get().session_3rd,
        type: 1,
      },
      success: function(res){
        console.log(res);
        wx.hideLoading();
        that.setData({
          results: res.data.res.data,
          loading: false,
        });
      }
    });
    wx.showLoading({
      title: '加载中',
    });
  },

  selectMenu: function(evt) {
    var that = this;
    var current = evt.currentTarget.dataset.index;
    // process select
    var type = evt.currentTarget.dataset.type;
    console.log(type);

    this.data.categories.forEach((item,i) => {
      if (current == i) {
        item.active = true;
      } else {
        item.active = false;
      }
    });
    this.setData({categories: this.data.categories});

    // TODO, get data....
    if(this.data.current == current) return;

    var serviceURL = config.service.categoryUrl;
    if(type == 0) serviceURL = config.service.magazineUrl;

    wx.request({
      url: serviceURL,
      method: 'GET',
      data: {
        session_3rd: Session.get().session_3rd,
        type: type,
      },
      success: function(res){
        console.log(res);
        wx.hideLoading();
        that.setData({
          results: res.data.res.data,
          loading: false,
          format : type?'card':'item'
        });
      }
    });

    this.setData({
      current: current,
      loading: true,
    });

    wx.showLoading({
      title: '加载中',
    });
  },
  // 私人定制 @2018/08/02
  openServiceForm: function () {
    wx.navigateTo({
      url: '/pages/class/custom'
    });
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

  iWantLearn: function (params) {
    var id = params.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/cards/flow?id=' + id
    });
  },

  openMagDetail: function (params) {
    var id = params.currentTarget.dataset.id;
    // console.log(id);
    wx.navigateTo({
      url: '/pages/class/magzine?id=' + id
    });
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
