// pages/user/guide.js
Page({

  /**
   * 页面的初始数据
   */
   data: {
     tagA: [
       {name:'房地产业'},{name:'保险业'},{name:'服务业'},{name:'制造业'},{name:'私募资金'},
       {name:'银行业'},{name:'其他金融业'},{name:'零售业'},{name:'汽车业'},{name:'医药业'},
       {name:'信息技术、媒体和电信业'},{name:'非盈利机构'},{name:'能源业'},{name:'其他'}
     ],
     tagB: [
       '','','','','','','','','','','','',
     ],
     windowHeight: 0,
     current: 0
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var res = wx.getSystemInfoSync()
    // console.log(res.windowHeight);
    this.setData({windowHeight: res.windowHeight});

  },

  selectCategory: function (evt) {
    var id = evt.currentTarget.dataset.id;
    // console.log(id);
    var cates = this.data.tagA;
    cates.forEach(item => {
      if(item.name == id){
        item.active = true;
      } else {
        item.active = false;
      }
    });
    this.setData({tagA: cates});

  },

  next: function () {
    this.setData({current:this.data.current+1});
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
