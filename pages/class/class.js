// pages/class/class.js
// 课堂主模块
const config = require('../../config');
const Session = require('../../session');
const Promise = require('../../utils/bluebird');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    loading: true,
    categories: [],
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

    var categoriesPrms = new Promise((resolve, reject) => {
      wx.request({
        url: config.service.classTypeUrl,
        method: 'GET',
        data: {
          session_3rd: Session.get().session_3rd,
        },
        success: function(res){
          console.log(res);
          var categories = res.data.res.data;
          // add KPMG magzine
          categories.push({name:'KPMG刊物', id: '0'});
          // add active for first slide
          categories.forEach((item, index) => {
            if(index == 0) item.active = true;
          });
          that.setData({categories: categories});
          resolve(categories[0]);// end callback
        }
      });
    });

    categoriesPrms.then(item => {
      console.log('>>> got: ');
      console.log(item);
      wx.request({
        url: config.service.categoryUrl,
        method: 'GET',
        data: {
          session_3rd: Session.get().session_3rd,
          type: item.id,
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
    if(type == '0') serviceURL = config.service.magazineUrl;

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
          format : type=='0'?'item':'card'
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
