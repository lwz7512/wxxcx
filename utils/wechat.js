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


module.exports = { login, getUserInfo, getSetting, checkSession }
