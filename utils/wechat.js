const Promise = require('./bluebird')

function login () {
  return new Promise((resolve, reject) => {
    wx.login({ success: resolve, fail: reject })
  })
}

function getUserInfo () {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({ success: resolve, fail: reject })
  })
}

function checkSession () {
  return new Promise((resolve, reject) => {
    wx.checkSession({ success: resolve, fail: () => reject(new Error('NO SESSION!')) })
  })
}

function getSetting () {
  return new Promise((resolve, reject) => {
    wx.getSetting({ success: resolve, fail: reject })
  })
}
// @2018/08/16
function uploadImgs (tempFilePaths, url) {
  var file1 = tempFilePaths[0];
  var name1 = file1.split('/').pop();
  var prms1 = new Promise((resolve, reject) => {
    wx.uploadFile({
      url: url,
      filePath: file1,
      name: name1,
      success: resolve,
      fail: reject
    })
  });

  var file2 = tempFilePaths[1];
  var name2 = file2.split('/').pop();
  var prms2 = new Promise((resolve, reject) => {
    wx.uploadFile({
      url: url,
      filePath: file2,
      name: name2,
      success: resolve,
      fail: reject
    })
  });

  var file3 = tempFilePaths[2];
  var name3 = file1.split('/').pop();
  var prms3 = new Promise((resolve, reject) => {
    wx.uploadFile({
      url: url,
      filePath: file3,
      name: name3,
      success: resolve,
      fail: reject
    })
  });

  return Promise.all([prms1, prms2, prms3]);
}


module.exports = { login, getUserInfo, getSetting, checkSession, uploadImgs }
