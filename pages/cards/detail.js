// pages/cards/detail.js
const config = require('../../config');
const Session = require('../../session');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    windowWidth:  0,
    video_src: '',
    video_clips: [], // @2018/08/01
    activeIndex: 0,
    playing: false,
    currentTime: 0,
    initialTime: 0,
    marquees: [],
    price: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var course = getApp().globalData.course;
    if(!course) return;

    console.log(course);
    this.setData({price: Number(course.price)});

    // restore play position...@2018/06/25
    // *** set initial time here to restore the last playing status;
    // var savedPosition = wx.getStorageSync(course.course_id+'');
    // if(savedPosition) this.setData({initialTime: savedPosition});

    // FIXME, just for 20M .mp3 playing test...@2018/07/26
    // this.setData({video_src: 'https://lwz7512.oss-cn-beijing.aliyuncs.com/tax/tax.sameformat.mp4'});
    // this.setData({video_src: course.av_link});

    // save the context to stop later...
    this.videoContext = wx.createVideoContext('myVideo');

    this.setData({video_clips: course.av_arr});
    if(course.av_arr.length){
      this.setData({video_src: course.av_arr[0]}); // play the first clip...
    }


    var app = getApp();
    var res = wx.getSystemInfoSync()
    console.log(res.windowHeight);
    // 去除播放器的高度 @2018/08/01
    this.setData({
      windowHeight: res.windowHeight-247,
      windowWidth:  res.windowWidth
    });

    var mdParser = app.globalData.wxParser;
    var html = course.intro;
    mdParser.wxParse('article', 'html', html, this, 5);

    wx.request({
      url: config.service.marqueeTxtUrl,
      method: 'GET',
      data: {session_3rd: Session.get().session_3rd, id: course.course_id},
      success: function(res){
        console.log(res);
        // wx.hideLoading();
        that.setData({
          marquees: res.data.res.data,
        });
        // reset scroll height
        if(res.data.res.data.length){
          // that.setData({windowHeight: res.windowHeight-247});
        }

        // start marquee setting...
        if(!res.data.res.data.length) return;
        // save the interval...
        that.interval = setInterval(()=>{
          var mlength = that.data.marquees.length;
          var next = that.data.activeIndex == mlength?1:that.data.activeIndex+1;
          that.setData({activeIndex: next});
          console.log("marquee: "+next);
        }, 3000);
        that.setData({activeIndex: 1});
        // ...end of success...
      }
    });

    wx.setNavigationBarTitle({
      title: course.name
    });

    // console.log('load...');
  },
  // @2018/06/25
  videoPlayed: function () {
    this.setData({playing: true});
  },

  videoPaused: function () {
    this.setData({playing: false});
  },

  videoUpdated: function (e) {
    // console.log(e.detail);
    this.setData({currentTime: e.detail.currentTime});
  },

  // play the next...@2018/08/01
  videoEnded: function (e) {
    var index = this.data.video_clips.indexOf(this.data.video_src);
    if(index != this.data.video_clips.length-1){
      this.setData({video_src: this.data.video_clips[index+1]});
      // Lazy play...
      setTimeout(() => this.videoContext.play(), 100);
      // console.log('playing next ...');
    } else {
      // reset to first...
      this.setData({video_src: this.data.video_clips[0]});
      console.log('>>> END of the video...');
    }
  },
  // 打赏
  openAward: function () {
    var course = getApp().globalData.course;

    wx.navigateTo({
      url: '/pages/award/money?course_id='+course.course_id
    });
  },

  // 购买
  openOrder: function () {
    var course = getApp().globalData.course;

    wx.navigateTo({
      url: '/pages/award/order?course_id='+course.course_id+'&price='+course.price
    });
  },

  // FIXME, reopen this page @2018/07/26
  openRecomdPage: function(evt) {
    var id = evt.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/cards/flow?id=' + id
    })
  },

  // 试听
  trytolisten: function(evt) {
    if(this.data.playing) {
      // wx.setStorageSync(vid+'', this.data.currentTime);
      this.videoContext.pause();
    }
    this.setData({video_src: this.data.video_clips[0]});
    setTimeout(() => this.videoContext.play(), 50);
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('ready...');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('show...');
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
    var vid = getApp().globalData.course.course_id
    if(this.data.playing) {
      // wx.setStorageSync(vid+'', this.data.currentTime);
      this.videoContext.pause();
    }
    getApp().globalData.course = null;
    // stop marquee @2018/08/01
    if(this.interval) clearInterval(this.interval);
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
    return {
      title: '码农情报',
      path: 'pages/index/index',
      // path: '/page/user?id=123',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  }


})
