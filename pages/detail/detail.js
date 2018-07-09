// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsResult: {},
    newsID: 1523074607642
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      newsID: options.id
    })
    this.getNewsDetail()
  },
  getNewsDetail(callback) {
    wx.showLoading({
      title: '数据加载中',
    })
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: { 'id': this.data.newsID },
      success: res => {
        wx.hideLoading()
        console.log(res.data.result);
        // if id is wrong, then the result is undefined.
        if (res.data.result)
          this.setData({
            newsResult: res.data.result
          })
        else
          console.log('ID error!');
      },
      fail: result => {
        wx.hideLoading()
        wx.showToast({
          title: '加载失败',
        })
        console.log('error!');
      },
      complete: () => {
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
    this.getNewsDetail(() => {
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