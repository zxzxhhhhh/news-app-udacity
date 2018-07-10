// pages/index/index.js

const newsTypes = ['gn','gj','cj','yl','js','ty', 'other']

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsType:[
      '国内',
      '国际',
      '财经',
      '娱乐',
      '军事',
      '体育',
      '其他'    ],
    currentTab: 0,
    newsTypeCode:'gn',
    newsList: []
  },


  navbarTap: function (e) {
    console.log(e.currentTarget)
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
      newsTypeCode: newsTypes[e.currentTarget.dataset.idx]
    })
    console.log(this.data.newsTypeCode)
    // every time change the tap, get the corresponding news
    this.getNewsList()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNewsList()
  },

  getNewsList(callback) {
    wx.showLoading({
      title: '数据加载中',
    })
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: { 'type': this.data.newsTypeCode },
      success: res => {
        
        console.log(res.data.result);
        this.setData({
          newsList: res.data.result
        })
      },
      fail: result => {
        wx.showToast({
          title: '加载失败',
        })
        console.log('error!');
      },
      complete: () => {
        wx.hideLoading()
        callback && callback();
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("refresh executed!")
    this.getNewsList(() => {
      wx.stopPullDownRefresh();
    });
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
  
  }
})