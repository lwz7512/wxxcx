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
       {name:'外商投资企业'},{name:'国有企业'},{name:'民营企业'},{name:'合伙企业'},{name:'个人独资企业'},
       {name:'其他'}
     ],
     tagC: [
       {name:'个人所得税'},{name:'企业所得税'},{name:'增值税'},{name:'关税'},{name:'房产税'},
       {name:'土地使用税'},{name:'土地增值税'},{name:'印花税'},{name:'契税'},{name:'并购重组'},
       {name:'IPO'},{name:'营改增'},{name:'CRS'},{name:'走出去'},{name:'人员派遣'},
       {name:'对外支付'},{name:'税务稽查'},{name:'发票管理'},{name:'转让定价'},{name:'其他'},
     ],
     tagD: [
       {name:'专业课程'},{name:'实操课程'},{name:'战略课程'}
     ],
     windowHeight: 0,
     current: 0,
     complete: false
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var res = wx.getSystemInfoSync()
    this.setData({windowHeight: res.windowHeight});

    var selected = wx.getStorageSync('complete');
    if(typeof selected != 'object') return;

    // console.log(selected);
    var savedTagA = selected[0];
    this.data.tagA.forEach(item => {
      savedTagA.forEach(si => {if(item.name==si.name) item.active = true});
    });
    var savedTagB = selected[1];
    this.data.tagB.forEach(item => {
      savedTagB.forEach(si => {if(item.name==si.name) item.active = true});
    });
    var savedTagC = selected[2];
    this.data.tagC.forEach(item => {
      savedTagC.forEach(si => {if(item.name==si.name) item.active = true});
    });
    var savedTagD = selected[3];
    this.data.tagD.forEach(item => {
      savedTagD.forEach(si => {if(item.name==si.name) item.active = true});
    });
    // update is must need!
    this.setData({
      tagA: this.data.tagA,
      tagB: this.data.tagB,
      tagC: this.data.tagC,
      tagD: this.data.tagD
    });

  },

  // first slide select
  selectIndustry: function (evt) {
    var id = evt.currentTarget.dataset.id;
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
  // second slide selcet
  selectCompanyType: function (evt) {
    var id = evt.currentTarget.dataset.id;
    var cates = this.data.tagB;
    cates.forEach(item => {
      if(item.name == id){
        item.active = true;
      } else {
        item.active = false;
      }
    });
    this.setData({tagB: cates});
  },
  // third slide select
  selectTaxType: function (evt) {
    var id = evt.currentTarget.dataset.id;
    var cates = this.data.tagC;
    cates.forEach(item => {
      if(item.name == id) item.active = item.active?false:true;
    });
    this.setData({tagC: cates});
  },
  // fourth slide select
  selectDifcType: function (evt) {
    var id = evt.currentTarget.dataset.id;
    var cates = this.data.tagD;
    cates.forEach(item => {
      if(item.name == id){
        item.active = true;
      } else {
        item.active = false;
      }
    });
    this.setData({tagD: cates});
  },

  next: function () {
    var slideIndex = this.data.current;
    var optionsMap = {
      0: this.data.tagA, 1: this.data.tagB,
      2: this.data.tagC, 3: this.data.tagD
    };
    // console.log(optionsMap[slideIndex]);
    var selected = false;
    optionsMap[slideIndex].forEach(item => {
      if(item.active) selected = true;
    });
    if(!selected) return this.showAlert('请选择选项!');
    if(slideIndex == 3) {
      this.setData({complete: true});
      return wx.navigateBack({delta: 1});
    }
    // ...judge the end of slide...
    this.setData({current: slideIndex+1});
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var complete = this.data.complete;

    var results = {0:[], 1:[], 2:[], 3:[]};
    this.data.tagA.forEach(item => {if(item.active) results[0].push(item)});
    this.data.tagB.forEach(item => {if(item.active) results[1].push(item)});
    this.data.tagC.forEach(item => {if(item.active) results[2].push(item)});
    this.data.tagD.forEach(item => {if(item.active) results[3].push(item)});

    // remember the selection...
    wx.setStorageSync('complete', results);

    // TODO, save the remote db...
    //
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

  },

  showAlert: function (title) {
    wx.showToast({
        title: title,
        icon: 'none',
        image:'../../images/icon_intro.png',
        duration: 2000
    });
  },


})
