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
        searchInput: '',
        noticeList: [],
        coupons: [],
        categories: [],
        activeCategoryId: 0,
        curPage: 1,
        pageSize: 20
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
    tabClick:function(e){
      console.log(e);
      this.setData({
        activeCategoryId: e.currentTarget.id
      })
    },
    onLoad: function() {
        var that = this;
        wx.setNavigationBarTitle({
            title: wx.getStorageSync("mallName")
        });
        wx.request({
            url:
                "https://api.it120.cc/" +
                app.globalData.subDomain +
                "/banner/list",
            data: {
                key: "mallName"
            },
            success: function(res) {
                if (res.data.code == 404) {
                    wx.showModal({
                        title: "提示",
                        content: "请在后台添加 banner 轮播图片",
                        showCancel: false
                    });
                } else {
                    that.setData({
                        banners: res.data.data
                    });
                }
            }
        });
        wx.request({
            url: 'https://api.it120.cc/' + app.globalData.subDomain + '/shop/goods/category/all', //仅为示例，并非真实的接口地址
            success(res) {
                // console.log(res);
                var categories = [{id:0,name:'全部'}]
                if(res.data.code == 0){
                  if(res.data.data.length > 0){
                    for(var i = 0; i< res.data.data.length; i++){
                       categories.push(res.data.data[i])
                    }
                  }
                }
                
                that.setData({
                  categories: categories,
                  activeCategoryId: 0,
                  curPage: 1 
                });
                that.getGoodsList(0)
            }
        });
        that.getNotice();
        that.getCoupon();
    },
    // 获取产品列表
    getGoodsList(){
      var that =this
      
      wx.request({
        url: 'https://api.it120.cc/'+ app.globalData.subDomain +'/shop/goods/list',
        data:{
          categoryId: categoryId,
          nameLike: that.data.searchInput,
          page: this.data.curPage,
          pageSize: this.data.pageSize
        },
        success:function(res){
          console.log(res);
          
        }
      })
    },
    getCoupon:function(){
      var that = this
      wx.request({
        url: 'https://api.it120.cc/' + app.globalData.subDomain + '/discounts/coupons',
        data: {
          type: ''
        },
        success:function(res){
            console.log(res);
          if(res.data.code == 0){
            that.setData({
              coupons: res.data.data
            })
          }
        }
      })
    },
    // 通告
    getNotice:function(){
      var that = this
      wx.request({
        url: 'https://api.it120.cc/' + app.globalData.subDomain + '/notice/list',
        data: {pageSize: 5},
        success:function(res){
          console.log(res);
          
          if(res.data.code == 0){
            that.setData({
              noticeList : res.data.data.dataList
            })
            
          }
        }
      })
    }
});
