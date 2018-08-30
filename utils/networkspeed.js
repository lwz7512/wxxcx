/**
 *  网络监测 usage
 *  @2018/08/28
 *
  const networkSpeed = require('../../utils/networkSpeed.js');

  onLoad: function(options) {
    // 开始网络监测
    networkSpeed.startNetwork();
    // 网络监测回调
    networkSpeed.networkCallback = this.networkCallback;
  },

  // 网络监测回调
  networkCallback: function(options) {

    });
  },

  onUnload: function() {
    // 停止网络监测
    networkSpeed.stopNetwork();
  },

 *
 */


// 下载事件
var downloadTask
// 下载开始时间
var start
// 下载结束时间
var end
// 重复下载
var networkTimeOut
// 当前是否有网络连接
var networkConnected
// running looper
var looper

// save the last...
var lastdnldBytes = 0;
// current download size
var totalDnldBytes = 0;
// {url: '', loop: false}
var _options;


var networkSpeed = {

  // every 200 seconds called!
  looperHandle: function() {
    console.log('looer run one time...');
    var speed = Math.round((totalDnldBytes - lastdnldBytes)/1000);
    console.log('download speed is: '+ speed + 'ks');

    lastdnldBytes = totalDnldBytes;

    networkSpeed.networkCallback({
      networkType: 2,
      networkContent: speed
    });
  },

  // 开始
  startNetwork: function(options) {

    lastdnldBytes = 0;
    totalDnldBytes= 0;

    _options = options;

    looper = setInterval(this.looperHandle, 1000);

    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        console.log('返回网络类型, 有效值：', res)
        if (res.networkType != 'none'){
          // 当前是否有网络连接
          networkConnected = true;
          // ready to running test...
          networkSpeed.network(options);
        }
      }
    })
    wx.onNetworkStatusChange(function (res) {
      console.log('当前是否有网络连接',res.isConnected)
      console.log(res.networkType)
      // 当前是否有网络连接
      networkConnected = res.isConnected;
    })
  },

  // 下载
  network: function(options) {
    console.log('开始下载');
    console.log(options);
    var self = this;
    start = new Date().getTime()

    console.log('networkConnected: '+networkConnected);
    if (!networkConnected){
      self.networkCallback({
        networkType: 3,
        networkContent: '没有网络，请检查网络连接'
      })
      // networkTimeOut = setTimeout(() => {
      //   self.network();
      // }, 1000);
      return;
    }
    if(!options) return console.error('NO OPTIONS OR TIMEOUT!');
    if(!options.url) return console.error('NO DOWNLOAD URL PROVIDED!');

    console.log('start downloading...');
    downloadTask = wx.downloadFile({
      url: options.url,
      success: function(res) {

      },
      fail: function(res) {
        console.log(res);
        console.log('网络差');
        self.networkCallback({
          networkType: 0,
          networkContent: '网络较差'
        });
      }
    })
    // 监听downloadFile进度
    downloadTask.onProgressUpdate(function(res) {
      // console.log('下载进度', res.progress)
      // console.log('已经下载的数据长度', res.totalBytesWritten)
      if(res.progress == 100) {
        console.log('>>> download complete!');
        if(!_options.loop) clearInterval(looper);

        if(_options.loop) networkSpeed.startNetwork(_options);

        self.networkCallback({
          networkType: 1,
          networkContent: '测试结束'
        });
      }

      totalDnldBytes = res.totalBytesWritten;

    }); // END OF downloadTask

  },

  // 关闭
  stopNetwork: function(options) {
    console.log('关闭网络测速');
    if(networkTimeOut) clearTimeout(networkTimeOut)
    if(downloadTask) downloadTask.abort()

    clearInterval(looper);
  },

  /**
   * 网络状态回调
   * @param {options}
   *   networkType	Number	是 0:网络较差 网络一般 2:网络良好 3:网络断开
   *   networkContent  String  是 网络状态文案
   */
  networkCallback: function(options) {

  },

};

module.exports = networkSpeed;
