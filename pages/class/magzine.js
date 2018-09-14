// pages/class/magzine.js
// 杂志详情 @2018/09/06
const config = require('../../config');
const Session = require('../../session');
const util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title   : '',
    head_img: '',
    pub_time: '',
    content : '',
    pdf_url : '',
    has_pdf : true,
    tags    : [],
    mid     : '', // @2018/09/12
    windowHeight: 0,
    dnpercent: 0, // download percent...
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var app = getApp();

    var res = wx.getSystemInfoSync();
    // console.log(res.windowHeight);
    this.setData({windowHeight: res.windowHeight - 20});

    var mdParser = app.globalData.wxParser;
    this.setData({mid: options.id}); // save for later use

    wx.request({
      url: config.service.magDetailUrl+'?id='+options.id,
      method: 'GET',
      data: {session_3rd: Session.get().session_3rd},
      success: function(res) {
        console.log(res);
        wx.hideLoading();
        wx.setNavigationBarTitle({
          title: res.data.res.data.title,
        });
        that.setData({
          title: res.data.res.data.title,
          head_img: res.data.res.data.head_img,
          content: res.data.res.data.content,
          pdf_url: res.data.res.data.pdf,
          has_pdf: res.data.res.data.pdf?true:false,
          tags   : res.data.res.data.tag,
          pub_time: util.formatTime(new Date(parseInt(res.data.res.data.ctime)*1000)),
        });
        var html = res.data.res.data.content;
        mdParser.wxParse('article', 'html', html, that, 5);
      }
    });
    wx.showLoading({title: '加载中',});
  },

  viewPDF: function () {
    var that = this;

    var pdf = this.data.pdf_url;
    if(!pdf) return;

    if(this.downloading) return;

    wx.showToast({
      title: '开始下载...',
      icon: 'none',
      // duration: 1500
    });
    this.downloading = true;

    var downloadTask = wx.downloadFile({
      url: pdf,
      success: function(res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          // wx.hideLoading();
          var filePath = res.tempFilePath
          wx.openDocument({
            filePath: filePath,
            success: function (res) {
              console.log('打开文档成功')
            }
          })
        }
        that.downloading = false; // @2018/08/24
      },
      fail: function(err) {
        that.showAlert(err);
      }
    });
    downloadTask.onProgressUpdate((res) => {
      console.log('下载进度', res.progress)
      that.setData({dnpercent: res.progress});
    });

  },

  markIt: function () {
    console.log('mark magzine: '+this.data.mid);
    wx.showLoading({title: '保存中...'});
    wx.request({
      url: config.service.collectUrl+'?id='+this.data.mid,
      method: 'GET',
      data: {
        session_3rd: Session.get().session_3rd,
        type: 'information'
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

  showAlert: function (title) {
    wx.showToast({
        title: title,
        icon: 'none',
        image:'../../images/icon_intro.png',
        duration: 2000
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
