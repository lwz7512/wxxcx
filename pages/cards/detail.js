// pages/cards/detail.js
// 视频播放页面
//
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
    others: [],
    cid: '', // save for playing from paused time @2018/09/10
    autoplay: false,
    playlabel: '播放'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // ------- prepare ----------------
    var context = this;
    var app = getApp();
    var mdParser = app.globalData.wxParser;
    // save the context to stop later...
    context.videoContext = wx.createVideoContext('myVideo');
    var res = wx.getSystemInfoSync();

    // 去除播放器的高度 @2018/08/01
    context.setData({
      windowHeight: res.windowHeight-247,
      windowWidth:  res.windowWidth
    });
    // save current course @2018/09/10
    context.setData({cid: options.id});
    context.setInitTime(options.id);

    // -------- course from others -----
    if(options.src){
      wx.showLoading({title: '加载中',});
      wx.request({
        url: config.service.ddetailUrl,
        method: 'GET',
        data: {session_3rd: Session.get().session_3rd, id: options.id},
        success: function(res){
          console.log(res);
          var course = res.data.res.data;
          wx.hideLoading();
          context.setData({others: course.others});
          context.setData({video_clips: course.av_arr});
          context.setData({price: Number(course.price)});
          if(course.av_arr.length){
            context.setData({video_src: course.av_arr[0]}); // play the first clip...
          }
          var html = course.intro;
          mdParser.wxParse('article', 'html', html, context, 5);
          wx.setNavigationBarTitle({
            title: course.name
          });
        }
      });
      return;
    }


    // -------- course from flow list ----------------
    var course = app.globalData.course;
    if(!course) return;
    // console.log(course);
    context.setData({price: Number(course.price)});
    context.setData({video_clips: course.av_arr});
    if(course.av_arr.length){
      context.setData({video_src: course.av_arr[0]}); // play the first clip...
    }

    var html = course.intro;
    mdParser.wxParse('article', 'html', html, context, 5);

    wx.request({
      url: config.service.marqueeTxtUrl,
      method: 'GET',
      data: {session_3rd: Session.get().session_3rd, id: course.course_id},
      success: function(res){
        // console.log(res);
        // wx.hideLoading();
        context.setData({
          marquees: res.data.res.data,
        });
        // reset scroll height
        if(res.data.res.data.length){
          // that.setData({windowHeight: res.windowHeight-247});
        }

        // start marquee setting...
        if(!res.data.res.data.length) return;
        // save the interval...
        context.interval = setInterval(()=>{
          var mlength = context.data.marquees.length;
          var next = context.data.activeIndex == mlength?1:context.data.activeIndex+1;
          context.setData({activeIndex: next});
          // console.log("marquee: "+next);
        }, 3000);
        context.setData({activeIndex: 1});
        // ...end of success...
      }
    });

    wx.request({
      url: config.service.ddetailUrl,
      method: 'GET',
      data: {session_3rd: Session.get().session_3rd, id: course.course_id},
      success: function(res){
        // console.log(res);
        context.setData({others: res.data.res.data.others});
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
    this.setData({playlabel: '暂停'});
  },

  videoPaused: function () {
    this.setData({playing: false});
    this.setData({playlabel: '续播'});

    var cid = 'c_'+this.data.cid;
    var time= this.data.currentTime;
    wx.setStorageSync(cid, time);
    console.log('>>> cached: '+cid+'@'+time);
  },

  getStorageCid: function (cid) {
    return wx.getStorageSync('c_'+cid) || null;
  },

  setInitTime: function (cid) {
    var currentTime = wx.getStorageSync('c_'+cid) || null;
    if(currentTime) {
      this.setData({
        initialTime: currentTime,
        playlabel: '续播',
      });
      // this.videoContext.seek(currentTime);
      console.log('initialTime for: '+cid);
      console.log(currentTime);
    }else{
      console.log('no init time...');
    }
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

  openOtherItem: function(evt) {
    var id = evt.currentTarget.dataset.id;
    var src = evt.currentTarget.dataset.src;
    wx.navigateTo({
      url: '/pages/cards/detail?id='+id+'&src='+src
    });
  },

  // 试听
  // trytolisten: function(evt) {
  //   if(this.data.playing) {
  //     // wx.setStorageSync(vid+'', this.data.currentTime);
  //     this.videoContext.pause();
  //   }
  //   this.setData({video_src: this.data.video_clips[0]});
  //   setTimeout(() => this.videoContext.play(), 50);
  // },

  playnext: function () {
    if(this.data.playing) return this.videoContext.pause();

    var cid = this.data.cid;
    var currentTime = wx.getStorageSync('c_'+cid) || null;
    this.videoContext.play();

    if(currentTime) {
      this.videoContext.seek(currentTime);
    }
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
    if(this.data.playing) this.videoContext.pause();
    console.log('onhide :'+this.data.playing);
    // stop marquee @2018/08/01
    // if(this.interval) clearInterval(this.interval);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // var vid = getApp().globalData.course.course_id
    getApp().globalData.course = null;
    // console.log('on unload: '+this.data.playing);
    if(this.data.playing) {
      this.videoContext.pause();
      this.videoPaused(); // FIXME, add this is must @2018/09/10
    }
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
