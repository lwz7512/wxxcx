// pages/class/class.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [
      {name:'专项培训', active: true},{name:'精品课程'},{name:'点读机'},{name:'最新政策法规'},
      {name:'往期研讨会'},{name:'读书会'},{name:'私人定制'},{name:'精英训练营'}
  ],
    stv: {
      windowWidth: 0,
      lineWidth: 0,
      offset: 0,
      tStart: false
    },
    activeTab: 0

  },

  onLoad:function(){

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
    // 
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
