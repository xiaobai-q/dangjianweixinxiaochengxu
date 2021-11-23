Page({

  /**
   * 页面的初始数据
   */
  data: {
    xuexi:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载',
    })
  wx.cloud.database().collection('xuexi').get()
  .then(res=>{
    console.log('获取数据成功',res.data)
    this.setData({
      xuexi:res.data
    })
    wx.hideLoading({
      success: (res) => {},
    })
  })
  .catch(err=>{
    console.log('获取数据失败',err)
  })
  },
  //点击事件
  click_1(e){
    console.log('数据为：',e.currentTarget.dataset)
    wx.navigateTo({
      url: '../xuexilushang/xuexilushang?id=' +e.currentTarget.dataset.id1,
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