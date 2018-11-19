//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var that = this;    
    //  获取商城名称
    wx.request({
      url: 'https://api.it120.cc/'+ that.globalData.subDomain +'/config/get-value',
      data: {
        key: 'mallName'
      },
      success: function(res) {
        if (res.data.code == 0) {
          wx.setStorageSync('mallName', res.data.data.value);
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    subDomain: "tz",
    version: "4.0.0",
    shareProfile: '百款精品商品，总有一款适合您' // 首页转发的时候话术
  }
})