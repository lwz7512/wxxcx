/**
 * pages/index/index.js
 * 行业报告，tag: report
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


  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '行业报告'
    });

    wx.showShareMenu({
      withShareTicket: true
    });

    var app = getApp();
    var that = this;

    var rt = wx.request({
      url: app.globalData.postsURL,
      success: function(res){
        console.log(res.data);
        for (let key in res.data) {
          // console.log(res.data[key]);
          let item = res.data[key];
          item.published_at_show = item.date.split('T')[0]
        }
        // 缓存起来
        app.globalData.posts = res.data;

        rt.then();

      }
    });

    rt.then =  function(){
      console.log('then called!');
      wx.request({
        url: app.globalData.categoriesURL,
        success: function(res){
          console.log(res);
          // 缓存起来
          app.globalData.categories = res.data;

          var postsID = [];
          for (var key in res.data) {
            // 获取报告
            if(res.data[key]['name']=='report') postsID = res.data[key]['posts'];
          }
          var reports = []; // these are really reports
          postsID.forEach(id => {
            reports.push(app.globalData.posts[id]);
          });

          that.setData({loading: false,results: reports});
        } //end of success
      });
    };


  }, // end of onLoad

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '程序猿情报',
      path: 'pages/index/index',
      // path: '/page/user?id=123',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },



});
