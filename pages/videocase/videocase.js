// pages/videocase/videocase.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    desc: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    var title = '';
    if (options.id=='1') {
      this.setData({src: '../../materials/case.01.mp4', desc: '[发现·实现]成功案例分享之银行转型服务'});
      title = '[发现·实现]成功案例分享一';
    }else{
      this.setData({src: '../../materials/case.02.mp4', desc: '[发现·实现]成功案例分享之家电售后服务数字化'});
      title = '[发现·实现]成功案例分享二';
    }

    wx.setNavigationBarTitle({
      title: title
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
