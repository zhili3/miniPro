//index.js
//获取应用实例
const app = getApp();

Page({
    data: {
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 1000,
        loadingHidden: false, // loading
        userInfo: {},
        swiperCurrent: 0,
        selectCurrent: 0,
        categories: []
    },
    //事件处理函数
    swiperchange: function(e) {
        //console.log(e.detail.current)
        this.setData({
            swiperCurrent: e.detail.current
        });
    },
    //事件处理函数
    bindViewTap: function() {
      
        wx.navigateTo({
            url: "../logs/logs"
        });
    },
    onLoad: function() {
      var that = this
      wx.setNavigationBarTitle({
        title: wx.getStorageSync('mallName')
      })
      wx.request({
        url: 'https://api.it120.cc/' + app.globalData.subDomain + '/banner/list',
        data: {
          key: 'mallName'
        },
        success: function(res) {
          if (res.data.code == 404) {
            wx.showModal({
              title: '提示',
              content: '请在后台添加 banner 轮播图片',
              showCancel: false
            })
          } else {
            that.setData({
              banners: res.data.data
            });
          }
        }
      })
    },
  
});
