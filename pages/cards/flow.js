// pages/cards/flow.js
const config = require('../../config');
const Session = require('../../session');

Page({

  /**
   * 某个专题内的课程列表卡片
   */
  data: {
    inputShowed: false,
    inputVal: "",
    loading: true,
    results: [],
    results_raw: [],
    splashIn: false,
    windowHeight: 0,
    details: {},
    cid: '', // save on load to share... @2018/09/11
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
    var that = this;
    var res = wx.getSystemInfoSync();

    this.setData({windowHeight: res.windowHeight-48});
    this.setData({cid: options.id});// save it ...

    wx.request({
      url: config.service.cdetailUrl+'/'+options.id,
      method: 'GET',
      data: {session_3rd: Session.get().session_3rd},
      success: function(res){
        console.log(res);
        wx.hideLoading();
        that.setData({
          details: res.data.res.data,
          results: res.data.res.data.course_data
        });
      }
    });
    wx.showLoading({
      title: '加载中',
    });
  },

  openDetailPage: function(evt) {
    var id = evt.currentTarget.dataset.id;
    var app = getApp();
    var courses = this.data.results;
    // remember selected
    courses.forEach(item => {if(item.id==id) app.globalData.course = item});
    // remember price...
    app.globalData.course.price = this.data.details.price;
    // open it...
    wx.navigateTo({
      url: '/pages/cards/detail?id='+id
    });
  },

  markIt: function () {
    console.log('mark course: '+this.data.cid);
    wx.showLoading({title: '保存中...'});
    wx.request({
      url: config.service.collectUrl+'?id='+this.data.cid,
      method: 'GET',
      data: {
        session_3rd: Session.get().session_3rd,
        type: 'course'
      },
      success: function(res){
        // console.log(res);
        wx.hideLoading();
        if(res.data.meta.code == 200) wx.showToast({title: '收藏成功',icon: 'none'});
        if(res.data.meta.code == 400) wx.showToast({title: '收藏过了',icon: 'none'});
      }
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
